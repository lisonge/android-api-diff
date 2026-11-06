import type { ApiFile, SourceLanguage } from '../model/types.ts';
import type { JavaParserAssets } from './java/tree-sitter.ts';
export type { JavaParserAssets } from './java/tree-sitter.ts';

export const parseJavaFile = async (text: string): Promise<ApiFile> =>
  (await import('./java/index.ts')).parseJavaFile(text);

export const parseAIDLFile = async (text: string): Promise<ApiFile> =>
  (await import('./aidl/index.ts')).parseAIDLFile(text);

export const initializeJavaParser = async (assets?: JavaParserAssets) =>
  (await import('./java/index.ts')).initializeJavaParser(assets);

export const getJavaConstantExpressionKeys = async (
  sources: string[],
): Promise<(string | undefined)[]> =>
  (await import('./java/constant-expression.ts')).getJavaConstantExpressionKeys(
    sources,
  );

export const getJavaConstantExpressionKey = async (
  source: string,
): Promise<string | undefined> =>
  (await getJavaConstantExpressionKeys([source]))[0];

export const parseSource = async (
  language: SourceLanguage,
  text: string,
): Promise<ApiFile> =>
  language === 'java' ? parseJavaFile(text) : parseAIDLFile(text);
