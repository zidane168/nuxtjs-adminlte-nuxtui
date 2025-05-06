<template>
  <UApp> <!-- UApp for NextUI showToast -->
    <div  class="flex justify-between gap-2 p-4 border m-[10px] " > 
      <div class="font-bold">
        CRM and Logo Here
      </div>
      <div class="flex gap-2">
        <div>
          <LangSwitcher />   
        </div>
        <div> | </div>
        <div>
          Welcome Vi Ly!
        </div>
      </div>
    </div>

    <div class="flex gap-2" > 
      <div>
        <NavigationMenu />  
      </div>
      <div class="grow">
        <NuxtPage />
      </div>
    </div>
  </UApp>
</template> 