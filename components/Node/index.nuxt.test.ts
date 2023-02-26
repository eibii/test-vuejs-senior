import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Node from "./index.vue";

const noPricipal = {
  id: "1",
  title: "Principal",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit.",
  icon: "bi bi-diagram-2-fill",
  iconColor: "#0ea5e9",
  isRemove: false,
  nodes: [],
};

const noFilho = {
  id: "2",
  idx: "0,0",
  nodeParent: "1",
  title: "Exemplo 1",
  description: "Aenean sagittis condimentum nisi, in eleifend felis.",
  icon: "bi bi-xbox",
  iconColor: "#84cc16",
  isRemove: true,
  isDraggable: true,
  nodes: [],
};

describe("Node", () => {
  it("Deve renderizar nó principal", () => {
    const wrapper = mount(Node, { props: noPricipal });
    expect(wrapper.find("[data-idtest='node']").exists()).toBeTruthy();
    expect(wrapper.text()).toContain(noPricipal.title);
    expect(wrapper.text()).toContain(noPricipal.description);
    expect(wrapper.html()).toContain(
      `<i class="${noPricipal.icon} text-xl self-center" style="color: ${noPricipal.iconColor};"></i>`
    );
    // Não deve conter botões
    expect(wrapper.findAll("button")).toEqual([]);
  });
  it("Deve renderizar nó filho", () => {
    const wrapper = mount(Node, {
      props: noFilho,
    });
    expect(wrapper.text()).toContain(noFilho.title);
    expect(wrapper.text()).toContain(noFilho.description);
    expect(wrapper.html()).toContain(
      `<i class="${noFilho.icon} text-xl self-center" style="color: ${noFilho.iconColor};"></i>`
    );
    // Deve conter botões de arrastar e excluir
    expect(wrapper.find("#btnDelete").exists()).toBeTruthy();
    expect(wrapper.find("[data-btn='drag']").exists()).toBeTruthy();
  });
  it("Deve conter o popover de excluir", async () => {
    const wrapper = mount(Node, {
      props: noFilho,
    });
    await wrapper.find("#btnDelete").trigger("click");
    // Deve conter botões de Não e Sim
    expect(wrapper.find("[data-excluir-node='nao']").exists()).toBeTruthy();
    expect(wrapper.find("[data-excluir-node='sim']").exists()).toBeTruthy();
  });
  it("Deve abortar a exclusão", async () => {
    const wrapper = mount(Node, {
      props: noFilho,
    });
    expect(wrapper.find("[data-idtest='popover']").html()).toContain(
      "display: none;"
    );
    await wrapper.find("#btnDelete").trigger("click");
    expect(wrapper.find("[data-idtest='popover']").text()).toContain(
      "Realmente deseja excluir?"
    );
    await wrapper.find("[data-excluir-node='nao']").trigger("click");
    expect(wrapper.find("[data-idtest='popover']").html()).toContain(
      "display: none;"
    );
  });
});
