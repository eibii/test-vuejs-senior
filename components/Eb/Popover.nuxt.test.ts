import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Popover from "./Popover.vue";

const context = {
  title: "Exemplo 1",
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed malesuada nibh tortor, nec dapibus.",
  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
};

describe("Popover", () => {
  it("Deve renderizar", () => {
    const wrapper = mount(Popover);
    expect(wrapper.find("[data-idtest='popover']").exists()).toBeTruthy();
  });
  it("Deve renderizar so conteúdos dos slots", () => {
    const wrapper = mount(Popover, {
      slots: {
        default: context.text,
        header: context.title,
        content: context.content,
      },
    });
    expect(wrapper.text()).toContain(context.title);
    expect(wrapper.text()).toContain(context.content);
    expect(wrapper.text()).toContain(context.text);
  });
});
