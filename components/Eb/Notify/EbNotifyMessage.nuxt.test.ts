import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import EbNotifyMessage from "./EbNotifyMessage.vue";
import type { Message } from "@/types";

const notificacao: Message = {
  title: "Exemplo 1",
  message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  status: "success",
};

describe("EbNotifyMessage", () => {
  it("Deve renderizar", () => {
    const wrapper = mount(EbNotifyMessage, {
      props: { idx: 0, message: notificacao },
    });
    expect(
      wrapper.find("[data-idtest='notify-message']").exists()
    ).toBeTruthy();
  });
  it("Deve renderizar a noticação", () => {
    const wrapper = mount(EbNotifyMessage, {
      props: { idx: 0, message: notificacao },
    });
    expect(wrapper.text()).toContain(notificacao.title);
    expect(wrapper.text()).toContain(notificacao.message);
    // Deve conter o botõa de excluir
    expect(wrapper.find(".close").exists()).toBeTruthy();
  });
});
