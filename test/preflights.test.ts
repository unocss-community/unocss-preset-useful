import type { UsefulOptions } from 'unocss-preset-useful'
import { createGenerator } from 'unocss'
import { presetUseful } from 'unocss-preset-useful'
import { describe, expect, it } from 'vitest'
import { resetPreflight } from '../packages/core/src/core/preflights/reset'

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
        "useful",
        "base",
        "theme",
        "properties",
      ]
    `)
  })

  it('output reset css', async () => {
    const css = resetPreflight.getCSS({} as any) as string
    await expect(css).toMatchFileSnapshot('./fixtures/reset.css')
  })
})
