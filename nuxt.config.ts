// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/image-edge', '@pinia/nuxt'],
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
  runtimeConfig: {
    public: {
      API_URL: `${process.env.NODE_ENV === 'PROD' ? '/ssi3a' : ''}${
        process.env.API_URL
      }`,
      KEY_API_MAP: process.env.KEY_API_GOOGLE_MAP
      // base: '/ssi3a/'
    }
  },
  generate: { fallback: '404.html' },
  // devServer: {
  //   port: 80
  // },
  // server: {
  //   port: 30,
  //   host: '0.0.0.0', // or 'localhost' or '127.0.0.1'
  // },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) =>
        ['OtherComponents', 'QuillEditor', 'Dialog', 'DialogPanel'].includes(
          tag
        )
    }
  },
   app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'InternHub',
      link: [{ rel: 'icon', type: 'svg', href: '/internhub-icon.svg' }]
      // link: [{ rel: 'icon', type: 'svg', href: '/ssi3a/internhub-icon.svg' }] // -- run on server
    }
    // --- เอา comment ออก ถ้ารันบน server ---
    ,
    baseURL: '/ssi3a/'
  }
})
