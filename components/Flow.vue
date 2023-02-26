<script setup lang="ts">
import type { Node } from "./Node/index.vue";

interface Props {
  nodes: Node[];
}

const props = withDefaults(defineProps<Props>(), {});
// Lista de nós
const internalKnots = ref<Node[]>(
  useMap(props.nodes, (o: any) => ({ ...o, nodes: o.nodes || [] }))
);
// Método para excluir nós
function onRemove(val: Node) {
  // idxs: são os indexs onde se localiza o nó
  // Transforma a string em array de indexs
  const idxs: any = `${val?.idx}`.split(`,`);
  // Condição para verificar a profundidade dos nós
  if (idxs.length > 2) {
    let arr: any = internalKnots.value[idxs[0]];
    useMap(idxs, (idx, i: number) => {
      if (i > 0) {
        // Condição para encontrar o nó na matrix de nós
        if (i + 1 === idxs.length) {
          // Filta os nós, excluindo o nó desejado
          arr.nodes = useFilter(arr.nodes, (o, i) => {
            return `${i}` !== `${idx}`;
          });
        } else {
          arr = arr.nodes[idx];
        }
      }
    });
  } else {
    // Filta os nós, excluindo o nó desejado
    internalKnots.value[idxs[0]].nodes = useFilter(
      internalKnots.value[idxs[0]].nodes,
      (o, i) => `${i}` !== `${idxs[1]}`
    );
  }
}

// Método para adicionar nós
async function onAddNode(val: any) {
  // Flag acionada quando o nó é movimentado
  let idxMove = "";
  // idxsParent: são os indexs onde se localiza o nó do pai
  // Transforma a string em array de indexs
  const idxsParent = val.parent?.idx.split(`,`);
  // Condição para abortar o processamento quando o nó for movido para ele mesmo
  if (val.parent?.idx === val.item?.idxMove) return;
  // Condição para verificar se um nó está se movendo
  if (val.item?.idxMove) {
    idxMove = val.item?.idxMove;
    const strIdx = `idx":"${val.item?.idxMove}`;
    let str: any = JSON.stringify(useOmit(val.item, "idxMove"));
    // Modifica a propriedade idx em todos os nós abaixo do nó selecionado, atribuindo ha do nó pai
    str = str.replaceAll(strIdx, `idx":"${val.parent.idx}`);
    val.item = JSON.parse(str);
  }
  // Condição para verificar a profundidade dos nós
  if (idxsParent.length > 1) {
    let arr: any = internalKnots.value[idxsParent[0]];
    useMap(idxsParent, (idx, i: number) => {
      if (i > 0) {
        arr = arr.nodes[idx];
        // Condição para encontrar o nó na matrix de nós
        if (i + 1 === idxsParent.length) {
          const nodes = val.item.nodes || [];
          // Movimenta o nó para o nó pai selecionado
          arr.nodes = [...arr.nodes, { ...val.item, nodes }];
        }
      }
    });
  } else {
    // Movimenta o nó para o nó pai selecionado
    const nodes = val.item.nodes || [];
    internalKnots.value[idxsParent[0]].nodes = [
      ...internalKnots.value[idxsParent[0]].nodes,
      { ...val.item, nodes },
    ];
  }
  // Flag com os index do nó movindo
  if (idxMove) {
    // Remove o nó movido
    onRemove({ ...val.item, idx: idxMove });
  }
}
</script>

<template>
  <div
    data-idtest="flow"
    class="relative w-full h-full bg-repeat bg-auto overflow-x-auto"
    :style="{ backgroundImage: 'url(/svg/pattern-point.svg)' }"
  >
    <div class="absolute p-8">
      <!-- Montagem da lista de nós -->
      <NodeList
        :nodes="internalKnots"
        @onAddNode="onAddNode"
        @onRemove="onRemove"
      />
    </div>
  </div>
</template>