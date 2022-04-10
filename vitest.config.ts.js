/// <reference types='vitest' />
import { defineConfig } from 'vite'
import { extractFromSvelteConfig } from 'vitest-svelte-kit'

export default defineConfig({
  ...extractFromSvelteConfig(),
  test: {
    globals: true,
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: [...configDefaults.exclude, 'packages/template/*'],
  }
})
