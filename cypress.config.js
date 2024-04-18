/* eslint-disable import/no-extraneous-dependencies */
const { defineConfig } = require('cypress');
const fse = require('fs-extra');
/* eslint-enable import/no-extraneous-dependencies */

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 25000,
    viewportWidth: 1280,
    viewportHeight: 1024,
    screenshotsFolder: 'build/screenshots',
    videosFolder: 'build/videos',
    retries: {
      runMode: 1,
      openMode: 0,
    },
    chromeWebSecurity: false,
    env: {},
    // TODO - remove eslint-disable after adding events
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setupNodeEvents(on, config) {
      on('before:browser:launch', () => {
        fse.removeSync('build/');
      });

      const environmentName = config.env.environmentName || 'local';
      const environmentFilename = `./cypress/config/environments/${environmentName}.env.json`;

      try {
        console.log('====== Loading %s', environmentFilename, 'file ======');
        // eslint-disable-next-line import/no-dynamic-require, global-require
        const settings = require(environmentFilename);

        const newConfig = { ...config };

        Object.keys(settings).forEach(key => {
          if (key === 'env') {
            newConfig.env = {
              ...newConfig.env,
              ...settings.env,
            };
          } else {
            newConfig[key] = settings[key];
          }
        });

        console.log(
          '====== Loaded settings for environment: %s',
          environmentName,
          '======',
        );

        return newConfig;
      } catch (error) {
        throw new Error(
          `Environment file not found. Please follow instructions in
          the "Updating Environment files"
          section of the README.md.`,
        );
      }
    },
  },
});
