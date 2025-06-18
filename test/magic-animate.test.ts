import type { UsefulTheme } from 'unocss-preset-useful'
import { createGenerator } from 'unocss'
import { cssObj2StrAsync, presetUseful } from 'unocss-preset-useful'
import { describe, expect, it } from 'vitest'

describe('magic in PresetUseful Theme', () => {
  it('magic animate in Uno', async () => {
    const uno = await createGenerator<UsefulTheme>({
      presets: [
        presetUseful({
          magicss: true,
          preflights: false,
        }),
      ],
    })

    const { css } = await uno.generate('animate-magic')
    expect(css).toMatchInlineSnapshot(`
      "/* layer: theme */
      :root, :host { --font-sans: ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"; --font-mono: ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace; --default-font-family: var(--font-sans); --default-monoFont-family: var(--font-mono); }
      /* layer: base */
       *, ::after, ::before, ::backdrop, ::file-selector-button { box-sizing: border-box;  margin: 0;  padding: 0;  border: 0 solid;  }  html, :host { line-height: 1.5;  -webkit-text-size-adjust: 100%;  tab-size: 4;  font-family: var( --default-font-family, ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji' );  font-feature-settings: var(--default-font-featureSettings, normal);  font-variation-settings: var(--default-font-variationSettings, normal);  -webkit-tap-highlight-color: transparent;  }  hr { height: 0;  color: inherit;  border-top-width: 1px;  }  abbr:where([title]) { -webkit-text-decoration: underline dotted; text-decoration: underline dotted; }  h1, h2, h3, h4, h5, h6 { font-size: inherit; font-weight: inherit; }  a { color: inherit; -webkit-text-decoration: inherit; text-decoration: inherit; }  b, strong { font-weight: bolder; }  code, kbd, samp, pre { font-family: var( --default-monoFont-family, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace );  font-feature-settings: var(--default-monoFont-featureSettings, normal);  font-variation-settings: var(--default-monoFont-variationSettings, normal);  font-size: 1em;  }  small { font-size: 80%; }  sub, sup { font-size: 75%; line-height: 0; position: relative; vertical-align: baseline; } sub { bottom: -0.25em; } sup { top: -0.5em; }  table { text-indent: 0;  border-color: inherit;  border-collapse: collapse;  }  :-moz-focusring { outline: auto; }  progress { vertical-align: baseline; }  summary { display: list-item; }  ol, ul, menu { list-style: none; }  img, svg, video, canvas, audio, iframe, embed, object { display: block;  vertical-align: middle;  }  img, video { max-width: 100%; height: auto; }  button, input, select, optgroup, textarea, ::file-selector-button { font: inherit;  font-feature-settings: inherit;  font-variation-settings: inherit;  letter-spacing: inherit;  color: inherit;  border-radius: 0;  background-color: transparent;  opacity: 1;  }  :where(select:is([multiple], [size])) optgroup { font-weight: bolder; }  :where(select:is([multiple], [size])) optgroup option { padding-inline-start: 20px; }  ::file-selector-button { margin-inline-end: 4px; }  ::placeholder { opacity: 1; }  @supports (not (-webkit-appearance: -apple-pay-button))  or (contain-intrinsic-size: 1px)  { ::placeholder { color: color-mix(in oklab, currentcolor 50%, transparent); } }  textarea { resize: vertical; }  ::-webkit-search-decoration { -webkit-appearance: none; }  ::-webkit-date-and-time-value { min-height: 1lh;  text-align: inherit;  }  ::-webkit-datetime-edit { display: inline-flex; }  ::-webkit-datetime-edit-fields-wrapper { padding: 0; } ::-webkit-datetime-edit, ::-webkit-datetime-edit-year-field, ::-webkit-datetime-edit-month-field, ::-webkit-datetime-edit-day-field, ::-webkit-datetime-edit-hour-field, ::-webkit-datetime-edit-minute-field, ::-webkit-datetime-edit-second-field, ::-webkit-datetime-edit-millisecond-field, ::-webkit-datetime-edit-meridiem-field { padding-block: 0; }  :-moz-ui-invalid { box-shadow: none; }  button, input:where([type='button'], [type='reset'], [type='submit']), ::file-selector-button { appearance: button; }  ::-webkit-inner-spin-button, ::-webkit-outer-spin-button { height: auto; }  [hidden]:where(:not([hidden='until-found'])) { display: none !important; }
      /* layer: default */
      @keyframes magic{0% {opacity: 1;-webkit-transform-origin: 100% 200%;transform-origin: 100% 200%;-webkit-transform: scale(1, 1) rotate(0deg);transform: scale(1, 1) rotate(0deg);}100% {opacity: 0;-webkit-transform-origin: 200% 500%;transform-origin: 200% 500%;-webkit-transform: scale(0, 0) rotate(270deg);transform: scale(0, 0) rotate(270deg);}}
      .animate-magic{animation:magic 1s linear 1;animation-fill-mode:both;}"
    `)
  })

  it('postcss style stringify', async () => {
    const style = {
      '0%, 20%, 40%, 50%': { opacity: 1, transform: 'scale(1, 1) translateY(0)' },
      '10%, 30%': { opacity: 1, transform: 'scale(1.1, 1.1) translateY(0)' },
      '100%': { opacity: 0, transform: 'scale(1, 1) translateY(-900%)' },
    }

    const css = await cssObj2StrAsync(style)

    expect(`{${css}}`).toMatchInlineSnapshot(`
      "{0%, 20%, 40%, 50% {
          opacity: 1;
          transform: scale(1, 1) translateY(0)
      }
      10%, 30% {
          opacity: 1;
          transform: scale(1.1, 1.1) translateY(0)
      }
      100% {
          opacity: 0;
          transform: scale(1, 1) translateY(-900%)
      }}"
    `)
  })
})
