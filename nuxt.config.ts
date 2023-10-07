// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/image-edge'],
  devtools: { enabled: true },
  css: ['~/assets/css/main.css', '@vueform/multiselect/themes/default.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  }
  // ใช้ต่อ api ใน .env
  // runtimeConfig: {
  //   public: {
  //     API_URL: process.env.API_URL,
  //   },
  // },
})
