import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useNotify } from "./notify";
import { Message } from "@/types";

const notificacao: Message = {
  title: "Exemplo 1",
  message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  status: "success",
};

describe("Notify store", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("Deve inserir uma notificação", () => {
    const notify = useNotify();
    expect(notify.messages).toEqual([]);
    notify.setMessage(notificacao);
    expect(notify.messages).toEqual([notificacao]);
  });

  it("Deve excluir a mensagem", () => {
    const notify = useNotify();
    notify.setMessage(notificacao);
    notify.removeMessage(0);
    expect(notify.messages).toEqual([undefined]);
  });
});
