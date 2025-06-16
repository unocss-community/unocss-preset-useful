import type { Preflight } from '@unocss/core'
import type { ResolvedOptions } from '../../types'
import { resetPreflight } from './reset'

export function preflights(options: ResolvedOptions): Preflight[] {
  if (typeof options.preflights === 'boolean') {
    return options.preflights
      ? [
          resetPreflight,
        ].filter(Boolean) as Preflight[]
      : []
  }

  return [
    options.preflights.reset ? resetPreflight : undefined,
  ].filter(Boolean) as Preflight[]
}
