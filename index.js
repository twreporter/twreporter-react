var path = require('path');

// this must be equal to your Webpack configuration "context" parameter
var projectBasePath = require('path').resolve(__dirname)

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('./webpack-isomorphic-tools-configuration'))
  .server(projectBasePath, function() {
    // `npm run build` will transpile the es6 files into dist folder
    // require transpiled files while running production
    process.env.NODE_ENV === 'production' ? require('./dist/server')  : require('./src/server')
  });
