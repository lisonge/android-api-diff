interface DiffResultWithMembers {
  members?: readonly unknown[];
}

export const hasConcurrentOverloads = (
  results: readonly DiffResultWithMembers[],
): boolean => results.some((result) => (result.members?.length ?? 0) > 1);
