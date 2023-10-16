import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		globals: true,
		environment: 'happy-dom',
		include: ['tests/unit/**/*.{test,spec}.{js,ts}'],
		// fix a vite bug - https://github.com/vitest-dev/vitest/issues/2834#issuecomment-1439576110
		alias: [
      { find: /^svelte$/, replacement: "svelte/internal" }
    ]
	}
})
