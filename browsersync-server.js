var nodemon              = require('nodemon');
var browserSync          = require('browser-sync').create();
var webpack              = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var stripAnsi            = require('strip-ansi');

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
        body:  stripAnsi(stats.toString()),
        timeout: 100000
    });
  }
	if (browserSync.active)
		browserSync.reload();
});

nodemon({
	script: __dirname + '/server',
	ext: 'js'
});

/**
 * Run Browsersync and use middleware for Hot Module Replacement
 */
nodemon.on('start', function () {
	if (!browserSync.active)
		browserSync.init({
			port: 8080,
			proxy: {
				target: 'localhost:3000',
				middleware: [
						webpackDevMiddleware(bundler, {
								quiet: true
						})
				]
			},
			plugins: ['bs-fullscreen-message'],
			reloadDelay: 2000
		});
}).on('quit', function () {
	browserSync.exit();
});
