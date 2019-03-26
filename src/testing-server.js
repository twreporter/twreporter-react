import { NotFoundError } from './custom-error'
import apiEndpoints from '@twreporter/redux/lib/constants/api-endpoints'
import author1 from '../static/mock-data/author1.json'
import author2 from '../static/mock-data/author2.json'
import author3 from '../static/mock-data/author3.json'
import author4 from '../static/mock-data/author4.json'
import authors from '../static/mock-data/authors.json'
import categoryConst from './constants/category'
import Express from 'express'
import filter from 'lodash/filter'
import find from 'lodash/find'
import fullposts from '../static/mock-data/fullposts.json'
import get from 'lodash/get'
import indexPage from '../static/mock-data/index-page.json'
import indexPageCategories from '../static/mock-data/index-page-categories.json'
import map from 'lodash/map'
import net from 'net'
import posts from '../static/mock-data/posts.json'
import PrettyError from 'pretty-error'
import qs from 'qs'
import topics from '../static/mock-data/topics.json'

const app = Express()
const host = process.env.HOST || 'localhost'
const port = process.env.PORT || 8080
const APIVersion = 'v1'
const router = Express.Router()

const _ = {
  get: get,
  filter: filter,
  map: map,
  find: find
}

/**
 * Make an object of listed posts
 * @param {Number} total
 * @param {Number} offset
 * @param {Number} limit
 * @param {Array} records
 * @returns {Object}
 */
function _resultMaker(total, offset, limit, records) {
  return {
    meta: {
      total: total,
      offset: offset,
      limit: limit
    },
    records: records,
    status: 'ok'
  }
}

/**
 * Get filtered posts by arguments of categories or tags
 * @param {String} id
 * @param {Number} limit
 * @param {Number} offset
 * @param {String} type
 * @returns {Object}
 */
const _getListedPosts = (id, limit, offset = 0, type = 'categories') => {
  const filteredPosts = _.filter(_.get(posts, 'records'), (record) => {
    if(typeof record[type] != 'undefined') {
      return record[type].some((o) => {
        return o.id === id
      })
    }
  })
  const records = filteredPosts.slice(offset, offset + limit)
  return _resultMaker(filteredPosts.length, offset, limit, records)
}

/**
 * Get all of the posts in one topic to form the topic landing page
 * @param {String} slug
 * @returns {Array}
 */
const _getAFullTopic = (slug) => {
  return _.filter(_.get(topics, 'records'), (record) => {
    return record['slug'] === slug
  })
}

/**
 * Get Listed topics in topic page
 * @param {Number} limit
 * @param {Number} offset
 * @returns {Object}
 */
const _getTopicPosts = (limit, offset = 0) => {
  const topicPosts = _.get(topics, 'records')
  const records = topicPosts.slice(offset, offset + limit)
  return _resultMaker(topicPosts.length, offset, limit, records)
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

router.param('slug', (req, res, next, slug) => {
  req.slug = slug
  next()
})

router.route(`/${apiEndpoints.posts}/:slug`)
  .get((req, res) => {
    const { full } = req.query
    if (typeof full !== 'undefined' ) {
      const slug = req.slug
      const post = _.find(fullposts['records'], (record) => {
        return record.slug === slug
      })
      if (typeof post !== 'undefined') {
        res.json({
          record: post,
          status: 'ok'
        })
      } else {
        throw new NotFoundError()
      }
    }
  })

router.route(`/${apiEndpoints.posts}/`)
  .get((req, res) => {
    const { where, limit, offset } = req.query
    const _limit = Number(limit)
    const _offset = Number(offset)
    if (typeof where !== 'undefined') {
      const _where = JSON.parse(where)
      if (typeof _where['categories'] !== 'undefined') {
        const listID = _where['categories']['in'][0]
        res.json(_getListedPosts(listID, _limit, _offset))
      } else if (typeof _where['style'] !== 'undefined') {
        const style = _where['style']
        res.json(_getListedPosts(categoryConst.ids[style], _limit))
      } else if (typeof _where['tags'] !== 'undefined') {
        const tag = _where['tags']['in'][0]
        res.json(_getListedPosts(tag, _limit, _offset, 'tags'))
      }
    } else {
      res.json(posts)
    }
  })

/**
 * Under development circumstance, fetch full topics data in list at once for not to create too many mock data files.
 * However, the listing data of topics will be fetched only in simplified version under production circumstance.
 * And the complete data of each topic (including `relates` and `leading-video` entries) would be fetched by this endpoint if user clicked to see more.
 */
router.route(`/${apiEndpoints.topics}/:slug`)
  .get((req, res) => {
    if (req.query.full) {
      const fullTopic = _getAFullTopic(req.slug)
      if (fullTopic.length > 0) {
        res.json({
          record: fullTopic[0],
          status: 'ok'
        })
      } else {
        throw new NotFoundError()
      }
    }
  })

router.route(`/${apiEndpoints.topics}/`)
  .get((req, res) => {
    const { limit, offset } = req.query
    const _limit = Number(limit)
    const _offset = Number(offset)
    res.json(_getTopicPosts(_limit, _offset))
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

router.route(`/${apiEndpoints.indexPage}/`)
  .get((req, res) => {
    res.json(indexPage)
  })

router.route(`/${apiEndpoints.indexPageCategories}/`)
  .get((req, res) => {
    res.json(indexPageCategories)
  })

//
// Error handling
//
const pe = new PrettyError()
pe.skipNodeFiles()
pe.skipPackage('express')

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.log(pe.render(err)) // eslint-disable-line no-console
  if (err instanceof NotFoundError || get(err, 'response.status') === 404) {
    res.redirect('/error/404')
  } else {
    res.redirect('/error/500')
  }
})

_checkIfPortIsTaken(port)
  .then((thePortIsTaken) => {
    if(!thePortIsTaken) {
      app.use(`/${APIVersion}/`, router)
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
