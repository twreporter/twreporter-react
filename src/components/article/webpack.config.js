/* eslint-disable no-var */
var autoprefixer = require('autoprefixer');
var path = require('path');
var strip = require('strip-loader');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    'main': ['bootstrap-loader/extractStyles', './index.js']
  },
  output: {
    publicPath: '/',
    filename: '[name].js',
    libraryTarget: 'commonjs2', // necessary for the babel plugin
    path: path.join(__dirname, 'lib'), // where to place webpack files
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: [strip.loader('debug'), 'babel']},
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
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
    ],
  },
  postcss: [autoprefixer({ browsers: ['> 1%'] })],
  plugins: [
    new ExtractTextPlugin('[name].css'),
  ],
};
