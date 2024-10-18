import { createGenerator } from 'unocss'
import { defineUsefulConfig } from 'unocss-preset-useful'
import { describe, expect, it } from 'vitest'

describe('config tests', () => {
  it('targets', async () => {
    const unoA = createGenerator(defineUsefulConfig())
    expect(unoA.config.presets.map(p => p.name)).toEqual(
      [
        '@unocss/preset-icons',
        'unocss-preset-useful',
        '@unocss/preset-uno',
        '@unocss/preset-attributify',
      ],
    )

    const unoB = createGenerator(defineUsefulConfig({
      webFonts: true,
      icons: false,
    }, {
      presets: [{ name: 'foo' }],
    }))

    expect(unoB.config.presets.map(p => p.name)).toEqual(
      [
        'unocss-preset-useful',
        '@unocss/preset-uno',
        '@unocss/preset-web-fonts',
        'foo',
        '@unocss/preset-attributify',
      ],
    )
  })
})
