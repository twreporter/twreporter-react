/*eslint no-console: 0*/

import { mapUrl } from './utils/url.js'
import * as actions from './actions/index'
import PrettyError from 'pretty-error'
import upstreamConfig from './config'
import express from 'express'
import redis from 'redis'
import serverConfig from '../server/config'

const EXPIRE = 300 // 5 mins
const pretty = new PrettyError()
const app = express()
let isRedisConnected = false

const redisClient = redis.createClient({
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

redisClient.on('ready', () => {
  console.log('redis is ready')
  isRedisConnected = true
})

redisClient.on('connect', () => {
  console.log('redis is connected')
  isRedisConnected = true
})

redisClient.on('reconnecting', () => {
  console.log('redis is reconnecting')
  isRedisConnected = false
})

redisClient.on('error', (error) => {
  console.warn('redis occurs error:', error)
})

function timeout(ms, promise) {
  return new Promise((resolve, reject) => {
    promise.then(resolve, reject)
    setTimeout(() => {
      reject(new Error('Timeout after ' + ms + ' ms'))
    }, ms)
  })
}

function getDataFromRedis(url) {
  return new Promise((resolve, reject) => {
    redisClient.get(url, (err, reply) => {
      try {
        reply = JSON.parse(reply)
        // url is not cached
        if (reply === null) {
          return reject('reply is null')
        }
        // cached
        return resolve(reply)
      } catch(e) {
        console.warn('api_api_getDataFromRedis, getting cache from REDIS occurs error: ', e)
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
  if (serverConfig.isRedisEnabled && isRedisConnected) {
    timeout(1500, getDataFromRedis(req.url)).then((cacheData) => {
      res.json(cacheData)
    }, (reason) => { // eslint-disable-line
      console.warn('api_api_GetDataFromRedis, promise rejection: ', reason)
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
