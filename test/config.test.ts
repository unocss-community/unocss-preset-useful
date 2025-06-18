import { createGenerator } from '@unocss/core'
import { defineUsefulConfig } from 'unocss-preset-useful'
import { describe, expect, it } from 'vitest'

describe('config tests', () => {
  it('targets', async () => {
    const unoA = await createGenerator(defineUsefulConfig())
    expect(unoA.config.presets.map(p => p.name).join('\n')).toMatchInlineSnapshot(
      `
      "@unocss/preset-icons
      unocss-preset-useful
      @unocss/preset-wind4
      @unocss/preset-attributify"
    `,
    )

    const unoB = await createGenerator(defineUsefulConfig({
      webFonts: true,
      icons: false,
    }, {
      presets: [{ name: 'foo' }],
    }))

    expect(unoB.config.presets.map(p => p.name).join('\n')).toMatchInlineSnapshot(`
      "unocss-preset-useful
      @unocss/preset-wind4
      @unocss/preset-web-fonts
      foo
      @unocss/preset-attributify"
    `)
  })
})
