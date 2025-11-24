<script lang="ts">
const modules: Record<string, { default: string }> = import.meta.glob(
  '@/assets/svg/*.svg',
  {
    eager: true,
    query: 'raw',
  },
);

const svgElMap = Object.fromEntries(
  Object.entries(modules).map(([k, v]) => {
    const svgName = k.split('/').at(-1)!.split('.')[0];
    const t = document.createElement('template');
    t.innerHTML = v.default;
    return [svgName, t.content.firstChild as SVGSymbolElement | null];
  }),
);
</script>
<script setup lang="ts">
import { computed, shallowRef, watchEffect } from 'vue';

const props = withDefaults(
  defineProps<{
    name: string;
  }>(),
  {},
);

const svgEl = computed(() => svgElMap[props.name]);
const actualEl = shallowRef<SVGSVGElement>();
watchEffect(() => {
  if (!actualEl.value) return;
  if (!svgEl.value) return;
  actualEl.value.replaceChildren(
    ...Array.from(svgEl.value.cloneNode(true).childNodes),
  );
});
</script>
<template>
  <svg
    v-if="svgEl"
    class="SvgIcon"
    :name="name"
    :viewBox="svgEl.getAttributeNS(null, 'viewBox') || undefined"
    :fill="svgEl.getAttribute('fill') || undefined"
    ref="actualEl"
    block
  ></svg>
</template>
