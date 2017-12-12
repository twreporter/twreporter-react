const NODE_ENV = process.env.NODE_ENV

const webpackConfig = {
  webpackOutputFilename: NODE_ENV === 'production' ? 'main.[hash].bundle.js' : 'main.dev.bundle.js',
  webpackPublicPath: NODE_ENV === 'production' ? '/dist/' : 'http://localhost:5000/dist/',
}

const defaultRegConfig = {
  apiUrl: 'http://testtest.twreporter.org:8080',
  signIn: '/v1/signin',
  activate: '/v1/activate',
  oAuthProviders: {
    google: '/v1/auth/google',
    facebook: '/v1/auth/facebook'
  },
  host: 'http://testtest.twreporter.org:3000'
}

const regConfig = {
  development: {
    registrationConfigure: defaultRegConfig
  },
  staging: {
    registrationConfigure: Object.assign({}, defaultRegConfig, {
      apiUrl: 'https://staging-go-api.twreporter.org',
      host: 'https://staging.twreporter.org'
    })
  },
  production: {
    registrationConfigure: Object.assign({}, defaultRegConfig, {
      apiUrl: 'https://go-api.twreporter.org',
      host: 'https://www.twreporter.org'
    })
  }
}[process.env.RELEASE_BRANCH || 'development']

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: parseInt(process.env.PORT) || 3000,
  webpackDevServerHost: 'localhost',
  webpackDevServerPort: 5000,
}, regConfig, webpackConfig)
