const nodeEnv = process.env.NODE_ENV || 'development'
const releaseBranch = process.env.RELEASE_BRANCH || 'master'

const webpackDevServerHost = process.env.DEV_HOST || 'localhost'
const webpackDevServerPort = 5050

const webpackConfig = {
  webpackOutputFilename:
    nodeEnv === 'production'
      ? '[name].[chunkhash].bundle.js'
      : '[name].dev.bundle.js',
  webpackPublicPath:
    nodeEnv === 'production'
      ? '/dist/'
      : `http://${webpackDevServerHost}:${webpackDevServerPort}/dist/`,
}

module.exports = Object.assign(
  {
    applicationServerPublicKey:
      process.env.APPLICATION_SERVER_PUBLIC_KEY ||
      'BHkStXEZjGMSdCHolgJAdmREB75lfi42OLNyRt4NRkLu_FEJYR-7Jv8hho1TSuYxTw2GqpYc3tLrotc55DfaNx0',
    cookieSecret: process.env.COOKIE_SECRET || 'twreporter-cookie-secret',
    host: process.env.HOST || 'localhost',
    nodeEnv,
    port: parseInt(process.env.PORT) || 3000,
    releaseBranch: releaseBranch,
    webpackDevServerHost,
    webpackDevServerPort,
  },
  webpackConfig
)
