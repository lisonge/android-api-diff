import config from './config/repositories.json' with { type: 'json' };

export interface SourceRepository {
  repo: string;
  includePrefixes: readonly string[];
}

export const sourceRepositories: readonly SourceRepository[] =
  config.repositories;
export const excludedSourceDirectories = new RegExp(
  config.excludedDirectories.pattern,
  config.excludedDirectories.flags,
);
