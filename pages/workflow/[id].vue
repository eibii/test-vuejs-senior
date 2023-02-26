<script setup lang="ts">
import type { Workflow } from "@/server/api/workflow/[id]";
import type { Node } from "@/components/Node/index.vue";
const $route = useRoute();
// Lista de blocos(nós)
const nodes = ref<Node[]>([]);
// Faz a consulta no endpoint com base no id do workflow
const { success, data }: { success: boolean; data: Workflow } = await $fetch(
  `/api/workflow/${$route.params.id}`
);
if (success) {
  useHead({
    titleTemplate: (titleChunk) => {
      return `${titleChunk} - ${data.name}`;
    },
  });
  // Serialização de dados para se adequar ao que o componente espera
  nodes.value = [
    {
      id: `${data.id}`,
      title: data.name,
      isRemove: false,
      isDraggable: false,
      nodes: useMap(data.blocks, (block, i) => {
        return {
          id: `${i}`,
          icon: block.icon || "",
          iconColor: block.iconColor || "",
          nodeParent: `${data.id}`,
          title: block.name,
          idx: "0",
          actions: block.actions,
          nodes: [],
        };
      }),
    },
  ];
}
</script>

<template>
  <!-- Lista de nós -->
  <Flow :nodes="nodes" />
</template>
