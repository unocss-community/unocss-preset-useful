import type { ZyyvOptions } from 'unocss-preset-zyyv'
import { createGenerator } from 'unocss'
import { presetZyyv } from 'unocss-preset-zyyv'
import { describe, expect, it } from 'vitest'

async function generateUno(options: ZyyvOptions = {}) {
  return await createGenerator({
    presets: [
      presetZyyv(options),
    ],
  })
}

describe('presetZyyv preflights', () => {
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
