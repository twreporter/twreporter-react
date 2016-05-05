/*global before, describe, it*/
'use strict'
import { expect } from 'chai'
import { fetchArticlesIfNeeded } from '../../src/actions/articles'
import { formatUrl } from '../../src/utils/index'
import { merge } from 'lodash'
import * as types from '../../src/constants/action-types'
import configureMockStore from 'redux-mock-store'
import mockArticles from '../actions/mocks/articles'
import nock from 'nock'
import reducer from '../../src/reducers/articles'
import thunk from 'redux-thunk'

// for formatURl function in src/utils/index.js
global.__SERVER__ = true

const MOCKTAG = 'tag-1'
const MOCKTAGID = 'tag-id-1'
const mockTagNames = [ MOCKTAG, 'tag-2' ]
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const mockDefaultStore = {
  entities: {
    tags: {
      [ MOCKTAGID ]: {
        name: MOCKTAG,
        id: MOCKTAGID,
        key: MOCKTAG
      }
    }
  },
  tags: {
    [ MOCKTAG ]: {
      id: MOCKTAGID,
      error: null,
      isFetching: false
    }
  }
}

describe('articles reducer', () => {
  before(() => {
    // mock posts api response
    let postQuery = {
      where: JSON.stringify( {
        tags: { '$in': [ MOCKTAGID ] }
      } ),
      max_results: 1,
      page: 1,
      sort: '-publishedDate',
      embedded: JSON.stringify( { authors: 1, tags:1, categories:1 } )
    }
    nock('http://localhost:3030/')
      .get('/posts')
      .query(postQuery)
      .reply(200, merge(mockArticles))
  })
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).to.deep.equal({})
  })

  it('should handle FETCH_ARTICLES_REQUEST', () => {
    let joinedTag = mockTagNames.join()
    expect(
      reducer({}, {
        type: types.FETCH_ARTICLES_REQUEST,
        tags: mockTagNames
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

  it('should handle FETCH_ARTICLES_FAILURE', () => {
    let joinedTag = mockTagNames.join()
    expect(
      reducer({}, {
        type: types.FETCH_ARTICLES_FAILURE,
        tags: mockTagNames,
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

  it('should handle FETCH_ARTICLES_SUCCESS', () => {
    let now = Date.now
    Date.now = function () {
      return 1234567890
    }
    const store = mockStore(mockDefaultStore)
    return store.dispatch(fetchArticlesIfNeeded(MOCKTAG, 1, 1))
    .then(() => {
      expect(
        reducer({
          'tag-1': {
            isFetching: true,
            error: null,
            items: [ 'post-slug-2' ],
            nextUrl: ''
          }
        }, store.getActions()[1])
      ).to.deep.equal({
        'tag-1': {
          isFetching: false,
          error: null,
          nextUrl: formatUrl(encodeURIComponent(mockArticles._links.next.href + '&embedded=' + JSON.stringify( { authors: 1, tags:1, categories:1 }))),
          items: [ 'post-slug-2', 'post-slug-1' ],
          lastUpdated: 1234567890
        }
      })
      Date.now = now
    })
  })
})

