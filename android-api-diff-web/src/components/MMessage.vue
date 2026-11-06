<script setup lang="ts">
withDefaults(
  defineProps<{
    message?: string;
    title?: string;
    type?: 'info' | 'success' | 'warning' | 'error';
  }>(),
  { type: 'info' },
);

const styles = {
  info: 'border-blue-200 bg-blue-50 text-blue-800',
  success: 'border-green-200 bg-green-50 text-green-800',
  warning: 'border-amber-200 bg-amber-50 text-amber-800',
  error: 'border-red-200 bg-red-50 text-red-800',
};
</script>

<template>
  <div
    v-if="message?.trim()"
    class="rounded-[var(--control-radius)] border border-solid px-[12px] py-[10px] text-[13px]"
    :class="styles[type]"
  >
    <div v-if="title" class="mb-[4px] font-semibold">{{ title }}</div>
    <div class="whitespace-pre-wrap break-words">{{ message }}</div>
  </div>
</template>
