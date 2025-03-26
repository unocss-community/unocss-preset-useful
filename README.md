# unocss-preset-useful [![npm](https://img.shields.io/npm/v/unocss-preset-useful)](https://npmjs.com/package/unocss-preset-useful)

Integrate and useful preset.

> [!WARNING]
> - `^0.x.x`: Only support presetWind3 preset.
> - `^1.x.x`: Only support presetWind4 preset.
>
> Please use the correct version according to the UnoCSS version.

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
pnpm i -D unocss-preset-useful unocss
```

```ts
// unocss.config.ts
import { defineUsefulConfig } from 'unocss-preset-useful'

export default defineUsefulConfig()

// Custom options
export default defineUsefulConfig(
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
