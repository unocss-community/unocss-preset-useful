import type { Postprocessor } from '@unocss/core'
import type { FilterPattern, ImportantOptions } from '../../types'
import { toArray } from '@unocss/core'

function createFilter(
  include: FilterPattern,
  exclude: FilterPattern,
): (id: string) => boolean {
  const includePattern = toArray(include || [])
  const excludePattern = toArray(exclude || [])
  return (id: string) => {
    if (excludePattern.some(p => id.match(p)))
      return false
    return includePattern.some(p => id.match(p))
  }
}

export function importantProcess(importantOptions: Required<ImportantOptions>): Postprocessor {
  const keyFilter = createFilter(importantOptions.includes, importantOptions.excludes)

  return (util) => {
    for (const item of util.entries) {
      if (keyFilter(item[0])) {
        if (item[1] != null && !String(item[1]).includes('!important')) {
          item[1] += ' !important'
        }
      }
      else {
        if (item[1] != null && String(item[1]).includes('!important')) {
          item[1] = String(item[1]).replace(/\s*!important/g, '')
        }
      }
    }
  }
}
