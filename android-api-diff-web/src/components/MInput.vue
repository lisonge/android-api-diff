<script setup lang="ts" generic="T extends string | number">
import { ref } from 'vue';

defineOptions({ inheritAttrs: false });
withDefaults(defineProps<{ type?: string }>(), { type: 'text' });
const model = defineModel<T>({ required: true });
const input = ref<HTMLInputElement | HTMLTextAreaElement>();

defineExpose({
  focus: (options?: FocusOptions) => input.value?.focus(options),
  blur: () => input.value?.blur(),
  select: () => input.value?.select(),
});
</script>

<template>
  <textarea
    v-if="type === 'textarea'"
    ref="input"
    v-model="model"
    class="m-input"
    v-bind="$attrs"
  />
  <input
    v-else
    ref="input"
    v-model="model"
    :type="type"
    class="m-input"
    v-bind="$attrs"
  />
</template>

<style>
@layer components {
  :where(.m-input) {
    box-sizing: border-box;
    min-width: 0;
    padding: 6px 8px;
    border: 1px solid #e5e7eb;
    border-radius: var(--control-radius);
    background: white;
    color: inherit;
    font: inherit;
    outline: none;
    transition: border-color 150ms;
  }
  :where(.m-input:hover:not(:disabled)) {
    border-color: #9ca3af;
  }
  :where(.m-input:focus) {
    border-color: #6b7280;
  }
  :where(.m-input:disabled) {
    cursor: not-allowed;
    background: #f3f4f6;
    color: #9ca3af;
  }
  :where(textarea.m-input) {
    resize: vertical;
  }
  :where(input.m-input) {
    height: var(--control-height);
    padding-block: 0;
  }
}
</style>
