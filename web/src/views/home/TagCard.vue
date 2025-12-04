<script setup lang="ts">
import { computed } from 'vue';
import { useSharedHomeState } from './homeState';
import { getSourceUrlWithLine } from '@/utils/url';

const props = defineProps<{
  tag: string;
  future?: boolean;
}>();

const { urlBuilder, getDiffResult } = useSharedHomeState();
const diffResult = computed(() => getDiffResult(props.tag));

const title = computed<string | undefined>(() => {
  if (props.future) {
    return 'Future Tag (Not in GitHub Releases)';
  }
  const d = diffResult.value;
  if (!d) return;
  if (d.typeDesc) return d.typeDesc;
  if (d.notFound) return `Not Found File`;
  return 'No Found Prop';
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
const tagColor = computed(() => {
  if (props.future) {
    return 'linear-gradient(90deg,rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(237, 221, 83, 1) 100%)';
  }
  return diffResult.value?.typeColor;
});
</script>
<template>
  <div class="TagCard" flex gap-4px items-center>
    <div
      size-12px
      transition-colors
      :title="title"
      :style="{
        background: tagColor,
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
      :style="{
        color: tagColor,
      }"
    >
      {{ tag }}
    </a>
  </div>
</template>
