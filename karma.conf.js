module.exports = function (config) {
    config.set({
        mime: {
            'text/x-typescript': ['ts', 'tsx']
        },
        basePath: '',
        frameworks: ['mocha', 'chai', 'sinon'],
        files: [
            'test/**/*.spec.ts'
        ],
        exclude: [],
        preprocessors: {
            "test/**/*.spec.ts": ["webpack"]
        },
        // webpack configuration
        webpack: require("./webpack.config.js"),
        webpackMiddleware: {
            stats: "errors-only"
        },
        reporters: ['mocha'],
        port: 9876,
        colors: true,
        browsers: ['ChromeHeadless'],
        customLaunchers: {
            ChromeHeadless: {
              base: 'Chrome',
              flags: [
                '--disable-translate',
                '--headless',
                '--disable-gpu',
                '--disable-extensions',
                '--remote-debugging-port=9222',
              ],
            }
          },
        plugins: [
            'karma-mocha',
            'karma-chai',
            'karma-sinon',
            'karma-chrome-launcher',
            'karma-webpack',
            'karma-sourcemap-loader',
            'karma-mocha-reporter',
            'karma-junit-reporter',
        ],

        singleRun: false,

        junitReporter: {
            outputDir: 'karmaResults',
            outputFile: 'junit.xml'
        },

        mochaReporter: {
            showDiff: true
        },

        logLevel: config.LOG_WARN,
        concurrency: Infinity
    });
};
