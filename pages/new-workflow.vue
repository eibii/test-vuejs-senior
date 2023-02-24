<script setup lang="ts">
import type { Node } from "@/components/Node/index.vue";
import type { Block } from "@/components/Block/index.vue";

useHead({
  titleTemplate: (titleChunk) => {
    return `${titleChunk} - Criar Workflow`;
  },
});

// Carga de dados para exemplificar com nó principal
const nodes = ref<Node[]>([
  {
    id: "1",
    title: "Principal",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit.",
    icon: "bi bi-diagram-2-fill",
    iconColor: "#0ea5e9",
    isRemove: false,
    nodes: [],
  },
]);
// Carga de dados para exemplificar os blocos
const blocks = ref<Block[]>([
  {
    id: "2",
    title: "Exemplo 1",
    description: "Aenean sagittis condimentum nisi, in eleifend felis.",
    icon: "bi bi-xbox",
    iconColor: "#84cc16",
  },
  {
    id: "3",
    title: "Exemplo 2",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi.",
    icon: "bi bi-apple",
    iconColor: "#4f46e5",
  },
  {
    id: "4",
    title: "Exemplo 3",
    description: "Nullam quis erat blandit, porta ligula.",
    icon: "bi bi-android2",
    iconColor: "#65a30d",
  },
  {
    id: "5",
    title: "Exemplo 4",
    description: "Nullam quis erat blandit, porta ligula.",
    icon: "bi bi-playstation",
    iconColor: "#2563eb",
  },
  {
    id: "6",
    title: "Exemplo 5",
    description:
      "Mauris feugiat mauris in elit luctus, nec efficitur elit malesuada. Fusce accumsan.",
    icon: "bi bi-spotify",
    iconColor: "#16a34a",
  },
  {
    id: "7",
    title: "Exemplo 6 - Fusce viverra lacus sem, eget egestas",
    description:
      "In ut aliquet dolor, ac accumsan ex. Pellentesque ullamcorper volutpat tortor, quis imperdiet nunc vulputate eu. Etiam viverra mi at.",
    icon: "bi bi-git",
    iconColor: "#dc2626",
  },
]);
</script>

<template>
  <div class="grid grid-cols-4 h-full">
    <!-- Lista de blocos -->
    <div class="col-span-1 md:border-r p-2">
      <BlockList :blocks="blocks" />
    </div>
    <!-- Lista de nós -->
    <div class="col-span-3">
      <Flow :nodes="nodes" />
    </div>
  </div>
</template>
