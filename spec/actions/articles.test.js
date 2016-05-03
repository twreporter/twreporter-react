/*global afterEach, describe, it*/
'use strict'
import { expect } from 'chai'
import * as actions from '../../src/actions/articles'
import * as types from '../../src/constants/action-types'
import configureMockStore from 'redux-mock-store'
import mockArticles from './mocks/articles'
import mockMoreArticles from './mocks/more-articles'
import nock from 'nock'
import thunk from 'redux-thunk'
import qs from 'qs'

// for formatURl function in src/utils/index.js
global.__SERVER__ = true

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const mockDefaultStore = {
  taggedArticles: {}
}
const mockTagNames = [ '572315331cece3ae858dffe3' ]
const mockPage = 1
const mockMaxResults = 1

let query = qs.stringify(
  {
    where: JSON.stringify( {
      tags: { '$in': mockTagNames }
    } ),
    max_results: mockMaxResults,
    page: mockPage,
    sort: '-publishedDate',
    embedded: JSON.stringify( { authors: 1, tags:1, categories:1 } )
  }
)

describe('articles action', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates FETCH_ARTICLES_REQUEST and FETCH_ARTICLES_SUCCESS for the first time to load articles', () => {
    nock('http://localhost:3030/')
      .get(`/posts?${query}`)
      .reply(200, mockArticles)

    const expectedActions = [
      { type: types.FETCH_ARTICLES_REQUEST, tags: mockTagNames },
      { type: types.FETCH_ARTICLES_SUCCESS }
    ]
    const store = mockStore(mockDefaultStore)

    return store.dispatch(actions.fetchArticlesIfNeeded(mockTagNames, mockMaxResults, mockPage))
      .then(() => { // return of async actions
        const action = store.getActions()[1]
        expect(store.getActions()[0]).to.deep.equal(expectedActions[0])
        expect(action.type).to.deep.equal(expectedActions[1].type)
        expect(action.response).to.be.an('object')
        expect(action.response.result).to.be.an('array')
        expect(action.response.result.length).to.equal(1)
        expect(action.response.entities).to.be.an('object')
        expect(action.response.entities.articles).to.be.an('object')
        expect(action.response.entities.articles.hasOwnProperty('i-am-a-slug')).to.be.true
      })
  })

  it('creates FETCH_ARTICLES_REQUEST and FETCH_ARTICLES_SUCCESS for loading more articles', () => {
    // mock nextUrl query string
    let query = qs.stringify(
      {
        where: JSON.stringify( {
          tags: { '$in': mockTagNames }
        } ),
        max_results: mockMaxResults,
        page: mockPage + 1,
        sort: '-publishedDate',
        embedded: JSON.stringify( { authors: 1, tags:1, categories:1 } )
      }
    )

    nock('http://localhost:3030/')
      .get(`/posts?${query}`)
      .reply(200, mockMoreArticles)

    const expectedActions = [
      { type: types.FETCH_ARTICLES_REQUEST, tags: mockTagNames },
      { type: types.FETCH_ARTICLES_SUCCESS }
    ]

    const store = mockStore({
      // mock taggedArticles object in redux state
      taggedArticles: {
        [mockTagNames.join()]: {
          isFetching: false,
          error: null,
          // mock nextUrl
          nextUrl: `http://localhost:3030/posts?${query}`,
          articles: [ '572315c51cece3ae858dffe7' ]
        }
      }
    })

    return store.dispatch(actions.fetchArticlesIfNeeded(mockTagNames, mockMaxResults, mockPage))
      .then(() => { // return of async actions
        const action = store.getActions()[1]
        expect(store.getActions()[0]).to.deep.equal(expectedActions[0])
        expect(action.type).to.deep.equal(expectedActions[1].type)
        expect(action.response).to.be.an('object')
        expect(action.response.result).to.be.an('array')
        expect(action.response.result.length).to.equal(1)
        expect(action.response.entities).to.be.an('object')
        expect(action.response.entities.articles).to.be.an('object')
        expect(action.response.entities.articles.hasOwnProperty('i-am-a-slug-2')).to.be.true
      })
  })

  it('creates FETCH_ARTICLES_REQUEST and FETCH_ARTICLES_FAILURE when fetching article occurs error', () => {
    nock('http://localhost:3030/')
      .get(`/posts?${query}`)
      .reply(404, {})

    const expectedActions = [
      { type: types.FETCH_ARTICLES_REQUEST, tags: mockTagNames },
      { type: types.FETCH_ARTICLES_FAILURE, tags: mockTagNames, error: new Error('Bad response from API') }
    ]
    const store = mockStore(mockDefaultStore)

    return store.dispatch(actions.fetchArticlesIfNeeded(mockTagNames, mockMaxResults, mockPage))
      .then(() => { // return of async actions
        expect(store.getActions()[0]).to.deep.equal(expectedActions[0])
        expect(store.getActions()[1].type).to.deep.equal(expectedActions[1].type)
        expect(store.getActions()[1].slug).to.deep.equal(expectedActions[1].slug)
        expect(store.getActions()[1].error.toString()).to.deep.equal(expectedActions[1].error.toString())
      })
  })

  it('does not create any action when article is already fetched', () => {
    const store = mockStore({
      // mock taggedArticles object in redux state
      taggedArticles: {
        [mockTagNames.join()]: {
          isFetching: false,
          error: null,
          // nextUrl is null means no more to load
          nextUrl: null,
          articles: [ '572315c51cece3ae858dffe7' ]
        }
      }
    })
    expect(store.dispatch(actions.fetchArticlesIfNeeded(mockTagNames, mockMaxResults, mockPage))).to.equal(undefined)
  })
})

