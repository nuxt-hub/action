import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  rollup: {
    esbuild: {
      target: 'es2022',
      minify: false,
    },
    inlineDependencies: true,
    resolve: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      exportConditions: ['production', 'node'] as any,
    },
  },
  entries: [
    'src/index',
    {
      builder: 'copy',
      pattern: '*.wasm',
      input: 'node_modules/blake3-wasm/dist/wasm/nodejs',
      outDir: 'dist',
    },
  ],
  externals: [
    'node:fs/promises',
    'node:path',
    'node:util',
    'node:stream',
  ],
})
