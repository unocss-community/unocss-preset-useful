import type { Postprocessor } from '@unocss/core'

const rgbRE = /rgb\(([\d\s]+?)\s*\/\s*([^)]+)\)/
const rgbaRE = /rgba\(([\d\s,]+),\s*([^)]+)\)/

// https://github.com/unocss/unocss/discussions/2816
// Extract rgba color in css variable.
export function postprocessWithUnColor(unColor: string): Postprocessor {
  return (util) => {
    util.entries.forEach((i) => {
      const value = i[1]
      if (typeof value === 'string') {
        let match = value.match(rgbaRE)
        if (match != null) {
          i[1] = value.replace(rgbaRE, `rgba(var(${unColor}) , $2)`)
          util.entries.unshift([unColor, match[1]])
        }
        else {
          match = value.match(rgbRE)
          if (match != null) {
            i[1] = value.replace(rgbRE, `rgb(var(${unColor}) / $2)`)
            util.entries.unshift([unColor, match[1].trim()])
          }
        }
      }
    })
  }
}
