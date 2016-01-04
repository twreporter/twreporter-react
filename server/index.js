'use strict'
require('babel-core/register')

let port = 3000
let server = require('./server.js')

console.log(`Server is listening to port: ${port}`) //eslint-disable-line no-console
server.listen(port)
