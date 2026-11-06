import assert from 'node:assert/strict';
import test from 'node:test';
import { effectScope, shallowRef, nextTick } from 'vue';
import { queryAndroidApi, type AndroidApiQueryResult } from 'android-api-diff';
import { movedFixture } from '../../android-api-diff/scripts/fixtures.ts';
import { useGeneratedCode } from '../src/views/home/generatedCode.ts';

test('unconfirmed tags produce a scoped generation warning with counts, not a rendering error', async () => {
  const result = await queryAndroidApi(movedFixture().runtime, {
    input: { mode: 'name', text: 'IConnectivityManager' },
  });
  result.tags[0]!.status = 'error';
  result.tags[1]!.status = 'error';
  const query = shallowRef<AndroidApiQueryResult | undefined>(result);
  const scope = effectScope();
  const state = scope.run(() => useGeneratedCode(query, undefined))!;
  try {
    assert.match(state.generationWarning.value, /2 tags could not be checked/);
    assert.equal(state.generationError.value, '');
    assert.equal(state.generationPending.value, false);
    assert.equal(state.generatedCodeText.value, '');
    query.value = undefined;
    await nextTick();
    assert.equal(state.generationWarning.value, '');
    assert.equal(state.generationError.value, '');
  } finally {
    scope.stop();
  }
});
