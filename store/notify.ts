import { defineStore } from "pinia";
import { Notify, Message } from "@/types";
import { assign, isNumber } from "lodash";

// Define a store que o Notify usa para processar a fila de notificações
export const useNotify = defineStore("notifyStore", {
  state: (): Notify => ({
    messages: [],
  }),
  getters: {
    getMessages: (state: Notify) => state.messages,
  },
  actions: {
    setMessage(payload: Message) {
      if (payload) {
        const percent = 100;
        const duration = payload.duration || 4000;
        this.messages.push(assign(payload, { percent, duration }));
      }
    },
    removeMessage(payload: number) {
      if (isNumber(payload)) {
        delete this.messages[payload];
      }
    },
  },
});
