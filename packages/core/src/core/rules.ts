import type { Rule, RuleMeta } from '@unocss/core'
import { layerMeta } from '../meta'

// IN-README-START
// Use any css variable easily.
export const rules: Rule[] = [
  [/^([^:]+)::(\S|[^:]+)$/, ([, k, v]) => {
    return {
      [`--${k}`]: v,
    }
  }],
]
// IN-README-END

normalizeRuleMeta(layerMeta)

export function normalizeRuleMeta(ruleMeta: RuleMeta) {
  for (const r of rules)
    r[2] = Object.assign(r[2] || {}, ruleMeta)
}
