<script setup lang="ts">
const config = useRuntimeConfig();
</script>

<template>
  <div data-idtest="navbar" class="border-b">
    <div class="custom-container flex gap-4 px-2 py-4">
      <a class="self-center" href="/">{{ config.appName }}</a>
    </div>
  </div>
</template>