import { computed, ref, watch, type Ref } from 'vue';
import {
  renderAndroidApiCodeWithMemberCode,
  type AndroidApiQueryResult,
  type AndroidApiQueryRuntime,
} from 'android-api-diff';

export const useGeneratedCode = (
  queryResult: Ref<AndroidApiQueryResult | undefined>,
  constantExpressionKeys: AndroidApiQueryRuntime['constantExpressionKeys'],
) => {
  const renderError = ref('');
  const generationPending = ref(false);
  const generationWarning = computed(() => {
    const tags = queryResult.value?.tags ?? [];
    const failed = tags.filter((tag) => tag.status === 'error').length;
    if (!failed) return '';
    return `Code generation is unavailable: ${failed} tags could not be checked. Retry the failed queries before generating version guards.`;
  });
  const generationError = renderError;
  const generatedCodeResult = ref({ code: '', memberCode: '' });
  watch(
    queryResult,
    async (result, _previous, onCleanup) => {
      let active = true;
      onCleanup(() => {
        active = false;
      });
      generatedCodeResult.value = { code: '', memberCode: '' };
      renderError.value = '';
      generationPending.value = false;
      if (
        !result?.selection ||
        result.tags.some((tag) => tag.status === 'error')
      )
        return;
      generationPending.value = true;
      try {
        const rendered = await renderAndroidApiCodeWithMemberCode(
          result,
          constantExpressionKeys,
        );
        if (active) generatedCodeResult.value = rendered;
      } catch (error) {
        if (active)
          renderError.value =
            error instanceof Error ? error.message : String(error);
      } finally {
        if (active) generationPending.value = false;
      }
    },
    { immediate: true },
  );

  const generatedCodeText = computed(() => generatedCodeResult.value.code);

  const generatedMemberCodeText = computed(() => {
    if (queryResult.value?.resolvedTarget?.kind !== 'member') return '';
    return generatedCodeResult.value.memberCode;
  });

  return {
    generationError,
    generationWarning,
    generationPending,
    generatedCodeText,
    generatedMemberCodeText,
  };
};
