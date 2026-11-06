<script setup lang="ts">
import { computed, inject } from 'vue';
import { M_SELECT_CONTEXT_KEY, type MSelectValue } from './MSelect.context.ts';

const props = withDefaults(
  defineProps<{
    value: MSelectValue;
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  },
);

const selectContext = inject(M_SELECT_CONTEXT_KEY);

const selected = computed(() => {
  return !!selectContext?.isSelected(props.value);
});

const handleClick = () => {
  if (props.disabled) return;
  selectContext?.selectValue(props.value);
};
</script>

<template>
  <button
    class="w-full border-0 text-left [font:inherit] min-h-[28px] box-border px-[8px] py-[4px] flex items-center gap-[12px] text-[14px] leading-[20px] select-none transition-colors"
    type="button"
    :disabled="disabled"
    :aria-disabled="disabled"
    role="option"
    :aria-selected="selected"
    :class="{
      'bg-transparent': !selected,
      'cursor-pointer text-[#1c1c1c] hover:bg-gray-100': !disabled,
      'cursor-not-allowed text-gray-400': disabled,
      'bg-blue-50 text-blue-600': selected,
    }"
    @click.stop="handleClick"
  >
    <slot :selected="selected">
      <span>{{ value }}</span>
    </slot>
  </button>
</template>
