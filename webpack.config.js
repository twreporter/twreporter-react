// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('./config')
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const ReactLoadablePlugin = require('react-loadable/webpack').ReactLoadablePlugin

const isProduction = config.nodeEnv !== 'development'
const webpackDevServerHost = config.webpackDevServerHost
const webpackDevServerPort = config.webpackDevServerPort
const webpackPublicPath = config.webpackPublicPath
const webpackOutputFilename = config.webpackOutputFilename

const webpackAssets =  {
  javascripts: {
    chunks: [],
    main: '',
    manifest: ''
  },
  stylesheets: []
}

function BundleListPlugin() {}

// BundleListPlugin is used to write the paths of files compiled by webpack
// such as javascript files transpiled by babel,
// and scss files handled by sass, postcss and css loader,
// into webpack-assets.json
BundleListPlugin.prototype.apply = function (compiler) {
  compiler.plugin('emit', function (compilation, callback) {
    for (const filename in compilation.assets) {
      if (filename.startsWith('main')) {
        webpackAssets.javascripts.main = `${webpackPublicPath}${filename}`
      } else if (filename.startsWith('manifest')) {
        webpackAssets.javascripts.manifest = `${webpackPublicPath}${filename}`
      } else if (filename.indexOf('-chunk-') > -1) {
        webpackAssets.javascripts.chunks.push(`${webpackPublicPath}${filename}`)
      }
    }

    fs.writeFileSync('./webpack-assets.json', JSON.stringify(webpackAssets))
    callback()
  })
}

const webpackConfig = {
  context: path.resolve(__dirname),
  entry: {
    main: './src/client.js'
  },
  output: {
    chunkFilename: '[name]-chunk-[chunkhash].js',
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
      }
    ]
  },
  plugins: [
    /*
      Do not retreive the global value via code like `_.get(process, `env.NODE_ENV`)`.
      Because the `process.env` is a empty object untouched by `webpack.DefinePlugin`.
    */
    new webpack.DefinePlugin({
      'process.env.BROWSER': true,
      'process.env.NODE_ENV': JSON.stringify(config.nodeEnv),
      'process.env.RELEASE_BRANCH': JSON.stringify(config.releaseBranch),
      __CLIENT__: true,
      __DEVELOPMENT__: !isProduction,
      __DEVTOOLS__: true  // <-------- DISABLE redux-devtools HERE
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    new ReactLoadablePlugin({
      filename: './react-loadable.json'
    }),
    new BundleListPlugin()
  ]
}


if (isProduction) {
  webpackConfig.plugins.push(
    // css files from the extract-text-plugin loader
    new ExtractTextPlugin({
      // write css filenames into webpack-assets.json
      filename: function (getPath) {
        const filename = getPath('[chunkhash].[name].css')
        webpackAssets.stylesheets.push(webpackPublicPath + filename)
        fs.writeFileSync('./webpack-assets.json', JSON.stringify(webpackAssets))
        return filename
      },
      disable: false,
      allChunks: true
    }),
    new webpack.optimize.UglifyJsPlugin()
    //   new BundleAnalyzerPlugin()
  )
} else {
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )
}

module.exports = webpackConfig
