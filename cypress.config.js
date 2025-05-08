const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const createEsbuildPlugin = require('@badeball/cypress-cucumber-preprocessor/esbuild');
const cucumberPreprocessor = require('@badeball/cypress-cucumber-preprocessor');

module.exports = defineConfig({
  fixturesFolder: 'tests/e2e/fixtures',
  screenshotsFolder: 'tests/e2e/screenshots',
  videosFolder: 'tests/e2e/videos',
  e2e: {
    specPattern: 'tests/e2e/features/**/*.feature',
    stepDefinitions: 'tests/e2e/features/**/*.cy.js',
    supportFile: 'tests/e2e/support/index.js',
    async setupNodeEvents(on, config) {
      await cucumberPreprocessor.addCucumberPreprocessorPlugin(on, config);

      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin.default(config)],
        })
      );

      const oldPlugins = require('./tests/e2e/plugins/index.js');
      if (oldPlugins) {
        return oldPlugins(on, config);
      }

      return config;
    },
  },
});
