<script setup lang="ts">
import { getSourceUrl, getSourceUrlWithLine } from '@/utils/url';
import { computed } from 'vue';
import { ANDROID_PREFIX_LEN, useSharedHomeState } from './homeState.ts';

const props = defineProps<{
  tag: string;
  future?: boolean;
}>();

const {
  getDiffResult,
  getTagSource,
  getTagState,
  searchFromData,
  sourceLinkTarget,
} = useSharedHomeState();
const diffResult = computed(() => getDiffResult(props.tag));
const state = computed(() => getTagState(props.tag));

const title = computed<string | undefined>(() => {
  if (props.future) {
    return 'Future Tag (Not in GitHub Releases)';
  }
  const d = diffResult.value;
  if (!d) return state.value;
  if (d.status === 'not-found') return undefined;
  if (d.typeDesc) return d.typeDesc;
  if (d.notFound) return `Not Found File`;
  if (searchFromData.value.targetKind === 'file') return 'Found File';
  if (searchFromData.value.targetKind === 'class') {
    return d.target ? 'Found Class' : 'Not Found Class';
  }
  if (!d.target) return 'Not Found Class';
  return 'Not Found Prop';
});
const sourceUrl = computed(() => {
  const source = getTagSource(props.tag);
  if (!source) return '';
  const loc =
    searchFromData.value.targetKind === 'member'
      ? diffResult.value?.members?.[0]?.loc
      : diffResult.value?.target?.loc;
  const url = getSourceUrl(source, props.tag, sourceLinkTarget.value);
  return loc ? getSourceUrlWithLine(url, loc) : url;
});
const tagColor = computed(() => {
  if (props.future) {
    return 'linear-gradient(90deg,rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(237, 221, 83, 1) 100%)';
  }
  return (
    diffResult.value?.typeColor ??
    (state.value === 'failed' ? '#dc2626' : undefined)
  );
});

const tagName = computed(() => {
  return props.tag.substring(ANDROID_PREFIX_LEN);
});
</script>
<template>
  <div class="TagCard flex gap-[4px] items-center">
    <div
      class="tag-marker size-[12px] shrink-0"
      :class="{ 'tag-marker-loading': !future && state === 'querying' }"
      :title="title"
      :style="{
        background: tagColor || '#00000040',
      }"
    ></div>
    <a
      class="transition-colors hover:text-[rgb(from_currentColor_r_g_b_/_50%)] whitespace-nowrap"
      v-if="sourceUrl"
      :href="sourceUrl"
      target="_blank"
    >
      {{ tagName }}
    </a>
    <a
      class="whitespace-nowrap transition-colors"
      v-else
      :style="{
        color: tagColor,
      }"
    >
      {{ tagName }}
    </a>
  </div>
</template>

<style scoped>
.tag-marker {
  transition:
    background-color 200ms ease,
    opacity 200ms ease;
}

.tag-marker-loading {
  animation: tag-marker-pulse 1.4s ease-in-out 150ms infinite;
}

@keyframes tag-marker-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
