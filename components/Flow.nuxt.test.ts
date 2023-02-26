import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Flow from "./Flow.vue";

const listaNoPricipal = [
  {
    id: "1",
    title: "Principal",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sit.",
    icon: "bi bi-diagram-2-fill",
    iconColor: "#0ea5e9",
    isRemove: false,
    nodes: [],
  },
];

const listaNoFilho = [
  {
    ...listaNoPricipal[0],
    nodes: [
      {
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
      },
    ],
  },
];

describe("Flow", () => {
  it("Deve renderizar", () => {
    const wrapper = mount(Flow, { props: { nodes: [] } });
    expect(wrapper.find("[data-idtest='flow']").exists()).toBeTruthy();
  });
  it("Deve renderizar a lista de nós", () => {
    const wrapper = mount(Flow, {
      props: {
        nodes: listaNoPricipal,
      },
    });
    expect(wrapper.text()).toContain(listaNoPricipal[0].title);
    expect(wrapper.text()).toContain(listaNoPricipal[0].description);
    expect(wrapper.html()).toContain(
      `<i class="${listaNoPricipal[0].icon} text-xl self-center" style="color: ${listaNoPricipal[0].iconColor};"></i>`
    );
    // Não deve conter botões
    expect(wrapper.findAll("button")).toEqual([]);
  });
  it("Deve renderizar a lista de nós com filho", () => {
    const wrapper = mount(Flow, {
      props: {
        nodes: listaNoFilho,
      },
    });
    expect(wrapper.text()).toContain(listaNoFilho[0].nodes[0].title);
    expect(wrapper.text()).toContain(listaNoFilho[0].nodes[0].description);
    expect(wrapper.html()).toContain(
      `<i class="${listaNoFilho[0].nodes[0].icon} text-xl self-center" style="color: ${listaNoFilho[0].nodes[0].iconColor};"></i>`
    );
    // Deve conter botões de arrastar e excluir
    expect(wrapper.find("#btnDelete").exists()).toBeTruthy();
    expect(wrapper.find("[data-btn='drag']").exists()).toBeTruthy();
  });
  it("Deve conter o popover de excluir", async () => {
    const wrapper = mount(Flow, {
      props: {
        nodes: listaNoFilho,
      },
    });

    await wrapper.find("#btnDelete").trigger("click");
    // Deve conter botões de Não e Sim
    expect(wrapper.find("[data-excluir-node='nao']").exists()).toBeTruthy();
    expect(wrapper.find("[data-excluir-node='sim']").exists()).toBeTruthy();
  });
  it("Deve excluir nó", async () => {
    const wrapper = mount(Flow, {
      props: {
        nodes: listaNoFilho,
      },
    });
    // Quantidade de nós
    expect(wrapper.findAll("[data-idtest='node']").length).toBe(2);
    await wrapper.find("#btnDelete").trigger("click");
    await wrapper.find("[data-excluir-node='sim']").trigger("click");
    // Confirmação se o nó foi excluido
    expect(wrapper.findAll("[data-idtest='node']").length).toBe(1);
  });
  it("Deve abortar a exclusão", async () => {
    const wrapper = mount(Flow, {
      props: {
        nodes: listaNoFilho,
      },
    });
    // Quantidade de nós
    expect(wrapper.findAll("[data-idtest='node']").length).toBe(2);
    await wrapper.find("#btnDelete").trigger("click");
    await wrapper.find("[data-excluir-node='nao']").trigger("click");
    // Confirmação de que não foi excluido
    expect(wrapper.findAll("[data-idtest='node']").length).toBe(2);
  });
});
