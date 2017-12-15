const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const config = require('./config')
const fs = require('fs')
const path = require('path');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV !== 'development'
const webpackDevServerHost = config.webpackDevServerHost
const webpackDevServerPort = config.webpackDevServerPort
const webpackPublicPath = config.webpackPublicPath
const webpackOutputFilename = config.webpackOutputFilename

const defaulAssets = {
  javascripts: {
    chunks: []
  },
  stylesheets: []
}

function BundleListPlugin(options) {}

// BundleListPlugin is used to write the paths of files compiled by webpack
// such as javascript files transpiled by babel,
// and scss files handled by sass, postcss and css loader,
// into webpack-assets.json
BundleListPlugin.prototype.apply = function(compiler) {
  compiler.plugin('emit', function(compilation, callback) {
    let assets
    try {
      assets = require('./webpack-assets.json')
    } catch (e) {
      assets = defaulAssets
    }
    for (const filename in compilation.assets) {
      if (filename.startsWith('main')) {
        assets.javascripts.main = `/dist/${filename}`
      } else if (filename.indexOf('-chunk-') > -1) {
        assets.javascripts.chunks.push(`/dist/${filename}`)
      }
    }

    fs.writeFileSync('./webpack-assets.json', JSON.stringify(assets))
    callback();
  });
};

const webpackConfig = {
  context: path.resolve(__dirname),
  entry: {
    main: './src/client.js',
  },
  output: {
    chunkFilename: '[id]-chunk-[chunkhash].js',
    filename: webpackOutputFilename,
    path: path.join(__dirname, 'dist'),
    publicPath: webpackPublicPath
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
                minimize: isProduction,
                importLoaders: 2,
                modules: true,
                sourceMap: true,
                // Make sure this setting is equal to settings in .bablerc
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
              minimize: isProduction,
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
        NODE_ENV: isProduction ? '"production"' : '"development"',
        RELEASE_BRANCH: '"staging"',
        API_HOST: '"staging-go-api.twreporter.org"',
        API_PORT: '443',
        API_PROTOCOL: '"https"'
      },
      __CLIENT__: true,
      __DEVELOPMENT__: !isProduction,
      __DEVTOOLS__: true,  // <-------- DISABLE redux-devtools HERE
      __SERVER__: false
    })
  ]
}


if (isProduction) {
  webpackConfig.plugins.push(
    new BundleListPlugin(),
    // css files from the extract-text-plugin loader
    new ExtractTextPlugin({
      // write css filenames into webpack-assets.json
      filename: function(getPath) {
        const filename = getPath('[chunkhash].[name].css')
        let assets
        try {
          assets = require('./webpack-assets.json')
        } catch (e) {
          assets = defaulAssets
        }
        assets.stylesheets.push(webpackConfig.output.publicPath + filename)
        fs.writeFileSync('./webpack-assets.json', JSON.stringify(assets))
        return filename
      },
      disable: false,
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin()
  )
} else {
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )
}

module.exports = webpackConfig;
