import type { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build -- --mode testing && npm run preview',
		port: 4173
	},
	testDir: 'tests/e2e'
}

export default config
