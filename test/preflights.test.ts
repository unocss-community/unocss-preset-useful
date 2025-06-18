import type { UsefulOptions } from 'unocss-preset-useful'
import { createGenerator } from 'unocss'
import { presetUseful } from 'unocss-preset-useful'
import { describe, expect, it } from 'vitest'

async function generateUno(options: UsefulOptions = {}) {
  return await createGenerator({
    presets: [
      presetUseful(options),
    ],
  })
}

describe('presetUseful preflights', () => {
  it('base', async () => {
    const uno = await generateUno()
    const preflights = uno.config.preflights

    expect(preflights.map(p => p.layer)).toMatchInlineSnapshot(`
      [
        "base",
        "theme",
        "properties",
      ]
    `)
  })
})
