import assert from 'node:assert/strict';
import test from 'node:test';
import { queryAndroidApi } from '../../android-api-diff/src/core/query.ts';
import { getMirrorSourceUrl } from '../../android-api-diff/src/core/source/url.ts';
import {
  movedFixture,
  base,
  connectivity,
  newPath,
  t12,
} from '../../android-api-diff/scripts/fixtures.ts';
import { loadTagView } from '../src/views/home/queryView.ts';

test('Web reads each migrated source and links to its actual repository and tag', async () => {
  const { runtime } = movedFixture();
  const result = await queryAndroidApi(runtime, {
    input: {
      mode: 'source',
      source: { repo: connectivity, path: newPath },
      target: 'IConnectivityManager',
    },
  });
  assert.deepEqual(
    result.tags.map((t) => t.source?.repo),
    [base, connectivity],
  );
  for (const item of result.tags) {
    const view = await loadTagView(runtime, result, item);
    assert.equal(view.target?.name, 'IConnectivityManager');
    assert.ok(
      getMirrorSourceUrl(item.source!, item.tag).includes(
        item.source!.repo.replaceAll('/', '.'),
      ),
    );
  }
});

test('Web preserves unavailable coverage without fetching or displaying another tag definition', async () => {
  const { runtime, index } = movedFixture();
  index.repositories[0]!.tagSnapshots[0] = -2;
  const result = await queryAndroidApi(runtime, {
    input: { mode: 'name', text: 'IConnectivityManager' },
  });
  assert.equal(result.tags[0]?.status, 'error');
  const view = await loadTagView(
    {
      ...runtime,
      fetchText: async () => {
        throw new Error('must not fetch unavailable source');
      },
    },
    result,
    result.tags[0]!,
  );
  assert.equal(view.target, undefined);
  assert.deepEqual(view.file.structs, []);
  assert.equal(result.tags.find((t) => t.tag === t12)?.status, 'found');
});

test('Web keeps class context for a confirmed missing member', async () => {
  const { runtime } = movedFixture();
  const result = await queryAndroidApi(runtime, {
    input: { mode: 'name', text: 'IConnectivityManager.missing' },
  });
  const view = await loadTagView(runtime, result, result.tags[0]!);
  assert.equal(view.target?.name, 'IConnectivityManager');
  assert.deepEqual(view.members, []);
});
