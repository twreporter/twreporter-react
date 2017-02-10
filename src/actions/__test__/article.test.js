/*global describe, afterEach, it*/
'use strict'
import { expect } from 'chai'
import { getArticleEmbeddedQuery } from '../../../src/utils/index'
import { merge } from 'lodash'
import * as actions from '../../../src/actions/article'
import * as types from '../../../src/constants/action-types'
import configureMockStore from 'redux-mock-store'
import mockArticle from './mocks/article'
import nock from 'nock'
import thunk from 'redux-thunk'
import qs from 'qs'

// for formatURl function in src/utils/index.js
global.__SERVER__ = true

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const mockSlug = 'post-slug-1'
const mockDefaultStore = {
  selectedArticle: '',
  entities: {
    authors: {},
    articles: {}
  }
}
let query = qs.stringify({ embedded: JSON.stringify(getArticleEmbeddedQuery()) })

describe('article action', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates FETCH_ARTICLE_REQUEST and FETCH_ARTICLE_SUCCESS when article has been fetched', () => {
    nock('http://localhost:3030/')
      .get(`/posts/${mockSlug}?${query}`)
      .reply(200, mockArticle)

    const expectedActions = [
      { type: types.FETCH_ARTICLE_REQUEST, slug: mockSlug },
      { type: types.FETCH_ARTICLE_SUCCESS, slug: mockSlug, article: mockArticle }
    ]
    const store = mockStore(mockDefaultStore)

    return store.dispatch(actions.fetchArticleIfNeeded(mockSlug))
      .then(() => { // return of async actions
        const action = store.getActions()[1]
        expect(store.getActions()[0]).to.deep.equal(expectedActions[0])
        expect(action.type).to.deep.equal(expectedActions[1].type)
        expect(action.slug).to.deep.equal(expectedActions[1].slug)
        expect(action.response).to.be.an('object')
        expect(action.response.entities).to.be.an('object')
        expect(action.response.entities.articles).to.be.an('object')
        expect(action.response.entities.authors).to.be.an('object')
        expect(action.response.entities.authors.hasOwnProperty('571ede3874ae22f42a8da30a')).to.be.true
        expect(action.response.entities.authors.hasOwnProperty('571ede4774ae22f42a8da30b')).to.be.true

      })
  })

  it('creates FETCH_ARTICLE_REQUEST and FETCH_ARTICLE_FAILURE when fetching article occurs error', () => {

    nock('http://localhost:3030/')
      .get(`/posts/${mockSlug}?${query}`)
      .reply(404, {})

    const expectedActions = [
      { type: types.FETCH_ARTICLE_REQUEST, slug: mockSlug },
      { type: types.FETCH_ARTICLE_FAILURE, slug: mockSlug }
    ]
    const store = mockStore(mockDefaultStore)

    return store.dispatch(actions.fetchArticleIfNeeded(mockSlug))
      .then(() => { // return of async actions
        expect(store.getActions()[0]).to.deep.equal(expectedActions[0])
        expect(store.getActions()[1].type).to.deep.equal(expectedActions[1].type)
        expect(store.getActions()[1].slug).to.deep.equal(expectedActions[1].slug)
        expect(store.getActions()[1].error).to.be.instanceof(Error)
      })
  })

  it('does not create any action when article is already fetched', () => {
    const store = mockStore(merge({}, mockDefaultStore, { entities: { articles: { [mockSlug]: mockArticle } } }))
    expect(store.dispatch(actions.fetchArticleIfNeeded(mockSlug))).to.be.an.instanceof(Promise)
  })
})
