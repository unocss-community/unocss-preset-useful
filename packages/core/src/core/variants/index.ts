import type { Variant } from '@unocss/core'
import type { ResolvedOptions } from '../../types'
import { v_active } from './active'

export function variants(_options: ResolvedOptions): Variant[] {
  return [
    v_active,
  ]
}
