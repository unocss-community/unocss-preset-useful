import { createGenerator } from '@unocss/core'
import { defineZyyvConfig } from 'unocss-preset-zyyv'
import { describe, expect, it } from 'vitest'

describe('config tests', () => {
  it('targets', async () => {
    const unoA = await createGenerator(defineZyyvConfig())
    expect(unoA.config.presets.map(p => p.name).join('\n')).toMatchInlineSnapshot(
      `
      "@unocss/preset-icons
      unocss-preset-zyyv
      @unocss/preset-wind4
      @unocss/preset-attributify"
    `,
    )

    const unoB = await createGenerator(defineZyyvConfig({
      webFonts: true,
      icons: false,
    }, {
      presets: [{ name: 'foo' }],
    }))

    expect(unoB.config.presets.map(p => p.name).join('\n')).toMatchInlineSnapshot(`
      "unocss-preset-zyyv
      @unocss/preset-wind4
      @unocss/preset-web-fonts
      foo
      @unocss/preset-attributify"
    `)
  })
})
