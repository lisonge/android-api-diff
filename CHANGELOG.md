# What's Changed

- Bundle the Java grammar WASM in the published package and remove
  `tree-sitter-java` from runtime dependencies, avoiding its native installation
  script and approval prompt for consumers.
- Prepare the Java grammar in a Git-ignored source directory before builds,
  development startup, and the main test suite; tsdown emits the WASM asset.
- Resolve the Web Worker engine WASM through Vite's `?url` import instead of a
  hardcoded `node_modules` path, with matching Node Worker test support.
