<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import type { SourceCandidate, SourceLocation } from 'android-api-diff';
import MPopover from '@/components/MPopover.vue';
import MButton from '@/components/MButton.vue';
import MSvg from '@/components/MSvg.vue';
import { vTooltip } from '@/components/tooltip';

const props = defineProps<{
  open: boolean;
  anchor?: HTMLElement;
  text: string;
  history: string[];
  candidates: SourceCandidate[];
}>();
const emit = defineEmits<{
  history: [text: string];
  source: [source: SourceLocation];
  removeHistory: [text: string];
}>();
const popover = ref<InstanceType<typeof MPopover>>();
const tagClass =
  'inline-flex h-[28px] min-w-0 max-w-full shrink-0 items-center justify-start gap-[4px] pl-[8px] border border-gray-200 rounded-[4px] bg-gray-50 text-[13px] leading-[20px] text-gray-700 text-left hover:bg-gray-100 hover:border-gray-400 active:bg-gray-200 cursor-pointer select-none transition-colors';
const files = computed(() =>
  props.text.trim() && props.candidates.length > 1 ? props.candidates : [],
);
const repositoryGroups = computed(() => {
  const groups = new Map<string, SourceCandidate[]>();
  for (const file of files.value) {
    const group = groups.get(file.repo);
    if (group) group.push(file);
    else groups.set(file.repo, [file]);
  }
  return Array.from(groups, ([repo, files]) => ({
    repo,
    name: repo.slice(repo.lastIndexOf('/') + 1),
    files,
  }));
});
const visible = computed(
  () => props.open && !!(props.history.length || files.value.length),
);
watch(
  visible,
  async (value) => {
    await nextTick();
    if (value && visible.value) void popover.value?.show();
    else void popover.value?.close();
  },
  { immediate: true },
);
</script>

<template>
  <MPopover
    ref="popover"
    :anchor="anchor"
    placement="bottom-start"
    match-trigger-width
  >
    <div
      class="flex flex-col gap-[8px] max-h-[min(560px,60vh)] overflow-y-auto p-[12px]"
      @mousedown.prevent
    >
      <template v-if="files.length">
        <div
          class="flex flex-wrap items-start gap-x-[16px] gap-y-[8px] shrink-0 max-h-[384px] overflow-y-auto"
        >
          <div
            v-for="group in repositoryGroups"
            :key="group.repo"
            class="min-w-0 max-w-full"
          >
            <div
              v-if="repositoryGroups.length > 1"
              class="mb-[4px] text-[12px] text-gray-500"
            >
              <span
                v-tooltip="group.repo"
                class="select-text cursor-text selection:bg-blue-200 selection:text-gray-900"
                @mousedown.stop
                >{{ group.name }}</span
              >
            </div>
            <div class="flex flex-wrap gap-[8px]">
              <MButton
                v-for="file in group.files"
                :key="file.path"
                :class="tagClass"
                class="pr-[8px]"
                @click="emit('source', file)"
              >
                <span class="min-w-0 truncate">{{ file.path }}</span>
              </MButton>
            </div>
          </div>
        </div>
      </template>
      <div
        v-if="files.length && history.length"
        class="shrink-0 border-t border-gray-200"
      />
      <template v-if="history.length">
        <div
          class="flex flex-wrap gap-[8px] shrink-0 max-h-[160px] overflow-y-auto"
        >
          <div
            v-for="item in history"
            :key="item"
            :class="tagClass"
            @click="emit('history', item)"
          >
            <span class="min-w-0 truncate">{{ item }}</span>
            <MButton
              variant="ghost"
              size="sm"
              icon
              v-tooltip="'Remove search history'"
              @click.stop="emit('removeHistory', item)"
            >
              <MSvg name="close" class="size-[16px]" />
            </MButton>
          </div>
        </div>
      </template>
    </div>
  </MPopover>
</template>
