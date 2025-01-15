import type { Theme } from '@unocss/preset-mini'
import type { WebFontsOptions } from '@unocss/preset-web-fonts'
import type { CustomStaticShortcuts, ResolvedOptions, UsefulOptions, UsefulTheme } from './types'
import { nomarlizeTheme } from './core'
import { cssObj2StrSync, deepMerge, resolveAnimation } from './utils'

const defaultOptions: UsefulOptions = {
  theme: {},
  important: false,
  enableDefaultShortcuts: true,
  /**
   * @deprecated Use `magicss` option instead
   */
  enableMagicAnimations: false,
  /**
   * @deprecated Use `preflights.reset` instead
   */
  enableResetStyles: true,
  preflights: {
    reset: true,
  },
  // presets
  uno: { preflight: 'on-demand' },
  attributify: true,
  icons: true,
  webFonts: false,
  typography: false,
  tagify: false,
  remToPx: false,
  magicss: false,

  // transformers
  directives: true,
  variantGroup: true,
  compileClass: false,
}

const defaultPresetOptions: Record<string, any> = {
  webFonts: {
    provider: 'fontsource',
  } as WebFontsOptions,
}

const defaultImportantOptions = {
  excludes: [],
  includes: [/.*/g],
}

export async function resolveOptions(options: UsefulOptions) {
  const optionsWithDefault = Object.assign({}, defaultOptions, options) as Required<UsefulOptions>
  optionsWithDefault.unColor = typeof optionsWithDefault.unColor === 'string'
    ? optionsWithDefault.unColor
    : optionsWithDefault.unColor ? '--un-color' : false

  optionsWithDefault.important = typeof optionsWithDefault.important === 'object'
    ? Object.assign({}, defaultImportantOptions, optionsWithDefault.important)
    : optionsWithDefault.important === true
      ? defaultImportantOptions
      : false

  const presets = await resolvePresets(optionsWithDefault)
  const transformers = await resolveTransformers(optionsWithDefault)
  const { theme: t_theme, shortcuts } = resolveExtend(optionsWithDefault.theme.extend ?? {})
  const _theme = deepMerge(optionsWithDefault.theme, t_theme)

  return {
    ...optionsWithDefault,
    theme: nomarlizeTheme(_theme),
    meta: {
      presets,
      shortcuts,
      transformers,
    },
  } as ResolvedOptions
}

function resolveExtend(extend: UsefulTheme['extend']) {
  const _shortcuts: CustomStaticShortcuts = []
  const { animation, keyframes } = extend!

  // animation
  const { animation: resolvedAnimation, shortcuts } = resolveAnimation(animation ?? {})
  _shortcuts.push(...shortcuts)

  // keyframes
  resolvedAnimation.keyframes = {}
  for (const key in keyframes)
    resolvedAnimation.keyframes[key] = `{${cssObj2StrSync(keyframes[key])}}`

  return {
    theme: { animation: resolvedAnimation } as Theme,
    shortcuts: _shortcuts,
  }
}

async function resolvePresets(options: Required<UsefulOptions>) {
  const presets = []
  const presetMap = {
    uno: import('@unocss/preset-uno').then(m => m.presetUno),
    attributify: import('@unocss/preset-attributify').then(m => m.presetAttributify),
    icons: import('@unocss/preset-icons').then(m => m.presetIcons),
    webFonts: import('@unocss/preset-web-fonts').then(m => m.presetWebFonts),
    typography: import('@unocss/preset-typography').then(m => m.presetTypography),
    tagify: import('@unocss/preset-tagify').then(m => m.presetTagify),
    remToPx: import('@unocss/preset-rem-to-px').then(m => m.default),
    magicss: import('unocss-preset-magicss').then(m => m.presetMagicss),
  }

  for (const [key, preset] of Object.entries(presetMap)) {
    const option = options[key as keyof typeof presetMap]
    if (option) {
      const p = await preset as any
      const presetOptions = defaultPresetOptions[key as keyof typeof defaultPresetOptions]
      if (typeof option === 'object')
        presets.push(p({ ...presetOptions, ...option }))
      else
        presets.push(p(presetOptions ?? {}))
    }
  }

  return presets
}

async function resolveTransformers(options: Required<UsefulOptions>) {
  const transformers = []
  const transformerMap = {
    directives: import('unocss').then(m => m.transformerDirectives),
    variantGroup: import('unocss').then(m => m.transformerVariantGroup),
    compileClass: import('unocss').then(m => m.transformerCompileClass),
  }

  for (const [key, transformer] of Object.entries(transformerMap)) {
    const option = options[key as keyof typeof transformerMap]
    if (option) {
      const t = await transformer as any
      transformers.push(t(typeof option === 'boolean' ? {} as any : option))
    }
  }

  return transformers
}
