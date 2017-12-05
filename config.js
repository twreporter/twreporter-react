const environment = {
  development: {
    isProduction: false,
    webpackOutputFilename: 'main.dev.bundle.js',
    webpackPublicPath: 'http://localhost:5000/dist/'
  },
  production: {
    isProduction: true,
    webpackOutputFilename: 'main.[hash].bundle.js',
    webpackPublicPath: '/dist/'
  }
}[process.env.NODE_ENV || 'development']

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: parseInt(process.env.PORT) || 3000,
  webpackDevServerHost: 'localhost',
  webpackDevServerPort: 5000,
}, environment)
