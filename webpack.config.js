const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')
const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production'

const webpackDevServerHost = 'localhost'
const webpackDevServerPort = 5000

const webpackConfig = {
  context: path.resolve(__dirname),
  entry: {
    main: './src/client.js',
  },
  output: {
    chunkFilename: '[id]-chunk-[chunkhash].js',
    filename: isProduction ? '[name].[hash].bundle.js' : '[name].dev.bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: isProduction ? '/dist/' : 'http://' + webpackDevServerHost + ':' + webpackDevServerPort + '/dist/'
  },
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    host: webpackDevServerHost,
    port: webpackDevServerPort
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /node_modules\/react-flex-carousel\/index.js/,
        use: 'babel-loader'
      },
      {
        test: /\.(scss|sass)$/,
        use: isProduction ? ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                modules: true,
                sourceMap: true,
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            }, {
              loader: 'postcss-loader',
              options: {
                plugins: function (loader) {
                  return [ autoprefixer({ browsers: [ '> 1%' ] }) ]
                }
              }}, 'sass-loader']
        }) : [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true,
              sourceMap: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function (loader) {
                return [ autoprefixer({ browsers: [ '> 1%' ] }) ]
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: isProduction ? ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: function (loader) {
                return [ autoprefixer({ browsers: [ '> 1%' ] }) ]
              }
            }
          }]
        }) : [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: function (loader) {
                return [ autoprefixer({ browsers: [ '> 1%' ] }) ]
              }
            }
          }
        ]
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'image/svg+xml'
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        BROWSER: true,
        NODE_ENV: isProduction ? '"production"' : '"development"'
      },
      __CLIENT__: true,
      __DEVELOPMENT__: !isProduction,
      __DEVTOOLS__: true,  // <-------- DISABLE redux-devtools HERE
      __SERVER__: false
    })
  ]
}


if (isProduction) {
	const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools-configuration'))

  webpackConfig.plugins.push(
    // css files from the extract-text-plugin loader
    new ExtractTextPlugin({
      filename: '[chunkhash].[name].css',
      disable: false,
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    webpackIsomorphicToolsPlugin
  )
} else {
  const webpackIsomorphicToolsPlugin =
    new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools-configuration'))
	  // also enter development mode
		.development()

  webpackConfig.plugins.push(
		webpackIsomorphicToolsPlugin,
    new webpack.HotModuleReplacementPlugin()
  )
}

module.exports = webpackConfig;
