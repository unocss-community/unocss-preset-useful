import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    testTimeout: 30_000,
    name: 'unit',
    projects: [
      'vitest.config.ts',
    ],
  },
})
