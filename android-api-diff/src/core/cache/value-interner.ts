export interface ContentValueInterner<T> {
  get(contentHash: string): T | undefined;
  intern(contentHash: string, value: T): T;
  clear(): void;
}

export class BoundedContentValueInterner<T> implements ContentValueInterner<T> {
  private readonly maxEntries: number;
  private readonly values = new Map<string, T>();

  constructor(maxEntries: number) {
    if (!Number.isSafeInteger(maxEntries) || maxEntries < 1) {
      throw new RangeError('Content value interner size must be positive');
    }
    this.maxEntries = maxEntries;
  }

  get(contentHash: string): T | undefined {
    const value = this.values.get(contentHash);
    if (value === undefined) return;
    this.values.delete(contentHash);
    this.values.set(contentHash, value);
    return value;
  }

  intern(contentHash: string, value: T): T {
    const current = this.get(contentHash);
    if (current !== undefined) return current;

    this.values.set(contentHash, value);
    if (this.values.size > this.maxEntries) {
      const oldestKey = this.values.keys().next().value;
      if (oldestKey !== undefined) this.values.delete(oldestKey);
    }
    return value;
  }

  clear(): void {
    this.values.clear();
  }
}
