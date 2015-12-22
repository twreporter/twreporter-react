var browserSync          = require('browser-sync').create();
var webpack              = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var stripAnsi            = require('strip-ansi');

require('babel/register');
var server               = require('./server/server');

/**
 * Require ./webpack.config.js and make a bundler from it
 */
var webpackConfig = require('./webpack.config');
var bundler       = webpack(webpackConfig);

/**
 * Reload all devices when bundle is complete
 * or send a fullscreen error message to the browser instead
 */
bundler.plugin('done', function (stats) {
  if (stats.hasErrors()/* || stats.hasWarnings()*/) {
    return browserSync.sockets.emit('fullscreen:message', {
        title: "Webpack Error:",
        body:  stripAnsi(stats.compilation.errors.toString()),
        timeout: 100000
    });
  }
	if (browserSync.active)
		browserSync.reload();
});

/**
 * Run Browsersync and use middleware for Hot Module Replacement
 */
browserSync.init({
  server: "./static",
  middleware: [
      webpackDevMiddleware(bundler, {
          publicPath: webpackConfig.output.publicPath,
          stats: {
            colors: true,
            hash: false,
            cached: false
          }
      }),
      server
  ],
  plugins: ['bs-fullscreen-message'],
  reloadDelay: 2000
});
