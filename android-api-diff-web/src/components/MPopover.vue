<script setup lang="ts">
import { useElementBounding, useEventListener } from '@vueuse/core';
import type { ComponentPublicInstance } from 'vue';
import { computed, nextTick, onBeforeUnmount, ref, shallowRef } from 'vue';

defineOptions({
  inheritAttrs: false,
});

type PopoverPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'right'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left';

type StyleMap = Record<string, string | number | undefined>;
const POP_OVER_TRANSITION_MS = 140;

const props = withDefaults(
  defineProps<{
    placement?: PopoverPlacement;
    offset?: number;
    matchTriggerWidth?: boolean;
    anchor?: HTMLElement;
  }>(),
  {
    placement: 'bottom-end',
    offset: 6,
    matchTriggerWidth: false,
  },
);

const popoverId = `m-popover-${Math.random().toString(36).slice(2)}`;
const triggerRef = shallowRef<HTMLElement>();
const popoverRef = shallowRef<HTMLElement>();
const isOpen = ref(false);
const isLeaving = ref(false);
const isPopoverVisible = ref(false);
const isNativeClosing = ref(false);
let closeTaskId = 0;

const activeTrigger = computed(() => props.anchor ?? triggerRef.value);
const triggerBounds = useElementBounding(activeTrigger);
const popoverBounds = useElementBounding(popoverRef);

const clamp = (value: number, min: number, max: number) => {
  return Math.min(Math.max(value, min), Math.max(min, max));
};

const popoverStyle = computed<StyleMap>(() => {
  const offset = props.offset;
  let top = triggerBounds.bottom.value + offset;
  let left = triggerBounds.left.value;

  if (props.placement === 'bottom') {
    left =
      triggerBounds.left.value +
      (triggerBounds.width.value - popoverBounds.width.value) / 2;
  } else if (props.placement === 'bottom-end') {
    left = triggerBounds.right.value - popoverBounds.width.value;
  } else if (props.placement === 'top-start') {
    top = triggerBounds.top.value - popoverBounds.height.value - offset;
  } else if (props.placement === 'top') {
    top = triggerBounds.top.value - popoverBounds.height.value - offset;
    left =
      triggerBounds.left.value +
      (triggerBounds.width.value - popoverBounds.width.value) / 2;
  } else if (props.placement === 'top-end') {
    top = triggerBounds.top.value - popoverBounds.height.value - offset;
    left = triggerBounds.right.value - popoverBounds.width.value;
  } else if (props.placement === 'right') {
    top =
      triggerBounds.top.value +
      (triggerBounds.height.value - popoverBounds.height.value) / 2;
    left = triggerBounds.right.value + offset;
  } else if (props.placement === 'left') {
    top =
      triggerBounds.top.value +
      (triggerBounds.height.value - popoverBounds.height.value) / 2;
    left = triggerBounds.left.value - popoverBounds.width.value - offset;
  }

  const padding = 4;
  return {
    width: props.matchTriggerWidth
      ? `${triggerBounds.width.value}px`
      : undefined,
    top: `${clamp(
      top,
      padding,
      window.innerHeight - popoverBounds.height.value - padding,
    )}px`,
    left: `${clamp(
      left,
      padding,
      window.innerWidth - popoverBounds.width.value - padding,
    )}px`,
  };
});

const isPopoverRendered = computed(() => isOpen.value || isLeaving.value);

const nextFrame = () => {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => resolve());
  });
};

const waitTransition = () => {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, POP_OVER_TRANSITION_MS);
  });
};

const hideNativePopover = () => {
  const popover = popoverRef.value;
  if (!popover?.matches(':popover-open')) return;
  isNativeClosing.value = true;
  popover.hidePopover();
  isNativeClosing.value = false;
};

const updateBounds = async () => {
  await nextTick();
  triggerBounds.update();
  popoverBounds.update();
};

const linkPopover = (el: Element | ComponentPublicInstance | null) => {
  if (el instanceof HTMLElement) {
    triggerRef.value = el;
    void updateBounds();
    return;
  }

  triggerRef.value = undefined;
  void close();
};

const close = async () => {
  const closeId = ++closeTaskId;
  const popover = popoverRef.value;
  if (!popover) {
    isOpen.value = false;
    isLeaving.value = false;
    isPopoverVisible.value = false;
    return;
  }
  if (!isOpen.value && !popover.matches(':popover-open')) {
    isLeaving.value = false;
    isPopoverVisible.value = false;
    return;
  }

  isOpen.value = false;
  isLeaving.value = true;
  isPopoverVisible.value = false;
  await waitTransition();
  if (closeId !== closeTaskId) return;

  hideNativePopover();
  isLeaving.value = false;
};

const show = async () => {
  closeTaskId++;
  isLeaving.value = false;
  isPopoverVisible.value = false;
  isOpen.value = true;
  await nextTick();
  const popover = popoverRef.value;
  if (!popover) {
    isOpen.value = false;
    return;
  }
  if (!popover.matches(':popover-open')) {
    popover.showPopover(
      activeTrigger.value
        ? {
            source: activeTrigger.value,
          }
        : undefined,
    );
  }
  await updateBounds();
  await nextFrame();
  if (!isOpen.value || isLeaving.value) return;
  isPopoverVisible.value = true;
};

const toggle = () => {
  if (isOpen.value) {
    close();
    return;
  }
  void show();
};

useEventListener(popoverRef, 'toggle', (event) => {
  const isPopoverOpen =
    (event as Event & { newState?: string }).newState === 'open';
  if (isPopoverOpen) {
    void updateBounds();
    return;
  }
  if (!isNativeClosing.value && !isLeaving.value) {
    isOpen.value = false;
    isPopoverVisible.value = false;
  }
});

const isEventInPopover = (event: Event) => {
  const target = event.target;
  if (!(target instanceof Node)) return false;
  return (
    !!activeTrigger.value?.contains(target) ||
    !!popoverRef.value?.contains(target)
  );
};

useEventListener(
  window,
  'pointerdown',
  (event) => {
    if (!isOpen.value) return;
    if (isEventInPopover(event)) return;
    void close();
  },
  {
    capture: true,
  },
);

const updateOpenBounds = () => {
  if (!isOpen.value) return;
  void updateBounds();
};
useEventListener(window, 'resize', updateOpenBounds);
useEventListener(window, 'scroll', updateOpenBounds, {
  passive: true,
  capture: true,
});

onBeforeUnmount(() => {
  closeTaskId++;
  hideNativePopover();
});

defineExpose({
  close,
  show,
  toggle,
  isOpen,
});
</script>

<template>
  <slot
    name="trigger"
    :open="isOpen"
    :close="close"
    :toggle="toggle"
    :link-popover="linkPopover"
  />
  <div
    class="fixed inset-auto box-border m-0 p-0 overflow-visible border-[1px] border-solid border-gray-200 rounded-[4px] bg-white text-gray-900 shadow-[0_10px_15px_-3px_rgb(0_0_0_/_0.1),0_4px_6px_-4px_rgb(0_0_0_/_0.1)] transition-opacity duration-140 ease-out"
    v-if="isPopoverRendered"
    :id="popoverId"
    ref="popoverRef"
    v-bind="$attrs"
    popover="manual"
    :class="
      isPopoverVisible && !isLeaving
        ? 'opacity-100'
        : 'pointer-events-none opacity-0'
    "
    :style="popoverStyle"
  >
    <slot :open="isOpen" :close="close" />
  </div>
</template>
