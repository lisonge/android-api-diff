<script setup lang="ts">
import MDialog from '@/components/MDialog.vue';
import MMessage from '@/components/MMessage.vue';
import { vTooltip } from '@/components/tooltip';
import MButton from '@/components/MButton.vue';
import MInput from '@/components/MInput.vue';
import MSvg from '@/components/MSvg.vue';
import MPopconfirm from '@/components/MPopconfirm.vue';
import { estimateDesc, browserRuntime } from '@/store';
import { clearLocalCache } from '@/utils/cache';
import TagCard from '@/views/home/TagCard.vue';
import { useGeneratedCode } from './generatedCode.ts';
import { useEventListener } from '@vueuse/core';
import { computed, onMounted, ref } from 'vue';
import DiffConcurrentSelect from './DiffConcurrentSelect.vue';
import DiffResultList from './DiffResultList.vue';
import { skipNextAutoDiffOnReload, useSharedHomeState } from './homeState.ts';
import MinSdkSelect from './MinSdkSelect.vue';
import SourceLinkTargetSelect from './SourceLinkTargetSelect.vue';
import SearchSuggestions from './SearchSuggestions.vue';
import type { SourceLocation } from 'android-api-diff';

const title = document.title;
const {
  queryResult,
  errorText,
  indexError,
  handleDiff,
  isCanParsedUrl,
  searchHistory,
  sourceCandidates,
  selectSourcePath,
  searchRef,
  runDiffWithSearchHistory,
  selectSearchHistory,
  removeSearchHistory,
  stopDiff,
  androidVersionColors,
  androidVersionList,
} = useSharedHomeState();

const isSearchInputFocused = ref(false);
const searchAnchor = ref<HTMLElement>();
const isSuggestionsOpen = ref(false);
const stickyDiffResultRef = ref<HTMLElement>();
const versionColorScrollRef = ref<HTMLElement>();
const versionListScrollRef = ref<HTMLElement>();
const codeDialogOpen = ref(false);
const isDiffResultSticky = ref(false);
const isCodeCopied = ref(false);

const showSuggestions = computed(
  () =>
    isSuggestionsOpen.value && !isDiffResultSticky.value && !handleDiff.loading,
);

const handleRunDiff = async () => {
  isSuggestionsOpen.value = false;
  await runDiffWithSearchHistory();
};

const openCodeDialog = () => {
  codeDialogOpen.value = true;
};

const {
  generationError,
  generationWarning,
  generationPending,
  generatedCodeText,
  generatedMemberCodeText,
} = useGeneratedCode(queryResult, browserRuntime.constantExpressionKeys);

const handleGenerateCode = async () => {
  if (!isCanParsedUrl.value) return;
  isSuggestionsOpen.value = false;
  isCodeCopied.value = false;
  openCodeDialog();
};

const copyGeneratedCode = async () => {
  if (!generatedCodeText.value) return;
  await navigator.clipboard.writeText(generatedCodeText.value);
  isCodeCopied.value = true;
  window.setTimeout(() => {
    isCodeCopied.value = false;
  }, 1200);
};

const handleSearchInputFocus = () => {
  isSearchInputFocused.value = true;
  isSuggestionsOpen.value = true;
};

const handleSearchInputClick = () => {
  isSearchInputFocused.value = true;
  isSuggestionsOpen.value = true;
};

const handleSearchInputInput = () => {
  if (!isSearchInputFocused.value) return;
  isSuggestionsOpen.value = true;
};

const handleSearchInputBlur = () => {
  isSearchInputFocused.value = false;
};

useEventListener(window, 'pointerdown', (event) => {
  if (
    event.target instanceof Node &&
    !searchAnchor.value?.contains(event.target)
  ) {
    isSuggestionsOpen.value = false;
  }
});

const handleSelectSearchHistory = async (ref: string) => {
  isSearchInputFocused.value = false;
  isSuggestionsOpen.value = false;
  await selectSearchHistory(ref);
};

const handleSelectSource = async (source: SourceLocation) => {
  isSuggestionsOpen.value = false;
  await selectSourcePath(source);
};

const updateStickyState = () => {
  const rect = stickyDiffResultRef.value?.getBoundingClientRect();
  isDiffResultSticky.value = !!rect && rect.top <= 0;
};
onMounted(updateStickyState);
useEventListener(window, 'scroll', updateStickyState, { passive: true });
useEventListener(window, 'resize', updateStickyState);

const syncScrollLeft = (
  source: HTMLElement | undefined,
  target: HTMLElement | undefined,
) => {
  if (!source || !target || source.scrollLeft === target.scrollLeft) return;
  target.scrollLeft = source.scrollLeft;
};

const syncVersionColorScroll = () => {
  syncScrollLeft(versionColorScrollRef.value, versionListScrollRef.value);
};

const syncVersionListScroll = () => {
  syncScrollLeft(versionListScrollRef.value, versionColorScrollRef.value);
};

const handleClearLocalCache = async () => {
  await clearLocalCache();
  await new Promise((r) => setTimeout(r, 500));
  skipNextAutoDiffOnReload();
  location.reload();
};
</script>
<template>
  <div
    class="font-github-mono w-full min-w-0 p-[12px] text-[14px] flex flex-col [--gap:8px] [--android-col-w:112px]"
    :style="{
      '--android-column-count': Math.max(1, androidVersionList.length),
    }"
  >
    <div
      class="mb-[var(--gap)] flex flex-wrap items-center gap-x-[24px] gap-y-[8px]"
    >
      <div class="text-[20px] font-normal">{{ title }}</div>
      <MPopconfirm
        v-if="estimateDesc"
        title="Clear local data?"
        message="Cached diff data will be removed, then the page will reload."
        confirm-text="Clear"
        placement="bottom-start"
        @confirm="handleClearLocalCache"
      >
        <template #trigger="{ toggle, linkPopover }">
          <span :ref="linkPopover">
            <MButton
              variant="text"
              v-tooltip="'Click to clear local data'"
              @click="toggle"
            >
              <MSvg class="size-[16px]" name="database" />
              <span class="text-[14px]">{{ estimateDesc }}</span>
            </MButton>
          </span>
        </template>
      </MPopconfirm>
      <div class="flex-1"></div>
      <SourceLinkTargetSelect />
      <MinSdkSelect />
      <DiffConcurrentSelect />
      <RouterLink
        class="text-black transition-colors hover:text-[rgb(from_currentColor_r_g_b_/_50%)]"
        to="/cli"
      >
        CLI + Skill
      </RouterLink>
      <a
        class="flex items-center gap-[4px] text-black transition-colors hover:text-[rgb(from_currentColor_r_g_b_/_50%)]"
        href="https://github.com/lisonge/remap"
        target="_blank"
        rel="noopener noreferrer"
        v-tooltip="'Open remap helper tool'"
      >
        <MSvg class="size-[16px]" name="github" />
        <span class="text-[14px]">Remap</span>
      </a>
      <a
        class="flex items-center gap-[4px] text-black transition-colors hover:text-[rgb(from_currentColor_r_g_b_/_50%)]"
        href="https://github.com/lisonge/android-api-diff"
        target="_blank"
        rel="noopener noreferrer"
      >
        <MSvg class="size-[16px]" name="github" />
        <span class="text-[14px]">Diff</span>
      </a>
    </div>
    <MMessage type="error" title="Index loading failed" :message="indexError" />
    <MMessage type="error" title="Search failed" :message="errorText" />
    <div class="relative w-full min-w-0">
      <div ref="searchAnchor" class="relative min-w-0">
        <MInput
          class="w-full text-[#1c1c1c]"
          type="text"
          v-model="searchRef"
          placeholder="Class, Class.member, or file path"
          style="padding-right: 36px"
          :readonly="handleDiff.loading"
          @focus="handleSearchInputFocus"
          @click="handleSearchInputClick"
          @input="handleSearchInputInput"
          @blur="handleSearchInputBlur"
          @keyup.enter="handleRunDiff()"
          @keydown.esc="isSuggestionsOpen = false"
        />
        <SearchSuggestions
          :open="showSuggestions"
          :anchor="searchAnchor"
          :text="searchRef"
          :history="searchHistory"
          :candidates="sourceCandidates"
          @history="handleSelectSearchHistory"
          @source="handleSelectSource"
          @remove-history="removeSearchHistory"
        />
      </div>
      <MButton
        variant="ghost"
        size="sm"
        icon
        class="diff-button absolute right-[3px] top-1/2 -translate-y-1/2"
        :aria-label="handleDiff.loading ? 'Stop search' : 'Search'"
        v-tooltip="handleDiff.loading ? 'Stop search' : 'Search'"
        :aria-busy="handleDiff.loading || undefined"
        :disabled="!handleDiff.loading && !isCanParsedUrl"
        @click="handleDiff.loading ? stopDiff() : handleRunDiff()"
      >
        <template v-if="handleDiff.loading">
          <MSvg
            name="loading"
            class="size-[20px] diff-loading-icon"
            aria-hidden="true"
          />
          <MSvg
            name="stop"
            class="size-[20px] diff-stop-icon"
            aria-hidden="true"
          />
        </template>
        <MSvg
          class="size-[20px]"
          v-else
          name="arrow-right"
          aria-hidden="true"
        />
      </MButton>
    </div>
    <MDialog
      v-model="codeDialogOpen"
      title="Generated code"
      width="960px"
      @close="isCodeCopied = false"
    >
      <template #header>
        <div class="text-[16px] font-semibold">Generated code</div>
        <div class="text-[12px] text-gray-500 break-all">{{ searchRef }}</div>
      </template>
      <MMessage type="error" :message="generationError" />
      <MMessage type="warning" :message="generationWarning" />
      <MMessage
        v-if="!generatedCodeText && !generationError && !generationWarning"
        :message="
          generationPending
            ? 'Generating code...'
            : handleDiff.loading
              ? 'Waiting for loaded Android API ranges...'
              : 'Run DIFF to load Android API ranges.'
        "
      />
      <div class="relative" v-if="generatedCodeText">
        <pre class="generated-code"><code>{{ generatedCodeText }}</code></pre>
        <MButton
          variant="dark"
          icon
          class="generated-code-copy"
          :class="{ 'is-copied': isCodeCopied }"
          :aria-label="
            isCodeCopied ? 'Generated code copied' : 'Copy generated code'
          "
          v-tooltip="isCodeCopied ? 'Copied' : 'Copy generated code'"
          @click="copyGeneratedCode"
        >
          <MSvg class="size-[24px]" name="copy" />
        </MButton>
      </div>
    </MDialog>
    <div
      class="min-w-0 w-full pt-[var(--gap)] sticky top-0 z-10 bg-white"
      ref="stickyDiffResultRef"
    >
      <DiffResultList
        :copy-text="generatedMemberCodeText"
        @open-code="handleGenerateCode"
      />
      <div
        class="version-grid overflow-x-auto hidden-scrollbar"
        ref="versionColorScrollRef"
        @scroll="syncVersionColorScroll"
      >
        <div
          class="min-w-0"
          v-for="item in androidVersionList"
          :key="item.version"
        >
          <div
            class="h-[2px] w-full flex"
            :class="{
              'bg-cyan-200': !androidVersionColors[item.version].length,
            }"
          >
            <div
              class="h-full flex-1"
              v-for="bg in androidVersionColors[item.version]"
              :key="bg"
              :style="{
                background: bg,
              }"
            ></div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="version-grid mb-[var(--gap)] overflow-x-auto hidden-scrollbar"
      ref="versionListScrollRef"
      @scroll="syncVersionListScroll"
    >
      <div
        class="min-w-0 flex flex-col items-center"
        v-for="item in androidVersionList"
        :key="item.version"
      >
        <div
          class="text-[12px] leading-[16px] font-semibold flex justify-center gap-[4px]"
        >
          <div>{{ item.version }}</div>
          <div
            :class="{
              'text-[10px]': Number(item.version) >= 13,
            }"
          >
            {{ item.alias }}
          </div>
        </div>
        <div class="flex flex-col gap-[4px]">
          <TagCard v-for="tag in item.tags" :key="tag" :tag="tag" />
          <TagCard
            v-for="tag in item.futureTags"
            :key="tag"
            :tag="tag"
            future
          />
        </div>
      </div>
    </div>
    <div class="h-[80px]"></div>
  </div>
</template>

<style scoped>
.version-grid {
  display: grid;
  width: 100%;
  min-width: 0;
  grid-template-columns: repeat(
    var(--android-column-count),
    minmax(var(--android-col-w), 1fr)
  );
  column-gap: 16px;
}

.diff-stop-icon {
  display: none;
}

.diff-button:is(:hover, :focus-visible) .diff-loading-icon {
  display: none;
}

.diff-button:is(:hover, :focus-visible) .diff-stop-icon {
  display: block;
}

.generated-code-copy {
  position: absolute;
  z-index: 1;
  top: 8px;
  right: 8px;
}

.generated-code-copy.is-copied {
  color: #86efac;
}

.generated-code {
  max-height: min(600px, calc(100vh - 170px));
  margin: 0;
  overflow: auto;
  border: 1px solid #111827;
  border-radius: 4px;
  background: #111827;
  padding: 12px 48px 12px 12px;
  color: #f9fafb;
  font-size: 13px;
  line-height: 20px;
  white-space: pre;
}
</style>
