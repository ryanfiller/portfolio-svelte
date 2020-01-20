module.exports = {
  parser: 'babel-eslint',
  env: {
    es6: true,
  },
  extends: [
    'standard',
    'standard-react',
    'plugin:react/recommended',
    'plugin:css-modules/recommended'
  ],
  plugins: [
    'react',
    'eslint-plugin-css-modules'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'dot-notation': 0,
    'react/jsx-boolean-value': 0,
    'react/jsx-pascal-case': 0,
    'css-modules/no-unused-class': [0, { "camelCase": true }],
    'space-before-function-paren': 0
  },
  overrides: [
    {
      files: [ '*.test.*' ],
      rules: {
        'no-undef': 0
      }
    },
    {
      files: [ 'src/cms/*/*.*' ],
      rules: {
        'react/display-name': 0,
        'react/prop-types': 0
      }
    }
  ]
};

