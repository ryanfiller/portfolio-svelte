import { defineConfig } from 'cypress'

import { addMatchImageSnapshotPlugin } from 'cypress-image-snapshot/plugin.js'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:1337',
    video: false,

    retries: {
      runMode: 3,
      openMode: 0,
    },
    includeShadowDom: true,
    fixturesFolder: './tests/fixtures',
    specPattern: './tests/end-to-end/e2e/**/*.cy.js',
    screenshotsFolder: './tests/end-to-end/screenshots',
    supportFile: './tests/end-to-end/support/index.js',

    // plugins go here
    setupNodeEvents(on, config) {
      addMatchImageSnapshotPlugin(on, config)
      config.env.NODE_ENV = 'test'
    }
  }
})
