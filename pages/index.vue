<script setup lang="ts">
import type { ListWorkflow } from "@/server/api/workflow/";

// Lista de workfows
const workflows = ref<ListWorkflow>([]);
// Faz a consulta no endpoint para trazer a lista de workflows
const { success, data }: { success: boolean; data: ListWorkflow } =
  await $fetch("/api/workflow");
if (success) {
  workflows.value = data;
}
</script>

<template>
  <div class="custom-container flex flex-col gap-4 p-2">
    <!-- Header -->
    <div class="flex justify-between flex-wrap gap-4">
      <div class="self-center text-lg font-semibold">Workflows</div>
      <a
        class="self-center flex gap-2 custom-animation bg-blue-500 hover:bg-blue-600 text-white rounded-md px-4 py-1"
        href="/new-workflow"
      >
        <span class="self-center">Novo</span>
        <i class="self-center bi bi-plus text-lg"></i>
      </a>
    </div>
    <!-- Lisagem -->
    <div class="flex justify-center">
      <div class="flex flex-wrap gap-6">
        <template v-for="(workflow, i) in workflows" :key="i">
          <a
            :href="`/workflow/${workflow.id}`"
            :class="[
              'flex gap-2 custom-animation border self-center hover:bg-slate-200 hover:shadow-lg rounded-lg px-4 py-8',
              {
                'bg-slate-100 border-slate-300':
                  $route.path !== `/workflow/${workflow.id}`,
                'bg-slate-200 border-slate-300':
                  $route.path === `/workflow/${workflow.id}`,
              },
            ]"
          >
            <i
              v-if="workflow.icon"
              :class="`${workflow.icon} self-center text-xl`"
            ></i>
            <span class="self-center text-xl">{{ workflow.name }}</span>
          </a>
        </template>
      </div>
    </div>
  </div>
</template>