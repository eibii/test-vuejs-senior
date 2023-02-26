<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import type { Message } from "@/types";

interface Props {
  idx: number;
  message: Message;
}

const emit = defineEmits(["onRemoveMessage"]);
const props = withDefaults(defineProps<Props>(), {});
let percentAnimate = ref(0);
let percentPause = ref(0);
let isPaused = ref(false);
let rAFId = ref(0);
// Função de animação da barra regressiva
function animateValue(end: number, start = 0, duration = 1000) {
  let startTimestamp: any = null;
  const step = (timestamp: any) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    percentAnimate.value = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      rAFId.value = window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}
// Dispara o evento de excluir o nó
function onRemoveMessage(idx: number) {
  emit("onRemoveMessage", idx);
}
// Observa as mudanças na porcentagem
watch(percentAnimate, (val) => {
  if (val === 100) onRemoveMessage(props.idx);
});
// Controle da porcentagem ao passar o mouse por cima da notificação, pausando a animação
watch(isPaused, (val) => {
  if (val) {
    percentPause.value = percentAnimate.value;
    window.cancelAnimationFrame(rAFId.value);
  } else {
    const duration = props.message.duration || 1000;
    const percent = props.message.percent || 100;
    const percentTimeRemaining = 100 - percentPause.value;
    const uTime = duration / 100;
    animateValue(percent, percentPause.value, uTime * percentTimeRemaining);
  }
});

onMounted(() => {
  if (props.message.autoClose) {
    animateValue(props.message.percent || 100, 0, props.message.duration);
  }
});
</script>

<template>
  <div
    data-idtest="notify-message"
    :class="`notify ${message.status}`"
    @mouseleave="isPaused = false"
    @mouseover="isPaused = true"
  >
    <div
      class="absolute bottom-0 left-0 h-1 bg-black/30 rounded-full"
      :style="{ width: `${percentAnimate}%` }"
    ></div>
    <!-- Botão de excluir -->
    <div class="absolute top-0 right-1">
      <i class="bi bi-x-circle close" @click="onRemoveMessage(idx)"></i>
    </div>
    <div class="flex gap-3">
      <!-- Ícone -->
      <div class="flex-none flex items-center text-4xl">
        <i
          :class="[
            'bi bi-exclamation-triangle',
            {
              'text-lime-900': message.status === 'success',
              'text-red-900': message.status === 'danger',
              'text-amber-900': message.status === 'warn',
              'text-sky-900': message.status === 'info',
            },
          ]"
        ></i>
      </div>
      <div class="flex-1 flex flex-col">
        <!-- Título -->
        <div class="title">{{ message.title }}</div>
        <!-- Mensagem -->
        <div class="message">
          {{ message.message }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
@tailwind base
@tailwind components
@tailwind utilities

@layer components
  .notify
    @apply relative overflow-hidden bg-lime-600/80 border-[0.5px] border-lime-600/80 rounded-lg backdrop-blur-lg w-72 p-2

    & .close
      @apply text-white/70 hover:text-white text-[14px] cursor-pointer

    & .title
      @apply text-sm font-bold text-gray-100

    & .message
      @apply text-sm
  .danger
    @apply bg-red-500/70 border-red-500/80

  .warn
    @apply bg-amber-500/70 border-amber-500/80

  .info
    @apply bg-sky-500/70 border-sky-500/80
</style>