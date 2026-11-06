import assert from 'node:assert/strict';
import test from 'node:test';
import { assignSignatureColors } from '../src/views/home/signatureColors.ts';

test('distinct signatures receive distinct colors beyond the palette', () => {
  const signatures = Array.from(
    { length: 100 },
    (_, index) => `(${index}) -> void`,
  );
  assert.equal(new Set(assignSignatureColors(signatures).values()).size, 100);
});

test('each search starts from the same palette order regardless of previous searches', () => {
  const first = assignSignatureColors(['A', 'A', 'B', 'C']);
  assignSignatureColors(['X', 'Y', 'Z', 'W']);
  assert.deepEqual(assignSignatureColors(['A', 'A', 'B', 'C']), first);
  assert.deepEqual(
    [...assignSignatureColors(['X', 'Y', 'Z']).values()],
    [...first.values()],
  );
  assert.equal(assignSignatureColors(['B']).get('B'), first.get('A'));
});
