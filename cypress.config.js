const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.saucedemo.com",
    pageLoadTimeout: 10000,
    slowTestThreshold: 5000,
    experimentalSourceRewriting: true,
    env: {
      "tax": "$2.40",
    },
    setupNodeEvents(on, config) {
      on('after:spec', (spec, results) => {
        // nothing here
      })
    },
  },
});
