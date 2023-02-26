<script setup lang="ts">
import type { Block } from "./index.vue";

interface Props {
  blocks: Block[];
}

const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
  <div data-idtest="block-list" class="flex flex-col gap-2 h-full lg:h-auto">
    <!-- Header -->
    <div class="flex-none flex justify-between flex-wrap gap-4">
      <div class="self-center text-lg font-semibold">Blocos</div>
      <slot name="header" />
    </div>
    <!-- Lista de blocos -->
    <div
      class="flex-1 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-hidden overflow-y-hidden"
    >
      <template v-for="(block, index) in blocks" :key="index">
        <Block
          class="min-w-[280px]"
          :id="block.id"
          :title="block.title"
          :icon="block?.icon"
          :iconColor="block?.iconColor"
          :description="block?.description"
        />
      </template>
    </div>
  </div>
</template>