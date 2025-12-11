import { defineConfig } from 'unocss'
import { presetZyyv } from 'unocss-preset-zyyv'

// Just for Vscode Extension

export default defineConfig({
  presets: [
    presetZyyv({
      typography: true,
      magicss: true,
    }),
  ],
})
