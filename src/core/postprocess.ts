import type { Postprocessor } from 'unocss'

const rgbaRE = /rgba\(((?:\d+,?){3}),([^)]*)\)/

// IN-README-START
// https://github.com/unocss/unocss/discussions/2816
// Extract rgba color in css variable.
export function postprocessWithUnColor(unColor: string): Postprocessor {
  return (util) => {
    util.entries.forEach((i) => {
      const value = i[1]
      if (typeof value === 'string') {
        const match = value.match(rgbaRE)
        if (match != null) {
          i[1] = value.replace(rgbaRE, `rgba(var(${unColor}),$2)`)
          util.entries.unshift([unColor, match[1]])
        }
      }
    })
  }
}
// IN-README-END
