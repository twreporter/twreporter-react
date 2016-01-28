import express from 'express'
import { mapUrl } from 'utils/url.js'
import * as actions from './actions/index'
// import PrettyError from 'pretty-error'

// const pretty = new PrettyError()
const app = express()

app.use((req, res) => {
  const splittedUrlPath = req.url.split('?')[0].split('/').slice(1)

  const { action, params } = mapUrl(actions, splittedUrlPath)

  if (action) {
    action(req, params)
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
          // console.error('API ERROR:', pretty.render(reason))
          res.status(reason.status || 500).json(reason)
        }
      })
  } else {
    res.status(404).end('NOT FOUND')
  }
})

module.exports = app
