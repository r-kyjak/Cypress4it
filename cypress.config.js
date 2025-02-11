const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
    testIsolation: false,
    defaultCommandTimeout: 10000,
    
    baseUrl: 'https://qa.bigheartapp.org/',
    "env": {
      "loginSuffix": "login",
      "feedSuffix": "feed",
      "postCreateApi": "v3/posts"
    }
  },
});
