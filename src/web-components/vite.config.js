// https://www.colorglare.com/svelte-components-as-web-components-b400d1253504

import { defineConfig } from 'vite'

import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
// import typescript from '@rollup/plugin-typescript'
// import { terser } from 'rollup-plugin-terser'
import svelte from 'rollup-plugin-svelte'
import sveltePreprocess from 'svelte-preprocess'

import postcssPlugins from '../plugins/postcss/index.js'

// TODO - check this env var
// should it be a vite env var? should it be a netlify env var?
const production = !process.env.ROLLUP_WATCH

export default defineConfig({
  input: 'src/web-components/index.js',
  output: {
    // sourcemap: !production,
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'static/web-components.js',
  },
  plugins: [
    svelte({
      preprocess: sveltePreprocess({
        // sourceMap: !production,
        sourceMap: true,
        defaults: { 
          style: 'postcss'
        },
        postcss: {
          plugins: postcssPlugins
        }
      }),
      emitCss: false,
      // customElement: true,
      // customElement: true, include: /.*\/web-components\/.*\.svelte/,
      // tag: null,
      compilerOptions: {
        customElement: true,
        tag: null,
      }
    }),
    resolve(),
    commonjs()
    // don't run terser here
  ]
})
