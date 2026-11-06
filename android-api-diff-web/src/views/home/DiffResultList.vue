<script setup lang="ts">
import { vTooltip } from '@/components/tooltip';
import MButton from '@/components/MButton.vue';
import MOption from '@/components/MOption.vue';
import MSelect from '@/components/MSelect.vue';
import MSvg from '@/components/MSvg.vue';
import { useElementSize } from '@vueuse/core';
import { computed, shallowRef } from 'vue';
import { ANDROID_PREFIX_LEN, useSharedHomeState } from './homeState.ts';

const {
  androidVersionList,
  diffTypeReult,
  overloadOptions,
  showOverloadSelect,
  selectedOverloadKey,
} = useSharedHomeState();
const props = defineProps<{
  copyText?: string;
}>();
const emit = defineEmits<{
  'open-code': [];
}>();

const viewRef = shallowRef<HTMLElement>();
const { height } = useElementSize(viewRef);
const isCopied = shallowRef(false);
const ALL_OVERLOADS_VALUE = '__all_overloads__';

const selectedOverloadValue = computed({
  get: () => selectedOverloadKey.value ?? ALL_OVERLOADS_VALUE,
  set: (value: string) => {
    selectedOverloadKey.value = value === ALL_OVERLOADS_VALUE ? null : value;
  },
});
const selectedOverloadLabel = computed(() => {
  if (!selectedOverloadKey.value) {
    return `All overloads (${overloadOptions.value.length})`;
  }
  return (
    overloadOptions.value.find(
      (option) => option.key === selectedOverloadKey.value,
    )?.label ?? `All overloads (${overloadOptions.value.length})`
  );
});
const selectedOverloadDisplayLabel = computed(() => {
  const selected = selectedOverloadKey.value;
  if (!selected) return selectedOverloadLabel.value;
  const index = overloadOptions.value.findIndex(
    (option) => option.key === selected,
  );
  const option = overloadOptions.value[index];
  if (!option) return selectedOverloadLabel.value;
  if (option.parameterCount <= 2) {
    return `${index + 1}/${overloadOptions.value.length} · ${option.label}`;
  }
  const methodName = option.label.substring(0, option.label.indexOf('('));
  return `${index + 1}/${overloadOptions.value.length} · ${methodName}(${option.parameterCount} args)`;
});

const getTagRangeDesc = (range: string[]): string => {
  if (range.length === 1) return range[0].substring(ANDROID_PREFIX_LEN);
  let st = range[0];
  let ed = range.at(-1)!;
  const bigSt = androidVersionList.value.find((v) => v.tags[0] === st)?.version;
  const bigEd = androidVersionList.value.find(
    (v) => v.tags.at(-1) === ed,
  )?.version;
  st = st.substring(ANDROID_PREFIX_LEN);
  ed = ed.substring(ANDROID_PREFIX_LEN);
  if (bigSt || bigEd) {
    if (bigSt && bigEd && bigSt === bigEd) return bigSt;
    return `${bigSt ?? st} - ${bigEd ?? ed}`;
  }
  return `${st} - ${ed}`;
};

const copyMemberCode = async () => {
  if (!props.copyText) return;
  await navigator.clipboard.writeText(props.copyText);
  isCopied.value = true;
  window.setTimeout(() => {
    isCopied.value = false;
  }, 1200);
};
</script>
<template>
  <div
    ref="wrapRef"
    class="w-full min-w-0 overflow-hidden transition-[height] duration-500"
    :style="{ height: height && `calc(${height}px + var(--gap))` }"
  >
    <div
      class="flex items-start gap-[8px]"
      v-if="diffTypeReult.length"
      ref="viewRef"
    >
      <div class="flex flex-1 min-w-0 flex-col gap-[6px]">
        <MSelect
          v-if="showOverloadSelect"
          v-model="selectedOverloadValue"
          class="overload-select"
          match-popover-width
          trigger-min-width="0"
        >
          <template #value>
            <span
              class="block max-w-[520px] overflow-hidden text-ellipsis whitespace-nowrap"
              v-tooltip="selectedOverloadLabel"
            >
              {{ selectedOverloadDisplayLabel }}
            </span>
          </template>
          <MOption :value="ALL_OVERLOADS_VALUE">
            <span>All overloads ({{ overloadOptions.length }})</span>
          </MOption>
          <MOption
            v-for="option in overloadOptions"
            :key="option.key"
            :value="option.key"
          >
            <code class="overload-option-label">{{ option.label }}</code>
          </MOption>
        </MSelect>
        <div class="flex flex-wrap gap-y-[4px] gap-x-[24px]">
          <div
            class="flex min-w-0 max-w-full flex-wrap gap-[8px] items-center leading-[20px]"
            v-for="item in diffTypeReult"
            :key="`${item.typeColor}:${item.typeDesc}`"
          >
            <div
              class="size-[16px] shrink-0"
              :style="{ background: item.typeColor }"
            ></div>
            <div
              class="min-w-0 max-w-full font-medium bg-gray-200 px-[4px] rounded-[4px] whitespace-pre-wrap [overflow-wrap:anywhere]"
              v-if="item.typeDesc"
            >
              {{ item.typeDesc }}
            </div>
            <div class="flex gap-[8px] flex-wrap">
              <div
                class="px-[4px] bg-gray-100 rounded-[4px]"
                v-for="range in item.tagRanges"
                :key="range[0]"
              >
                {{ getTagRangeDesc(range) }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-none items-center gap-[4px]" v-if="copyText">
        <MButton
          variant="ghost"
          class="size-[20px]"
          icon
          :aria-label="isCopied ? 'Member code copied' : 'Copy member code'"
          v-tooltip="isCopied ? 'Copied' : 'Copy member code'"
          @click="copyMemberCode"
        >
          <MSvg class="size-[20px]" name="copy" />
        </MButton>
        <MButton
          variant="ghost"
          class="size-[20px]"
          icon
          aria-label="Open generated code"
          v-tooltip="'Open generated code'"
          @click="emit('open-code')"
        >
          <MSvg class="size-[20px]" name="code" />
        </MButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.overload-select {
  width: 100%;
}

.overload-select :deep([role='button']) {
  min-width: 0;
  flex: 1;
}

.overload-select :deep([role='button'] > span) {
  min-width: 0;
}

.overload-option-label {
  min-width: 0;
  flex: 1;
  overflow-wrap: anywhere;
}
</style>
