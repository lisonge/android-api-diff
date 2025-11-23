export {};

declare global {
  // https://github.com/oven-sh/bun/pull/18034/files
  interface Uint8Array {
    /**
     * Convert the Uint8Array to a base64 encoded string
     * @returns The base64 encoded string representation of the Uint8Array
     */
    toBase64(options?: {
      alphabet?: 'base64' | 'base64url';
      omitPadding?: boolean;
    }): string;

    /**
     * Set the contents of the Uint8Array from a base64 encoded string
     * @param base64 The base64 encoded string to decode into the array
     * @param offset Optional starting index to begin setting the decoded bytes (default: 0)
     */
    setFromBase64(base64: string, offset?: number): void;
  }

  interface Uint8ArrayConstructor {
    /**
     * Create a new Uint8Array from a base64 encoded string
     * @param base64 The base64 encoded string to convert to a Uint8Array
     * @returns A new Uint8Array containing the decoded data
     */
    fromBase64(base64: string): Uint8Array;
  }
}
