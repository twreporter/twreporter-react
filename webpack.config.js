const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')

const sassLoaders = [
  'css-loader',
  'postcss-loader'
]

const config = {
  entry: './src/index.js',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
       { test: /\.jsx$/, loader: 'babel-loader'},
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', "css-loader")
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '/static'),
    publicPath: '/static'
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ],
  postcss: [
    autoprefixer({
      browsers: ['last 2 versions']
    })
  ],
  resolve: {
    extensions: ['', '.js', '.css', '.jsx'],
    Directories: ['src', 'node_modules']
  }
}

module.exports = config
