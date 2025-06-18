# Getting Started

## Installation

```bash
pnpm add -D unocss unocss-preset-useful
```

## Usage

```ts unocss.config.ts
import { defineUsefulConfig } from 'unocss-preset-useful'

export default defineUsefulConfig()

// Custom options
export default defineUsefulConfig(
  {
    // Useful options
  },
  {
    // Uno options
  }
)
```

## Types

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

interface PreflightOptions {
  /**
   * Enable reset styles
   *
   * @default true
   */
  reset?: boolean
}

export type FilterPattern = Array<string | RegExp> | string | RegExp | null

export interface ImportantOptions {
  /**
   * Make all unitilities important.
   *
   */
  includes?: FilterPattern

  /**
   * Make all unitilities important.
   *
   */
  excludes?: FilterPattern
}

export interface UsefulOptions {
  /**
   * Make all unitilities important.
   *
   * @default false
   */
  important?: boolean | ImportantOptions

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
   * @deprecated Use `magicss` option instead
   */
  enableMagicAnimations?: boolean

  /**
   * Enable reset styles
   *
   * @default true
   *
   * @deprecated Use `preflights.reset` instead
   */
  enableResetStyles?: boolean

  /**
   * Enable preflights
   *
   * @default true
   */
  preflights?: boolean | PreflightOptions

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
   *
   * @about [@unocss/preset-wind3](https://unocss.dev/presets/wind3)
   * @default true
   */
  wind3?: boolean | PresetUnoOptions

  /**
   * Enable attributify mode and the options of it
   * Only works when `presets` is not specified
   *
   * @about [@unocss/preset-attributify](https://unocss.dev/presets/attributify)
   * @default true
   */
  attributify?: boolean | AttributifyOptions

  /**
   * Enable icons preset and the options of it
   * Only works when `presets` is not specified
   *
   * @about [@unocss/preset-icons](https://unocss.dev/presets/icons)
   * @default true
   */
  icons?: boolean | IconsOptions

  /**
   * Enable webFonts preset and the options of it
   * Only works when `presets` is not specified
   *
   * **Note:** Default by [`fontsource`](https://fontsource.org/) provider
   *
   * @about [@unocss/preset-web-fonts](https://unocss.dev/presets/web-fonts)
   * @default false
   */
  webFonts?: boolean | WebFontsOptions

  /**
   * Enable typography preset and the options of it
   * Only works when `presets` is not specified
   *
   * @about [@unocss/preset-typography](https://unocss.dev/presets/typography)
   * @default false
   */
  typography?: boolean | TypographyOptions

  /**
   * Enable tagify preset and the options of it
   * Only works when `presets` is not specified
   *
   * @about [@unocss/preset-tagify](https://unocss.dev/presets/tagify)
   * @default false
   */
  tagify?: boolean | TagifyOptions

  /**
   * Enable remToPx preset and the options of it
   * Only works when `presets` is not specified
   *
   * @about [@unocss/preset-rem-to-px](https://unocss.dev/presets/rem-to-px)
   * @default false
   */
  remToPx?: boolean | RemToPxOptions

  /**
   * Enable magicss preset
   *
   * @about [unocss-preset-magicss](https://github.com/unpreset/unocss-preset-magicss)
   * @default false
   */
  magicss?: boolean

  /**
   * Enable directives transformer and the options of it
   *
   * @about [@unocss/transformer-directives](https://unocss.dev/transformers/directives)
   * @default true
   */
  directives?: boolean | TransformerDirectivesOptions

  /**
   * Enables the variant group feature of Windi CSS for UnoCSS.
   *
   * @about [@unocss/transformer-variant-group](https://unocss.dev/transformers/variant-group)
   * @default true
   */
  variantGroup?: boolean | TransformerVariantGroupOptions

  /**
   * Compile group of classes into one class
   *
   * @about [@unocss/transformer-class-group](https://unocss.dev/transformers/compile-class)
   * @default false
   */
  compileClass?: boolean | CompileClassOptions
}
```
