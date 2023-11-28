// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  const coverageThreshold = process.env.COVERAGE_THRESHOLD || 0;
  const coverageDir = process.env.COVERAGE_DIR || 'default-coverage';
  
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false
    },
    jasmineHtmlReporter: {
      suppressAll: true
    },
    coverageReporter: {
      check: {
        global: {
          statements: 0,
          branches: 0,
          functions: 0,
          lines: coverageThreshold
        }
      },
      dir: require('path').join(__dirname, `coverage/${coverageDir}`),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary', file: 'coverage-summary.txt' },
        { type: 'text-summary' } 
      ]
    },
    reporters: ['progress', 'kjhtml', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadlessCI'],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--headless',
          '--disable-gpu',
          '--disable-translate',
          '--disable-extensions',
          '--remote-debugging-port=9222',
        ]
      }
    },
    singleRun: true,
    concurrency: Infinity,
    restartOnFileChange: true
  });
  //console.log("********** coverageThreshold ========", coverageThreshold)
};
