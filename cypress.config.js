const { defineConfig } = require('cypress');
const fse = require('fs-extra');

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
    setupNodeEvents(on, config) {
      on('before:browser:launch', () => {
        fse.removeSync('build/');
      });

      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
        table(message) {
          console.table(message);
          return null;
        },
        saveAxeResultsToFile({ data, url }) {
          const reportPath = 'build/axe/axe-report.json';
          fse.readJson(reportPath, (err, jsonData) => {
            if (err && err.code !== 'ENOENT') throw err;

            const updatedData = jsonData || [];
            updatedData.push({ url, violations: data });

            fse.outputFile(
              reportPath,
              JSON.stringify(updatedData, null, 2),
              writeErr => {
                if (writeErr) throw writeErr;
                console.log(`***** Report updated: ${reportPath} *****`);
              },
            );
          });
          return null;
        },
      });

      const environmentName = config.env.environmentName || 'local';
      const environmentFilename = `./cypress/environments/${environmentName}.env.json`;

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
