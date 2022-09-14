import path from 'path'

import dotenv from 'dotenv'
dotenv.config()

import { sveltekit } from '@sveltejs/kit/vite'
import vitePlugins from './src/plugins/vite.js'

const envVars = {
	'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
	'process.env.PORT': process.env.PORT || '3000',
	'process.env.CLOUDINARY_CLOUD': JSON.stringify(process.env.CLOUDINARY_CLOUD),
	// https://docs.netlify.com/configure-builds/environment-variables/#read-only-variables
	'process.env.CONTEXT': JSON.stringify(process.env.CONTEXT),
	'process.env.NETLIFY_URL': process.env.CONTEXT !== 'production'
		? JSON.stringify(process.env.DEPLOY_URL)
		: JSON.stringify(process.env.URL)
}

export default {
  plugins: [
    sveltekit(),
    vitePlugins(envVars)
  ],
  resolve: {
    alias: {
      $actions: path.resolve('./src/actions'),
      $components: path.resolve('./src/components'),
      '$web-components': path.resolve('./src/web-components'),
      $helpers: path.resolve('./src/helpers'),
      $plugins: path.resolve('./src/plugins'),
      $stores: path.resolve('./src/stores'),
      $styles: path.resolve('./src/styles'),
      $layouts: path.resolve('./src/layouts'),
      '$site-config': path.resolve('./src/site-config.js')
    }
  }
}