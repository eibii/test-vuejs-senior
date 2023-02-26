import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
import Notify from "./index.vue";

const listaNotificacao = [
  {
    title: "Exemplo 1",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    status: "success",
  },
  {
    title: "Exemplo 2",
    message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    status: "danger",
  },
];

describe("Notify", () => {
  it("Deve renderizar", () => {
    const wrapper = mount(Notify);
    expect(wrapper.find("[data-idtest='notify']").exists()).toBeTruthy();
  });
  it("Deve renderizar a noticação", () => {
    const wrapper = mount(Notify, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn(),
            initialState: {
              notifyStore: {
                messages: listaNotificacao,
              },
            },
          }),
        ],
      },
    });
    // Verifca se renderizou a primeira notificação
    expect(wrapper.text()).toContain(listaNotificacao[0].title);
    expect(wrapper.text()).toContain(listaNotificacao[0].message);
    // Verifca se renderizou a segund notificação
    expect(wrapper.text()).toContain(listaNotificacao[1].title);
    expect(wrapper.text()).toContain(listaNotificacao[1].message);
  });
});
