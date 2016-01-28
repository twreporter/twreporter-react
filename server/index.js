'use strict'
import config from '../config'
require('babel-core/register')

const server = require('./server.js')

console.log(`Server is listening to port: ${config.port}`) //eslint-disable-line no-console
server.listen(config.port)
