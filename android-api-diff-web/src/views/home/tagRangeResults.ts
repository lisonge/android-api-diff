export const getTagRangeResults = <T extends { tag: string }>(
  versions: readonly { tags: readonly string[] }[],
  results: readonly T[],
  loading: boolean,
): Map<string, T> => {
  const actual = new Map(results.map((result) => [result.tag, result]));
  if (!loading) return actual;
  const displayed = new Map(actual);
  for (const version of versions) {
    let previous: T | undefined;
    for (const tag of version.tags) {
      const result = actual.get(tag);
      if (result) previous = result;
      else if (previous) displayed.set(tag, previous);
    }
  }
  return displayed;
};
