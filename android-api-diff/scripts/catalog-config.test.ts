import assert from 'node:assert/strict';
import test from 'node:test';
import {
  sourceRepositories,
  excludedSourceDirectories,
} from '../src/core/catalog/repositories.ts';

test('repository config retains the whitelist and directory exclusions', () => {
  assert.equal(sourceRepositories.length, 24);
  assert.equal(new Set(sourceRepositories.map((r) => r.repo)).size, 24);
  assert.ok(sourceRepositories.every((r) => r.includePrefixes.length > 0));
  assert.ok(
    sourceRepositories
      .find((r) => r.repo === 'platform/packages/modules/Connectivity')
      ?.includePrefixes.includes('framework/src/'),
  );
  for (const path of [
    'framework/tests/A.java',
    'core/testutils/B.java',
    'aidl_api/I.aidl',
  ])
    assert.ok(excludedSourceDirectories.test(path));
  assert.equal(
    excludedSourceDirectories.test('framework/src/android/net/I.aidl'),
    false,
  );
});
