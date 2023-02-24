<script setup lang="ts">
const config = useRuntimeConfig();
useHead({
  title: `${config.appName}`,
  meta: [
    { charset: "utf-8" },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0, maximum-scale=1.0",
    },
    {
      hid: "description",
      name: "description",
      content: "Projeto desenvolvido referente ao desafio da Compay Z",
    },
  ],
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.svg" }],
});
</script>

<template>
  <div
    id="app-layout"
    class="relative flex flex-col w-screen h-screen overflow-x-hidden"
  >
    <!-- Notificações -->
    <EbNotify />
    <Navbar />
    <div class="h-full">
      <!-- Conteúdo -->
      <slot />
    </div>
  </div>
</template>