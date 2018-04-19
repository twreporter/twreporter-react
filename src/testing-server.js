import { NotFoundError } from './custom-error'
import apiEndpoints from '@twreporter/redux/lib/constants/api-endpoints'
import author1 from '../static/mock-data/author1.json'
import author2 from '../static/mock-data/author2.json'
import author3 from '../static/mock-data/author3.json'
import author4 from '../static/mock-data/author4.json'
import authors from '../static/mock-data/authors.json'
import categoryListID from './conf/category-list-id'
import Express from 'express'
import filter from 'lodash/filter'
import find from 'lodash/find'
import fullposts from '../static/mock-data/fullposts.json'
import get from 'lodash/get'
import indexPage from '../static/mock-data/index-page.json'
import indexPageCategories from '../static/mock-data/index-page-categories.json'
import map from 'lodash/map'
import posts from '../static/mock-data/posts.json'
import PrettyError from 'pretty-error'
import qs from 'qs'
import topics from '../static/mock-data/topics.json'

const app = Express()
const port = process.env.PORT || 8080 
const router = Express.Router()

const _ = {
  get: get,
  filter: filter,
  map: map,
  find: find
}

const _getListedPosts = (listID, limit, offset = 0) => {
  const filteredPosts = _.filter(_.get(posts, 'records'), (record) => {
    if(record['categories']) {
      return record.categories[0].id === listID
    } 
  })
  const meta = {
    total: filteredPosts.length,
    offset: offset,
    limit: limit
  }
  const records = filteredPosts.slice(offset, offset + limit)
  const result = {
    meta: meta,
    records: records,
    status: 'ok'
  }
  return result
}

const _getAFullTopic = (slug) => {
  return _.filter(_.get(topics, 'records'), (record) => {
    return record['slug'] === slug
  })
}

const _getTopicPosts = (limit, offset = 0) => {
  const topicPosts = _.get(topics, 'records')
  const meta = {
    total: topicPosts.length,
    offset: offset,
    limit: limit
  }
  const records = topicPosts.slice(offset, offset + limit)
  const result = {
    meta: meta,
    records: records,
    status: 'ok'
  }
  return result
}

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

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
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
    const { where, limit, offset, full } = req.query
    const _limit = Number(limit)
    const _offset = Number(offset)
    if (typeof where !== 'undefined' ) {
      const _where = JSON.parse(where)
      if (_where['categories']) {
        const listID = _where['categories']['in'][0]
        res.json(_getListedPosts(listID, _limit, _offset))
      } else if (_where['style']) {
        const style = _where['style']
        res.json(_getListedPosts(categoryListID[style], _limit))
      }
    } else {
      if (typeof full !== 'undefined' ) {
        const slug = req.slug
        const post = _.find(fullposts['records'], (record) => {
          return record.slug === slug
        })
        res.json({
          record: post,
          status: 'ok'
        })
      }
    }
  })

/**
 * Under development circumstance, fetch full topics data in list at once for not to create too many topics mock data files.
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
        res.redirect('/error/404')
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

router.route(`/search/:searchParam/`)
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

app.use('/v1/', router)
app.listen(port, () => {
  console.log('Started testing server at port', port)  // eslint-disable-line no-console
})
