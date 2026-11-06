<script setup lang="ts">
import { onBeforeUnmount, watch } from 'vue';
import { useEventListener } from '@vueuse/core';
import MButton from './MButton.vue';
import MSvg from './MSvg.vue';
import { vTooltip } from './tooltip';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    title?: string;
    width?: string;
    closable?: boolean;
    closeOnBackdrop?: boolean;
    closeOnEscape?: boolean;
  }>(),
  {
    title: '',
    width: '640px',
    closable: true,
    closeOnBackdrop: true,
    closeOnEscape: true,
  },
);
const open = defineModel<boolean>({ default: false });
const emit = defineEmits<{ close: [] }>();
const close = () => {
  open.value = false;
};

let previousOverflow: string | undefined;
const lockScroll = () => {
  if (previousOverflow !== undefined) return;
  previousOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
};
const unlockScroll = () => {
  if (previousOverflow === undefined) return;
  document.body.style.overflow = previousOverflow;
  previousOverflow = undefined;
};
const afterLeave = () => {
  unlockScroll();
  emit('close');
};
watch(
  open,
  (value) => {
    if (value) lockScroll();
  },
  { immediate: true },
);
onBeforeUnmount(unlockScroll);

useEventListener(window, 'keydown', (event) => {
  if (
    open.value &&
    props.closeOnEscape &&
    event.key === 'Escape' &&
    !event.defaultPrevented
  ) {
    event.preventDefault();
    close();
  }
});
</script>

<template>
  <Teleport to="body">
    <Transition name="m-dialog" appear @after-leave="afterLeave">
      <div
        v-if="open"
        class="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/50 p-[16px]"
        @pointerdown.self="closeOnBackdrop && close()"
      >
        <div
          class="flex max-h-[calc(100dvh-32px)] max-w-full flex-col overflow-hidden rounded-[6px] border border-gray-300 bg-white text-slate-900 shadow-xl"
          :style="{ width }"
          v-bind="$attrs"
        >
          <div
            v-if="title || $slots.header || closable"
            class="flex shrink-0 items-center gap-[12px] border-b border-gray-200 px-[16px] py-[12px]"
          >
            <div class="min-w-0 flex-1">
              <slot name="header" :close="close"
                ><div class="text-[16px] font-semibold">{{ title }}</div></slot
              >
            </div>
            <MButton
              v-if="closable"
              variant="ghost"
              icon
              v-tooltip="'Close'"
              @click="close"
            >
              <MSvg name="close" class="size-[24px]" />
            </MButton>
          </div>
          <div class="min-h-0 overflow-auto p-[16px]">
            <slot :close="close" />
          </div>
          <div
            v-if="$slots.footer"
            class="shrink-0 border-t border-gray-200 px-[16px] py-[12px]"
          >
            <slot name="footer" :close="close" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style>
.m-dialog-enter-active,
.m-dialog-leave-active {
  transition: opacity 140ms ease-out;
}
.m-dialog-enter-from,
.m-dialog-leave-to {
  opacity: 0;
}
</style>
