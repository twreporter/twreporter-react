var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/only-dev-server',
    './app'
  ],
  resolve: {
    root: [ __dirname ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    chunkFilename: "[id].js",
    publicPath: 'http://localhost:3001/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin("commons", "commons.js"),
    new ExtractTextPlugin("[name].css"),
    new ExtractTextPlugin("style.css", {
      allChunks: true
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
      include: __dirname,
      query: {
        optional: ['runtime'],
        stage: 2,
        env: {
          development: {
            plugins: [
              'react-transform'
            ],
            extra: {
              'react-transform': {
                'transforms': [{
                  'transform':  'react-transform-hmr',
                  imports: ['react'],
                  locals:  ['module']
                }]
              }
            }
          }
        }
      }
    },
    {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
    }
    ]
  },
  plugins: [
    new ExtractTextPlugin("[name].css")
  ]
};
