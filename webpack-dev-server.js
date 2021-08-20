/* eslint no-console:0 */
const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')

const webpackConfig = require('./webpack.config.js')

const options = {
  headers: { 'Access-Control-Allow-Origin': '*' },
  host: webpackConfig.devServer.host,
  port: webpackConfig.devServer.port,
  hot: true,
  inline: true,
  lazy: false,
  noInfo: false,
  publicPath: webpackConfig.output.publicPath,
  quiet: false,
  stats: { colors: true },
}

WebpackDevServer.addDevServerEntrypoints(webpackConfig, options)
const compiler = webpack(webpackConfig)
const server = new WebpackDevServer(compiler, options)

server.listen(webpackConfig.devServer.port, '192.168.0.16', () => {
  console.log('dev server listening on port ', webpackConfig.devServer.port)
})
