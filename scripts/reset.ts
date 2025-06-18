import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execa } from 'execa'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const resetFilePath = path.resolve(__dirname, '../packages/core/src/core/preflights/reset.ts')

async function update() {
  try {
    const originalContent = await readFile(resetFilePath, 'utf-8')
    // https://github.com/unocss/unocss/blob/main/packages-presets/reset/tailwind-compat.css
    const res = await fetch('https://raw.githubusercontent.com/unocss/unocss/main/packages-presets/reset/tailwind-compat.css')
    const css = await res.text()

    await writeFile(
      resetFilePath,
      originalContent.replace('__reset_placeholder__', css.replace(/`/g, '\\`')),
      'utf-8',
    )

    execa('eslint', ['--fix', '--no-ignore', resetFilePath])
  }
  catch (err) {
    console.log(err)
  }
}

update()
