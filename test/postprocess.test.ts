import type { UsefulOptions } from 'unocss-preset-useful'
import presetLegacyCompat from '@unocss/preset-legacy-compat'
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

describe('presetUseful postprocess with unColor', () => {
  const code = 'bg-red text-blue'

  it('base', async () => {
    const uno = await generateUno({
      unColor: true,
      preflights: false,
    })

    const { css } = await uno.generate(code)

    expect(css).toMatchInlineSnapshot(`
      "/* layer: default */
      .bg-red{--un-color:248 113 113;--un-bg-opacity:1;background-color:rgb(var(--un-color) / var(--un-bg-opacity));}
      .text-blue{--un-color:96 165 250;--un-text-opacity:1;color:rgb(var(--un-color) / var(--un-text-opacity));}"
    `)
  })

  it('with any string', async () => {
    const uno = await generateUno({
      unColor: '--test-color',
      preflights: false,
    })

    const { css } = await uno.generate(code)

    expect(css).toMatchInlineSnapshot(`
      "/* layer: default */
      .bg-red{--test-color:248 113 113;--un-bg-opacity:1;background-color:rgb(var(--test-color) / var(--un-bg-opacity));}
      .text-blue{--test-color:96 165 250;--un-text-opacity:1;color:rgb(var(--test-color) / var(--un-text-opacity));}"
    `)
  })

  it('with any legacy rgba', async () => {
    const uno = await createGenerator({
      presets: [
        presetLegacyCompat({
          commaStyleColorFunction: true,
        }),
        presetUseful({
          unColor: '--test-color',
          preflights: false,
        }),
      ],
    })

    const { css } = await uno.generate(code)

    expect(css).toMatchInlineSnapshot(`
      "/* layer: default */
      .bg-red{--test-color:248, 113, 113;--un-bg-opacity:1;background-color:rgba(var(--test-color) , var(--un-bg-opacity));}
      .text-blue{--test-color:96, 165, 250;--un-text-opacity:1;color:rgba(var(--test-color) , var(--un-text-opacity));}"
    `)
  })
})

describe('presetUseful postprocess with important', () => {
  const tokens = ['bg-red', 'text-blue', '!text-xl', 'sm:text-sm!', 'important-ma']

  it('base', async () => {
    const uno = await generateUno({
      important: true,
      preflights: false,
    })

    const { css } = await uno.generate(tokens)

    expect(css).toMatchInlineSnapshot(`
      "/* layer: default */
      .important-ma{margin:auto !important;}
      .bg-red{--un-bg-opacity:1 !important;background-color:rgb(248 113 113 / var(--un-bg-opacity)) !important;}
      .\\!text-xl{font-size:1.25rem !important;line-height:1.75rem !important;}
      .text-blue{--un-text-opacity:1 !important;color:rgb(96 165 250 / var(--un-text-opacity)) !important;}
      @media (min-width: 640px){
      .sm\\:text-sm\\!{font-size:0.875rem !important;line-height:1.25rem !important;}
      }"
    `)
  })
})
