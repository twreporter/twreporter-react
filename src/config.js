const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development']

const DEV_PORT = 3000
const DEV_HOST = 'localhost'
const DEV_API_PORT = 8080
const DEV_DOMAIN = 'testtest.twreporter.org'
const DEV_PROTOCOL = 'http'

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: parseInt(process.env.PORT) || 3000,
  apiProtocol: process.env.APIPROTOCOL || 'http',
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: parseInt(process.env.APIPORT) || 3030,
  isRedisEnabled: process.env.REDIS_ENABLE === 'true',
  app: {
    title: '報導者The Reporter',
    description: '《報導者》是由「財團法人報導者文化基金會」成立的非營利網路媒體，致力於公共領域的深度報導及調查報導，為讀者持續追蹤各項重要議題。我們秉持開放參與的精神，結合各種進步價值與公民力量，共同打造多元進步的社會與媒體環境。'
  },
  registrationConfigure: {
    apiUrl: environment.isProduction ? `${process.env.APIPROTOCOL}://${process.env.APIHOST}` : `${DEV_PROTOCOL}://${DEV_HOST}:${DEV_API_PORT}`,
    forgetPassword: '/v1/forget-password',
    changePassword: '/v1/change-password',
    signUp: '/v1/signup',
    signIn: '/v1/login',
    activate: '/v1/activate',
    oAuthProviders: {
      google: '/v1/auth/google',
      facebook: '/v1/auth/facebook'
    },
    location: environment.isProduction ? `${process.env.PROTOCOL}://${process.env.HOST}` : `${DEV_PROTOCOL}://${DEV_DOMAIN}:${DEV_PORT}`,
    domain: environment.isProduction ? process.env.DOMAIN : DEV_DOMAIN
  }
}, environment)
