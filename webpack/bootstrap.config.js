// Webpack config for development
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    'bootstrap': [ 'bootstrap-loader/extractStyles' ]
  },
  output: {
    publicPath: '/',
    filename: '[name].js',
    path: path.resolve(__dirname, '../lib-css'), // where to place webpack files
  },
  plugins: [
    // css files from the extract-text-plugin loader
    new ExtractTextPlugin('[name].css'),
  ]
};
