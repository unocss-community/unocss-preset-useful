import type { WebFontsOptions } from '@unocss/preset-web-fonts'
import type { CustomStaticShortcuts, ImportantOptions, PostprocessOptions, ResolvedOptions, UsefulOptions, UsefulTheme } from './types'
import { nomarlizeTheme } from './core'
import { cssObj2StrSync, deepMerge, resolveAnimation } from './utils'

const defaultOptions: UsefulOptions = {
  theme: {},

  postprocess: {
    important: false,
  },

  shortcuts: {
    default: true,
  },

  preflights: {
    reset: false,
  },

  // default by enabling all presets, wind3 and wind4 互斥, only one can be enabled
  wind4: true, // After v1.0.0, wind4 is the default preset
  wind3: false,
  attributify: true,
  icons: true,

  // optional presets
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

const defaultPostprocessOptions: Required<PostprocessOptions> = {
  important: {
    excludes: [],
    includes: [/.*/g],
  },
  unColor: '--un-color',
}

export async function resolveOptions(options: UsefulOptions) {
  const optionsWithDefault = Object.assign({}, defaultOptions, options) as Required<UsefulOptions>

  if (optionsWithDefault.wind4 && optionsWithDefault.wind3) {
    console.warn('wind3 and wind4 are mutually exclusive, only one can be enabled')
    optionsWithDefault.wind3 = false
  }

  // Reolve postprocess options
  if (optionsWithDefault.postprocess === true) {
    optionsWithDefault.postprocess = defaultPostprocessOptions
  }
  else if (typeof optionsWithDefault.postprocess === 'object') {
    if (typeof optionsWithDefault.postprocess.important === 'object') {
      optionsWithDefault.postprocess.important = {
        ...defaultPostprocessOptions.important as ImportantOptions,
        ...optionsWithDefault.postprocess.important,
      }
    }
    else if (optionsWithDefault.postprocess.important === true) {
      optionsWithDefault.postprocess.important = defaultPostprocessOptions.important
    }

    if (optionsWithDefault.postprocess.unColor === true) {
      optionsWithDefault.postprocess.unColor = defaultPostprocessOptions.unColor
    }
  }

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
    theme: { animation: resolvedAnimation } as UsefulTheme,
    shortcuts: _shortcuts,
  }
}

async function resolvePresets(options: Required<UsefulOptions>) {
  const presets = []
  const presetMap = {
    wind3: import('unocss').then(m => m.presetWind3),
    wind4: import('unocss').then(m => m.presetWind4),
    attributify: import('unocss').then(m => m.presetAttributify),
    icons: import('unocss').then(m => m.presetIcons),
    webFonts: import('unocss').then(m => m.presetWebFonts),
    typography: import('unocss').then(m => m.presetTypography),
    tagify: import('unocss').then(m => m.presetTagify),
    remToPx: import('@unocss/preset-rem-to-px').then(m => m.presetRemToPx),
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
