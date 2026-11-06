import assert from 'node:assert/strict';
import test from 'node:test';
import {
  decodeApiFileCacheEntry,
  encodeApiFileCacheEntry,
} from '../src/utils/cache/apiFileEntry.ts';
import { hasConcurrentOverloads } from '../src/views/home/overloads.ts';

const emptyFile = {
  package: '',
  imports: [],
  structs: [],
};

test('persists the source-not-found marker with the parsed API file', () => {
  const entry = {
    file: emptyFile,
    sourceFileNotFound: true,
  };

  assert.deepEqual(
    decodeApiFileCacheEntry(encodeApiFileCacheEntry(entry)),
    entry,
  );
});

test('does not deduplicate a missing source with a valid empty source', () => {
  const missing = encodeApiFileCacheEntry({
    file: emptyFile,
    sourceFileNotFound: true,
  });
  const validEmpty = encodeApiFileCacheEntry({
    file: emptyFile,
    sourceFileNotFound: false,
  });

  assert.notDeepEqual(missing, validEmpty);
  assert.equal(decodeApiFileCacheEntry(missing).sourceFileNotFound, true);
  assert.equal(decodeApiFileCacheEntry(validEmpty).sourceFileNotFound, false);
});

test('rejects the legacy split cache record without a not-found marker', () => {
  const legacyBytes = new TextEncoder().encode(JSON.stringify(emptyFile));

  assert.throws(
    () => decodeApiFileCacheEntry(legacyBytes),
    /Cached API file entry is invalid/,
  );
});

test('does not treat signatures from different tags as overloads', () => {
  assert.equal(
    hasConcurrentOverloads([
      { members: [{ signature: '(Rect, int) -> Bitmap' }] },
      { members: [{ signature: '(Rect) -> Bitmap' }] },
      { members: [{ signature: '(Rect, Listener) -> boolean' }] },
    ]),
    false,
  );
});

test('detects overloads that coexist in one tag', () => {
  assert.equal(
    hasConcurrentOverloads([
      {
        members: [
          { signature: '(String) -> void' },
          { signature: '(String, int) -> void' },
        ],
      },
    ]),
    true,
  );
});
