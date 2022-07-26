import { defineConfig } from 'vite'

import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
// import typescript from '@rollup/plugin-typescript'
import svelte from 'rollup-plugin-svelte'
import { terser } from 'rollup-plugin-terser'
import sveltePreprocess from 'svelte-preprocess'

import postcssPlugins from '../plugins/postcss/index.js'

// TODO - check this env var
// should it be a vite env var? should it be a netlify env var?
const production = !process.env.ROLLUP_WATCH

export default defineConfig({
  input: 'src/web-components/index.js',
  output: {
    sourcemap: !production,
    format: 'iife',
    name: 'app',
    // file: 'public/web-components.js',
    file: 'static/web-components.js',
  },
  plugins: [
    svelte({
      preprocess: sveltePreprocess({
        sourceMap: !production,
        defaults: { 
          style: 'postcss',
          script: 'typescript'
        },
        postcss: {
          plugins: postcssPlugins
        }
      }),
      emitCss: false,
      customElement: true,
    }),
    resolve(),
    commonjs(),
    production && terser()
  ]
})
