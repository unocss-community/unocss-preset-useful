import { createGenerator } from 'unocss'
import { presetUseful } from 'unocss-preset-useful'
import { describe, expect, it } from 'vitest'

describe('presetUseful extractor', async () => {
  const uno = await createGenerator({
    presets: [
      presetUseful({ preflights: false }),
    ],
  })

  it('extractor includes base64', async () => {
    const code = '<div class="bg-[url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIwAAAABJRU5ErkJggg==)]"></div>'
    const { css, matched } = await uno.generate(code)

    expect(matched.size).toBe(1)
    expect(css).toMatchInlineSnapshot(`
      "/* layer: default */
      .bg-\\[url\\(data\\:image\\/png\\;base64\\,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIwAAAABJRU5ErkJggg\\=\\=\\)\\]{--un-url:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIwAAAABJRU5ErkJggg==);background-image:var(--un-url);}"
    `)
  })
})
