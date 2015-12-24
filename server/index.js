require('babel/register')

(function () {
  "use strict"
  const port = 3000
  let server = require('./server.js')

  console.log(`Server is listening to port: ${port}`) //eslint-disable-line no-console
  server.listen(port)
})()
