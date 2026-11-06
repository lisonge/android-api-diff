export class SourceExecutionError extends Error {
  readonly reason: 'network-error' | 'parse-error';
  constructor(reason: 'network-error' | 'parse-error', cause: unknown) {
    super(
      reason === 'network-error'
        ? 'Could not download source. Try again.'
        : 'Could not parse source.',
      { cause },
    );
    this.reason = reason;
  }
}
