const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development']

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: parseInt(process.env.PORT) || 3000,
  apiProtocol: process.env.APIPROTOCOL || 'http',
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: parseInt(process.env.APIPORT) || 3030,
  app: {
    title: '報導者The Reporter',
    description: '報導者致力於具有手作質感的深度報導，並勇於探索網路新工具與呈現方式，重視網路的公共性與開放性，結合各種進步價值與公民力量。'
  }
}, environment)
