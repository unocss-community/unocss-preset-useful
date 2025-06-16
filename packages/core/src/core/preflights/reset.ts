import type { Preflight } from '@unocss/core'
import { layerMeta } from '../../meta'

const resetCSS = `__reset_placeholder__`

function compressCSS(css: string) {
  return css.replace(/\s+/g, ' ').replace(/\/\*[\s\S]*?\*\//g, '')
}

export const resetPreflight: Preflight = {
  getCSS: () => compressCSS(resetCSS),
  layer: layerMeta.layer,
}
