import type { Postprocessor } from '@unocss/core'
import type { ImportantOptions, PostprocessOptions } from '../../types'
import { importantProcess } from './important'
import { postprocessWithUnColor } from './uncolor'

export function postprocess(options: PostprocessOptions): Postprocessor[] {
  const { unColor, important } = options

  return [
    unColor ? postprocessWithUnColor(unColor as string) : undefined,
    important ? importantProcess(important as Required<ImportantOptions>) : undefined,
  ].filter(Boolean) as Postprocessor[]
}
