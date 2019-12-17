// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
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
    vendors: [],
    main: '',
    manifest: ''
  },
  stylesheets: []
}

function BundleListPlugin() {}

// BundleListPlugin is used to write the filename of bundles
// such as
// - babel transpile es6 or advanced javascript into es5
// - group node_modules files
// - code splitting
// into webpack-assets.json
BundleListPlugin.prototype.apply = function (compiler) {
  compiler.plugin('emit', function (compilation, callback) {
    for (const filename in compilation.assets) {
      if (filename.startsWith('main')) {
        webpackAssets.javascripts.main = `${webpackPublicPath}${filename}`
      } else if (filename.startsWith('manifest')) {
        webpackAssets.javascripts.manifest = `${webpackPublicPath}${filename}`
      } else if (filename.endsWith('.chunk.js')) {
        webpackAssets.javascripts.chunks.push(`${webpackPublicPath}${filename}`)
      } else {
        webpackAssets.javascripts.vendors.push(`${webpackPublicPath}${filename}`)
      }
    }

    fs.writeFileSync('./webpack-assets.json', JSON.stringify(webpackAssets))
    callback()
  })
}


//
// TO AVOID AMBIGUOUS:
// Chunk is webpack-specific term, which is used internally to manage the bundling process.
// Hence, we can treat 'bundle' and 'chunk' as the same thing here.
//
const webpackConfig = {
  context: path.resolve(__dirname),
  entry: {
    main: './src/client.js'
  },
  output: {
    chunkFilename: '[name].[chunkhash].chunk.js',
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
    // This plugin will cause hashes to be based on the relative path of the module,
    // generating a four character string as the module id
    // Ref: https://webpack.js.org/plugins/hashed-module-ids-plugin/
    new webpack.HashedModuleIdsPlugin(),

    // Move babel-polyfill and its dependecies into babel-polyfill bundle
    new webpack.optimize.CommonsChunkPlugin({
      name: 'babel-polyfill',
      chunks: ['main'],
      minChunks: function(module) {
        return module.context && (
          /node_modules\/(babel-polyfill|core-js|regenerator-runtime)/.test(module.context)
        )
      }
    }),

    // Move react, react-dom, react-*, redux, history and styled-components into react bundle
    new webpack.optimize.CommonsChunkPlugin({
      name: 'react',
      chunks: ['main'],
      minChunks: function(module) {
        return module.context && (
          /node_modules\/(react|history|redux|styled-components)/.test(module.context)
        )
      }
    }),

    // Move @twreporter/* package into twreporter bundle
    new webpack.optimize.CommonsChunkPlugin({
      name: 'twreporter',
      chunks: ['main'],
      minChunks: function(module) {
        return module.context && module.context.includes('node_modules/@twreporter')
      }
    }),

    // Move @twreporter/redux package into twreporter-redux bundle
    new webpack.optimize.CommonsChunkPlugin({
      name: 'twreporter-redux',
      chunks: ['twreporter'],
      minChunks: function(module) {
        return module.context && module.context.includes('node_modules/@twreporter/redux')
      }
    }),

    // Move @twreporter/react-components package into twreporter-react-components bundle
    new webpack.optimize.CommonsChunkPlugin({
      name: 'twreporter-react-components',
      chunks: ['twreporter'],
      minChunks: function(module) {
        return module.context && module.context.includes('node_modules/@twreporter/react-components')
      }
    }),

    // Move @twreporter/universal-header package into twreporter-universal-header bundle
    new webpack.optimize.CommonsChunkPlugin({
      name: 'twreporter-universal-header',
      chunks: ['twreporter'],
      minChunks: function(module) {
        return module.context && module.context.includes('node_modules/@twreporter/universal-header')
      }
    }),

    // Move packages except for react, react-*, styled-components and @twreporter/* into other-vendor bundle
    new webpack.optimize.CommonsChunkPlugin({
      name: 'other-vendors',
      chunks: ['main'],
      minChunks: function(module) {
        return module.context && (
          module.context.includes('node_modules')
        )
      }
    }),

    // Move any modules that occur in at least 2 chunks to a separate file
    new webpack.optimize.CommonsChunkPlugin({
      async: true,
      children: true,
      minChunks: 2
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
    new webpack.optimize.UglifyJsPlugin(),
    //  new BundleAnalyzerPlugin()
  )
} else {
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )
}

module.exports = webpackConfig
