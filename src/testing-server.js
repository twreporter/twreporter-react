import apiEndpoints from '@twreporter/redux/lib/constants/api-endpoints'
import author1 from './mock-data/author1.json'
import author2 from './mock-data/author2.json'
import author3 from './mock-data/author3.json'
import author4 from './mock-data/author4.json'
import authors from './mock-data/authors.json'
import Express from 'express'
import get from 'lodash/get'
import net from 'net'
import qs from 'qs'

// mock api response
import mockIndexPageResponse from './mock-data/v2/index-page'
import { mockAPostResponse, mockPostsResponse } from './mock-data/v2/posts'
import { mockATopicResponse, mockTopicsResponse } from './mock-data/v2/topics'

const app = Express()
const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 8080
const router = Express.Router()
const v2router = Express.Router()

const _ = {
  get: get,
}

/**
 * Get author's id and return the full mock data of the author
 * @param {String} authorId
 * @returns {Object}
 */
const _selectAuthor = (authorId) => {
  switch (authorId) {
    case '591ac386507c6a0d00ab0490':
      return author1
    case '571de7bbdae62379576d7f42':
      return author2
    case '5757f8498e4c2b171bcaf7dc':
      return author3
    case '57b13f774310e41200a0dc01':
      return author4
  }
}

const _checkIfPortIsTaken = (port) => new Promise((resolve, reject) => {
  const tester = net.createServer()
    .once('error', err => (err.code == 'EADDRINUSE' ? resolve(true) : reject(err)))
    .once('listening', function () {
      tester.once('close', function () { resolve(false) }).close()
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

v2router.route(`/${apiEndpoints.posts}/:slug`)
  .get((req, res) => {
    const slug = req.params.slug
    const full = _.get(req, 'query.full', false)
    const apiResponse = mockAPostResponse(slug, full)
    switch(apiResponse.status) {
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
        return
      }
    }
  })

v2router.route(`/${apiEndpoints.posts}/`)
  .get((req, res) => {
    const { limit='10', offset='0', id, category_id, tag_id } = req.query
    const _limit = Number(limit)
    const _offset = Number(offset)

    res.json(mockPostsResponse(_limit, _offset, id, category_id, tag_id))
  })

v2router.route(`/${apiEndpoints.topics}/`)
  .get((req, res) => {
    const { limit='10', offset='0' } = req.query
    const _limit = Number(limit)
    const _offset = Number(offset)
    res.json(mockTopicsResponse(_limit, _offset))
  })

v2router.route(`/${apiEndpoints.topics}/:slug`)
  .get((req, res) => {
    const slug = req.params.slug
    const full = _.get(req, 'query.full', false)
    const apiResponse = mockATopicResponse(slug, full)
    switch(apiResponse.status) {
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
        return
      }
    }
  })

const _searchResult = (param, authorId) => {
  switch(param) {
    case 'authors':
      return authors
    case 'posts':
      return _selectAuthor(authorId)
  }
}

router.param('searchParam', (req, res, next, searchParam) => {
  req.searchParam = searchParam
  next()
})

router.route('/search/:searchParam/')
  .get((req, res) => {
    const { keywords, filters, hitsPerPage, page } = req.query
    const _hitsPerPage = Number(hitsPerPage)
    const _page = Number(page)
    const list = _searchResult(req.searchParam, keywords)
    const paginatedList = list['hits'].slice(_hitsPerPage * _page, _hitsPerPage * (_page + 1))
    const queryStringParams = {
      filters: filters,
      hitsPerPage: hitsPerPage,
      page: page,
      query: keywords
    }
    const result = {
      hits: paginatedList,
      hitsPerPage: hitsPerPage,
      nbHits: list['hits'].length,
      nbPages: Math.ceil(authors['hits'].length / hitsPerPage),
      page: _page,
      params: qs.stringify(queryStringParams),
      processingTimeMS: 1,
      query: keywords
    }
    res.json(result)
  })

v2router.route(`/${apiEndpoints.indexPage}/`)
  .get((req, res) => {
    res.json(mockIndexPageResponse())
  })

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(err) // eslint-disable-line no-console
  if (_.get(err, 'statusCode') === 404) {
    res.redirect('/error/404')
  } else {
    res.redirect('/error/500')
  }
})

_checkIfPortIsTaken(port)
  .then((thePortIsTaken) => {
    if(!thePortIsTaken) {
      app.use(`/v1/`, router)
      app.use('/v2/', v2router)
      app.listen(port, (err) => {
        if (err) throw new Error(err)
        console.log('==> 💻  Started testing server at http://%s:%s', host, port) // eslint-disable-line no-console
      })
    } else {
      console.error('==>     WARNINIG: The port %s is being used', port) // eslint-disable-line no-console
    }
  })
  .catch((err)=>{
    console.error(err) // eslint-disable-line no-console
  })
