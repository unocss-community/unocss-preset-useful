import type { UsefulExtends, UsefulTheme } from '../packages/core/src/types'
import { createGenerator } from 'unocss'
import { animationRegExp, presetUseful } from 'unocss-preset-useful'
import { describe, expect, it } from 'vitest'

describe('presetUseful theme', () => {
  const extend: UsefulExtends = {
    animation: {
      'spin': 'spin 1s linear infinite',
      'bounce': 'bounce 2s ease-in-out 3',
      'fade': 'fade 1s ease-in-out 3',
      'foo': 'foo 1s * 3',
      'bar': 'bar 1s +',
      'wiggle-slow': 'wiggle 1s ease-in-out infinite',
      // timfing function
      'line': 'test-line 1s linear(0, 0.25 25% 75%, 1) infinite',
      'ease': 'test-ease 1s cubic-bezier(0.1, 0.7, 1, 0.1) infinite',
    },
    keyframes: {
      wiggle: {
        '0%, 100%': { transform: 'rotate(-3deg)' },
        '50%': { transform: 'rotate(3deg)' },
        '20%, 30%': { transform: 'rotate(-3deg)' },
        '80%': { transform: 'rotate(3deg)' },
      },
    },
  }

  it('theme extend configuration', async () => {
    const _uno = await createGenerator<UsefulTheme>({
      presets: [
        presetUseful({
          shortcuts: false,
          wind3: true,
          theme: {
            extend,
          },
        }),
      ],
    })
    const { css } = await _uno.generate('animate-wiggle-slow', { preflights: false })

    expect(_uno.config.theme.animation).toMatchSnapshot()
    expect(css).toMatchInlineSnapshot(`""`)
  })
})

const animation = [
  {
    case: 'spin 1s linear infinite',
    result: ['spin', '1s', 'linear', 'infinite'],
  },
  {
    case: 'bounce 2s ease-in-out 3',
    result: ['bounce', '2s', 'ease-in-out', '3'],
  },
  {
    case: 'fade 1s ease-in-out 3',
    result: ['fade', '1s', 'ease-in-out', '3'],
  },
  {
    case: 'foo 1s * 3',
    result: ['foo', '1s', '*', '3'],
  },
  {
    case: 'bar 1s +',
    result: ['bar', '1s', '+', undefined],
  },
  {
    case: 'wiggle 1s ease-in-out infinite',
    result: ['wiggle', '1s', 'ease-in-out', 'infinite'],
  },
  // timfing function
  {
    case: 'test-line 1s linear(0, 0.25 25% 75%, 1) infinite',
    result: ['test-line', '1s', 'linear(0, 0.25 25% 75%, 1)', 'infinite'],
  },
  {
    case: 'test-ease 1s cubic-bezier(0.1, 0.7, 1, 0.1) infinite',
    result: ['test-ease', '1s', 'cubic-bezier(0.1, 0.7, 1, 0.1)', 'infinite'],
  },
]

describe('resolveAnimation', () => {
  it.each(animation)('resolve %s', ({ case: k, result }) => {
    const match = k.match(animationRegExp)
    expect(match).not.toBeNull()
    expect(match).toEqual(expect.arrayContaining(result))
  })
})
