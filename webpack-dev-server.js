/* eslint no-console:0 */
const webpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')

const webpackConfig = require('./webpack.config.js')

const options = {
  headers: {'Access-Control-Allow-Origin': '*'},
  host: webpackConfig.devServer.host,
  port: webpackConfig.devServer.port,
  hot: true,
  inline: true,
  lazy: false,
  noInfo: false,
  publicPath: webpackConfig.output.publicPath,
  quiet: false,
  stats: {colors: true}
}

webpackDevServer.addDevServerEntrypoints(webpackConfig, options)
const compiler = webpack(webpackConfig)
const server = new webpackDevServer(compiler, options)

server.listen(5000, 'localhost', () => {
    console.log('dev server listening on port 5000')
})
