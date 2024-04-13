import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    '.': './index.ts'
  },
  banner: {
    js: "'use client'"
  },
  format: ['cjs', 'esm'],
  external: ['react'],
  dts: true
})
