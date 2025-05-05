
<script setup lang="ts">
  
    const toast = useToast()
    const { t } = useI18n();

    function showToast() {
        console.log('show toast')
        toast.add({
            title: t("description"), 
            icon: 'i-lucide-wifi',
        })
        console.log('show toast 2')
    }
</script>

<template>
    <h1 class="p-2 border rounded-md font-display m-[20px]"> {{ $t('welcome') }} </h1>  
 
    <div  class="p-2 m-4">
        <UAlert 
            title="Heads up!"
            description="You can change the primary color in your app config."
            :avatar="{
                src: 'https://github.com/nuxt.png'
            }"
        /> 
    </div>
    
    <div class="flex gap-4 p-4">
      
        <UAvatar src="https://github.com/benjamincanac.png" />
        <UButton  >Button</UButton>
        <UButton label="Show toast"  variant="outline" @click="showToast" />
    </div>
</template>
