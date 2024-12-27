---
outline: deep
---

# Theme

Align with Tailwind theme configuration.

## UsefulTheme
```ts
export interface UsefulExtends extends Exclude<UsefulTheme, 'extend'> {
  keyframes?: Record<string, CSSKeyframesRule>
  /**
   * Different from the original, you can use the following formats:
   *
   * ```ts
   * { name : 'name duration timing-function iteration-count' }
   * ```
   */
  animation?: Objectiable<string>
}

export interface UsefulTheme extends Theme {
  extend?: UsefulExtends
}
```

Based on the UnoCSS `preset-mini` `Theme`, we have extended the `keyframes` and `animation` fields in `extend` to align with the Tailwind theme configuration.

### animate
In UnoCSS animation configuration, you need to configure all animation properties, and there are many configuration items.

```ts
// old unocss animation config
{
  theme: {
    animation: {
      keyframes: { spin: '{from{opacity:0}to{opacity:1}}'},
      durations: { spin: '1s' },
      timingFns: { spin: 'linear' },
      counts: { spin: 'infinite' },
    }
  }
}
```

We provide a simpler configuration method, you only need to provide the animation name, duration, timing function, and iteration count.

You must follow the following rules to define: `[ name, duration, timing-function, iteration-count ]`

```ts
{
  theme: {
    extend: {
      animation: {
        spin: 'spin 1s linear infinite'
      }
    }
  }
}
```

:::tip
- `*` Abandon injection
- `+` Injection, but the value is empty

```ts
{
  theme: {
    extend: {
      animation: {
        foo: 'foo 1s * 3',
        bar: 'bar 1s +',
      },
    }
  }
}
```
:::

### keyframes

We have simplified the configuration of `keyframes`, you only need to provide the name and style of the keyframes.

```ts
{
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
          '20%, 30%': { transform: 'rotate(-3deg)' },
          '80%': { transform: 'rotate(3deg)' },
        },
      },
    }
  }
}
```
