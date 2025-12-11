import type { UserConfig } from 'unocss'
import type { PostprocessOptions, ZyyvOptions, ZyyvTheme } from './types'
import { definePreset, mergeConfigs } from '@unocss/core'
import { shortcuts as builtInShortcuts, extractors, postprocess, preflights, rules, variants } from './core'
import { PRESET_NAME } from './meta'
import { resolveOptions } from './resolve'

export * from './utils'

export type { ZyyvOptions, ZyyvTheme }

export const presetZyyv = definePreset<ZyyvOptions, ZyyvTheme>(async (options) => {
  const resolvedOptions = await resolveOptions(options ?? {})
  const { theme, meta, shortcuts: userShortcuts } = resolvedOptions
  const shortcuts = (userShortcuts === true || (typeof userShortcuts === 'object' && userShortcuts.default !== false))
    ? builtInShortcuts
    : []

  return {
    name: `unocss-preset-${PRESET_NAME}`,
    layers: {
      [PRESET_NAME]: 2,
    },
    rules,
    theme,
    variants: variants(resolvedOptions),
    shortcuts,
    extractors,
    postprocess: postprocess(resolvedOptions.postprocess as PostprocessOptions),
    presets: meta.presets,
    transformers: meta.transformers,
    preflights: preflights(),
    options: resolvedOptions,
  }
})

export const presetUseful = presetZyyv

export default presetZyyv

export function defineConfig<T extends object = ZyyvTheme>(config: UserConfig<T>) {
  return config
}

export function defineZyyvConfig<T extends object = ZyyvTheme>(options: ZyyvOptions = {}, config: UserConfig<T> = {}) {
  return mergeConfigs([
    defineConfig<T>({
      presets: [
        presetZyyv(options) as any,
      ],
    }) as any,
    config,
  ])
}

export const defineUsefulConfig = defineZyyvConfig
