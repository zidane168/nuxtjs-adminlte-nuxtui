<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/vue-table'
import type { TableColumn } from '@nuxt/ui'
import { upperFirst } from 'scule'

import { useAdministratorStore } from '~/stores/administrator';   

const UButton = resolveComponent('UButton') 
const UDropdownMenu = resolveComponent('UDropdownMenu')

const administratorStore = useAdministratorStore()   
await administratorStore.fetchPagination();   // fetch the first page of administrator on mount

let administrators = computed(() => administratorStore.administrators)
let total = computed(() => administratorStore.total)
let pageSize = computed(() => administratorStore.pageSize)
let currentPage = computed(() => administratorStore.currentPage) 
 
const table = useTemplateRef('table')
const { t, locale } = useI18n();
const toast = useToast()

import type { Administrator  } from '~/ultis/types/Administrator'; 

let columns: TableColumn<Administrator>[] = [ 
  
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ row }) => `#${row.getValue('id')}`
  },
  {
    accessorKey: 'firstName',
    header: t('administrator.firstName'),
    cell: ({ row }) => `${row.getValue('firstName')}`
  },
  {
    accessorKey: 'lastName',
    header: t('administrator.lastName'),
    cell: ({ row }) => `${row.getValue('lastName')}`
  }, 
  {
    accessorKey: 'ip',
    header: t('administrator.ip'),
    cell: ({ row }) => `${row.getValue('ip')}`
  }, 
  {
    accessorKey: 'maidenName',
    header: t('administrator.maidenName'),
    cell: ({ row }) => `${row.getValue('maidenName')}`
  },
  {
    accessorKey: 'birthDate',
    header: t('administrator.birthDate'),
    cell: ({ row }) => `${row.getValue('birthDate')}`
  },
  {
    accessorKey: 'age',
    header: t('administrator.age'),
    cell: ({ row }) => `${row.getValue('age')}`
  },
  // {
  //   accessorKey: 'date',
  //   header: t("administrator.firstName"),
  //   cell: ({ row }) => {
  //     return new Date(row.getValue('date')).toLocaleString('en-US', {
  //       day: 'numeric',
  //       month: 'short',
  //       hour: '2-digit',
  //       minute: '2-digit',
  //       hour12: false
  //     })
  //   }
  // },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => {
      return h('div', { class: 'bg-green-300 rounded-md px-2'}, row.getValue('email') )
    }
  },
  // {
  //   accessorKey: 'amount',
  //   header: () => h('div', { class: 'text-right' }, 'Amount'),
  //   cell: ({ row }) => {
  //     const amount = Number.parseFloat(row.getValue('amount'))
  //     const formatted = new Intl.NumberFormat('en-US', {
  //       style: 'currency',
  //       currency: 'EUR'
  //     }).format(amount)
  //     return h('div', { class: 'text-right font-medium' }, formatted)
  //   }
  // }

  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const items = [{
        type: 'label',
        label: 'Actions'
      }, {
        label: 'Copy Administrator Email',
        onSelect() {
          navigator.clipboard.writeText(row.original.email)

          toast.add({
            title: 'Administrator Email copied to clipboard!',
            color: 'success',
            icon: 'i-lucide-circle-check'
          })
        }
      },    {
        type: 'separator'
      }, {
        label: 'View customer'
      }, {
        label: 'View payment details'
      }]

      return h('div', { class: 'text-right' }, h(UDropdownMenu, {
        'content': {
          align: 'end'
        },
        items,
        'aria-label': 'Actions dropdown'
      }, () => h(UButton, {
        'icon': 'i-lucide-ellipsis-vertical',
        'color': 'neutral',
        'variant': 'ghost',
        'class': 'ml-auto',
        'aria-label': 'Actions dropdown'
      })))
    }
  }
]  

const pagination = ref({
  pageIndex: 0,
  pageSize: 20
})
 
</script>

<template> 

  <div class="p-2 pb-4 space-y-4 ">
    <!-- :columns="columns" 
       :pagination-options="{
        getPaginationRowModel: getPaginationRowModel()
      }"
    -->

    <div class="flex items-center gap-2 px-4 py-3.5 overflow-x-auto">
      <UInput
        :model-value="(table?.tableApi?.getColumn('email')?.getFilterValue() as string)"
        class="max-w-sm min-w-[12ch]"
        placeholder="Filter emails..."
        @update:model-value="table?.tableApi?.getColumn('email')?.setFilterValue($event)" 
      />
      <!-- call api here -->
  
      <UDropdownMenu
        :items="table?.tableApi?.getAllColumns().filter(column => column.getCanHide()).map(column => ({
          label: upperFirst(column.id),
          type: 'checkbox' as const,
          checked: column.getIsVisible(),
          onUpdateChecked(checked: boolean) {
            table?.tableApi?.getColumn(column.id)?.toggleVisibility(!!checked)
          },
          onSelect(e?: Event) {
            e?.preventDefault()
          }
        }))"
        :content="{ align: 'end' }"
      >
        <UButton
          label="Columns"
          color="neutral"
          variant="outline"
          trailing-icon="i-lucide-chevron-down"
          class="ml-auto"
          aria-label="Columns select dropdown"
        />
      </UDropdownMenu>
    </div>


    <UTable
      :columns="columns"
      ref="table"
      v-model:pagination="pagination"
      :data="administrators"   
    />

    <div class="flex justify-center pt-4 "> 

      <UPagination
        :default-page="currentPage"
        :items-per-page="pageSize"
        :total="total"
        @update:page="(pg) => administratorStore.fetchPagination(pg)"
        
      />
    </div>
  </div>
</template>
 