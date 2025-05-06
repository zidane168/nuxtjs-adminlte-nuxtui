<template>
  <UApp> <!-- UApp for NextUI showToast -->
    <div  class="flex justify-between gap-2 p-4 border m-[10px]  items-center " > 
      <div class="flex items-center justify-center gap-2 font-bold"> 
        <span>
          <a href="/"> 
            <img src="@/assets/images/logo.jpeg" style="border-radius: 100%; width: 50px" alt="logo"/>
          </a>
        </span>
        <span>  <a href="/">  Company's name </a> </span>
       
      </div>
      <div class="flex gap-2 ">
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
      <div class="hidden md:block"> <!-- binh thuong là ẩn, từ md: 768 trở lên thì hiển thị hết -->
        <NavigationMenu />  
      </div>
      <div class="overflow-x-auto grow mt-[10px] p-4 index-template mb-[30px]">
        <NuxtPage />
      </div>
    </div>
  </UApp>
</template> 