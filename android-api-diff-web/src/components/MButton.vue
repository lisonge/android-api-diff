<script setup lang="ts">
import { ref } from 'vue';

withDefaults(
  defineProps<{
    type?: 'button' | 'submit' | 'reset';
    variant?: 'default' | 'primary' | 'danger' | 'text' | 'ghost' | 'dark';
    size?: 'sm' | 'md';
    icon?: boolean;
    disabled?: boolean;
    loading?: boolean;
  }>(),
  {
    type: 'button',
    variant: 'default',
    size: 'md',
    icon: false,
    disabled: false,
    loading: false,
  },
);
const button = ref<HTMLButtonElement>();
defineExpose({
  focus: (options?: FocusOptions) => button.value?.focus(options),
  blur: () => button.value?.blur(),
});
</script>

<template>
  <button
    ref="button"
    :type="type"
    class="m-button"
    :data-variant="variant"
    :data-size="size"
    :data-icon="icon || undefined"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
  >
    <slot />
  </button>
</template>

<style>
@layer components {
  :where(.m-button) {
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    height: var(--control-height);
    padding: 0 12px;
    border: 1px solid #e5e7eb;
    border-radius: var(--control-radius);
    background: white;
    color: #374151;
    font: inherit;
    cursor: pointer;
    user-select: none;
    transition:
      color 150ms,
      background-color 150ms,
      border-color 150ms;
  }
  :where(.m-button:hover:not(:disabled)) {
    background: #f3f4f6;
  }
  :where(.m-button:active:not(:disabled)) {
    background: #e5e7eb;
  }
  :where(.m-button:focus-visible) {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
  :where(.m-button[data-variant='primary']) {
    background: #dbeafe;
    border-color: transparent;
    color: #111827;
  }
  :where(.m-button[data-variant='primary']:hover:not(:disabled)) {
    background: #bfdbfe;
  }
  :where(.m-button[data-variant='primary']:active:not(:disabled)) {
    background: #93c5fd;
  }
  :where(.m-button[data-variant='danger']) {
    background: #ef4444;
    border-color: transparent;
    color: white;
  }
  :where(.m-button[data-variant='danger']:hover:not(:disabled)) {
    background: #dc2626;
  }
  :where(.m-button[data-variant='danger']:active:not(:disabled)) {
    background: #b91c1c;
  }
  :where(.m-button[data-variant='ghost'], .m-button[data-variant='text']) {
    border: 0;
    background: transparent;
    color: #6b7280;
  }
  :where(.m-button[data-variant='ghost']:hover:not(:disabled)) {
    background: #f3f4f6;
    color: #111827;
  }
  :where(.m-button[data-variant='ghost']:active:not(:disabled)) {
    background: #e5e7eb;
  }
  :where(.m-button[data-variant='text']) {
    padding: 0;
  }
  :where(
    .m-button[data-variant='text']:hover:not(:disabled),
    .m-button[data-variant='text']:active:not(:disabled)
  ) {
    background: transparent;
    color: #111827;
  }
  :where(.m-button[data-variant='dark']) {
    background: #1f2937;
    border-color: transparent;
    color: #f9fafb;
  }
  :where(.m-button[data-variant='dark']:hover:not(:disabled)) {
    background: #374151;
  }
  :where(.m-button[data-variant='dark']:active:not(:disabled)) {
    background: #4b5563;
  }
  :where(.m-button[data-size='sm']) {
    height: var(--control-height-sm);
    padding: 0 10px;
    font-size: 12px;
  }
  :where(.m-button[data-icon]) {
    width: var(--control-height);
    padding: 0;
    flex: none;
  }
  :where(.m-button[data-icon][data-size='sm']) {
    width: var(--control-height-sm);
  }
  :where(.m-button:disabled) {
    cursor: not-allowed;
    opacity: 0.5;
  }
  :where(.m-button[aria-busy='true']) {
    cursor: wait;
  }
}
</style>
