<script lang="ts">
import { computedAsync } from '@vueuse/core';
import { computed, shallowRef, watchEffect } from 'vue';

const svgElMap = computedAsync(
  async () => (await import('@/utils/svg')).default,
  {},
);
</script>
<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name: string;
  }>(),
  {},
);

const svgEl = computed(() => svgElMap.value[props.name]);
const actualEl = shallowRef<SVGSVGElement>();
watchEffect(() => {
  if (!actualEl.value) return;
  if (!svgEl.value) return;
  actualEl.value.replaceChildren(...svgEl.value.cloneNode(true).childNodes);
});
</script>
<template>
  <svg
    v-if="svgEl"
    class="SvgIcon"
    ref="actualEl"
    :name="name"
    :viewBox="svgEl.getAttribute('viewBox') || undefined"
    :fill="svgEl.getAttribute('fill') || undefined"
    block
  ></svg>
</template>
