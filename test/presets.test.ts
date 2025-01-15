import { createGenerator } from 'unocss'
import { presetUseful } from 'unocss-preset-useful'
import { describe, expect, it } from 'vitest'

describe('preseUseful presets', () => {
  it('mutiple preset', async () => {
    const uno = await createGenerator({
      presets: [
        presetUseful({
          typography: true,
        }),
      ],
    })
    const rawPresets = uno.config.presets
    const sortedPresets = [
      ...rawPresets.filter(p => p.enforce === 'pre'),
      ...rawPresets.filter(p => !p.enforce),
      ...rawPresets.filter(p => p.enforce === 'post'),
    ]
    expect(sortedPresets.map(i => i.name)).toMatchInlineSnapshot(`
      [
        "@unocss/preset-icons",
        "unocss-preset-useful",
        "@unocss/preset-uno",
        "@unocss/preset-attributify",
        "@unocss/preset-typography",
      ]
    `)

    const { css } = await uno.generate('text-center prose', { preflights: false })
    expect(css).toMatchSnapshot()
  })
})
