import { createGenerator, presetUno } from 'unocss'
import { describe, expect, test } from 'vitest'
import type { UsefulOptions } from 'unocss-preset-useful'
import { presetUseful } from 'unocss-preset-useful'

function generateUno(options: UsefulOptions = {}) {
  return createGenerator({
    presets: [
      presetUno(),
      presetUseful(options),
    ],
  })
}

describe('presetUseful postprocess with unColor', () => {
  const code = 'bg-red text-blue'

  test('base', async () => {
    const uno = generateUno({
      unColor: true,
    })

    const { css } = await uno.generate(code, { preflights: false })

    expect(css).toMatchSnapshot()
  })

  test('with any string', async () => {
    const uno = generateUno({
      unColor: '--test-color',
    })

    const { css } = await uno.generate(code, { preflights: false })

    expect(css).toMatchSnapshot()
  })
})
