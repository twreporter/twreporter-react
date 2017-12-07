const regConfig = {
  apiUrl: 'http://testtest.twreporter.org:8080',
  signIn: '/v1/signin',
  activate: '/v1/activate',
  oAuthProviders: {
    google: '/v1/auth/google',
    facebook: '/v1/auth/facebook'
  },
  host: 'http://testtest.twreporter.org:3000'
}

const environment = {
  development: {
    webpackOutputFilename: 'main.dev.bundle.js',
    webpackPublicPath: 'http://localhost:5000/dist/',
    registrationConfigure: regConfig
  },
  staging: {
    webpackOutputFilename: 'main.[hash].bundle.js',
    webpackPublicPath: '/dist/',
    registrationConfigure: Object.assign({}, regConfig, {
      apiUrl: 'https://staging-go-api.twreporter.org',
      host: 'https://staging.twreporter.org'
    })
  },
  production: {
    webpackOutputFilename: 'main.[hash].bundle.js',
    webpackPublicPath: '/dist/',
    registrationConfigure: Object.assign({}, regConfig, {
      apiUrl: 'https://go-api.twreporter.org',
      host: 'https://www.twreporter.org'
    })
  }
}[process.env.NODE_ENV || 'development']

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: parseInt(process.env.PORT) || 3000,
  webpackDevServerHost: 'localhost',
  webpackDevServerPort: 5000,
}, environment)
