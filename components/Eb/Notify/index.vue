<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useNotify } from "@/store/notify";
// Define a store
const notify = useNotify();
const { messages } = storeToRefs(notify);
// Método para remover mensagem
function onRemoveMessage(idx: number) {
  if (useIsNumber(idx)) {
    notify.removeMessage(idx);
  }
}
</script>

<template>
  <div
    data-idtest="notify"
    class="fixed top-5 right-5 z-40 flex flex-col gap-2"
  >
    <transition-group
      enter-active-class="duration-300 ease-out"
      enter-from-class="transform opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="transform opacity-0"
    >
      <template v-for="(message, i) in messages" :key="i">
        <EbNotifyMessage
          v-if="message"
          :message="message"
          :idx="i"
          @onRemoveMessage="onRemoveMessage"
        />
      </template>
    </transition-group>
  </div>
</template>