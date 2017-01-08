/*eslint no-console: 0*/

import { mapUrl } from './utils/url.js'
import * as actions from './actions/index'
import PrettyError from 'pretty-error'
import upstreamConfig from './config'
import express from 'express'
import redis from 'redis'
import serverConfig from '../server/config'

const EXPIRE = 3600 // 1 hour
const pretty = new PrettyError()
const app = express()

let redisClient = redis.createClient({
  host: upstreamConfig.REDIS_HOST || 'localhost',
  port: upstreamConfig.REDIS_PORT || 6379,
  retry_strategy: function (options) {
    if (options.error.code === 'ECONNREFUSED') {
      // End reconnecting on a specific error and flush all commands with a individual error
      return new Error('The server refused the connection')
    }
    if (options.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all commands with a individual error
      return new Error('Retry time exhausted')
    }
    if (options.times_connected > 10) {
      // End reconnecting with built in error
      return undefined
    }
    // reconnect after
    return Math.max(options.attempt * 100, 3000)
  }
})

function getDataFromRedis(url) {
  return new Promise((resolve, reject) => {
    redisClient.get(url, (err, reply) => {
      try {
        reply = JSON.parse(reply)
        // url is not cached
        if (reply === null) {
          return reject()
        }
        // cached
        return resolve(reply)
      } catch(e) {
        console.warn('Getting cache from REDIS occurs error: ', e)
        return reject(e)
      }
    })
  })
}

function getDataFromAPI(req, res) {
  const splittedUrlPath = req.url.split('?')[0].split('/').slice(1)
  const { action, params } = mapUrl(actions, splittedUrlPath)
  if (action) {
    action(req, params)
      .then((result) => {
        if (result instanceof Function) {
          result(res)
        } else {
          res.json(result)
          if (result !== null && result !== undefined && serverConfig.isRedisEnabled) {
            redisClient.setex(req.url, EXPIRE, JSON.stringify(result), redis.print)
          }
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
}

app.use((req, res) => {
  if (serverConfig.isRedisEnabled) {
    getDataFromRedis(req.url).then((cacheData) => {
      res.json(cacheData)
    }, (reason) => { // eslint-disable-line
      getDataFromAPI(req, res)
    })
  } else {
    getDataFromAPI(req, res)
  }
})

if (serverConfig.apiPort) {
  app.listen(serverConfig.apiPort, (err) => {
    if (err) {
      console.error(err)
    }
    console.info('----\n==> 🌎  API is running on port %s', serverConfig.apiPort)
    console.info('==> 💻  Send requests to http://%s:%s', serverConfig.apiHost, serverConfig.apiPort)
  })
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified')
}
