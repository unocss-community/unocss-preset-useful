import type { CSSObject } from 'unocss'
import { cssObj2StrSync, resolveAnimation, stringifyObj } from 'unocss-preset-zyyv'
import { describe, expect, it } from 'vitest'

describe('utils', () => {
  const _animation = {
    'spin-slow': 'spin 3s linear infinite',
    'bounce': 'bounce 2s ease-in-out 3',
    'fade': 'fade 1s ease-in-out 3',
    'foo': 'foo 1s * 3',
    'bar': 'bar 1s +',
  }

  it('resolveAnimation', async () => {
    const { animation, shortcuts } = resolveAnimation(_animation)

    expect(shortcuts).toHaveLength(1)
    expect(animation).toMatchInlineSnapshot(`
      {
        "counts": {
          "bounce": "3",
          "fade": "3",
          "foo": "3",
          "spin": "infinite",
        },
        "durations": {
          "bar": "1s",
          "bounce": "2s",
          "fade": "1s",
          "foo": "1s",
          "spin": "3s",
        },
        "timingFns": {
          "bar": "",
          "bounce": "ease-in-out",
          "fade": "ease-in-out",
          "spin": "linear",
        },
      }
    `)
  })

  it('cssObj2StrSync', () => {
    const style: Record<string, CSSObject> = {
      '0%, 20%, 40%, 50%': { opacity: 1, transform: 'scale(1, 1) translateY(0)' },
      '10%, 30%': { opacity: 1, transform: 'scale(1.1, 1.1) translateY(0)' },
      '100%': { opacity: 0, transform: 'scale(1, 1) translateY(-900%)' },
    }

    expect(cssObj2StrSync(style)).toMatchInlineSnapshot(`"0%, 20%, 40%, 50%{opacity:1;transform:scale(1, 1) translateY(0);}10%, 30%{opacity:1;transform:scale(1.1, 1.1) translateY(0);}100%{opacity:0;transform:scale(1, 1) translateY(-900%);}"`)
  })

  it('stringify CSSObject', () => {
    const obj = {
      foo: 'bb',
      bar: 'dd',
      fooBar: 'fooBar',
    }

    expect(stringifyObj(obj)).toMatchInlineSnapshot(`"{foo:bb;bar:dd;foo-bar:fooBar;}"`)
  })
})
