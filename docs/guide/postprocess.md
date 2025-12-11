# Postprocess

Handle postprocess for UnoCSS generated CSS.

> If you don't know how `postprocess` works, please refer to [postprocess documents](https://unocss.dev/config/#postprocess) or [online demo](https://unocss.dev/play/#html=DwEwlgbgBA7gTgQwA5IKZygc2QWgEwB8AUFFKJAQKoB2A9gMIDKjwA9OBMaedGDnH0xgALgAsArgCMcAGzDVUBNhy5kOUYagAewgLwAiOKhBQtM-QQDyaalACS1AM5oAxsNoZHqVFBe0ntDI%2BMrSYjgB0yhREUZxEQA&config=JYWwDg9gTgLgBAbzgEwKYDNgDtUFUDOGArgDYDCEWmA5nAL5zpQQhwDkRWEAxvvgLRgoqQjH5FC6UmwBQM1AA9IsFBgCGpeGkw4CxcpRoAKGXESmzcYN0r4AXOcuX83NSVQOAjADoATABoLJ25kLAc2AAsYGDB7AHo4kRBvfAi4tkCnOkz6HIQguFToGG4iGHtHJzgAdyg1MDBUKHDq-hdhVCw4CLbuDq70biGMguyCyHwY5m4RfCMy4BIASkqnBZJvTpgoYBFvdGgAUTVuCKMjYBWAXgA%2BVaqbLHwId28SCGoLpYKzOm%2BsnJ0GTfIA&css=PQKgBA6gTglgLgUzAYwK4Gc4HsC2YDCAyoWABYJQIA0YAhgHYAmYcUD6AZllDhWOqgAOg7nAB0YAGLcwCAB60cggDYIAXGBDAAUKDBi0mXGADe2sGC704AWgDuCGAHNScDQFYADJ4Dc5sAACtMLKAJ5gggCMLPK2ABR2pPBIcsoAlH4WAEa0yADWTlBYqEw2yFjK3Bpw5LxxAOTllVDoYpSMYgAs3vUZ2gC%2BmsBAA&options=N4IgLgTghgdgzgMwPYQLYgFwKgGzgUwBpxp5k0BhAVzjCVQoGVHNs8iTZEVUAJMVDla4CAXyA&version=0.65.3)

## UnColor

It will extract rgba color in css variable. See [linked discussion](https://github.com/unocss/unocss/discussions/2816).

For example: `bg-red` will generate the following CSS:

```css
.bg-red {
  --un-bg-opacity: 1;
  background-color: rgb(248 113 113 / var(--un-bg-opacity));
}
```

If you enable `uncolor` postprocess, we will extract color variables:

```css {2}
.bg-red{
  --un-color:248 113 113;
  --un-bg-opacity:1;
  background-color:rgb(var(--un-color) / var(--un-bg-opacity));
}
```

You can use `un-color` variable in the following CSS context. For example: `text-[rgb(var(--un-color))]`.

### Types
```ts
/**
 * Extract rgba color in css variable
 *
 * @default false
 */
unColor?: boolean | string
```

## Important

It will add `!important` suffix to all properties you need.

For example: `bg-red` will generate the following CSS:

```css
.bg-red {
  --un-bg-opacity: 1;
  background-color: rgb(248 113 113 / var(--un-bg-opacity));
}
```

If you enable `important` postprocess, we will add `!important` suffix to all properties:

```css {2-3}
.bg-red {
  --un-bg-opacity: 1 !important;
  background-color: rgb(248 113 113 / var(--un-bg-opacity)) !important;
}
```

You can customize which properties need the `!important` suffix.

```ts
export default defineUsefulConfig({
  important: {
    include: ['bg', 'text'], // include bg-* and text-* properties
    excludes: ['color', /bg-/, 'margin'], // exclude color, bg-*, and margin properties
  },
})
```

See [test cases](https://github.com/unocss-community/unocss-preset-zyyv/blob/09d8aa57b66ea96dd23aedf5f7dfebf1b9a21206/test/postprocess.test.ts#L71-L137) for more examples.

### Types
```ts
/**
 * Make all unitilities important.
 *
 * @default false
 */
important?: boolean | ImportantOptions

export interface ImportantOptions {
  /**
   * Make all unitilities important.
   *
   */
  includes?: FilterPattern

  /**
   * Make all unitilities important.
   *
   */
  excludes?: FilterPattern
}
```
