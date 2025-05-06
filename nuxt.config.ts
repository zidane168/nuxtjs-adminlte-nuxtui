
import tailwindcss from "@tailwindcss/vite"  
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  css: [
    '@/assets/css/main.css',
    '@/assets/css/tailwind.css',
  ],
  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/ui', 
    '@nuxtjs/i18n',
  ],
   i18n: { 
    lazy: true, 
    langDir: 'locales',
    strategy: 'no_prefix',
    // strategy: "prefix_and_default", // prefix trên moi url domain/zh-TW/languages
    locales: [
      { code: 'en-US', iso: 'en-US', name: 'English', 'file': 'en-US.json' },
      { code: 'vi-VN', iso: 'vi_VN', name: 'Tiếng Việt', 'file': 'vi-VN.json' },
      { code: 'zh-TW', iso: 'zh-TW', name: '繁體中文', 'file': 'zh-TW.json' },
    ],
    defaultLocale: 'vi-VN',   
  },

  vite:  {
    plugins: [
      tailwindcss(),
    ],  
  } 
})