import fs from 'node:fs/promises';
import process from 'node:process';

export const getFileText = async (fileUrl: string): Promise<string> => {
  const cacheDir = process.cwd() + '/.cache/';
  if (!(await fs.access(cacheDir).catch(() => false))) {
    await fs.mkdir(cacheDir, { recursive: true });
  }
  const cachePath = cacheDir + new URL(fileUrl).pathname.split('/').at(-1)!;
  const localText = await fs.readFile(cachePath, 'utf-8').catch(() => {});
  if (localText) return localText;
  const r = await fetch(fileUrl);
  if (!r.ok) {
    throw new Error(`Failed to fetch ${fileUrl}: ${r.status} ${r.statusText}`);
  }
  const remoteText = Buffer.from(await r.text(), 'base64').toString('utf-8');
  await fs.writeFile(cachePath, remoteText, 'utf-8');
  return remoteText;
};
