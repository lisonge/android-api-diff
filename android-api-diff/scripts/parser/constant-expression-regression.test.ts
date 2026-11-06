import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { getJavaConstantExpressionKeys } from '../../src/core/parser/java/constant-expression.ts';

const fixtures: { groups: string[][]; rejected: string[] } = JSON.parse(
  await readFile(
    new URL('./fixtures/constant-expressions.json', import.meta.url),
    'utf8',
  ),
);
test('Java constant expressions preserve fixed acceptance and equivalence groups', async () => {
  const sources = [...fixtures.groups.flat(), ...fixtures.rejected];
  const keys = await getJavaConstantExpressionKeys(sources);
  assert.equal(keys.length, sources.length);
  const seen = new Set<string>();
  let offset = 0;
  for (const group of fixtures.groups) {
    assert.ok(group.length > 0);
    const key = keys[offset];
    assert.notEqual(key, undefined, `accepted: ${group[0]}`);
    assert.ok(!seen.has(key!), `distinct group: ${group[0]}`);
    seen.add(key!);
    for (const source of group) {
      assert.equal(keys[offset++], key, `equivalent: ${source} / ${group[0]}`);
    }
  }
  for (const source of fixtures.rejected) {
    assert.equal(keys[offset++], undefined, `rejected: ${source}`);
  }
});
