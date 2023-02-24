<script setup lang="ts">
import { useNotify } from "@/store/notify";
import { map, delay } from "lodash";
import type { WorkflowAction } from "@/server/api/workflow/[id]";
export interface Node {
  idx?: string;
  id?: string;
  nodeParent?: string;
  iconColor?: string;
  icon?: string;
  title: string;
  description?: string;
  nodes: Node[];
  isRemove?: boolean;
  isDraggable?: boolean;
  actions?: WorkflowAction[];
}
// Eventos do nó
const $emit = defineEmits(["onAddNode", "onRemove"]);
const props = withDefaults(defineProps<Node>(), {
  isDraggable: false,
  isRemove: false,
});
const notify = useNotify();
const dragleave = ref(false);
const draggable = ref(false);
// Método ao arrastar o nó
function onStartDrag(ev: any, item: Node) {
  ev.dataTransfer.dropEffct = "move";
  ev.dataTransfer.effctAllowed = "move";
  ev.dataTransfer.setData(
    "item",
    JSON.stringify({ ...item, idxMove: props.idx })
  );
}
// Dispara o evento de excluir o nó
function onRemove(val: Node) {
  $emit("onRemove", val);
}
// Método ao soltar o nó
function onDrop(ev: any) {
  dragleave.value = false;
  const data = JSON.parse(ev.dataTransfer.getData("item"));
  // Dispara o evento de adicionar nó
  $emit("onAddNode", {
    parent: props,
    item: {
      ...data,
      nodeParent: props.id,
      idx: props.idx,
      isRemove: true,
    },
  });
}
// Método para adicionar um 0 antes de números menores que 9
function twoDigit(val: number) {
  return val < 9 ? `0${val}` : val;
}
// Método recursivo para o disparo das ações contidas no nó
function onAction(action: WorkflowAction) {
  // Função que faz o controle do intervalo de disparo
  delay(async () => {
    const dateTime = new Date();
    const time = `${twoDigit(dateTime.getHours())}:${twoDigit(
      dateTime.getMinutes()
    )}:${twoDigit(dateTime.getSeconds())}`;
    // Faz a consulta no endpoint para execular a ação
    const { success }: { success: boolean; data: any } = await $fetch(
      "/api/workflow/action",
      {
        method: "post",
        body: { type: action.type },
      }
    );
    // Condição que verifica se a ação foi execultada com sucesso
    if (success) {
      // Função que dispara a notificação
      notify.setMessage({
        title: `Aviso de disparo às ${time}`,
        message: `Tipo: ${action.type}`,
        status: "success",
      });
      // Percorre o array de ações bem sucedidas
      map(action.on_success, (success) => onAction(success));
    } else {
      // Função que dispara a notificação
      notify.setMessage({
        title: `Aviso de disparo às ${time}`,
        message: `Tipo: ${action.type}`,
        status: "danger",
      });
      // Percorre o array de ações ao falhar
      map(action.on_failure, (failure) => onAction(failure));
    }
  }, action.timeout);
}
// Depois que o componente for montado, executa a função recursiva de ações
onMounted(() => {
  if (props.actions) {
    map(props.actions, (action) => {
      onAction(action);
    });
  }
});
</script>

<template>
  <div
    :draggable="draggable"
    @dragstart="($event) => onStartDrag($event, props)"
    @dragleave.prevent="dragleave = false"
    @dragover.prevent="dragleave = true"
    @dragenter.prevent
    @drop="onDrop"
    class="custom-card w-72 max-h-24 flex flex-col gap-1 p-2 divide-y divide-dashed group"
  >
    <!-- Header -->
    <div class="flex gap-1">
      <!-- Ícone -->
      <div v-if="icon" class="flex-none flex">
        <i
          :class="`${icon} text-xl self-center`"
          :style="{ color: iconColor || '' }"
        ></i>
      </div>
      <!-- Título -->
      <div class="flex-1 flex justify-center">
        <div class="text-sm font-bold self-center custom-ellipsis">
          {{ title }}
        </div>
      </div>
      <!-- Botão excluir -->
      <div v-if="isRemove && !isDraggable" class="flex-none flex">
        <!-- Popover para excluir nó -->
        <EbPopover width="245px" isClick>
          <template #header>
            <div class="text-center">Realmente deseja excluir?</div>
          </template>
          <template #content="{ onClose }">
            <div class="flex justify-between">
              <button
                type="button"
                class="self-center flex gap-2 custom-animation bg-slate-200 hover:bg-slate-300 rounded-md px-4 py-1"
                @click="onClose"
              >
                <span class="self-center">Não</span>
              </button>
              <button
                type="button"
                class="self-center flex gap-2 custom-animation bg-green-500 hover:bg-green-600 text-white rounded-md px-4 py-1"
                @click="
                  ($event) => {
                    onRemove(props);
                    onClose();
                  }
                "
              >
                <span class="self-center">Sim</span>
              </button>
            </div>
          </template>
          <template #default="{ onShow }">
            <button
              id="btnDelete"
              class="custom-animation self-center w-8 h-8 bg-red-50 hover:bg-red-100 rounded-lg"
              type="button"
              @click="onShow"
            >
              <i class="text-red-600 bi bi-trash3"></i>
            </button>
          </template>
        </EbPopover>
      </div>
      <!-- Botão para arrastar -->
      <div v-if="isDraggable" class="flex-none flex">
        <button
          class="custom-animation self-center w-8 h-8 bg-slate-50 hover:bg-slate-100 rounded-lg group"
          type="button"
          @mouseover="draggable = true"
          @mouseleave="draggable = false"
        >
          <i
            class="bi bi-grip-vertical group-hover:cursor-[grab] text-xl self-center"
          ></i>
        </button>
      </div>
    </div>
    <!-- Bloco da descrisão -->
    <div
      v-if="description || (draggable && isRemove)"
      class="relative flex-1 flex flex-col pt-2"
    >
      <div class="flex gap-2">
        <!-- Botão excluir -->
        <div v-if="isRemove" class="flex-none flex">
          <!-- Popover para excluir nó -->
          <EbPopover width="245px" :isLeft="idx?.split(',')[1] === '0'" isClick>
            <template #header>
              <div class="text-center">Realmente deseja excluir?</div>
            </template>
            <template #content="{ onClose }">
              <div class="flex justify-between">
                <button
                  type="button"
                  class="self-center flex gap-2 custom-animation bg-slate-200 hover:bg-slate-300 rounded-md px-4 py-1"
                  @click="onClose"
                >
                  <span class="self-center">Não</span>
                </button>
                <button
                  type="button"
                  class="self-center flex gap-2 custom-animation bg-green-500 hover:bg-green-600 text-white rounded-md px-4 py-1"
                  @click="
                    ($event) => {
                      onRemove(props);
                      onClose();
                    }
                  "
                >
                  <span class="self-center">Sim</span>
                </button>
              </div>
            </template>
            <template #default="{ onShow }">
              <button
                id="btnDelete"
                class="custom-animation self-center w-8 h-8 bg-red-50 hover:bg-red-100 rounded-lg"
                type="button"
                @click="onShow"
              >
                <i class="text-red-600 bi bi-trash3"></i>
              </button>
            </template>
          </EbPopover>
        </div>
        <!-- Descrisão -->
        <div v-if="description" class="flex-1">
          <div
            class="text-xs font-light min-h-[32px] custom-ellipsis-two-lines"
            v-html="description"
          />
        </div>
      </div>
      <!-- Detalhe é acionado ao arrastar um bloco por cima do nó -->
      <div v-if="dragleave">
        <div class="absolute -bottom-7 w-full flex justify-center">
          <div
            class="relative w-8 h-8 after:content-[''] after:absolute after:top-2 after:left-2 after:rounded-full after:bg-blue-600 after:block after:w-4 after:h-4 before:content-[''] before:rounded-full before:backdrop-blur-sm before:bg-blue-400/10 before:block before:w-8 before:h-8"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>