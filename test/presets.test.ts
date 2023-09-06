import { createGenerator } from 'unocss'
import { describe, expect, test } from 'vitest'
import { presetUseful } from '../src'

describe('useful presets', () => {
  test('mutiple preset', async () => {
    const uno = createGenerator({
      presets: [
        presetUseful({
          typography: true,
          scrollbar: true,
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
        "@unocss/preset-uno",
        "unocss-preset-scrollbar",
        "unocss-preset-useful",
        "@unocss/preset-attributify",
        "@unocss/preset-typography",
      ]
    `)

    const { css } = await uno.generate('text-center prose scrollbar', { preflights: false })
    expect(css).toMatchSnapshot()
  })
})