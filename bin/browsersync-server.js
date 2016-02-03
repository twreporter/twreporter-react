#!/usr/bin/env node
require('../server.babel'); // babel registration (runtime transpilation for node)
var path = require('path');
var rootDir = path.resolve(__dirname, '..');
/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false;  // <----- DISABLES SERVER SIDE RENDERING FOR ERROR DEBUGGING
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

if (__DEVELOPMENT__) {
  if (!require('piping')({
      hook: true,
      ignore: /(\/\.|~$|\.json|\.scss$)/i
    })) {
    return;
  }
}

var browserSync          = require('browser-sync').create();
var webpack              = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var server               = require('../server/server');

/**
 * Require ./webpack.config.js and make a bundler from it
 */
var webpackConfig = require('../webpack.config');
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
  server: "../static",
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
