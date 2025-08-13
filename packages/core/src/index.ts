import type { UserConfig } from 'unocss'
import type { PostprocessOptions, UsefulOptions, UsefulTheme } from './types'
import { definePreset, mergeConfigs } from '@unocss/core'
import { shortcuts as builtInShortcuts, extractors, postprocess, preflights, rules, variants } from './core'
import { PRESET_NAME } from './meta'
import { resolveOptions } from './resolve'

export * from './utils'

export type { UsefulOptions, UsefulTheme }

export const presetUseful = definePreset<UsefulOptions, UsefulTheme>(async (options) => {
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

export default presetUseful

export function defineConfig<T extends object = UsefulTheme>(config: UserConfig<T>) {
  return config
}

export function defineUsefulConfig<T extends object = UsefulTheme>(options: UsefulOptions = {}, config: UserConfig<T> = {}) {
  return mergeConfigs([
    defineConfig<T>({
      presets: [
        presetUseful(options) as any,
      ],
    }),
    config,
  ])
}
