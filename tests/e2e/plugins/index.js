/* eslint-disable arrow-body-style */
// https://docs.cypress.io/guides/guides/plugins-guide.html

// if you need a custom webpack configuration you can uncomment the following import
// and then use the `file:preprocessor` event
// as explained in the cypress docs
// https://docs.cypress.io/api/plugins/preprocessors-api.html#Examples

// /* eslint-disable import/no-extraneous-dependencies, global-require */
// const webpack = require('@cypress/webpack-preprocessor')

module.exports = (on, config) => {
  return {
    ...config,
    fixturesFolder: 'tests/e2e/fixtures',
    specPattern: 'tests/e2e/features/**/*.feature', // Шлях до feature-файлів
    stepDefinitions: 'tests/e2e/features/**/*.cy.js',  // Шлях до файлів з кроками
    screenshotsFolder: 'tests/e2e/screenshots',
    videosFolder: 'tests/e2e/videos',
    supportFile: 'tests/e2e/support/index.js',
  };
};
