<script setup lang="ts">
interface Props {
  width?: string;
  height?: string;
  isClick?: boolean;
  isLeft?: boolean;
  isRight?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  width: "90px",
  height: "auto",
  isClick: false,
  isLeft: false,
  isRight: false,
});
const box = ref<any>(null);
const show = ref(false);
const screen = ref({
  width: 0,
  height: 0,
});
// Método para converter string em número
function convertStringToNumber(val: string) {
  return Number(val.replace(/[^0-9]/g, ""));
}
// Depois que o componente for montado, pega o tamanho da tela
onMounted(() => {
  screen.value = {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  };
  window.addEventListener("resize", () => {
    screen.value = {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    };
  });
});

onBeforeMount(() => {
  window.removeEventListener("resize", () => {
    screen.value = {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    };
  });
});
</script>

<template>
  <div
    data-idtest="popover"
    class="relative"
    @mouseover="isClick ? () => {} : (show = true)"
    @mouseleave="isClick ? () => {} : (show = false)"
  >
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-show="show"
        class="popover"
        :style="{
          width,
          height,
          bottom: `${box?.clientHeight + 8}px`,
          left: isLeft
            ? 0
            : isRight
            ? `${
                (convertStringToNumber(width) -
                  box?.getBoundingClientRect().width) *
                -1
              }px`
            : Number(box?.getBoundingClientRect().width / 2) +
                Number(convertStringToNumber(width) / 2) >
              box?.getBoundingClientRect().left
            ? `${Number(box?.getBoundingClientRect().left - 5) * -1}px`
            : box?.getBoundingClientRect().left +
                box?.getBoundingClientRect().width / 2 +
                Number(convertStringToNumber(width)) / 2 >
              screen.width
            ? `${
                Number(
                  Number(
                    5 +
                      box?.getBoundingClientRect().left +
                      Number(box?.getBoundingClientRect().width / 2) +
                      Number(convertStringToNumber(width) / 2) -
                      screen.width
                  ) +
                    Number(convertStringToNumber(width) / 2) -
                    Number(box?.getBoundingClientRect().width / 2)
                ) * -1
              }px`
            : `${
                Number(convertStringToNumber(width) * -1 + box?.clientWidth) / 2
              }px`,
        }"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="bag-button"
        tabindex="-1"
      >
        <!-- Hedear -->
        <div class="p-4" role="none">
          <template v-if="$slots['header']">
            <div class="uppercase text-sm font-semibold mb-2">
              <slot name="header" />
            </div>
          </template>
          <slot name="content" :onClose="() => (show = false)" />
        </div>
      </div>
    </transition>
    <!-- Conteúdo -->
    <div ref="box">
      <transition
        enter-active-class="transition ease-out duration-100"
        enter-from-class="transform opacity-0"
        enter-to-class="transform opacity-100"
        leave-active-class="transition ease-in duration-75"
        leave-from-class="transform opacity-100"
        leave-to-class="transform opacity-0"
      >
        <div v-show="show" class="arrow"></div>
      </transition>
      <slot :onShow="() => (show = true)" />
    </div>
  </div>
</template>

<style lang="sass" scoped>
@tailwind base
@tailwind components
@tailwind utilities

.popover
  @apply appearance-none origin-center absolute z-30 bottom-0 rounded-md shadow-lg shadow-slate-700/10 backdrop-blur-md bg-slate-500/5 ring-1 ring-slate-500/20 focus:outline-none

.arrow
  @apply absolute -top-2 left-2/4
  &
    width: 0
    heigth: 0

  &::after

    @apply absolute border-slate-500/30 top-full left-0
    &
      content: ' '
      margin-left: -8px
      border-width: 8px
      border-style: solid
      border-right-color: transparent
      border-bottom-color: transparent
      border-left-color: transparent
</style>