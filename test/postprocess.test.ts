import type { UserConfig } from 'unocss'
import type { ZyyvOptions } from 'unocss-preset-zyyv'
import presetLegacyCompat from '@unocss/preset-legacy-compat'
import { createGenerator } from 'unocss'
import { presetZyyv } from 'unocss-preset-zyyv'
import { describe, expect, it } from 'vitest'

async function generateUno(options: ZyyvOptions = {}, config: UserConfig = {}) {
  return await createGenerator({
    presets: [
      presetZyyv(options),
    ],
    ...config,
  })
}

describe('presetZyyv postprocess with unColor', () => {
  const code = 'bg-red text-blue'

  it('base', async () => {
    const uno = await generateUno({
      postprocess: {
        unColor: true,
      },
    })

    const { css } = await uno.generate(code)

    expect(css).toMatchInlineSnapshot(`
      "/* layer: properties */
      @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))){*, ::before, ::after, ::backdrop{--un-bg-opacity:100%;--un-text-opacity:100%;}}
      @property --un-text-opacity{syntax:"<percentage>";inherits:false;initial-value:100%;}
      @property --un-bg-opacity{syntax:"<percentage>";inherits:false;initial-value:100%;}
      /* layer: theme */
      :root, :host { --colors-red-DEFAULT: oklch(70.4% 0.191 22.216); --colors-blue-DEFAULT: oklch(70.7% 0.165 254.624); --font-sans: ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"; --font-mono: ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace; --default-font-family: var(--font-sans); --default-monoFont-family: var(--font-mono); }
      /* layer: base */
       *, ::after, ::before, ::backdrop, ::file-selector-button { box-sizing: border-box;  margin: 0;  padding: 0;  border: 0 solid;  }  html, :host { line-height: 1.5;  -webkit-text-size-adjust: 100%;  tab-size: 4;  font-family: var( --default-font-family, ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji' );  font-feature-settings: var(--default-font-featureSettings, normal);  font-variation-settings: var(--default-font-variationSettings, normal);  -webkit-tap-highlight-color: transparent;  }  hr { height: 0;  color: inherit;  border-top-width: 1px;  }  abbr:where([title]) { -webkit-text-decoration: underline dotted; text-decoration: underline dotted; }  h1, h2, h3, h4, h5, h6 { font-size: inherit; font-weight: inherit; }  a { color: inherit; -webkit-text-decoration: inherit; text-decoration: inherit; }  b, strong { font-weight: bolder; }  code, kbd, samp, pre { font-family: var( --default-monoFont-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace );  font-feature-settings: var(--default-monoFont-featureSettings, normal);  font-variation-settings: var(--default-monoFont-variationSettings, normal);  font-size: 1em;  }  small { font-size: 80%; }  sub, sup { font-size: 75%; line-height: 0; position: relative; vertical-align: baseline; } sub { bottom: -0.25em; } sup { top: -0.5em; }  table { text-indent: 0;  border-color: inherit;  border-collapse: collapse;  }  :-moz-focusring { outline: auto; }  progress { vertical-align: baseline; }  summary { display: list-item; }  ol, ul, menu { list-style: none; }  img, svg, video, canvas, audio, iframe, embed, object { display: block;  vertical-align: middle;  }  img, video { max-width: 100%; height: auto; }  button, input, select, optgroup, textarea, ::file-selector-button { font: inherit;  font-feature-settings: inherit;  font-variation-settings: inherit;  letter-spacing: inherit;  color: inherit;  border-radius: 0;  background-color: transparent;  opacity: 1;  }  :where(select:is([multiple], [size])) optgroup { font-weight: bolder; }  :where(select:is([multiple], [size])) optgroup option { padding-inline-start: 20px; }  ::file-selector-button { margin-inline-end: 4px; }  ::placeholder { opacity: 1; }  @supports (not (-webkit-appearance: -apple-pay-button))  or (contain-intrinsic-size: 1px)  { ::placeholder { color: color-mix(in oklab, currentcolor 50%, transparent); } }  textarea { resize: vertical; }  ::-webkit-search-decoration { -webkit-appearance: none; }  ::-webkit-date-and-time-value { min-height: 1lh;  text-align: inherit;  }  ::-webkit-datetime-edit { display: inline-flex; }  ::-webkit-datetime-edit-fields-wrapper { padding: 0; } ::-webkit-datetime-edit, ::-webkit-datetime-edit-year-field, ::-webkit-datetime-edit-month-field, ::-webkit-datetime-edit-day-field, ::-webkit-datetime-edit-hour-field, ::-webkit-datetime-edit-minute-field, ::-webkit-datetime-edit-second-field, ::-webkit-datetime-edit-millisecond-field, ::-webkit-datetime-edit-meridiem-field { padding-block: 0; }  ::-webkit-calendar-picker-indicator { line-height: 1; }  :-moz-ui-invalid { box-shadow: none; }  button, input:where([type='button'], [type='reset'], [type='submit']), ::file-selector-button { appearance: button; }  ::-webkit-inner-spin-button, ::-webkit-outer-spin-button { height: auto; }  [hidden]:where(:not([hidden~='until-found'])) { display: none !important; }
      /* layer: default */
      .text-blue{color:color-mix(in srgb, var(--colors-blue-DEFAULT) var(--un-text-opacity), transparent);}
      .bg-red{background-color:color-mix(in srgb, var(--colors-red-DEFAULT) var(--un-bg-opacity), transparent);}
      @supports (color: color-mix(in lab, red, red)){
      .text-blue{color:color-mix(in oklab, var(--colors-blue-DEFAULT) var(--un-text-opacity), transparent);}
      .bg-red{background-color:color-mix(in oklab, var(--colors-red-DEFAULT) var(--un-bg-opacity), transparent);}
      }"
    `)
  })

  it('with any string', async () => {
    const uno = await generateUno({
      postprocess: {
        unColor: '--test-color',
      },
    })

    const { css } = await uno.generate(code)

    expect(css).toMatchInlineSnapshot(`
      "/* layer: properties */
      @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))){*, ::before, ::after, ::backdrop{--un-bg-opacity:100%;--un-text-opacity:100%;}}
      @property --un-text-opacity{syntax:"<percentage>";inherits:false;initial-value:100%;}
      @property --un-bg-opacity{syntax:"<percentage>";inherits:false;initial-value:100%;}
      /* layer: theme */
      :root, :host { --colors-red-DEFAULT: oklch(70.4% 0.191 22.216); --colors-blue-DEFAULT: oklch(70.7% 0.165 254.624); --font-sans: ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"; --font-mono: ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace; --default-font-family: var(--font-sans); --default-monoFont-family: var(--font-mono); }
      /* layer: base */
       *, ::after, ::before, ::backdrop, ::file-selector-button { box-sizing: border-box;  margin: 0;  padding: 0;  border: 0 solid;  }  html, :host { line-height: 1.5;  -webkit-text-size-adjust: 100%;  tab-size: 4;  font-family: var( --default-font-family, ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji' );  font-feature-settings: var(--default-font-featureSettings, normal);  font-variation-settings: var(--default-font-variationSettings, normal);  -webkit-tap-highlight-color: transparent;  }  hr { height: 0;  color: inherit;  border-top-width: 1px;  }  abbr:where([title]) { -webkit-text-decoration: underline dotted; text-decoration: underline dotted; }  h1, h2, h3, h4, h5, h6 { font-size: inherit; font-weight: inherit; }  a { color: inherit; -webkit-text-decoration: inherit; text-decoration: inherit; }  b, strong { font-weight: bolder; }  code, kbd, samp, pre { font-family: var( --default-monoFont-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace );  font-feature-settings: var(--default-monoFont-featureSettings, normal);  font-variation-settings: var(--default-monoFont-variationSettings, normal);  font-size: 1em;  }  small { font-size: 80%; }  sub, sup { font-size: 75%; line-height: 0; position: relative; vertical-align: baseline; } sub { bottom: -0.25em; } sup { top: -0.5em; }  table { text-indent: 0;  border-color: inherit;  border-collapse: collapse;  }  :-moz-focusring { outline: auto; }  progress { vertical-align: baseline; }  summary { display: list-item; }  ol, ul, menu { list-style: none; }  img, svg, video, canvas, audio, iframe, embed, object { display: block;  vertical-align: middle;  }  img, video { max-width: 100%; height: auto; }  button, input, select, optgroup, textarea, ::file-selector-button { font: inherit;  font-feature-settings: inherit;  font-variation-settings: inherit;  letter-spacing: inherit;  color: inherit;  border-radius: 0;  background-color: transparent;  opacity: 1;  }  :where(select:is([multiple], [size])) optgroup { font-weight: bolder; }  :where(select:is([multiple], [size])) optgroup option { padding-inline-start: 20px; }  ::file-selector-button { margin-inline-end: 4px; }  ::placeholder { opacity: 1; }  @supports (not (-webkit-appearance: -apple-pay-button))  or (contain-intrinsic-size: 1px)  { ::placeholder { color: color-mix(in oklab, currentcolor 50%, transparent); } }  textarea { resize: vertical; }  ::-webkit-search-decoration { -webkit-appearance: none; }  ::-webkit-date-and-time-value { min-height: 1lh;  text-align: inherit;  }  ::-webkit-datetime-edit { display: inline-flex; }  ::-webkit-datetime-edit-fields-wrapper { padding: 0; } ::-webkit-datetime-edit, ::-webkit-datetime-edit-year-field, ::-webkit-datetime-edit-month-field, ::-webkit-datetime-edit-day-field, ::-webkit-datetime-edit-hour-field, ::-webkit-datetime-edit-minute-field, ::-webkit-datetime-edit-second-field, ::-webkit-datetime-edit-millisecond-field, ::-webkit-datetime-edit-meridiem-field { padding-block: 0; }  ::-webkit-calendar-picker-indicator { line-height: 1; }  :-moz-ui-invalid { box-shadow: none; }  button, input:where([type='button'], [type='reset'], [type='submit']), ::file-selector-button { appearance: button; }  ::-webkit-inner-spin-button, ::-webkit-outer-spin-button { height: auto; }  [hidden]:where(:not([hidden~='until-found'])) { display: none !important; }
      /* layer: default */
      .text-blue{color:color-mix(in srgb, var(--colors-blue-DEFAULT) var(--un-text-opacity), transparent);}
      .bg-red{background-color:color-mix(in srgb, var(--colors-red-DEFAULT) var(--un-bg-opacity), transparent);}
      @supports (color: color-mix(in lab, red, red)){
      .text-blue{color:color-mix(in oklab, var(--colors-blue-DEFAULT) var(--un-text-opacity), transparent);}
      .bg-red{background-color:color-mix(in oklab, var(--colors-red-DEFAULT) var(--un-bg-opacity), transparent);}
      }"
    `)
  })

  it('with any legacy rgba', async () => {
    const uno = await createGenerator({
      presets: [
        presetLegacyCompat({
          commaStyleColorFunction: true,
        }),
        presetZyyv({
          wind3: { preflight: 'on-demand' },
          wind4: false,
          postprocess: {
            unColor: '--test-color',
          },
        }),
      ],
    })

    const { css } = await uno.generate(code)

    expect(css).toMatchInlineSnapshot(`
      "/* layer: default */
      .bg-red{--test-color:248, 113, 113;--un-bg-opacity:1;background-color:rgba(var(--test-color) , var(--un-bg-opacity));}
      .text-blue{--test-color:96, 165, 250;--un-text-opacity:1;color:rgba(var(--test-color) , var(--un-text-opacity));}"
    `)
  })
})

describe('presetZyyv postprocess with important', () => {
  it('base', async () => {
    const uno = await generateUno({
      postprocess: {
        important: true,
      },
      wind4: { preflights: { reset: false } },
    })

    const { css } = await uno.generate('text-red')

    expect(css).toMatchInlineSnapshot(`
      "/* layer: properties */
      @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))){*, ::before, ::after, ::backdrop{--un-text-opacity:100%;}}
      @property --un-text-opacity{syntax:"<percentage>";inherits:false;initial-value:100%;}
      /* layer: theme */
      :root, :host { --colors-red-DEFAULT: oklch(70.4% 0.191 22.216); }
      /* layer: default */
      .text-red{color:color-mix(in srgb, var(--colors-red-DEFAULT) var(--un-text-opacity), transparent) !important;}
      @supports (color: color-mix(in lab, red, red)){
      .text-red{color:color-mix(in oklab, var(--colors-red-DEFAULT) var(--un-text-opacity), transparent) !important;}
      }"
    `)
  })

  it('base with excludes', async () => {
    const uno = await generateUno({
      postprocess: {
        important: {
          excludes: ['color', /bg-/, 'margin'],
        },
      },
      wind4: { preflights: { reset: false, theme: false } },
    })

    const { css } = await uno.generate('m2 text-red bg-blue p3')

    expect(css).toMatchInlineSnapshot(`
      "/* layer: properties */
      @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))){*, ::before, ::after, ::backdrop{--un-text-opacity:100%;--un-bg-opacity:100%;}}
      @property --un-text-opacity{syntax:"<percentage>";inherits:false;initial-value:100%;}
      @property --un-bg-opacity{syntax:"<percentage>";inherits:false;initial-value:100%;}
      /* layer: default */
      .text-red{color:color-mix(in srgb, var(--colors-red-DEFAULT) var(--un-text-opacity), transparent);}
      .m2{margin:calc(var(--spacing) * 2);}
      .p3{padding:calc(var(--spacing) * 3) !important;}
      .bg-blue{background-color:color-mix(in srgb, var(--colors-blue-DEFAULT) var(--un-bg-opacity), transparent);}
      @supports (color: color-mix(in lab, red, red)){
      .text-red{color:color-mix(in oklab, var(--colors-red-DEFAULT) var(--un-text-opacity), transparent);}
      .bg-blue{background-color:color-mix(in oklab, var(--colors-blue-DEFAULT) var(--un-bg-opacity), transparent);}
      }"
    `)
  })

  it('base with includes', async () => {
    const uno = await generateUno({
      postprocess: {
        important: {
          includes: ['color', /line-/, 'margin'],
          excludes: [/background-/],
        },
      },
      wind4: { preflights: { reset: false, theme: false } },
    })

    const { css } = await uno.generate('m2 text-red bg-blue p3 lh-4')

    expect(css).toMatchInlineSnapshot(`
      "/* layer: properties */
      @supports ((-webkit-hyphens: none) and (not (margin-trim: inline))) or ((-moz-orient: inline) and (not (color:rgb(from red r g b)))){*, ::before, ::after, ::backdrop{--un-leading:initial;--un-text-opacity:100%;--un-bg-opacity:100%;}}
      @property --un-text-opacity{syntax:"<percentage>";inherits:false;initial-value:100%;}
      @property --un-leading{syntax:"*";inherits:false;}
      @property --un-bg-opacity{syntax:"<percentage>";inherits:false;initial-value:100%;}
      /* layer: default */
      .text-red{color:color-mix(in srgb, var(--colors-red-DEFAULT) var(--un-text-opacity), transparent) !important;}
      .lh-4{--un-leading:calc(var(--spacing) * 4);line-height:calc(var(--spacing) * 4) !important;}
      .m2{margin:calc(var(--spacing) * 2) !important;}
      .p3{padding:calc(var(--spacing) * 3);}
      .bg-blue{background-color:color-mix(in srgb, var(--colors-blue-DEFAULT) var(--un-bg-opacity), transparent);}
      @supports (color: color-mix(in lab, red, red)){
      .text-red{color:color-mix(in oklab, var(--colors-red-DEFAULT) var(--un-text-opacity), transparent) !important;}
      .bg-blue{background-color:color-mix(in oklab, var(--colors-blue-DEFAULT) var(--un-bg-opacity), transparent);}
      }"
    `)
  })
})
