// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const config = require('./config')
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const ReactLoadablePlugin = require('@loadable/webpack-plugin')

const isProduction = config.nodeEnv !== 'development'
const webpackDevServerHost = config.webpackDevServerHost
const webpackDevServerPort = config.webpackDevServerPort
const webpackPublicPath = config.webpackPublicPath
const webpackOutputFilename = config.webpackOutputFilename

const webpackAssets = {
  javascripts: {
    chunks: [],
    vendors: [],
    main: '',
    manifest: '',
  },
  stylesheets: [],
}

function BundleListPlugin() {}

// BundleListPlugin is used to write the filename of bundles
// such as
// - babel transpile es6 or advanced javascript into es5
// - group node_modules files
// - code splitting
// into webpack-assets.json
BundleListPlugin.prototype.apply = function(compiler) {
  compiler.plugin('emit', function(compilation, callback) {
    for (const filename in compilation.assets) {
      if (filename.startsWith('main')) {
        webpackAssets.javascripts.main = `${webpackPublicPath}${filename}`
      } else if (filename.startsWith('manifest')) {
        webpackAssets.javascripts.manifest = `${webpackPublicPath}${filename}`
      } else if (filename.endsWith('.chunk.js')) {
        webpackAssets.javascripts.chunks.push(`${webpackPublicPath}${filename}`)
      } else {
        webpackAssets.javascripts.vendors.push(
          `${webpackPublicPath}${filename}`
        )
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
  mode: isProduction ? 'production' : 'development',
  optimization: {
    splitChunks: { chunks: 'all' },
  },
  context: path.resolve(__dirname),
  entry: {
    main: './src/client.js',
  },
  output: {
    chunkFilename: '[name].[chunkhash].chunk.js',
    filename: webpackOutputFilename,
    path: path.join(__dirname, 'dist'),
    publicPath: webpackPublicPath,
    hashFunction: 'sha256',
  },
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    host: webpackDevServerHost,
    port: webpackDevServerPort,
    quiet: false,
    inline: true,
    lazy: false,
    overlay: false,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.jsx?$/,
        include: path.join(
          __dirname,
          'node_modules/@twreporter/react-article-components/lib'
        ),
        use: 'babel-loader',
      },
      {
        test: /\.(woff(2)?|ttf|eot)$/,
        loader: 'url-loader',
        options: {
          limit: 4096,
          name: './fonts/[name].[ext]?[hash]', // was '/fonts/[name].[ext]?[hash]',
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      // import winston from 'winston'
      // ->
      // import winston from 'src/logger/noop.js'
      winston: path.resolve(__dirname, 'src/logger/noop.js'),
      // import lw from '@google-cloud/logging-winston'
      // ->
      // import lw from 'src/logger/noop.js'
      '@google-cloud/logging-winston': path.resolve(
        __dirname,
        'src/logger/noop.js'
      ),
      // the above alias is used to not import node-specific module into webpack bundle
    },
  },
  plugins: [
    /*
      Do not retreive the global value via code like `_.get(process, `env.NODE_ENV`)`.
      Because the `process.env` is a empty object untouched by `webpack.DefinePlugin`.
    */
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(config.nodeEnv),
      'process.env.RELEASE_BRANCH': JSON.stringify(config.releaseBranch),
    }),

    // This plugin will cause hashes to be based on the relative path of the module,
    // generating a four character string as the module id
    // Ref: https://webpack.js.org/plugins/hashed-module-ids-plugin/
    new webpack.HashedModuleIdsPlugin(),

    new ReactLoadablePlugin({
      writeToDisk: { filename: path.resolve(__dirname) },
    }),

    new BundleListPlugin(),
  ],
}

if (isProduction) {
  webpackConfig.optimization.minimize = true
} else {
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin({ multiStep: true })
  )
}

module.exports = webpackConfig
