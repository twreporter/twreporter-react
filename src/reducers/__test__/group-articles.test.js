/*global before, describe, it*/
'use strict'
import { expect } from 'chai'
import { fetchTaggedArticlesIfNeeded, fetchCategorizedArticlesIfNeeded } from '../../../src/actions/group-articles'
import { formatUrl, getArticleEmbeddedQuery } from '../../../src/utils/index'
import { merge } from 'lodash'
import * as types from '../../../src/constants/action-types'
import configureMockStore from 'redux-mock-store'
import mockArticles from '../actions/mocks/articles'
import nock from 'nock'
import { articlesByCats, articlesByTags } from '../../../src/reducers/group-articles'
import thunk from 'redux-thunk'

// for formatURl function in src/utils/index.js
global.__SERVER__ = true

const mockTagNames = [ 'tag-1', 'tag-2' ]
const mockCatNames = [ 'category-1', 'category-2' ]
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const mockDefaultStore = {
  entities: {
    tags: {
      'tag-id-1': {
        name: 'tag-1',
        id: 'tag-id-1',
        key: 'tag-1'
      }
    },
    categories: {
      'category-id-1': {
        name: 'category-1',
        id: 'category-id-1',
        key: 'category-1'
      }
    }
  },
  tags: {
    'tag-1': {
      id: 'tag-id-1',
      error: null,
      isFetching: false
    }
  },
  categories: {
    'category-1': {
      id: 'category-id-1',
      error: null,
      isFetching: false
    }
  }
}

describe('articlesByTags reducer', () => {
  before(() => {
    // mock articles api response
    let postQuery = {
      where: JSON.stringify( {
        tags: { '$in': [ 'tag-id-1' ] }
      } ),
      max_results: 1,
      page: 1,
      sort: '-publishedDate',
      embedded: JSON.stringify(getArticleEmbeddedQuery())
    }
    nock('http://localhost:3030/')
      .get('/posts')
      .query(postQuery)
      .reply(200, merge(mockArticles))
  })
  it('should return the initial state', () => {
    expect(
      articlesByTags(undefined, {})
    ).to.deep.equal({})
  })

  it('should handle FETCH_ARTICLES_BY_TAGS_REQUEST', () => {
    let joinedTag = mockTagNames.join()
    expect(
      articlesByTags({}, {
        type: types.FETCH_ARTICLES_BY_TAGS_REQUEST,
        groups: mockTagNames
      })
    ).to.deep.equal({
      [ joinedTag ]: {
        isFetching: true,
        items: [],
        error: null,
        nextUrl: null
      }
    })
  })

  it('should handle FETCH_ARTICLES_BY_TAGS_FAILURE', () => {
    let joinedTag = mockTagNames.join()
    expect(
      articlesByTags({}, {
        type: types.FETCH_ARTICLES_BY_TAGS_FAILURE,
        groups: mockTagNames,
        error: new Error('Test Error'),
        failedAt: 1234567890
      })
    ).to.deep.equal({
      [ joinedTag ]: {
        isFetching: false,
        items: [],
        error: new Error('Test Error'),
        lastUpdated: 1234567890,
        nextUrl: null
      }
    })
  })

  it('should handle FETCH_ARTICLES_BY_TAGS_SUCCESS', () => {
    let now = Date.now
    Date.now = function () {
      return 1234567890
    }
    const store = mockStore(mockDefaultStore)
    return store.dispatch(fetchTaggedArticlesIfNeeded('tag-1', 1, 1))
    .then(() => {
      expect(
        articlesByTags({
          'tag-1': {
            isFetching: true,
            error: null,
            items: [ 'post-id-2' ],
            nextUrl: ''
          }
        }, store.getActions()[1])
      ).to.deep.equal({
        'tag-1': {
          isFetching: false,
          error: null,
          nextUrl: formatUrl(mockArticles._links.next.href + '&embedded=' + JSON.stringify(getArticleEmbeddedQuery())),
          items: [ 'post-id-2', 'post-id-1' ],
          lastUpdated: 1234567890
        }
      })
      Date.now = now
    })
  })
})

describe('articlesByCats reducer', () => {
  before(() => {
    // mock articles api response
    let postQuery = {
      where: JSON.stringify( {
        categories: { '$in': [ 'category-id-1' ] }
      } ),
      max_results: 1,
      page: 1,
      sort: '-publishedDate',
      embedded: JSON.stringify(getArticleEmbeddedQuery())
    }
    nock('http://localhost:3030/')
      .get('/posts')
      .query(postQuery)
      .reply(200, merge(mockArticles))
  })

  it('should handle FETCH_ARTICLES_BY_CATS_REQUEST', () => {
    let joinedTag = mockCatNames.join()
    expect(
      articlesByCats({}, {
        type: types.FETCH_ARTICLES_BY_CATS_REQUEST,
        groups: mockCatNames
      })
    ).to.deep.equal({
      [ joinedTag ]: {
        isFetching: true,
        items: [],
        error: null,
        nextUrl: null
      }
    })
  })

  it('should handle FETCH_ARTICLES_BY_CATS_FAILURE', () => {
    let joinedTag = mockCatNames.join()
    expect(
      articlesByCats({}, {
        type: types.FETCH_ARTICLES_BY_CATS_FAILURE,
        groups: mockCatNames,
        error: new Error('Test Error'),
        failedAt: 1234567890
      })
    ).to.deep.equal({
      [ joinedTag ]: {
        isFetching: false,
        items: [],
        error: new Error('Test Error'),
        lastUpdated: 1234567890,
        nextUrl: null
      }
    })
  })

  it('should handle FETCH_ARTICLES_BY_CATS_SUCCESS', () => {
    let now = Date.now
    Date.now = function () {
      return 1234567890
    }
    const store = mockStore(mockDefaultStore)
    return store.dispatch(fetchCategorizedArticlesIfNeeded('category-1', 1, 1))
    .then(() => {
      expect(
        articlesByCats({
          'category-1': {
            isFetching: true,
            error: null,
            items: [ 'post-id-2' ],
            nextUrl: ''
          }
        }, store.getActions()[1])
      ).to.deep.equal({
        'category-1': {
          isFetching: false,
          error: null,
          nextUrl: formatUrl(mockArticles._links.next.href + '&embedded=' + JSON.stringify(getArticleEmbeddedQuery())),
          items: [ 'post-id-2', 'post-id-1' ],
          lastUpdated: 1234567890
        }
      })
      Date.now = now
    })
  })
})
