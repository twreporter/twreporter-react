/* eslint-disable no-var */
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
  entry: ['bootstrap-loader/extractStyles'],
  output: {
    publicPath: '/',
    libraryTarget: 'commonjs2', // necessary for the babel plugin
    path: path.join(__dirname, 'lib-css'), // where to place webpack files
  },
  module: {
    loaders: [
      { test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css?modules&importLoaders=2&sourceMap&localIdentName=[name]__[local]___[hash:base64:5]' +
          '!postcss' +
          '!sass'
        )
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'postcss-loader'),
      },
    ],
  },
  postcss: [autoprefixer({ browsers: ['> 1%'] })],
  plugins: [
    new ExtractTextPlugin(`${path.parse(process.argv[2]).name}.css`),
  ],
};
