import type { RuleMeta, StaticShortcut } from '@unocss/core'
import type { CustomStaticShortcuts } from '../types'
import { layerMeta } from '../meta'

// @unocss-include

// IN-README-START
// FYI. My own shortcuts.
const _shortcuts: CustomStaticShortcuts = [
  // position
  ['pr', 'relative'],
  ['pa', 'absolute'],
  ['pf', 'fixed'],
  ['ps', 'sticky'],

  // position layout
  [['pxc', 'p-x-c'], 'pa left-1/2 -translate-x-1/2'],
  [['pyc', 'p-y-c'], 'pa top-1/2 -translate-y-1/2'],
  [['pcc', 'pc', 'p-c', 'p-c-c'], 'pxc pyc'],

  // flex layout
  [['fcc', 'f-c'], 'flex justify-center items-center'],
  [['fccc', 'f-c-c'], 'f-c flex-col'],
  [['fc', 'fxc', 'f-x-c'], 'flex justify-center'],
  [['fi', 'fyc', 'f-y-c'], 'flex items-center'],
  [['fs', 'fxs'], 'flex justify-start'],
  ['fsc', 'flex justify-start items-center'],
  ['fse', 'flex justify-start items-end'],
  [['fe', 'fxe'], 'flex justify-end'],
  ['fec', 'flex justify-end items-center'],
  ['fb', 'flex justify-between'],
  ['fbc', 'flex justify-between items-center'],
  ['fa', 'flex justify-around'],
  ['fac', 'flex justify-around items-center'],
  ['fw', 'flex flex-wrap'],
  ['fwr', 'flex flex-wrap-reverse'],

  // transition
  ['trans', 'transition-all-350 ease-DEFAULT'],
]
// IN-README-END

export const shortcuts = normalizeShortcut(_shortcuts)

normalizeShortcutMeta(layerMeta)

export function normalizeShortcutMeta(ruleMeta: RuleMeta) {
  for (const r of shortcuts)
    r[2] = Object.assign(r[2] || {}, ruleMeta)
}

export function normalizeShortcut(shortcut: CustomStaticShortcuts): StaticShortcut[] {
  return shortcut.flatMap((s) => {
    if (Array.isArray(s[0]))
      return s[0].map(i => [i, s[1], s[2]] as StaticShortcut)
    return [s] as StaticShortcut[]
  })
}
