require('babel-core/register')

var port = 3000
var server = require('./server.js')

console.log(`Server is listening to port: ${port}`) //eslint-disable-line no-console
server.listen(port)
