<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { useEventListener } from '@vueuse/core';
import MPopover from './MPopover.vue';
import type { MTooltipOptions } from './MTooltip.types.ts';

const props = withDefaults(
  defineProps<MTooltipOptions & { target?: HTMLElement; manual?: boolean }>(),
  {
    placement: 'top',
    delay: 300,
  },
);
const wrapper = ref<HTMLElement>();
const anchor = computed(() => props.target ?? wrapper.value);
const popover = ref<InstanceType<typeof MPopover>>();
let timer: ReturnType<typeof setTimeout> | undefined;
let hovered = false;
const hide = () => {
  hovered = false;
  clearTimeout(timer);
  void popover.value?.close();
};
const show = () => {
  hovered = true;
  clearTimeout(timer);
  if (!props.text.trim()) return;
  timer = setTimeout(() => {
    void popover.value?.show();
  }, props.delay);
};
if (!props.manual) {
  useEventListener(anchor, 'pointerenter', show);
  useEventListener(anchor, 'pointerleave', hide);
  useEventListener(anchor, 'pointerdown', hide);
}
watch(
  () => props.text,
  (text) => {
    if (!text.trim()) hide();
    else if (hovered && !popover.value?.isOpen) show();
  },
);
onBeforeUnmount(() => clearTimeout(timer));
defineExpose({
  show: () => popover.value?.show(),
  close: () => popover.value?.close(),
});
</script>

<template>
  <span v-if="!target" ref="wrapper" class="inline-flex"><slot /></span>
  <MPopover
    ref="popover"
    :anchor="anchor"
    :placement="placement"
    :offset="8"
    class="m-tooltip"
  >
    {{ text }}
  </MPopover>
</template>

<style>
.m-tooltip {
  pointer-events: none;
  max-width: min(320px, calc(100vw - 8px));
  padding: 6px 8px;
  border: 0;
  border-radius: 4px;
  background: #1f2937;
  color: #f9fafb;
  font-size: 12px;
  line-height: 18px;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}
</style>
