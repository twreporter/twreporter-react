/*global afterEach, beforeEach, describe, it*/
'use strict'
import { expect } from 'chai'
import { getArticleEmbeddedQuery } from '../../../src/utils/index'
import { merge } from 'lodash'
import * as actions from '../../../src/actions/group-articles'
import * as types from '../../../src/constants/action-types'
import configureMockStore from 'redux-mock-store'
import mockArticles from './mocks/articles'
import mockMoreArticles from './mocks/more-articles'
import mockTags from './mocks/tags'
import mockCats from './mocks/categories'
import nock from 'nock'
import thunk from 'redux-thunk'
import qs from 'qs'

// for formatURl function in src/utils/index.js
global.__SERVER__ = true

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const mockPage = 1
const mockMaxResults = 1

describe('fetch tagged articles action', () => {
  const mockTagNames = [ 'tag-1' ]
  const mockTagIds = [ 'tag-id-1' ]
  let mockDefaultStore = {
    tags: {
      [ mockTagNames[0] ]: {
        id: mockTagIds[0],
        error: null,
        isFetching: false
      }
    },
    articlesByTags: {}
  }
  let tagQuery
  let postQuery
  beforeEach(() => {
    // mock tags api response
    tagQuery = { where: JSON.stringify( { name: { '$in': mockTagNames } }) }
    nock('http://localhost:3030/')
    .get(`/tags`)
    .query(tagQuery)
    .reply(200, mockTags)

    // mock articles api response
    postQuery = {
      where: JSON.stringify( {
        tags: { '$in': mockTagIds }
      } ),
      max_results: mockMaxResults,
      page: mockPage,
      sort: '-publishedDate',
      embedded: JSON.stringify(getArticleEmbeddedQuery())
    }
    nock('http://localhost:3030/')
      .get('/posts')
      .query(postQuery)
      .reply(200, mockArticles)
  })

  afterEach(() => {
    nock.cleanAll()
  })

  it('fetch tag ids by tag name before fetching articles', () => {
    const store = mockStore({})
    store.dispatch(actions.fetchTaggedArticlesIfNeeded(mockTagNames, mockMaxResults, mockPage)).then(() => {
      const actions = store.getActions()
      expect(actions.length).to.equal(3)
      expect(actions[0].type).to.equal(types.FETCH_TAGS_REQUEST)
      expect(actions[1].type).to.eqaul(types.FETCH_TAGS_SUCCESS)
    })
  })

  it('handles the first time to load articles', () => {
    const expectedActions = [
      { type: types.FETCH_ARTICLES_BY_TAGS_REQUEST, groups: mockTagNames },
      { type: types.FETCH_ARTICLES_BY_TAGS_SUCCESS, groups: mockTagNames }
    ]
    const store = mockStore(mockDefaultStore)

    return store.dispatch(actions.fetchTaggedArticlesIfNeeded(mockTagNames, mockMaxResults, mockPage))
      .then(() => { // return of async actions
        const actions = store.getActions()
        expect(actions[0]).to.deep.equal(expectedActions[0])
        expect(actions[1].type).to.deep.equal(expectedActions[1].type)
        expect(actions[1].response).to.be.an('object')
        expect(actions[1].tags).to.deep.equal(expectedActions[1].tags)
        expect(actions[1].response.result).to.deep.equal([ 'post-id-1' ])
        expect(actions[1].response.entities).to.be.an('object')
        expect(actions[1].response.entities.articles).to.be.an('object')
        expect(actions[1].response.entities.articles.hasOwnProperty('post-id-1')).to.be.true
        expect(actions[1].response.entities.tags).to.be.an('object')
        expect(actions[1].response.links).to.be.an('object')
        expect(actions[1].response.meta).to.be.an('object')
      })
  })

  it('handles loading more articles', () => {
    // mock nextUrl query string
    let query = merge({}, postQuery, {
      page: mockPage + 1
    })

    nock('http://localhost:3030/')
      .get('/posts')
      .query(query)
      .reply(200, mockMoreArticles)

    const expectedActions = [
      { type: types.FETCH_ARTICLES_BY_TAGS_REQUEST, tags: mockTagNames },
      { type: types.FETCH_ARTICLES_BY_TAGS_SUCCESS }
    ]

    const store = mockStore({
      // mock tags object in redux state
      tags: {
        [ mockTagNames[0] ]: {
          id: mockTagIds[0],
          error: null,
          isFetching: false
        }
      },
      // mock tagged articles object in redux state
      articlesByTags: {
        [mockTagNames.join()]: {
          isFetching: false,
          error: null,
          items: [ 'post-id-1' ],
          // mock nextUrl
          nextUrl: `http://localhost:3030/posts?${qs.stringify(query)}`
        }
      }
    })

    return store.dispatch(actions.fetchTaggedArticlesIfNeeded(mockTagNames, mockMaxResults, mockPage))
    .then(() => {
      // articles are already loaded,
      // so there is no action sent
      const actions = store.getActions()
      expect(actions).to.deep.equal([])
    }).then(() => {
      store.dispatch(actions.fetchTaggedArticlesIfNeeded(mockTagNames, mockMaxResults, mockPage + 1))
      .then(() => { // return of async actions
        const actions = store.getActions()
        expect(actions[0]).to.deep.equal(expectedActions[0])
        expect(actions[1].type).to.deep.equal(expectedActions[1].type)
        expect(actions[1].response).to.be.an('object')
        expect(actions[1].response.result).to.be.an('array')
        expect(actions[1].response.result.length).to.equal(1)
        expect(actions[1].response.entities).to.be.an('object')
        expect(actions[1].response.entities.articles).to.be.an('object')
        expect(actions[1].response.entities.articles.hasOwnProperty('post-id-2')).to.be.true
      })
    })
  })

  it('handles fetching tags occurs error', () => {
    // clean up nock setting in beforeEach
    nock.cleanAll()

    // mock tags api response
    nock('http://localhost:3030/')
    .get('/tags')
    .query(tagQuery)
    .reply(404, {})

    // create an store with empty object of state
    const store = mockStore({})
    return store.dispatch(actions.fetchTaggedArticlesIfNeeded(mockTagNames, mockMaxResults, mockPage))
      .then(() => { // return of async actions
        expect(store.getActions()[0].type).to.equal(types.FETCH_TAGS_REQUEST)
        expect(store.getActions()[1].type).to.equal(types.FETCH_TAGS_FAILURE)
        expect(store.getActions()[2].type).to.equal(types.FETCH_ARTICLES_BY_TAGS_FAILURE)
      })
  })

  it('handles fetching articles occurs error', () => {
    // clean up nock setting in beforeEach
    nock.cleanAll()

    nock('http://localhost:3030/')
      .get('/posts')
      .query(postQuery)
      .reply(404, {})

    const expectedActions = [
      { type: types.FETCH_ARTICLES_BY_TAGS_REQUEST, groups: mockTagNames },
      { type: types.FETCH_ARTICLES_BY_TAGS_FAILURE, groups: mockTagNames, error: new Error('Bad response from API') }
    ]
    const store = mockStore(mockDefaultStore)

    return store.dispatch(actions.fetchTaggedArticlesIfNeeded(mockTagNames, mockMaxResults, mockPage))
      .then(() => { // return of async actions
        expect(store.getActions()[0]).to.deep.equal(expectedActions[0])
        expect(store.getActions()[1].type).to.deep.equal(expectedActions[1].type)
        expect(store.getActions()[1].slug).to.deep.equal(expectedActions[1].slug)
        expect(store.getActions()[1].error.toString()).to.deep.equal(expectedActions[1].error.toString())
      })
  })

  it('does not create any action when articles is already fetched', () => {
    const store = mockStore({
      tags: {
        [ mockTagNames[0] ]: {
          id: mockTagIds[0],
          error: null,
          isFetching: false
        }
      },
      // mock taggedArticles object in redux state
      articlesByTags: {
        [mockTagNames.join()]: {
          isFetching: false,
          items: [ 'post-id-1' ],
          error: null,
          // nextUrl is null means no more to load
          nextUrl: null
        }
      }
    })
    return store.dispatch(actions.fetchTaggedArticlesIfNeeded(mockTagNames, mockMaxResults, mockPage)).then(() => {
      const actions = store.getActions()
      expect(actions).to.deep.equal([])
    })
  })
})

describe('fetch categorized articles action', () => {
  const mockCatNames = [ 'category-1' ]
  const mockCatIds = [ 'category-id-1' ]
  let mockDefaultStore = {
    categories: {
      [ mockCatNames[0] ]: {
        id: mockCatIds[0],
        error: null,
        isFetching: false
      }
    },
    articlesByCats: {}
  }
  let catQuery
  let postQuery
  beforeEach(() => {
    // mock categories api response
    catQuery = { where: JSON.stringify( { name: { '$in': mockCatNames } }) }
    nock('http://localhost:3030/')
    .get(`/postcategories`)
    .query(catQuery)
    .reply(200, mockCats)

    // mock articles api response
    postQuery = {
      where: JSON.stringify( {
        categories: { '$in': mockCatIds }
      } ),
      max_results: mockMaxResults,
      page: mockPage,
      sort: '-publishedDate',
      embedded: JSON.stringify(getArticleEmbeddedQuery())
    }
    nock('http://localhost:3030/')
      .get('/posts')
      .query(postQuery)
      .reply(200, mockArticles)
  })

  afterEach(() => {
    nock.cleanAll()
  })

  it('fetch category ids by category name before fetching articles', () => {
    const store = mockStore({})
    store.dispatch(actions.fetchCategorizedArticlesIfNeeded(mockCatNames, mockMaxResults, mockPage)).then(() => {
      const actions = store.getActions()
      expect(actions.length).to.equal(3)
      expect(actions[0].type).to.equal(types.FETCH_CATEGORIES_REQUEST)
      expect(actions[1].type).to.eqaul(types.FETCH_CATEGORIES_SUCCESS)
    })
  })

  it('handles the first time to load articles', () => {
    const expectedActions = [
      { type: types.FETCH_ARTICLES_BY_CATS_REQUEST, groups: mockCatNames },
      { type: types.FETCH_ARTICLES_BY_CATS_SUCCESS, groups: mockCatNames }
    ]
    const store = mockStore(mockDefaultStore)

    return store.dispatch(actions.fetchCategorizedArticlesIfNeeded(mockCatNames, mockMaxResults, mockPage))
      .then(() => { // return of async actions
        const actions = store.getActions()
        expect(actions[0]).to.deep.equal(expectedActions[0])
        expect(actions[1].type).to.deep.equal(expectedActions[1].type)
        expect(actions[1].response).to.be.an('object')
        expect(actions[1].tags).to.deep.equal(expectedActions[1].tags)
        expect(actions[1].response.result).to.deep.equal([ 'post-id-1' ])
        expect(actions[1].response.entities).to.be.an('object')
        expect(actions[1].response.entities.articles).to.be.an('object')
        expect(actions[1].response.entities.articles.hasOwnProperty('post-id-1')).to.be.true
        expect(actions[1].response.entities.tags).to.be.an('object')
        expect(actions[1].response.links).to.be.an('object')
        expect(actions[1].response.meta).to.be.an('object')
      })
  })

  it('handles loading more articles', () => {
    // mock nextUrl query string
    let query = merge({}, postQuery, {
      page: mockPage + 1
    })

    nock('http://localhost:3030/')
      .get('/posts')
      .query(query)
      .reply(200, mockMoreArticles)

    const expectedActions = [
      { type: types.FETCH_ARTICLES_BY_CATS_REQUEST, tags: mockCatNames },
      { type: types.FETCH_ARTICLES_BY_CATS_SUCCESS }
    ]

    const store = mockStore({
      // mock tags object in redux state
      categories: {
        [ mockCatNames[0] ]: {
          id: mockCatIds[0],
          error: null,
          isFetching: false
        }
      },
      // mock categorized articles object in redux state
      articlesByCats: {
        [mockCatNames.join()]: {
          isFetching: false,
          error: null,
          items: [ 'post-id-1' ],
          // mock nextUrl
          nextUrl: `http://localhost:3030/posts?${qs.stringify(query)}`
        }
      }
    })

    return store.dispatch(actions.fetchCategorizedArticlesIfNeeded(mockCatNames, mockMaxResults, mockPage))
    .then(() => {
      // articles are already loaded,
      // so there is no action sent
      const actions = store.getActions()
      expect(actions).to.deep.equal([])
    }).then(() => {
      store.dispatch(actions.fetchCategorizedArticlesIfNeeded(mockCatNames, mockMaxResults, mockPage + 1))
      .then(() => { // return of async actions
        const actions = store.getActions()
        expect(actions[0]).to.deep.equal(expectedActions[0])
        expect(actions[1].type).to.deep.equal(expectedActions[1].type)
        expect(actions[1].response).to.be.an('object')
        expect(actions[1].response.result).to.be.an('array')
        expect(actions[1].response.result.length).to.equal(1)
        expect(actions[1].response.entities).to.be.an('object')
        expect(actions[1].response.entities.articles).to.be.an('object')
        expect(actions[1].response.entities.articles.hasOwnProperty('post-id-2')).to.be.true
      })
    })
  })

  it('handles fetching articles occurs error', () => {
    // clean up nock setting in beforeEach
    nock.cleanAll()

    nock('http://localhost:3030/')
      .get('/posts')
      .query(postQuery)
      .reply(404, {})

    const expectedActions = [
      { type: types.FETCH_ARTICLES_BY_CATS_REQUEST, groups: mockCatNames },
      { type: types.FETCH_ARTICLES_BY_CATS_FAILURE, groups: mockCatNames, error: new Error('Bad response from API') }
    ]
    const store = mockStore(mockDefaultStore)

    return store.dispatch(actions.fetchCategorizedArticlesIfNeeded(mockCatNames, mockMaxResults, mockPage))
      .then(() => { // return of async actions
        expect(store.getActions()[0]).to.deep.equal(expectedActions[0])
        expect(store.getActions()[1].type).to.deep.equal(expectedActions[1].type)
        expect(store.getActions()[1].slug).to.deep.equal(expectedActions[1].slug)
        expect(store.getActions()[1].error.toString()).to.deep.equal(expectedActions[1].error.toString())
      })
  })

  it('does not create any action when articles is already fetched', () => {
    const store = mockStore({
      categories: {
        [ mockCatNames[0] ]: {
          id: mockCatIds[0],
          error: null,
          isFetching: false
        }
      },
      // mock categorized articles object in redux state
      articlesByCats: {
        [mockCatNames.join()]: {
          isFetching: false,
          items: [ 'post-id-1' ],
          error: null,
          // nextUrl is null means no more to load
          nextUrl: null
        }
      }
    })
    return store.dispatch(actions.fetchCategorizedArticlesIfNeeded(mockCatNames, mockMaxResults, mockPage)).then(() => {
      const actions = store.getActions()
      expect(actions).to.deep.equal([])
    })
  })
})
