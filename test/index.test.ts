import { createGenerator, escapeSelector } from 'unocss'
import { presetZyyv } from 'unocss-preset-zyyv'
import { describe, expect, it } from 'vitest'
import { zyyvTargets } from './fixtures/index.targets'

describe('preset-zyyv', async () => {
  const uno = await createGenerator({
    presets: [
      presetZyyv(),
    ],
  })
  it('targets', async () => {
    const code = zyyvTargets.join(' ')
    const { css } = await uno.generate(code)
    const { css: css2 } = await uno.generate(code)

    const unmatched: string[] = []
    for (const i of zyyvTargets) {
      if (!css.includes(escapeSelector(i)))
        unmatched.push(i)
    }
    expect(unmatched).toEqual([])
    expect(css).toMatchSnapshot()
    expect(css).toEqual(css2)
  })
})
