import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    testTimeout: 30_000,
    name: 'unit',
    alias: {
      'unocss-preset-zyyv': fileURLToPath(new URL('./packages/core/src/index.ts', import.meta.url)),
    },
  },
})
