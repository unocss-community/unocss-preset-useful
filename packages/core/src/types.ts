import type { CSSObject, Preset, SourceCodeTransformer, StaticShortcut } from '@unocss/core'
// Presets
import type { AttributifyOptions } from '@unocss/preset-attributify'
import type { IconsOptions } from '@unocss/preset-icons'
import type { RemToPxOptions } from '@unocss/preset-rem-to-px'
import type { TagifyOptions } from '@unocss/preset-tagify'
import type { TypographyOptions } from '@unocss/preset-typography'
import type { WebFontsOptions } from '@unocss/preset-web-fonts'
import type { PresetWind3Options, Theme as ThemeWind3 } from '@unocss/preset-wind3'
import type { PresetWind4Options, Theme as ThemeWind4 } from '@unocss/preset-wind4'
// Transformers
import type { CompileClassOptions } from '@unocss/transformer-compile-class'
import type { TransformerDirectivesOptions } from '@unocss/transformer-directives'
import type { TransformerVariantGroupOptions } from '@unocss/transformer-variant-group'

type CustomStaticShortcut = [string | string[], StaticShortcut[1]] | [string | string[], StaticShortcut[1], StaticShortcut[2]]
export type CustomStaticShortcuts = CustomStaticShortcut[]

export type Objectiable<T> = Record<string, T>

export type CSSKeyframesRule = Objectiable<CSSObject>

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

export interface UsefulTheme extends Omit<ThemeWind3, 'container' | 'containers'>, ThemeWind4 {
  extend?: UsefulExtends
}

export interface PostprocessOptions {
  /**
   * Make all unitilities important.
   *
   * @default false
   */
  important?: boolean | ImportantOptions

  /**
   * Extract rgba color in css variable, default key name is `--un-color`
   *
   * Only works when `wind3` is enabled
   *
   * @default false
   */
  unColor?: boolean | string
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
   * Enable built-in postprocess
   *
   * @default false
   */
  postprocess?: boolean | PostprocessOptions

  shortcuts?: boolean | {
    /**
     * Enable default shortcuts
     *
     * @default true
     */
    default?: boolean
  }

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
   * Enable the default preset for preset-wind3
   * Only works when `presets` is not specified
   *
   * @about [@unocss/preset-wind3](https://unocss.dev/presets/wind3)
   * @default false
   */
  wind3?: boolean | PresetWind3Options

  /**
   * Enable the default preset for preset-wind4
   * Only works when `presets` is not specified
   *
   * After v1.0.0, wind4 is the default preset
   *
   * @about [@unocss/preset-wind4](https://unocss.dev/presets/wind4)
   * @default true
   */
  wind4?: boolean | PresetWind4Options

  /**
   * Enable attributify mode and the options of it
   * Only works when `presets` is not specified
   *
   * @about [@unocss/preset-attributify](https://unocss.dev/presets/attributify)
   * @default false
   */
  attributify?: boolean | AttributifyOptions

  /**
   * Enable icons preset and the options of it
   * Only works when `presets` is not specified
   *
   * @about [@unocss/preset-icons](https://unocss.dev/presets/icons)
   * @default false
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

export type ResolvedOptions = Required<UsefulOptions> & {
  meta: {
    presets: Preset[]
    shortcuts: CustomStaticShortcuts
    transformers: SourceCodeTransformer[]
  }
}

export type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> }
