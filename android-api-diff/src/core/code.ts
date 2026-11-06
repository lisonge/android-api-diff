import { queryAndroidApi } from './query.ts';
import type {
  AndroidApiCodeResult,
  AndroidApiQueryRuntime,
  QueryAndroidApiOptions,
} from './model/types.ts';
import { renderAndroidApiCode } from './generation/render.ts';

export const generateAndroidApiCode = async (
  runtime: AndroidApiQueryRuntime,
  options: QueryAndroidApiOptions,
): Promise<AndroidApiCodeResult> => {
  return renderAndroidApiCode(
    await queryAndroidApi(runtime, options),
    runtime.constantExpressionKeys,
  );
};
