const NODE_ENV = process.env.NODE_ENV

const webpackConfig = {
  webpackOutputFilename: NODE_ENV === 'production' ? 'main.[hash].bundle.js' : 'main.dev.bundle.js',
  webpackPublicPath: NODE_ENV === 'production' ? '/dist/' : 'http://localhost:5000/dist/',
}

const defaultRegConfig = {
  apiUrl: 'http://testtest.twreporter.org:8080',
  signIn: '/v1/signin',
  activate: '/v1/activate',
  renew: '/v1/token',
  bookmark: '/bookmarks',
  user: '/v1/users',
  oAuthProviders: {
    google: '/v1/auth/google',
    facebook: '/v1/auth/facebook'
  },
  host: 'http://testtest.twreporter.org:3000'
}

const env = {
  master: {
    registrationConfigure: defaultRegConfig,
    API_PORT: 8080,
    API_HOST: 'localhost',
    API_PROTOCOL: 'http'
  },
  preview: {
    registrationConfigure: defaultRegConfig,
    API_PORT: 443,
    API_HOST: 'staging-go-api.twreporter.org',
    API_PROTOCOL: 'https'
  },
  staging: {
    registrationConfigure: Object.assign({}, defaultRegConfig, {
      apiUrl: 'https://staging-go-api.twreporter.org',
      host: 'https://staging.twreporter.org'
    }),
    API_PORT: 443,
    API_HOST: 'staging-go-api.twreporter.org',
    API_PROTOCOL: 'https'
  },
  release: {
    registrationConfigure: Object.assign({}, defaultRegConfig, {
      apiUrl: 'https://go-api.twreporter.org',
      host: 'https://www.twreporter.org'
    }),
    API_PORT: 443,
    API_HOST: 'go-api.twreporter.org',
    API_PROTOCOL: 'https'
  }
}[process.env.RELEASE_BRANCH || 'master']

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: parseInt(process.env.PORT) || 3000,
  webpackDevServerHost: 'localhost',
  webpackDevServerPort: 5000,
}, env, webpackConfig)
