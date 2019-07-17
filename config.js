const nodeEnv = process.env.NODE_ENV || 'development'
const releaseBranch = process.env.RELEASE_BRANCH || 'master'

const webpackDevServerPort = 5000

const webpackConfig = {
  webpackOutputFilename: nodeEnv === 'production' ? '[name].[hash].bundle.js' : '[name].dev.bundle.js',
  webpackPublicPath: nodeEnv === 'production' ? '/dist/' : `http://localhost:${webpackDevServerPort}/dist/`
}

module.exports = Object.assign({
  cookieSecret: process.env.COOKIE_SECRET || 'twreporter-cookie-secret',
  host: process.env.HOST || 'localhost',
  nodeEnv: nodeEnv,
  port: parseInt(process.env.PORT) || 3000,
  releaseBranch: releaseBranch,
  webpackDevServerHost: 'localhost',
  webpackDevServerPort: webpackDevServerPort
}, webpackConfig)
