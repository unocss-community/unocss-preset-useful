# unocss-preset-useful [![npm](https://img.shields.io/npm/v/unocss-preset-useful)](https://npmjs.com/package/unocss-preset-useful)

Integrate and useful preset.

## Features
- 🔥 All-in-One popular presets.
- 🚀 Collection of features not integrated into UnoCSS.
  - 🍥 Support extract base64 image.
  - 🎨 Support extract rgba color in css variable.
  - 💜 Support expand theme animation name usage.
  - 🍬 etc.
- 📦 Build-In [Magic Animate](https://github.com/unpreset/unocss-preset-magicss).
- 🌬️ Align with TW theme configuration.

## Usage
```shell
pnpm i -D unocss-preset-useful unocss
```

```ts
// unocss.config.ts
import { defineConfig } from 'unocss'
import { presetUseful } from 'unocss-preset-useful'

export default defineConfig({
  presets: [
    presetUseful(),
  ],
})
```

<details>
<summary>Options</summary><br>

```ts
export interface UsefulOptions {
  /**
   * Enable default shortcuts
   *
   * @default true
   */
  enableDefaultShortcuts?: boolean

  /**
   * Enable magic animations
   *
   * @default false
   * @deprecated Use `magicss` option instead.
   */
  enableMagicAnimations?: boolean

  /**
   * Extract rgba color in css variable
   *
   * @default false
   */
  unColor?: boolean | string

  /**
   * Improve theme to be more useful, and align with Tailwind theme configuration
   *
   * - Add `animation` to theme, Expand theme animation name usage
   *
   * [ name, duration, timing-function, iteration-count ]
   *
   * @example
   *
   * ```ts
   * theme: {
   *   extend: {
   *     animation: {
   *      shape: 'shape 5s linear infinite'
   *     },
   *     // ...
   *   }
   * }
   * ```
   * You can choose to use special symbols as placeholders, to indicate whether to inject this property into the uno theme
   *
   * - `*` Abandon injection
   * - `+` Injection, but the value is empty
   *
   * @example
   *
   * ```ts
   * theme: {
   *   extend: {
   *     animation: {
   *      foo: 'foo 1s * 3',
   *      bar: 'bar 1s +',
   *     },
   *     // ...
   *   }
   * }
   * ```
   *
   */
  theme?: UsefulTheme

  /**
   * Enable the default preset
   * Only works when `presets` is not specified
   * @default true
   */
  uno?: boolean | PresetUnoOptions

  /**
   * Enable attributify mode and the options of it
   * Only works when `presets` is not specified
   * @default false
   */
  attributify?: boolean | AttributifyOptions

  /**
   * Enable icons preset and the options of it
   * Only works when `presets` is not specified
   * @default false
   */
  icons?: boolean | IconsOptions

  /**
   * Enable webFonts preset and the options of it
   * Only works when `presets` is not specified
   * @default false
   */
  webFonts?: boolean | WebFontsOptions

  /**
   * Enable typography preset and the options of it
   * Only works when `presets` is not specified
   * @default false
   */
  typography?: boolean | TypographyOptions

  /**
   * Enable tagify preset and the options of it
   * Only works when `presets` is not specified
   * @default false
   */
  tagify?: boolean | TagifyOptions

  /**
   * Enable remToPx preset and the options of it
   * Only works when `presets` is not specified
   * @default false
   */
  remToPx?: boolean | RemToPxOptions
}
```

<br></details>

## Details

<details>
<summary>Expand it see more details</summary><br>

### extractors

```ts
// https://github.com/unocss/unocss/pull/2485
// Support extract base64 image.
export const extractors: Extractor[] = [
  {
    name: 'unocss-preset-useful-extractor-includes-base64',
    order: 0,
    extract({ code }) {
      return [...new Set(code.split(/[\\:]?[\s'"`{}]|;(?!base64)+/g))]
    },
  },
]
```

### postprocess

```ts
// https://github.com/unocss/unocss/discussions/2816
// Extract rgba color in css variable.
export function postprocessWithUnColor(unColor: string): Postprocessor {
  return (util) => {
    util.entries.forEach((i) => {
      const value = i[1]
      if (typeof value === 'string') {
        const match = value.match(rgbaRE)
        if (match != null) {
          i[1] = value.replace(rgbaRE, `rgba(var(${unColor}),$2)`)
          util.entries.unshift([unColor, match[1]])
        }
      }
    })
  }
}
```

### rules

```ts
// Use any css variable easily.
export const rules: Rule[] = [
  [/^(.+)::(.+)$/, ([, n, v], { theme }) => {
    const color = parseColor(v, theme)
    if (color?.cssColor?.type === 'rgb' && color.cssColor.components) {
      return {
        [`--${n}`]: `${color.cssColor.components.join(',')}`,
      }
    }
    return {
      [`--${n}`]: v,
    }
  }],
]
```

### shortcuts

```ts
// FYI. My own shortcuts.
const _shortcuts: CustomStaticShortcuts = [
  // position
  ['pr', 'relative'],
  ['pa', 'absolute'],
  ['pf', 'fixed'],
  ['ps', 'sticky'],

  // position layout
  [['pxc', 'p-x-c'], 'pa left-1/2 -translate-x-1/2'],
  [['pyc', 'p-y-c'], 'pa top-1/2 -translate-y-1/2'],
  [['pcc', 'pc', 'p-c', 'p-c-c'], 'pxc pyc'],

  // flex layout
  [['f-c', 'fcc'], 'flex justify-center items-center'],
  [['f-c-c', 'fccc'], 'f-c flex-col'],
  [['fc', 'fxc', 'f-x-c'], 'flex justify-center'],
  [['fi', 'fyc', 'f-y-c'], 'flex items-center'],
  ['fs', 'flex justify-start'],
  ['fsc', 'flex justify-start items-center'],
  ['fse', 'flex justify-start items-end'],
  ['fe', 'flex justify-end'],
  ['fec', 'flex justify-end items-center'],
  ['fb', 'flex justify-between'],
  ['fbc', 'flex justify-between items-center'],
  ['fa', 'flex justify-around'],
  ['fac', 'flex justify-around items-center'],
  ['fw', 'flex justify-wrap'],
  ['fwr', 'flex justify-wrap-reverse'],

  // transition
  ['trans', 'transition-all-350 ease-linear'],
]
```

### magic-animate

```ts
export function magicAnimate(): Theme['animation'] {
  const keyframesObj = getKeyframes(magicCSS)

  function generate<T = string>(val?: T): Record<string, T> {
    return Object.keys(keyframesObj).reduce((acc, key) => {
      const name = key.replace('@keyframes ', '')
      // @ts-expect-error nothing
      acc[name] = val ?? `{${cssObj2StrSync(keyframesObj[key])}}`
      return acc
    }, {})
  }

  return {
    keyframes: generate(),
    durations: generate('1s'),
    properties: generate({ 'animation-fill-mode': 'both' }),
  }
}
```

<br></details>

## License

[MIT](./LICENSE) License © 2022 [zyyv](https://github.com/zyyv)
