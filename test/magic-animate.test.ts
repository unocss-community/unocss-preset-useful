import type { Theme } from '@unocss/preset-mini'
import { createGenerator } from 'unocss'
import { cssObj2StrAsync, presetUseful } from 'unocss-preset-useful'
import { describe, expect, it } from 'vitest'

describe('magic in PresetUseful Theme', () => {
  it('magic animate in Uno', async () => {
    const uno = await createGenerator<Theme>({
      presets: [
        presetUseful({
          magicss: true,
          preflights: false,
        }),
      ],
    })

    const { css } = await uno.generate('animate-magic')
    expect(css).toMatchInlineSnapshot(`
      "/* layer: default */
      @keyframes magic{0% {opacity: 1;-webkit-transform-origin: 100% 200%;transform-origin: 100% 200%;-webkit-transform: scale(1, 1) rotate(0deg);transform: scale(1, 1) rotate(0deg);}100% {opacity: 0;-webkit-transform-origin: 200% 500%;transform-origin: 200% 500%;-webkit-transform: scale(0, 0) rotate(270deg);transform: scale(0, 0) rotate(270deg);}}
      .animate-magic{animation:magic 1s linear 1;animation-fill-mode:both;}"
    `)
  })

  it('postcss style stringify', async () => {
    const style = {
      '0%, 20%, 40%, 50%': { opacity: 1, transform: 'scale(1, 1) translateY(0)' },
      '10%, 30%': { opacity: 1, transform: 'scale(1.1, 1.1) translateY(0)' },
      '100%': { opacity: 0, transform: 'scale(1, 1) translateY(-900%)' },
    }

    const css = await cssObj2StrAsync(style)

    expect(`{${css}}`).toMatchInlineSnapshot(`
      "{0%, 20%, 40%, 50% {
          opacity: 1;
          transform: scale(1, 1) translateY(0)
      }
      10%, 30% {
          opacity: 1;
          transform: scale(1.1, 1.1) translateY(0)
      }
      100% {
          opacity: 0;
          transform: scale(1, 1) translateY(-900%)
      }}"
    `)
  })
})
