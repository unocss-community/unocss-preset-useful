# unocss-preset-zyyv [![npm](https://img.shields.io/npm/v/unocss-preset-zyyv)](https://npmjs.com/package/unocss-preset-zyyv)

Integrate and useful preset.

> [!WARNING]
> The package name has been changed to `unocss-preset-zyyv`.

## Features
- 🔥 All-in-One popular presets.
- 🚀 Collection of features not integrated into UnoCSS.
  - 🍥 Support extract base64 image.
  - 🎨 Support extract rgba color in css variable.
  - 💜 Support expand theme animation name usage.
  - 🍬 etc.
- 📦 Build-In [Magic Animate](https://github.com/miniMAC/magic).
- 🌬️ Align with TW theme configuration.

## Usage
```shell
pnpm i -D unocss-preset-zyyv unocss
```

```ts
// unocss.config.ts
import { defineZyyvConfig } from 'unocss-preset-zyyv'

export default defineZyyvConfig()

// Custom options
export default defineZyyvConfig(
  {
    // Useful options
  },
  {
    // Uno options
  }
)
```

More details see [documentation](https://useful.zyyv.dev).

## License

[MIT](./LICENSE) License © 2022 [zyyv](https://github.com/zyyv)
