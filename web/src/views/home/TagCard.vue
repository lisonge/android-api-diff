<script setup lang="ts">
import { computed } from 'vue';
import { useSharedHomeState } from './homeState';
import { getSourceUrlWithLine } from '@/utils/url';

const props = defineProps<{
  tag: string;
}>();

const { urlBuilder, getDiffResult } = useSharedHomeState();
const diffResult = computed(() => getDiffResult(props.tag));

const title = computed<string | undefined>(() => {
  const d = diffResult.value;
  if (!d) return;
  if (d.typeDesc) return d.typeDesc;
  if (d.notFound) return `Not Found File`;
  return 'No Found Prop';
});
const background = computed<string | undefined>(() => {
  const d = diffResult.value;
  if (!d) return;
  if (d.notFound) return '#00000080';
  return d.typeColor;
});
const notFound = computed(() => diffResult.value?.notFound);
const sourceUrl = computed<string | undefined>(() => {
  const t = urlBuilder.value?.templateUrl;
  if (!t) return '';
  const u = t[0] + props.tag + t[1];
  const loc = diffResult.value?.members?.[0]?.loc;
  if (loc) {
    return getSourceUrlWithLine(u, loc);
  }
  return u;
});
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
      :href="sourceUrl"
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
