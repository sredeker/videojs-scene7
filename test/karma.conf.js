module.exports = function(config) {
  var detectBrowsers = {
    enabled: false,
    usePhantomJS: false
  };

  // On Travis CI, we can only run in Firefox and Chrome; so, enforce that.
  if (process.env.TRAVIS) {
    config.browsers = ['Firefox', 'travisChrome'];
  }

  // If no browsers are specified, we enable `karma-detect-browsers`
  // this will detect all browsers that are available for testing
  if (!config.browsers.length) {
    detectBrowsers.enabled = true;
  }

  config.set({
    basePath: '..',
    frameworks: ['qunit', 'detectBrowsers'],
    files: [
      'node_modules/video.js/dist/video-js.css',
      'node_modules/sinon/pkg/sinon.js',
      'node_modules/video.js/dist/video.js',
      'test/dist/bundle.js'
    ],
    customLaunchers: {
      travisChrome: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    detectBrowsers: detectBrowsers,
    preprocessors: {
      'test/dist/**/*.js': ['coverage'],
    },
    reporters: ['coverage','dots'],
    // Coverage reporter outputs a nicely formated HTML coverage
    // report, as well as an XML report in Clover format for
    // Bamboo to consume
    coverageReporter: {
      dir : 'test/coverage/',
      includeAllSources: true,
      reporters: [
        {type: 'html', subdir: 'report'},
        {type: 'clover', subdir: '.', file: 'report-clover.xml'},
        {type: 'lcov', subdir: '.'}
      ]
    },
    port: 9876,
    colors: true,
    autoWatch: false,
    singleRun: true,
    concurrency: Infinity
  });
};
