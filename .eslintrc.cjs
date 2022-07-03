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
  // rules: {
  //   // ...
  // },
  settings: {
    // use styleint instead
    'svelte3/ignore-styles': () => true
  }
}
