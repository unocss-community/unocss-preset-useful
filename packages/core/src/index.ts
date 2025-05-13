import type { Shortcut, UserConfig } from '@unocss/core'
import type { UsefulOptions, UsefulTheme } from './types'
import { definePreset, mergeConfigs } from '@unocss/core'
import { extractors, postprocess, preflights, rules, shortcuts, variants } from './core'
import { PRESET_NAME } from './meta'

import { resolveOptions } from './resolve'

export * from './utils'

export type { UsefulOptions, UsefulTheme }

export const presetUseful = definePreset<UsefulOptions, UsefulTheme>(async (options) => {
  const resolvedOptions = await resolveOptions(options ?? {})
  const { enableDefaultShortcuts, theme, meta } = resolvedOptions

  return {
    name: `unocss-preset-${PRESET_NAME}`,
    layers: {
      [PRESET_NAME]: 2,
    },
    rules,
    theme,
    variants: variants(resolvedOptions),
    shortcuts: [...(enableDefaultShortcuts ? shortcuts : []), ...meta.shortcuts] as Shortcut[],
    extractors,
    postprocess: postprocess(resolvedOptions),
    presets: meta.presets,
    transformers: meta.transformers,
    preflights: preflights(resolvedOptions),
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
