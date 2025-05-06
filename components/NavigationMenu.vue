<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { t } = useI18n(); 

//const items = ref<NavigationMenuItem[][]>([   // dont update,
const items = computed<NavigationMenuItem[][]>(() => [  // updated
  [ 
    {
      label: t("menu.home"),
      icon: 'i-lucide-book-open', 
      children: [
        {
          label: t("home.dashboards"),
          description: 'Fully styled and customizable components for Nuxt.',
          icon: 'i-lucide-house',
          // children: [
          //   {
          //     label: t("menu.home"),
          //             description: 'Fully styled and customizable components for Nuxt.',
          //             icon: 'i-lucide-house',
          //   }
          // ]
        },
        {
          label: t("home.topups"),
          description: 'Learn how to install and configure Nuxt UI in your application.',
          icon: 'i-lucide-cloud-download'
        }, 
      ]
    },
    {
      label: t('menu.customer'),
      icon: 'i-lucide-database',
      children: [
        {
          label: t('customer.customers'),
          icon: 'i-lucide-file-text',
          description: 'Define shortcuts for your application.',
          to: '/composables/define-shortcuts'
        },
        {
          label: t('customer.jobs'),
          icon: 'i-lucide-file-text',
          description: 'Display a modal/slideover within your application.',
          to: '/composables/use-overlay'
        }, 
      ]
    },
    {
      label: t('menu.setting'),
      icon: 'i-lucide-box',
      to: '/components',
      active: true, // highligh here
      defaultOpen: true,
      children: [
        {
          label: t('setting.administrators'),
          icon: 'i-lucide-file-text',
          description: 'Administrator management',
          to: '/admin/administrators'
        },
        {
          label: t('setting.roles'),
          icon: 'i-lucide-file-text',
          description: 'Display a modal within your application.',
          to: '/admin/roles'
        },
        {
          label: t('setting.permissions'),
          icon: 'i-lucide-file-text',
          description: 'Display a list of links.',
          to: '/admin/permissions'
        },  
      ]
    }
  ], 
])
</script>

<template>
  <UNavigationMenu orientation="vertical" :items="items" class="data-[orientation=vertical]:w-48" />
</template>
