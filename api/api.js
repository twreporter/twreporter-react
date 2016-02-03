/*eslint no-console: 0*/

import config from '../server/config'
import express from 'express'
import * as actions from './actions/index'
import PrettyError from 'pretty-error'

const pretty = new PrettyError()
const app = express()

app.use((req, res) => {
  const splittedUrlPath = req.url.split('?')[0].split('/').slice(1)
  let action = actions[splittedUrlPath]

  if (action) {
    action(req)
      .then((result) => {
        if (result instanceof Function) {
          result(res)
        } else {
          res.json(result)
        }
      }, (reason) => {
        if (reason && reason.redirect) {
          res.redirect(reason.redirect)
        } else {
          console.error('API ERROR:', pretty.render(reason))
          res.status(reason.status || 500).json(reason)
        }
      })
  } else {
    res.status(404).end('NOT FOUND')
  }
})

if (config.apiPort) {
  app.listen(config.apiPort, (err) => {
    if (err) {
      console.error(err)
    }
    console.info('----\n==> 🌎  API is running on port %s', config.apiPort)
    console.info('==> 💻  Send requests to http://%s:%s', config.apiHost, config.apiPort)
  })
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified')
}
