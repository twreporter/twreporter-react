/* eslint camelcase: ["error", {ignoreDestructuring: true}] */

import apiEndpoints from '@twreporter/redux/lib/constants/api-endpoints'
import Express from 'express'
import get from 'lodash/get'
import net from 'net'

// mock api response
import mockIndexPageResponse from './mock-data/index-page'
import { mockAPostResponse, mockPostsResponse } from './mock-data/posts'
import { mockATopicResponse, mockTopicsResponse } from './mock-data/topics'
import {
  mockAuthorsResponse,
  mockAuthorDetailResponse,
  mockAuthorCollectionsResponse,
} from './mock-data/authors'

const app = Express()
const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 8080
const router = Express.Router()

const _ = {
  get: get,
}

const _checkIfPortIsTaken = port =>
  new Promise((resolve, reject) => {
    const tester = net
      .createServer()
      .once('error', err =>
        err.code === 'EADDRINUSE' ? resolve(true) : reject(err)
      )
      .once('listening', function() {
        tester
          .once('close', function() {
            resolve(false)
          })
          .close()
      })
      .listen(port)
  })

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  next()
})

router.use((req, res, next) => {
  console.log(req.method, req.url) // eslint-disable-line no-console
  next()
})

router.route(`/${apiEndpoints.posts}/:slug`).get((req, res) => {
  const slug = req.params.slug
  const full = _.get(req, 'query.full', false)
  const apiResponse = mockAPostResponse(slug, full)
  switch (apiResponse.status) {
    case 'success': {
      res.json(apiResponse)
      return
    }
    case 'fail': {
      res.status(404).json(apiResponse)
      return
    }
    case 'error':
    default: {
      res.status(500).json(apiResponse)
    }
  }
})

router.route(`/${apiEndpoints.posts}/`).get((req, res) => {
  const { limit = '10', offset = '0', id, category_id, tag_id } = req.query
  const _limit = Number(limit)
  const _offset = Number(offset)

  res.json(mockPostsResponse(_limit, _offset, id, category_id, tag_id))
})

router.route(`/${apiEndpoints.topics}/`).get((req, res) => {
  const { limit = '10', offset = '0' } = req.query
  const _limit = Number(limit)
  const _offset = Number(offset)
  res.json(mockTopicsResponse(_limit, _offset))
})

router.route(`/${apiEndpoints.topics}/:slug`).get((req, res) => {
  const slug = req.params.slug
  const full = _.get(req, 'query.full', false)
  const apiResponse = mockATopicResponse(slug, full)
  switch (apiResponse.status) {
    case 'success': {
      res.json(apiResponse)
      return
    }
    case 'fail': {
      res.status(404).json(apiResponse)
      return
    }
    case 'error':
    default: {
      res.status(500).json(apiResponse)
    }
  }
})

router.param('searchParam', (req, res, next, searchParam) => {
  req.searchParam = searchParam
  next()
})

router.route(`/${apiEndpoints.authors}/`).get((req, res) => {
  const { offset, limit } = req.query
  const _limit = Number(limit)
  const _offset = Number(offset)
  res.json(
    mockAuthorsResponse({
      limit: _limit || 10,
      offset: _offset || 0,
    })
  )
})

router.route(`/${apiEndpoints.authors}/:authorId/`).get((req, res) => {
  const authorId = req.params.authorId
  res.json(mockAuthorDetailResponse(authorId))
})

router.route(`/${apiEndpoints.authors}/:authorId/posts/`).get((req, res) => {
  const { offset, limit } = req.query
  const authorId = req.params.authorId
  const _limit = Number(limit)
  const _offset = Number(offset)
  res.json(
    mockAuthorCollectionsResponse({
      limit: _limit || 10,
      offset: _offset || 0,
      authorId,
    })
  )
})

router.route(`/${apiEndpoints.indexPage}/`).get((req, res) => {
  res.json(mockIndexPageResponse())
})

app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  console.log(err) // eslint-disable-line no-console
  if (_.get(err, 'statusCode') === 404) {
    res.redirect('/error/404')
  } else {
    res.redirect('/error/500')
  }
})

_checkIfPortIsTaken(port)
  .then(thePortIsTaken => {
    if (!thePortIsTaken) {
      app.use('/v2/', router)
      app.listen(port, err => {
        if (err) throw new Error(err)
        console.log(
          '==> 💻  Started testing server at http://%s:%s',
          host,
          port
        ) // eslint-disable-line no-console
      })
    } else {
      console.error('==>     WARNINIG: The port %s is being used', port) // eslint-disable-line no-console
    }
  })
  .catch(err => {
    console.error(err) // eslint-disable-line no-console
  })
