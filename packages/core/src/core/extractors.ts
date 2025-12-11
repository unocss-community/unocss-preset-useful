import type { Extractor } from '@unocss/core'

// IN-README-START
// https://github.com/unocss/unocss/pull/2485
// Support extract base64 image.
export const extractors: Extractor[] = [
  {
    name: 'unocss-preset-zyyv-extractor-includes-base64',
    order: 0,
    extract({ code }) {
      return [...new Set(code.split(/[\\:]?[\s'"`{}]|;(?!base64)+/g))]
    },
  },
]
// IN-README-END
