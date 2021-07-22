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
    '.netlify',
    '.svelte-kit',
    '.vscode',
    'build',
  ],
  // rules: {
  //   // ...
  // },
  settings: {
    // use styleint instead
    'svelte3/ignore-styles': () => true
  }
}
