import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Useful Preset',
  description: 'All in one useful unocss preset.',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Guide', link: '/guide/started' },
    ],

    sidebar: [
      {
        text: 'Getting Started',
        link: '/guide/started',
      },
      {
        text: 'Guides',
        items: [
          { text: 'Shortcuts', link: '/guide/shortcuts' },
          { text: 'Presets', link: '/guide/presets' },
          { text: 'Theme', link: '/guide/theme' },
          { text: 'Postprocess', link: '/guide/postprocess' },
          { text: 'Extractors', link: '/guide/extractors' },
          { text: 'Variants', link: '/guide/variants' },
          { text: 'Preflights', link: '/guide/preflights' },
        ],
      },
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-PRESENT Chris',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/unocss-community/unocss-preset-zyyv' },
    ],
  },
})
