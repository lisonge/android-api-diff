<script setup lang="ts">
import MButton from '@/components/MButton.vue';
import MMessage from '@/components/MMessage.vue';
import MInput from '@/components/MInput.vue';
import { browserRuntime } from '@/store';
import {
  loadAndroidSourceFile,
  searchAndroidSources,
  generateAndroidApiCode,
  queryAndroidApi,
  type QueryAndroidApiOptions,
} from 'android-api-diff';
import { computed, ref } from 'vue';

type CommandName = 'search' | 'source' | 'query' | 'generate' | 'preload';

interface CommandOption {
  name: CommandName;
  label: string;
  description: string;
}

const commands: CommandOption[] = [
  {
    name: 'search',
    label: 'Search',
    description:
      'List matching sources in recommended order with target paths and kinds.',
  },
  {
    name: 'query',
    label: 'Query',
    description:
      'Inspect cross-version ranges, signatures, and source coordinates.',
  },
  {
    name: 'source',
    label: 'Source',
    description: 'Fetch one tagged source file through the local CLI cache.',
  },
  {
    name: 'generate',
    label: 'Generate',
    description: 'Generate Java hidden-API code with one command.',
  },
  {
    name: 'preload',
    label: 'Preload',
    description: 'Preload several API queries before a larger task.',
  },
];

const activeCommandName = ref<CommandName>('query');
const apiName = ref('IActivityManager.getTasks');
const apiNamesText = ref(
  ['IActivityManager.getTasks', 'ActivityThread.currentApplication'].join('\n'),
);
const sourceTag = ref('android-17.0.0_r1');
const sourcePath = ref(
  'core/java/android/accessibilityservice/AccessibilityButtonController.java',
);
const querySourcePath = ref('');
const sourceRepo = ref('platform/frameworks/base');
const querySourceRepo = ref('platform/frameworks/base');
const minSdk = ref<string | number>('35');
const loading = ref(false);
const errorText = ref('');
const resultText = ref('');
const copiedKey = ref('');

const cliInstallCommand = 'npm install --global android-api-diff@latest';
const skillInstallCommand = 'android-api-diff skill install';

const activeCommand = computed(
  () => commands.find((command) => command.name === activeCommandName.value)!,
);

const parseOptionalNumber = (
  value: string | number | null | undefined,
): number | undefined => {
  const trimmed = String(value ?? '').trim();
  if (!trimmed) return;
  const number = Number(trimmed);
  return Number.isFinite(number) ? number : undefined;
};

const getVersionOptions = () => {
  return {
    minSdk: parseOptionalNumber(minSdk.value),
  };
};

const getQueryOptions = (name = apiName.value): QueryAndroidApiOptions => ({
  input: querySourcePath.value.trim()
    ? {
        mode: 'source',
        source: {
          repo: querySourceRepo.value,
          path: querySourcePath.value.trim(),
        },
        target: name.trim() || undefined,
      }
    : { mode: 'name', text: name.trim() },
  ...getVersionOptions(),
  concurrency: 5,
});

const getPreloadApiNames = (): string[] => {
  return apiNamesText.value
    .split(/[\n,]/g)
    .map((item) => item.trim())
    .filter(Boolean);
};

const quoteArgument = (value: string): string => JSON.stringify(value.trim());

const minSdkArgument = computed(() => {
  const value = parseOptionalNumber(minSdk.value);
  return value === undefined ? '' : ` --min-sdk ${value}`;
});

const commandText = computed(() => {
  if (activeCommandName.value === 'search') {
    return `android-api-diff search ${quoteArgument(apiName.value)}`;
  }
  if (activeCommandName.value === 'source') {
    return `android-api-diff source --repo ${quoteArgument(sourceRepo.value)} --path ${quoteArgument(sourcePath.value)} --tag ${quoteArgument(sourceTag.value)}`;
  }
  if (activeCommandName.value === 'preload') {
    const names = getPreloadApiNames().map(quoteArgument).join(' ');
    return `android-api-diff preload ${names}${minSdkArgument.value}`;
  }
  const sourceArgument = querySourcePath.value.trim()
    ? ` --repo ${quoteArgument(querySourceRepo.value)} --path ${quoteArgument(querySourcePath.value)} --target ${quoteArgument(apiName.value)}`
    : ` --name ${quoteArgument(apiName.value)}`;
  return `android-api-diff ${activeCommandName.value}${minSdkArgument.value}${sourceArgument}`;
});

const formatJson = (value: unknown) => JSON.stringify(value, null, 2);

const copyText = async (key: string, value: string) => {
  await navigator.clipboard.writeText(value);
  copiedKey.value = key;
  window.setTimeout(() => {
    if (copiedKey.value === key) copiedKey.value = '';
  }, 1200);
};

const runSearchPreview = async () => ({
  text: apiName.value,
  candidates: await searchAndroidSources(browserRuntime, apiName.value),
});

const runQueryPreview = async () => {
  return queryAndroidApi(browserRuntime, getQueryOptions());
};

const runGeneratePreview = async () => {
  return generateAndroidApiCode(browserRuntime, getQueryOptions());
};

const runSourcePreview = async () => {
  return loadAndroidSourceFile(browserRuntime, sourceTag.value, {
    repo: sourceRepo.value,
    path: sourcePath.value,
  });
};

const runPreloadPreview = async () => {
  const results = [];
  for (const name of getPreloadApiNames()) {
    const result = await queryAndroidApi(browserRuntime, {
      input: { mode: 'name', text: name },
      ...getVersionOptions(),
    });
    results.push({
      apiName: name,
      checkedTags: result.summary.checkedTags,
      foundTags: result.summary.foundTags,
      rangeCount: result.summary.rangeCount,
    });
  }
  return {
    cacheDir: 'browser storage (preview only)',
    results,
  };
};

const runActiveCommand = async () => {
  errorText.value = '';
  resultText.value = '';
  loading.value = true;
  try {
    const result =
      activeCommandName.value === 'search'
        ? await runSearchPreview()
        : activeCommandName.value === 'source'
          ? await runSourcePreview()
          : activeCommandName.value === 'generate'
            ? await runGeneratePreview()
            : activeCommandName.value === 'query'
              ? await runQueryPreview()
              : await runPreloadPreview();
    const response = {
      ok: true,
      command: activeCommandName.value,
      result,
    };
    resultText.value = formatJson(response);
  } catch (error) {
    errorText.value =
      error instanceof Error
        ? error.message
        : formatJson(error ?? 'Unknown error');
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div
    class="font-github-mono min-h-[100vh] overflow-x-hidden bg-[#f8fafc] text-[#0f172a] text-[14px]"
  >
    <div
      class="max-w-[1180px] mx-auto p-[12px] md:p-[24px] flex flex-col gap-[16px]"
    >
      <header class="flex flex-wrap items-center gap-[12px]">
        <RouterLink
          class="text-black transition-colors hover:text-[rgb(from_currentColor_r_g_b_/_50%)]"
          to="/"
        >
          android-api-diff
        </RouterLink>
        <div class="h-[16px] w-[1px] bg-gray-300"></div>
        <div class="text-[20px] font-medium">CLI + Skill</div>
        <div class="flex-1"></div>
        <a
          class="text-black transition-colors hover:text-[rgb(from_currentColor_r_g_b_/_50%)]"
          href="https://github.com/lisonge/android-api-diff"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </header>

      <section>
        <div
          class="bg-white border-[1px] border-solid border-gray-200 rounded-[6px] p-[14px] min-w-0"
        >
          <div
            class="text-[12px] uppercase tracking-[1px] text-gray-500 mb-[8px]"
          >
            Install CLI
          </div>
          <div class="flex items-start gap-[8px]">
            <code class="cli-inline-code flex-1">{{ cliInstallCommand }}</code>
            <MButton
              class="flex-none"
              variant="text"
              @click="copyText('cli-install', cliInstallCommand)"
            >
              {{ copiedKey === 'cli-install' ? 'Copied' : 'Copy' }}
            </MButton>
          </div>
          <div
            class="text-[12px] uppercase tracking-[1px] text-gray-500 mt-[14px] mb-[8px]"
          >
            Install project Skill
          </div>
          <div class="flex items-start gap-[8px]">
            <code class="cli-inline-code flex-1">{{
              skillInstallCommand
            }}</code>
            <MButton
              class="flex-none"
              variant="text"
              @click="copyText('skill-install', skillInstallCommand)"
            >
              {{ copiedKey === 'skill-install' ? 'Copied' : 'Copy' }}
            </MButton>
          </div>
        </div>
      </section>

      <main
        class="grid grid-cols-1 lg:grid-cols-[340px_minmax(0,1fr)] gap-[16px]"
      >
        <section class="flex flex-col gap-[12px] min-w-0">
          <div
            class="bg-white border-[1px] border-solid border-gray-200 rounded-[6px] p-[14px]"
          >
            <div
              class="text-[12px] uppercase tracking-[1px] text-gray-500 mb-[8px]"
            >
              Command builder
            </div>
            <div class="text-[22px] leading-[28px] mb-[8px]">
              Copy one command
            </div>
            <p class="m-0 text-gray-600 leading-[20px] wrap-break-word">
              The CLI starts only for the current request. The Skill teaches
              Codex which command to choose.
            </p>
          </div>

          <div
            class="bg-white border-[1px] border-solid border-gray-200 rounded-[6px] p-[14px]"
          >
            <div
              class="text-[12px] uppercase tracking-[1px] text-gray-500 mb-[10px]"
            >
              Command
            </div>
            <div class="flex flex-col gap-[8px]">
              <MButton
                class="h-auto w-full min-w-0 text-left p-[10px] block"
                v-for="command in commands"
                :key="command.name"
                :variant="
                  activeCommandName === command.name ? 'dark' : 'default'
                "
                :aria-pressed="activeCommandName === command.name"
                @click="activeCommandName = command.name"
              >
                <div class="flex flex-wrap items-center gap-[8px] min-w-0">
                  <span class="text-[15px]">{{ command.label }}</span>
                  <code class="text-[11px] opacity-80 break-all">{{
                    command.name
                  }}</code>
                </div>
                <div
                  class="mt-[5px] text-[12px] opacity-75 leading-[16px] wrap-break-word"
                >
                  {{ command.description }}
                </div>
              </MButton>
            </div>
          </div>

          <div
            class="bg-white border-[1px] border-solid border-gray-200 rounded-[6px] p-[14px]"
          >
            <div class="flex items-center gap-[8px] mb-[8px]">
              <div
                class="text-[12px] uppercase tracking-[1px] text-gray-500 flex-1"
              >
                Shell command
              </div>
              <MButton
                class="flex-none"
                variant="text"
                @click="copyText('command', commandText)"
              >
                {{ copiedKey === 'command' ? 'Copied' : 'Copy' }}
              </MButton>
            </div>
            <pre
              class="cli-code m-0 p-[10px] rounded-[4px] bg-gray-950 text-gray-50 leading-[20px]"
            ><code>{{ commandText }}</code></pre>
          </div>
        </section>

        <section class="flex flex-col gap-[12px] min-w-0">
          <div
            class="bg-white border-[1px] border-solid border-gray-200 rounded-[6px] p-[14px]"
          >
            <div class="flex flex-wrap items-center gap-[8px] mb-[12px]">
              <div>
                <h1 class="m-0 text-[20px] font-medium">
                  {{ activeCommand.label }}
                </h1>
                <div class="text-[12px] text-blue-700 mt-[2px] break-all">
                  android-api-diff {{ activeCommand.name }}
                </div>
              </div>
              <div class="flex-1"></div>
              <MButton
                variant="primary"
                :loading="loading"
                @click="runActiveCommand"
              >
                {{ loading ? 'Running preview' : 'Run browser preview' }}
              </MButton>
            </div>

            <p class="m-[0_0_12px] text-[12px] text-gray-500 leading-[18px]">
              The preview uses the browser query core and mirrors the CLI JSON
              response shape. Copy the shell command to run the local CLI.
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-[12px]">
              <template v-if="activeCommandName === 'source'">
                <label class="flex flex-col gap-[6px]">
                  <span
                    class="text-[12px] uppercase tracking-[1px] text-gray-500"
                    >Repository</span
                  >
                  <MInput v-model="sourceRepo" type="text" />
                </label>
                <label class="flex flex-col gap-[6px]">
                  <span
                    class="text-[12px] uppercase tracking-[1px] text-gray-500"
                  >
                    Android tag
                  </span>
                  <MInput v-model="sourceTag" type="text" />
                </label>

                <label class="flex flex-col gap-[6px]">
                  <span
                    class="text-[12px] uppercase tracking-[1px] text-gray-500"
                  >
                    Source path
                  </span>
                  <MInput v-model="sourcePath" type="text" />
                </label>
              </template>

              <label
                class="flex flex-col gap-[6px]"
                v-else-if="activeCommandName !== 'preload'"
              >
                <span
                  class="text-[12px] uppercase tracking-[1px] text-gray-500"
                >
                  API name
                </span>
                <MInput v-model="apiName" type="text" />
              </label>

              <label class="flex flex-col gap-[6px]" v-else>
                <span
                  class="text-[12px] uppercase tracking-[1px] text-gray-500"
                >
                  API names
                </span>
                <MInput type="textarea" v-model="apiNamesText" rows="4" />
              </label>

              <label
                class="flex flex-col gap-[6px]"
                v-if="
                  activeCommandName === 'query' ||
                  activeCommandName === 'generate'
                "
              >
                <span class="text-[12px] uppercase tracking-[1px] text-gray-500"
                  >Repository-relative path (optional)</span
                >
                <MInput
                  v-model="querySourcePath"
                  type="text"
                  placeholder="Leave empty to query by name"
                />
              </label>

              <label
                class="flex flex-col gap-[6px]"
                v-if="
                  activeCommandName === 'query' ||
                  activeCommandName === 'generate'
                "
              >
                <span class="text-[12px] uppercase tracking-[1px] text-gray-500"
                  >Query repository</span
                >
                <MInput v-model="querySourceRepo" type="text" />
              </label>
              <label
                class="flex flex-col gap-[6px]"
                v-if="
                  activeCommandName !== 'search' &&
                  activeCommandName !== 'source'
                "
              >
                <span
                  class="text-[12px] uppercase tracking-[1px] text-gray-500"
                >
                  minSdk
                </span>
                <MInput v-model="minSdk" type="number" min="1" />
              </label>
            </div>
          </div>

          <MMessage type="error" title="Command failed" :message="errorText" />

          <div
            class="bg-white border-[1px] border-solid border-gray-200 rounded-[6px] p-[14px] min-w-0"
          >
            <div class="flex items-center gap-[8px] mb-[8px]">
              <div
                class="text-[12px] uppercase tracking-[1px] text-gray-500 flex-1"
              >
                Preview result
              </div>
              <MButton
                class="flex-none"
                v-if="resultText"
                variant="text"
                @click="copyText('result', resultText)"
              >
                {{ copiedKey === 'result' ? 'Copied' : 'Copy' }}
              </MButton>
            </div>
            <div
              class="text-gray-500 bg-gray-50 rounded-[4px] p-[12px]"
              v-if="!resultText && !loading"
            >
              Run the browser preview, or copy the command to use the CLI.
            </div>
            <div
              class="text-gray-500 bg-gray-50 rounded-[4px] p-[12px]"
              v-else-if="loading"
            >
              Fetching Android source metadata...
            </div>
            <pre
              v-else
              class="cli-code m-0 p-[10px] rounded-[4px] bg-gray-950 text-gray-50 leading-[20px]"
            ><code>{{ resultText }}</code></pre>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<style scoped>
.cli-code,
.cli-inline-code {
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  word-break: break-word;
}

.cli-inline-code {
  min-width: 0;
  color: #1f2937;
  line-height: 20px;
}
</style>
