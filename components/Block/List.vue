<template>
  <div class="flex flex-col gap-2">
    <!-- Header -->
    <div class="flex justify-between flex-wrap gap-4">
      <div class="self-center text-lg font-semibold">Blocos</div>
      <slot name="header" />
    </div>
    <!-- Lista de blocos -->
    <template v-for="(block, index) in blocks" :key="index">
      <Block
        :id="block.id"
        :title="block.title"
        :icon="block?.icon"
        :iconColor="block?.iconColor"
        :description="block?.description"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Block } from "./index.vue";

interface Props {
  blocks: Block[];
}

const props = withDefaults(defineProps<Props>(), {});
</script>