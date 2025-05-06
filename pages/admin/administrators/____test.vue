<script setup lang="ts"> 

import { useAdministratorStore } from '~/stores/administrator'; 
const administratorStore = useAdministratorStore() 
await administratorStore.fetchPagination();

// onMounted(async() => {
//   await administratorStore.fetchPagination();   // fetch the first page of administrator on mount
// })

const administrators = computed(() => administratorStore.administrators)
const total = computed(() => administratorStore.total)
const pageSize = computed(() => administratorStore.pageSize)
const currentPage = computed(() => administratorStore.currentPage) 
  
console.log (' ------> ')
  console.log (total)
</script>

<template>
  <div class="w-full pb-4 space-y-4">
     

    <div class="flex justify-center pt-4 border-t border-default"> 
      <UPagination
        :default-page="currentPage"
        :items-per-page="pageSize"
        :total="total"
        @update:page="(pg) => administratorStore.fetchPagination(pg)"
        
      />
    </div>
  </div>
</template>
 