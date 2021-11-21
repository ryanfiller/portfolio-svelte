import autoprefixer from 'autoprefixer'
import nesting from 'postcss-nesting'
import customMedia from 'postcss-custom-media'

export default [
  autoprefixer,
  nesting,
  customMedia({
    importFrom: [
      'src/styles/custom-media.css'
    ]
  })
]