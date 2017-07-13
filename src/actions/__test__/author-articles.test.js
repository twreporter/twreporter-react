/*global describe, afterEach, it*/
'use strict'
import { expect } from 'chai'
import * as actions from '../../../src/actions/author-articles'
import * as types from '../../constants/index'
import { mockResponse, items } from './mocks/author-articles'
import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import thunk from 'redux-thunk'
import { InternalServerError } from '../../custom-error'

// all constants
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const mockDefaultState = {
  author: {},
  entities: {
    authors: {
      isFetching: false
    },
    articles: {}
  }
}
const authorId = 'theAurhtorId'
const searchParas = {
  keywords: authorId,
  hitsPerPage: types.MAX_ARTICLES_PER_FETCH,
  page: 0
}

process.env.NODE_ENV = 'development'

const failChecker = (store, error) => {
  const actionReq = store.getActions()[0]
  const actionFail = store.getActions()[1]
  const expectedActions = [
    {
      type: types.FETCH_AUTHOR_COLLECTION_REQUEST,
      authorId
    },
    {
      type: types.FETCH_AUTHOR_COLLECTION_FAILURE,
      error: {},
      failedAt: {},
      authorId
    }
  ]
  expect(actionReq).to.deep.equal(expectedActions[0])
  expect(actionFail).to.contain.all.keys(expectedActions[1])
  expect(expectedActions[1]).to.contain.all.keys(actionFail)
  expect(actionFail.type).to.deep.equal(expectedActions[1].type)
  expect(actionFail.failedAt).to.be.an('number')
  expect(actionFail.error).to.be.instanceof(error)
}


describe('Atuhor Action Testing', function () {

  afterEach(() => {
    nock.cleanAll()
  })

  it('API server response Error directly: web status code is greater than 400', function () {
    nock('http://localhost:8080/')
      .get(`/v1/search/posts`)
      .query(searchParas)
      .reply(404, mockResponse)

    const store = mockStore(mockDefaultState)
    return store.dispatch(actions.fetchAuthorCollectionIfNeeded(authorId))
      .then(() => {
        failChecker(store, InternalServerError)
      })
  })

  it('The Actions: FETCH_AUTHOR_COLLECTION_REQUEST && FETCH_AUTHOR_COLLECTION_SUCCESS', function () {
    nock('http://localhost:8080/')
      .get(`/v1/search/posts`)
      .query(searchParas)
      .reply(200, mockResponse)

    const store = mockStore(mockDefaultState)

    return store.dispatch(actions.fetchAuthorCollectionIfNeeded(authorId))
      .then(() => {
        const actionReq = store.getActions()[0]
        const actionSuc = store.getActions()[1]
        const expectedActions = [
          {
            type: types.FETCH_AUTHOR_COLLECTION_REQUEST,
            authorId
          },
          {
            type: types.FETCH_AUTHOR_COLLECTION_SUCCESS,
            response: items,
            authorId,
            currentPage: 0,
            totalPages: 28,
            totalResults: 145,
            receivedAt: Date.now()
          }
        ]
        expect(actionReq).to.deep.equal(expectedActions[0])
        expect(actionSuc).to.contain.all.keys(expectedActions[1])
        expect(expectedActions[1]).to.contain.all.keys(actionSuc)
        expect(actionSuc.type).to.deep.equal(expectedActions[1].type)
        expect(actionSuc.response).to.deep.equal(expectedActions[1].response)
        expect(actionSuc.authorId).to.deep.equal(expectedActions[1].authorId)
        expect(actionSuc.currentPage).to.deep.equal(expectedActions[1].currentPage)
        expect(actionSuc.totalPages).to.deep.equal(expectedActions[1].totalPages)
        expect(actionSuc.totalResults).to.deep.equal(expectedActions[1].totalResults)
        expect(actionSuc.receivedAt).to.be.an('number')
      })

  })

  it('The Actions: FETCH_AUTHOR_COLLECTION_REQUEST && FETCH_AUTHOR_COLLECTION_FAILURE', function () {
    nock('http://localhost:8080/')
      .get(`/v1/search/posts`)
      .query(searchParas)
      .replyWithError('this is error message')

    const store = mockStore(mockDefaultState)

    return store.dispatch(actions.fetchAuthorCollectionIfNeeded(authorId))
      .then(() => {
        failChecker(store, Error)
      })
  })
})
