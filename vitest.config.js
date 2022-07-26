import { defineConfig } from 'vite'
import viteConfig from './vite.config.js'

export default defineConfig({
  ...viteConfig,
  test: {
    globals: true,
    include: ['tests/unit/**/*.test.{js,ts}']
  }
})