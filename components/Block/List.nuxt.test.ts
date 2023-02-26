import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import BlockList from "./List.vue";

const listaBlocos = [
  {
    id: "1",
    title: "Principal",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit.",
    icon: "bi bi-diagram-2-fill",
  },
];

describe("BlockList", () => {
  it("Deve renderizar", () => {
    const wrapper = mount(BlockList, { props: { blocks: [] } });
    expect(wrapper.find("[data-idtest='block-list']").exists()).toBeTruthy();
  });
  it("Deve renderizar a lista de blocos", () => {
    const wrapper = mount(BlockList, {
      props: {
        blocks: listaBlocos,
      },
    });
    expect(wrapper.text()).toContain(listaBlocos[0].title);
    expect(wrapper.text()).toContain(listaBlocos[0].description);
    expect(wrapper.html()).toContain(
      `<i class="${listaBlocos[0].icon} text-2xl self-center"></i>`
    );
    // Deve conter o botõa de arrastar
    expect(wrapper.find("[data-btn='drag']").exists()).toBeTruthy();
  });
});
