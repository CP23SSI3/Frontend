// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/image-edge'],
  devtools: { enabled: true },
  css: [
    '@/assets/css/main.css',
    '@/assets/styles/global.css',
    '@vueform/multiselect/themes/default.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  // ใช้ต่อ api ใน .env
  // runtimeConfig: {
  //   public: {
  //     API_URL: process.env.API_URL,
  //   },
  // },

  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'InternHub'
    }
  }
})
