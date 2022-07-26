module.exports = {
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
  ],
  env: {
    es6: true,
    browser: true,
    node: true
  },
  plugins: [
    'svelte3',
    'cypress'
  ],
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3'
    }
  ],
  ignorePatterns: [
    'node_modules',
    '.netlify',
    '.svelte-kit',
    '.vscode',
    'build',
    'tests/__jail'
  ],
  globals: {
    cy: true,
    Cypress: true,
    vi: true,
    beforeEach: true,
    describe: true,
    context: true,
    context: true,
    it: true,
    test: true,
    expect: true
  },
  rules: {
    // i'm not using web-components the way svelte expects, this rule isn't needed
    'svelte/missing-custom-element-compile-options': 0
  },
  settings: {
    // use styleint instead
    'svelte3/ignore-styles': () => true
  }
}
