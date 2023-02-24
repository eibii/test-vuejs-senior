<script setup lang="ts">
import type { Node } from "./index.vue";

interface Props {
  idx?: string;
  nodes: Node[];
}

const $emit = defineEmits(["onAddNode", "onRemove"]);
const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
  <div
    :class="[
      'relative flex',
      { 'justify-center': nodes.length <= 1 },
      {
        'justify-between': nodes.length > 1,
      },
    ]"
  >
    <template v-for="(node, i) in nodes" :key="i">
      <template v-if="node.nodes.length">
        <!-- Nó pai -->
        <div
          :class="[
            'relative flex flex-col',
            {
              'after:content-[\'\'] after:border-t-[2px] after:border-slate-900 after:h-[2px] after:block after:absolute':
                idx,
              'after:w-[50%] after:left-[50%]': i === 0 && nodes.length !== 1,
              'after:w-[100%]': i > 0 && i + 1 < nodes.length,
              'after:w-[50%]': i + 1 === nodes.length && nodes.length !== 1,
            },
          ]"
        >
          <div class="flex justify-center">
            <div class="relative">
              <div>
                <div
                  :class="[
                    'after:content-[\'\'] after:mx-auto after:bg-slate-900 after:w-[2px] after:h-4 after:block',
                    {
                      'before:content-[\'\'] before:mx-auto before:bg-slate-900 before:w-[2px] before:h-4 before:block':
                        node.nodes.length && idx,
                    },
                  ]"
                >
                  <Node
                    class="mx-2"
                    :idx="`${idx ? `${idx},${i}` : i}`"
                    :id="node.id"
                    :title="node.title"
                    :nodeParent="node?.nodeParent"
                    :icon="node?.icon"
                    :iconColor="node?.iconColor"
                    :description="node?.description"
                    :nodes="node?.nodes"
                    :actions="node?.actions"
                    :isDraggable="node?.isDraggable"
                    :isRemove="node?.isRemove"
                    @onAddNode="($event) => $emit('onAddNode', $event)"
                    @onRemove="($event) => $emit('onRemove', $event)"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- Lista de nós filhos -->
          <NodeList
            :idx="`${idx ? `${idx},${i}` : i}`"
            :nodes="node.nodes"
            @onAddNode="($event) => $emit('onAddNode', $event)"
            @onRemove="($event) => $emit('onRemove', $event)"
          />
        </div>
      </template>
      <template v-else>
        <!-- Nó filho -->
        <div
          :class="[
            'relative',
            {
              'before:content-[\'\'] before:border-t-[2px] before:border-slate-900 before:h-[2px] before:block before:absolute':
                nodes.length > 1 && idx,
              'before:w-[50%] before:right-0': i === 0,
              'before:w-[calc(50%+1px)]': i + 1 === nodes.length,
              'before:w-full': i > 0 && i + 1 < nodes.length,
            },
          ]"
        >
          <div
            :class="`${
              node?.nodeParent
                ? 'before:content-[\'\'] before:mx-auto before:bg-slate-900 before:w-[2px] before:h-4 before:block'
                : ''
            }`"
          >
            <Node
              class="mx-2"
              :idx="`${idx ? `${idx},${i}` : i}`"
              :id="node.id"
              :title="node.title"
              :nodeParent="node?.nodeParent"
              :icon="node?.icon"
              :iconColor="node?.iconColor"
              :description="node?.description"
              :nodes="node?.nodes"
              :actions="node?.actions"
              :isDraggable="node?.isDraggable"
              :isRemove="node?.isRemove"
              @onAddNode="($event) => $emit('onAddNode', $event)"
              @onRemove="($event) => $emit('onRemove', $event)"
            />
          </div>
        </div>
      </template>
    </template>
  </div>
</template>