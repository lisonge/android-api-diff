<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  tag: string;
  diffResult: DiffResultItem | undefined;
  getTemplateUrlUrl: (tag: string) => string;
  urlBuilder: unknown;
}>();

const title = computed<string | undefined>(() => {
  const d = props.diffResult;
  if (!d) return;
  if (d.typeDesc) return d.typeDesc;
  if (d.notFound) return `Not Found File`;
  return 'No Found Prop';
});
const background = computed<string | undefined>(() => {
  const d = props.diffResult;
  if (!d) return;
  if (d.notFound) return '#00000080';
  return d.typeColor;
});
const notFound = computed(() => props.diffResult?.notFound);
</script>
<template>
  <div class="TagCard" flex gap-4px items-center>
    <div
      size-12px
      transition-colors
      :title="title"
      :style="{
        background: background,
      }"
    ></div>
    <a
      v-if="urlBuilder && !notFound"
      :href="getTemplateUrlUrl(tag)"
      target="_blank"
      transition-colors
      hover="color-[rgb(from_currentColor_r_g_b_/_50%)]"
      whitespace-nowrap
    >
      {{ tag }}
    </a>
    <a
      v-else
      whitespace-nowrap
      transition-colors
      :class="{
        'color-[#00000080]': notFound,
      }"
    >
      {{ tag }}
    </a>
  </div>
</template>
