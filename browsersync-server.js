var browserSync          = require('browser-sync').create();
var webpack              = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var stripAnsi            = require('strip-ansi');

require('babel-core/register');
var server               = require('./server/server');

/**
 * Require ./webpack.config.js and make a bundler from it
 */
var webpackConfig = require('./webpack.config');
var bundler = webpack(Object.assign({}, webpackConfig, {
  debug: true,
  devtool: '#eval-source-map',
  entry: ['webpack-hot-middleware/client', webpackConfig.entry],
  plugins: [new webpack.HotModuleReplacementPlugin()].concat(webpackConfig.plugins)
}));

/**
 * Reload all devices when bundle is complete
 * but always inject new style
 */
bundler.plugin('done', function (stats) {
  if (browserSync.active)
    browserSync.reload('main.css');
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
      webpackHotMiddleware(bundler),
      server
  ]
});
