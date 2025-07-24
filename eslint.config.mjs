import antfu from '@antfu/eslint-config'

export default antfu({
  unocss: true,
  rules: {
    'regexp/no-useless-quantifier': 'off',
    'regexp/no-super-linear-backtracking': 'off',
    'regexp/no-misleading-capturing-group': 'off',
    'regexp/strict': 'off',
    'regexp/no-lazy-ends': 'off',
    'regexp/no-useless-lazy': 'off',
  },
  ignores: ['docs/guide/postprocess.md', 'docs/guide/theme.md', '.github/**'],
})
