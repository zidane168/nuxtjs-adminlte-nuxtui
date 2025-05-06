<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { t } = useI18n(); 

const activeMenu = ref('')
const activeSubMenu = ref('')

//const items = ref<NavigationMenuItem[][]>([   // dont update,
const items = computed<NavigationMenuItem[][]>(() => [  // updated
  [ 
    {
      label: t("menu.home"),
      icon: 'i-lucide-book-open', 
      active: activeMenu.value === 'menu.home',
      children: [
        {
          label: t("home.dashboards"),
          description: 'Fully styled and customizable components for Nuxt.',
          icon: 'i-lucide-house',
          onClick: () => {
            activeMenu.value = 'menu.home';
            activeSubMenu.value = 'home.dashboards';
          },
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
          icon: 'i-lucide-cloud-download',
          onClick: () => {
            activeMenu.value = 'menu.home';
            activeSubMenu.value = 'home.topups';
          },
        }, 
      ]
    },
    {
      label: t('menu.customer'),
      icon: 'i-lucide-database',
      active: activeMenu.value === 'menu.customer',
      children: [
        {
          label: t('customer.customers'),
          icon: 'i-lucide-file-text',
          description: 'Define shortcuts for your application.',
          to: '/admin/customers',
          onClick: () => {
            activeMenu.value = 'menu.customer';
            activeSubMenu.value = 'customer.customers';
          },
        },
        {
          label: t('customer.jobs'),
          icon: 'i-lucide-file-text',
          description: 'Display a modal/slideover within your application.',
          to: '/admin/jobs',
          onClick: () => {
            activeMenu.value = 'menu.customer';
            activeSubMenu.value = 'customer.jobs';
          },
        }, 
      ]
    },
    {
      label: t('menu.setting'),
      icon: 'i-lucide-box',
      to: '/components',
      //active: true, // hightligh here
      active: activeMenu.value === 'menu.setting',
      defaultOpen: true,
      children: [
        {
          label: t('setting.administrators'),
          icon: 'i-lucide-file-text',
          description: 'Administrator management',
          to: '/admin/administrators',
          onClick: () => {
            activeMenu.value = 'menu.setting';
            activeSubMenu.value = 'setting.administrators';
          },
        },
        {
          label: t('setting.roles'),
          icon: 'i-lucide-file-text',
          description: 'Display a modal within your application.',
          to: '/admin/roles',
          onClick: () => {
            activeMenu.value = 'menu.setting';
            activeSubMenu.value = 'setting.roles';
          },
        },
        {
          label: t('setting.permissions'),
          icon: 'i-lucide-file-text',
          description: 'Display a list of links.',
          to: '/admin/permissions',
          onClick: () => {
            activeMenu.value = 'menu.setting';
            activeSubMenu.value = 'setting.permissions';
          },
        },  
      ]
    }
  ], 
])
</script>

<template>
  <UNavigationMenu 
    orientation="vertical" :items="items" 
    class="data-[orientation=vertical]:w-48"  
  />
</template>
