<script setup lang="ts">
import type { WorkflowAction } from "@/server/api/workflow/[id]";

export interface Block {
  id?: string;
  icon?: string;
  iconColor?: string;
  title: string;
  description?: string;
  actions?: WorkflowAction[];
  isDraggable?: boolean;
}

const props = withDefaults(defineProps<Block>(), {
  isDraggable: true,
});
const draggable = ref(false);
const block = ref(null);
// Método ao arrastar o nó
function onStartDrag(ev: any, item: Block) {
  ev.dataTransfer.dropEffct = "move";
  ev.dataTransfer.effctAllowed = "move";
  ev.dataTransfer.setData("item", JSON.stringify(item));
}

function onStartTouch(ev: any, item: Block) {
  const el: any = document.querySelector('[data-idtest="block"]');
  const clone = el.cloneNode(true);
  el.appendChild(clone);
  clone.dataset.idtest = "blockClone";
}

function onDrag(ev: any) {
  const el: any = document.querySelector('[data-idtest="blockClone"]');
  el.classList.add("fixed");
  el.classList.add("z-50");
  el.classList.add("w-[280px]");

  el.style.left = `${ev.touches[0].clientX - 140}px`;
  el.style.top = `${ev.touches[0].clientY}px`;
}

function onDragEnd(ev: any) {
  document.querySelector('[data-idtest="blockClone"]')?.remove();
}
</script>

<template>
  <div
    data-idtest="block"
    :draggable="draggable"
    @dragstart="($event) => onStartDrag($event, props)"
    class="custom-card flex gap-2 p-1"
  >
    <!-- Ícone -->
    <div v-if="icon" class="flex-none flex">
      <i :class="`${icon} text-2xl self-center`"></i>
    </div>
    <!-- Bloco do conteúdo -->
    <div class="flex-1 flex flex-col gap-1">
      <!-- Título -->
      <div class="text-sm font-bold leading-4">{{ title }}</div>
      <!-- Descrisão -->
      <div
        v-if="description"
        class="text-xs font-light min-h-[32px]"
        v-html="description"
      />
    </div>
    <!-- Botão para arrastar -->
    <div class="flex-none flex">
      <button
        data-btn="drag"
        class="custom-animation self-center w-8 h-8 bg-slate-50 hover:bg-slate-100 rounded-lg group"
        type="button"
        @touchstart.prevent="($event) => onStartTouch($event, props)"
        @touchmove.prevent="onDrag"
        @touchend.prevent="onDragEnd"
        @mouseover="draggable = true"
        @mouseleave="draggable = false"
        @click="draggable = true"
      >
        <i
          :class="[
            'bi group-hover:cursor-[grab] text-xl self-center',
            { 'bi-arrows-move': draggable, 'bi-grip-vertical': !draggable },
          ]"
        ></i>
      </button>
    </div>
  </div>
</template>