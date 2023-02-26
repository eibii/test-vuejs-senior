// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  css: ["bootstrap-icons/font/bootstrap-icons.css"],
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt", "nuxt-vitest", "nuxt-lodash"],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "/api",
      appName: process.env.NUXT_PUBLIC_APP_NAME,
    },
  },
});
