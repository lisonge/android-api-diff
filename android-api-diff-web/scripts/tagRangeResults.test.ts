import assert from 'node:assert/strict';
import test from 'node:test';
import { getTagRangeResults } from '../src/views/home/tagRangeResults.ts';

const versions = [
  { tags: ['8_r1', '8_r2', '8_r3', '8_r4'] },
  { tags: ['8.1_r1', '8.1_r2'] },
];
test('pending ranges carry the preceding result only within the same version', () => {
  const first = { tag: '8_r1', type: 'A' };
  const results = getTagRangeResults(versions, [first], true);
  assert.equal(results.get('8_r4'), first);
  assert.equal(results.has('8.1_r1'), false);
  assert.equal(results.has('8.1_r2'), false);
  assert.deepEqual(first, { tag: '8_r1', type: 'A' });
});
test('out-of-order results replace inferred ranges without filling earlier gaps backwards', () => {
  const first = { tag: '8_r1', type: 'A' };
  const third = { tag: '8_r3', type: 'B' };
  const nextVersion = { tag: '8.1_r2', type: 'C' };
  const results = getTagRangeResults(
    versions,
    [third, first, nextVersion],
    true,
  );
  assert.equal(results.get('8_r2'), first);
  assert.equal(results.get('8_r3'), third);
  assert.equal(results.get('8_r4'), third);
  assert.equal(results.has('8.1_r1'), false);
});
test('stopped or completed queries display only actual results, including errors', () => {
  const actual = [
    { tag: '8_r1', type: 'A' },
    { tag: '8_r2', type: 'source-error' },
  ];
  assert.equal(
    getTagRangeResults(versions, actual, true).get('8_r3')?.type,
    'source-error',
  );
  assert.deepEqual(
    [...getTagRangeResults(versions, actual, false).keys()],
    ['8_r1', '8_r2'],
  );
});
