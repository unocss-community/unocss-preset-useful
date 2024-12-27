---
outline: deep
---

# Variants

Provide some useful variants. PRs are welcome to provide more variants.

## `@active`

Add the `.active` class to your `dom` elements.

```ts
export const v_active: VariantObject = {
  name: '@active',
  match(matcher) {
    if (!matcher.startsWith('@active'))
      return matcher

    return {
      matcher: matcher.slice(8),
      selector: s => `${s}.active`,
    }
  },
}
```
