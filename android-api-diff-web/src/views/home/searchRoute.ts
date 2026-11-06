import type { SearchInput } from 'android-api-diff';

export const readSearchRoute = (pathMatch?: string | string[]) => {
  const text = Array.isArray(pathMatch)
    ? pathMatch.join('/')
    : (pathMatch ?? '');
  const input: SearchInput = { mode: 'name', text };
  return { text, input };
};

export const searchLocation = (text: string) => ({
  path: text ? `/i/${encodeURIComponent(text)}` : '/',
});
