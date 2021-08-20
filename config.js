const nodeEnv = process.env.NODE_ENV || 'development'
const releaseBranch = process.env.RELEASE_BRANCH || 'master'

const webpackDevServerPort = 5000

const webpackConfig = {
  webpackOutputFilename:
    nodeEnv === 'production'
      ? '[name].[chunkhash].bundle.js'
      : '[name].dev.bundle.js',
  webpackPublicPath:
    nodeEnv === 'production'
      ? '/dist/'
      : `http://192.168.0.16:${webpackDevServerPort}/dist/`,
}

module.exports = Object.assign(
  {
    cookieSecret: process.env.COOKIE_SECRET || 'twreporter-cookie-secret',
    host: process.env.HOST || '192.168.0.16',
    nodeEnv: nodeEnv,
    port: parseInt(process.env.PORT) || 3000,
    releaseBranch: releaseBranch,
    webpackDevServerHost: '192.168.0.16',
    webpackDevServerPort: webpackDevServerPort,
  },
  webpackConfig
)
