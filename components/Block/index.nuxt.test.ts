import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Block from "./index.vue";

const bloco = {
  id: "1",
  title: "Principal",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit.",
  icon: "bi bi-diagram-2-fill",
};

describe("Block", () => {
  const wrapper = mount(Block, { props: bloco });
  it("Deve renderizar nó principal", () => {
    expect(wrapper.find("[data-idtest='block']").exists()).toBeTruthy();
    expect(wrapper.text()).toContain(bloco.title);
    expect(wrapper.text()).toContain(bloco.description);
    expect(wrapper.html()).toContain(
      `<i class="${bloco.icon} text-2xl self-center"></i>`
    );
    // Deve conter o botõa de arrastar
    expect(wrapper.find("[data-btn='drag']").exists()).toBeTruthy();
  });
  it("Deve ativar o arastar", async () => {
    expect(wrapper.find("[data-idtest='block']").html()).toContain(
      'draggable="false"'
    );
    await wrapper.find("button").trigger("click");
    expect(wrapper.find("[data-idtest='block']").html()).toContain(
      'draggable="true"'
    );
  });
});
