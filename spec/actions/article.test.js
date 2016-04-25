'use strict'
import {
  merge
} from 'lodash'
import * as actions from '../../src/actions/article'
import * as types from '../../src/constants/action-types'
import configureMockStore from 'redux-mock-store'
import { expect } from 'chai' // You can use any testing library
import nock from 'nock'
import thunk from 'redux-thunk'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const mockSlug = 'i-am-a-slug'
const mockArticle =  {slug: mockSlug, id: 1}
const mockDefaultStore = {
  selectedArticle: '',
  entities: {
    authors: {},
    articles: {}
  }
}

describe('article action', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates FETCH_ARTICLE_REQUEST and FETCH_ARTICLE_SUCCESS when article has been fetched', () => {
    nock('http://localhost:3030/')
      .get(`/posts/${mockSlug}`)
      .reply(200, mockArticle)

    const expectedActions = [
      { type: types.FETCH_ARTICLE_REQUEST, slug: mockSlug },
      { type: types.FETCH_ARTICLE_SUCCESS, slug: mockSlug, article: mockArticle }
    ]
    const store = mockStore(mockDefaultStore);

    return store.dispatch(actions.fetchArticleIfNeeded(mockSlug))
      .then(() => { // return of async actions
        expect(store.getActions()[0]).to.deep.equal(expectedActions[0])
        expect(store.getActions()[1].type).to.deep.equal(expectedActions[1].type)
        expect(store.getActions()[1].slug).to.deep.equal(expectedActions[1].slug)
        expect(store.getActions()[1].article).to.deep.equal(expectedActions[1].article)
      })
  })

  it('creates FETCH_ARTICLE_REQUEST and FETCH_ARTICLE_FAILURE when fetching article occurs error', () => {

    nock('http://localhost:3030/')
      .get(`/posts/${mockSlug}`)
      .reply(404, {});

    const expectedActions = [
      { type: types.FETCH_ARTICLE_REQUEST, slug: mockSlug },
      { type: types.FETCH_ARTICLE_FAILURE, slug: mockSlug, error: new Error('Bad response from API') }
    ]
    const store = mockStore(mockDefaultStore);

    return store.dispatch(actions.fetchArticleIfNeeded(mockSlug))
      .then(() => { // return of async actions
        expect(store.getActions()[0]).to.deep.equal(expectedActions[0])
        expect(store.getActions()[1].type).to.deep.equal(expectedActions[1].type)
        expect(store.getActions()[1].slug).to.deep.equal(expectedActions[1].slug)
        expect(store.getActions()[1].error.toString()).to.deep.equal(expectedActions[1].error.toString())
      })
  })

  it('does not create any action when article is already fetched', () => {
    const expectedActions = []
    const store = mockStore(merge({}, mockDefaultStore, {entities: { articles: { [mockSlug]: mockArticle }}}))
    expect(store.dispatch(actions.fetchArticleIfNeeded(mockSlug))).to.equal(undefined);
  })
})
