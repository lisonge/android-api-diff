import { createHash } from 'node:crypto';

export const hashString = (value: string): string => {
  return createHash('sha256').update(value).digest('base64url');
};

export const hashBytes = (value: Uint8Array): string => {
  return createHash('sha256').update(value).digest('base64url');
};
