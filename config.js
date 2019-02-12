const nodeEnv = process.env.NODE_ENV || 'development'
const releaseBranch = process.env.RELEASE_BRANCH || 'master'

const webpackDevServerPort = 5000

const webpackConfig = {
  webpackOutputFilename: nodeEnv === 'production' ? '[name].[hash].bundle.js' : '[name].dev.bundle.js',
  webpackPublicPath: nodeEnv === 'production' ? '/dist/' : `http://localhost:${webpackDevServerPort}/dist/`
}

const env = {
  master: {
    API_PORT: 8080,
    API_HOST: 'localhost',
    API_PROTOCOL: 'http'
  },
  preview: {
    API_PORT: 443,
    API_HOST: 'staging-go-api.twreporter.org',
    API_PROTOCOL: 'https'
  },
  staging: {
    API_PORT: 443,
    API_HOST: 'staging-go-api.twreporter.org',
    API_PROTOCOL: 'https'
  },
  release: {
    API_PORT: 443,
    API_HOST: 'go-api.twreporter.org',
    API_PROTOCOL: 'https'
  }
}[releaseBranch]

module.exports = Object.assign({
  cookieSecret: process.env.COOKIE_SECRET || 'twreporter-cookie-secret',
  host: process.env.HOST || 'localhost',
  nodeEnv: nodeEnv,
  port: parseInt(process.env.PORT) || 3000,
  releaseBranch: releaseBranch,
  webpackDevServerHost: 'localhost',
  webpackDevServerPort: webpackDevServerPort
}, env, webpackConfig)
