/* eslint no-console:0 */
const WebpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')

const webpackConfig = require('./webpack.config.js')

const options = {
  headers: { 'Access-Control-Allow-Origin': '*' },
  host: webpackConfig.devServer.host,
  port: webpackConfig.devServer.port,
  hot: true,
  devMiddleware: {
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true },
  },
}

const compiler = webpack(webpackConfig)
const server = new WebpackDevServer(options, compiler)

;(async () => {
  await server.start()
  console.log('dev server listening on port ', webpackConfig.devServer.port)
})()
