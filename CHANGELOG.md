# What's Changed

- Consolidate parsing and querying into the published `android-api-diff` package,
  with a single library entrypoint and a separate `cli.js` executable. Legacy
  package entrypoints are removed; Node.js 26.5 or later is required.
- Add a 24-repository Android source index, exact reference and repository/path
  search, and cross-version source discovery. Download generated index data during
  builds instead of storing the full index in Git.
- Replace Java parsing and constant-expression comparison with Tree-sitter WASM,
  adopt `aidl-parser`, and move Web parsing to a Worker.
- Separate normal missing results from network, parsing, and index failures.
  Continue checking candidates after individual failures and preserve diagnostics.
  Source reads return `found` or `not-found` instead of throwing for missing files.
- Refresh Web results from available in-memory structures as input changes, reuse
  cached sources, and show incremental progress with stable signature colors.
- Simplify Web routing to `/i/...`, combine grouped file candidates with search
  history, and standardize controls, dialogs, tooltips, messages, and Tailwind styles.
- Migrate repository links to `lisonge`, upgrade to pnpm 12, update CLI Skill
  guidance, and expand parser, query, cache, package, and Web regression coverage.
- Remove built-in source-relation overrides. Special source locations and duplicate
  definitions can be resolved using explicit repository, path, and target queries.
