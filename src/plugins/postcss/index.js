import presetEnv from 'postcss-preset-env'
import autoprefixer from 'autoprefixer'
import customMedia from 'postcss-custom-media'

export default [
  // https://github.com/csstools/postcss-plugins/blob/main/plugin-packs/postcss-preset-env/FEATURES.md
  presetEnv({
    stage: 3,
    features: {
      'nesting-rules': true,
      'lab-function': true
    }
  }),
  autoprefixer,
  customMedia({
    importFrom: [
      // this is relative to svelte.config.js
      './src/styles/custom-media.css'
    ]
  })
]