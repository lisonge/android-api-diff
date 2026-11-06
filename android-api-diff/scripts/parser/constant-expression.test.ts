import {
  acceptedExpressions,
  rejectedExpressions,
} from './constant-expression-fixtures.ts';
import assert from 'node:assert/strict';
import { getJavaConstantExpressionKey as key } from '../../src/core/parser/index.ts';

for (const source of acceptedExpressions) {
  assert.notEqual(await key(source), undefined, source);
}

for (const source of rejectedExpressions) {
  assert.equal(await key(source), undefined, source);
}

assert.equal(
  await key('1<<4'),
  await key(' 1 /* shift */ <<\n 4 // trailing\n'),
);
assert.equal(await key('1 + +2'), await key('1+ /* unary plus */ +2'));
assert.equal(await key('1 - -2'), await key('1- /* unary minus */ -2'));
for (const [left, right] of [
  ['16', '0x10'],
  ['16', '1 << 4'],
  ['1', '(1)'],
  ['1', '1L'],
  ["' '", "'\\t'"],
  ['"a b" == "a b"', '"ab" == "ab"'],
  ['"/*x*/" == ""', '"" == ""'],
  ['"""\na b\n""" == ""', '"""\nab\n""" == ""'],
]) {
  assert.notEqual(await key(left), undefined, left);
  assert.notEqual(await key(right), undefined, right);
  assert.notEqual(await key(left), await key(right), `${left} vs ${right}`);
}

console.log('constant expression tests passed');
