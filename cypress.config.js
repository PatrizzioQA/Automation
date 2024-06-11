const { defineConfig } = require('cypress');
const merge = require('mochawesome-merge');
const generate = require('mochawesome-report-generator');

module.exports = defineConfig({
  e2e: {
    projectId: "ca1d6o",
    setupNodeEvents(on, config) {
      on('after:run', async (results) => {
        try {
          const mergedReport = await merge({
            files: ['cypress/reports/*.json']
          });
          await generate.create(mergedReport, {
            reportDir: 'cypress/reports',
            overwrite: true,
            inline: true,
            saveHtml: true,
            saveJson: true
          });
          console.log('Report generated successfully!');
        } catch (error) {
          console.error('Failed to generate report:', error);
        }
      });

      return config;
    },
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: false
    }
  }
});

