const palette = [
  '#1985ff',
  '#16a34a',
  '#e11d48',
  '#7c3aed',
  '#0891b2',
  '#c2410c',
  '#c026d3',
  '#4d7c0f',
  '#4338ca',
  '#0f766e',
  '#be185d',
  '#854d0e',
];

// Callers provide signatures in display order; each result starts at the first color.
export const assignSignatureColors = (
  signatures: Iterable<string>,
): ReadonlyMap<string, string> => {
  const assigned = new Map<string, string>();
  for (const signature of signatures) {
    if (assigned.has(signature)) continue;
    const index = assigned.size;
    const color =
      palette[index] ??
      `hsl(${((index - palette.length) * 137.508 + 25).toFixed(3)} 65% 42%)`;
    assigned.set(signature, color);
  }
  return assigned;
};
