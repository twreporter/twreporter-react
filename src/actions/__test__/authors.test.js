/*global describe, afterEach, it, context*/
'use strict'
import { expect } from 'chai'
// import { urlParasToString } from '../../utils/index'
import * as actions from '../../../src/actions/authors'
import * as types from '../../constants/index'
import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import thunk from 'redux-thunk'
import { InternalServerError } from '../../custom-error'

import { responseObjSet, currentDate, mockResponseSet, mockDefaultStates, mockSearchParasSet, constKeywords } from './mocks/authors.js'

import { NUMBER_OF_FIRST_RESPONSE_PAGE } from '../../constants/authors-list'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

process.env.NODE_ENV = 'development'

function checker({ mockDefaultState, keywords, mockResponse, typeReq, typeSuc }) {
  const store = mockStore(mockDefaultState)
  return store.dispatch(actions.searchAuthorsIfNeeded(keywords))
    .then(() => {
      const actionReq = store.getActions()[0]
      const actionSuc = store.getActions()[1]

      const expectedActions = [
        {
          type: typeReq,
          keywords
        },
        {
          type: typeSuc,
          keywords,
          normalizedData: mockResponse.normalizedData,
          totalPages: mockResponse.totalPages,
          currentPage: mockResponse.currentPage,
          receivedAt: currentDate
        }
      ]

      expect(actionReq).to.deep.equal(expectedActions[0])
      expect(actionSuc).to.contain.all.keys(expectedActions[1])
      expect(expectedActions[1]).to.contain.all.keys(actionSuc)
      expect(actionSuc.type).to.deep.equal(expectedActions[1].type)
      expect(actionSuc.keywords).to.deep.equal(expectedActions[1].keywords)
      expect(actionSuc.normalizedData).to.deep.equal(expectedActions[1].normalizedData)
      expect(actionSuc.receivedAt).to.be.an('number')
    })
}


const failChecker = ({ mockDefaultState, keywords, typeReq, typeFail, error }) => {
  const store = mockStore(mockDefaultState)
  return store.dispatch(actions.searchAuthorsIfNeeded(keywords))
    .then(() => {
      const actionReq = store.getActions()[0]
      const actionFail = store.getActions()[1]
      const expectedActions = [
        {
          type: typeReq,
          keywords
        },
        {
          type: typeFail,
          error,
          failedAt: Date.now()
        }
      ]

      expect(actionReq).to.deep.equal(expectedActions[0])
      expect(actionFail).to.contain.all.keys(expectedActions[1])
      expect(expectedActions[1]).to.contain.all.keys(actionFail)
      expect(actionFail.type).to.deep.equal(expectedActions[1].type)
      expect(actionFail.failedAt).to.be.an('number')
      expect(actionFail.error.code).to.equal(true)
    })
}


describe('Two main situations in authors.js file: 1) Keywords is null and list all authors 2) Keywords has value and search specific author', function () {
  afterEach(() => {
    nock.cleanAll()
  })

  context('Keywords == null', function () {
    context('Fetch authors list successfully', function () {
      context('Load First Page of the authors list', function () {
        it('Actual actions should be same as expected actions', function () {
          const keywords = ''
          const mockDefaultState = mockDefaultStates.initialState
          const searchParas = { ...mockSearchParasSet.keyNullSearchParas, page: NUMBER_OF_FIRST_RESPONSE_PAGE }
          const mockResponse = mockResponseSet.keyNullResponse
          nock('http://localhost:8080')
            .get('/v1/search/authors')
            .query(searchParas)
            .reply(200, responseObjSet.keyNullResponse)

          const checkerParas = {
            mockDefaultState,
            keywords,
            mockResponse,
            typeReq: types.LIST_ALL_AUTHORS_REQUEST,
            typeSuc: types.LIST_ALL_AUTHORS_SUCCESS
          }
          return checker(checkerParas)
        })
      })

      context('After loaded first page, now we want to load more', function () {
        it('Actual actions should be same as expected actions', function () {
          const keywords = ''
          const mockDefaultState = mockDefaultStates.afterFirstPageState
          const searchParas = { ...mockSearchParasSet.keyNullSearchParas, page: mockDefaultState.authorsList.currentPage + 1 }
          const mockResponse = mockResponseSet.keyNullResponse
          nock('http://localhost:8080')
            .get('/v1/search/authors')
            .query(searchParas)
            .reply(200, responseObjSet.keyNullResponse)

          const checkerParas = {
            mockDefaultState,
            keywords,
            mockResponse,
            typeReq: types.LIST_ALL_AUTHORS_REQUEST,
            typeSuc: types.LIST_ALL_AUTHORS_SUCCESS
          }
          return checker(checkerParas)
        })
      })

      context('Want to load more pages but Algolia has no more', function () {
        it('should handle the resolved promise (the running tset should be finished)', function () {
          const keywords = ''
          const mockDefaultState = mockDefaultStates.gotNothing
          const store = mockStore(mockDefaultState)
          return store.dispatch(actions.searchAuthorsIfNeeded(keywords))
            .then((val) => {
              expect(val).to.equal('Promise Resolved')
            })
        })
      })
    })
    context('Fetch authors list unsuccessfully', function () {
      it('Actual actions should be same as expected actions', function () {
        const keywords = ''
        const mockDefaultState = mockDefaultStates.initialState
        const searchParas = { ...mockSearchParasSet.keyNullSearchParas, page: NUMBER_OF_FIRST_RESPONSE_PAGE }
        nock('http://localhost:8080')
          .get('/v1/search/authors')
          .query(searchParas)
          .replyWithError({ 'message': 'this is error message for testing', 'code': true })

        const checkerParas = {
          mockDefaultState,
          keywords,
          typeReq: types.LIST_ALL_AUTHORS_REQUEST,
          typeFail: types.LIST_ALL_AUTHORS_FAILURE,
          error: true
        }
        return failChecker(checkerParas)
      })
    })
  })

  context('Keywords != null ', function () {
    context('Fetch specific author successfully', function () {
      context('keywords are new', function () {
        it('Actual actions should be same as expected actions', function () {
          const keywords = constKeywords
          const mockDefaultState = mockDefaultStates.hasNoPreviousKeywords
          const searchParas = { ...mockSearchParasSet.keyWithValueParas, page: NUMBER_OF_FIRST_RESPONSE_PAGE }
          const mockResponse = mockResponseSet.keyWithValueResponse
          // console.log(searchParas)
          nock('http://localhost:8080')
            .get('/v1/search/authors')
            .query(searchParas)
            .reply(200, responseObjSet.keyWithVlaueResponse)

          const checkerParas = {
            mockDefaultState,
            keywords,
            mockResponse,
            typeReq: types.SEARCH_AUTHORS_REQUEST,
            typeSuc: types.SEARCH_AUTHORS_SUCCESS
          }
          return checker(checkerParas)
        })
      })

      context('keywords are same', function () {
        it('should handle the resolved promise (the running tset should be finished)', function () {
          const keywords = constKeywords
          const mockDefaultState = mockDefaultStates.hasPreviousKeywords
          const store = mockStore(mockDefaultState)
          return store.dispatch(actions.searchAuthorsIfNeeded(keywords))
            .then((val) => {
              expect(val).to.equal('Promise Resolved')
            })
        })
      })
    })

    context('Fetch specific author unsuccessfully', function () {
      it('Actual actions should be same as expected actions', function () {
        const keywords = constKeywords
        const mockDefaultState = mockDefaultStates.hasNoPreviousKeywords
        const searchParas = { ...mockSearchParasSet.keyWithValueParas, page: NUMBER_OF_FIRST_RESPONSE_PAGE }
        nock('http://localhost:8080')
          .get('/v1/search/authors')
          .query(searchParas)
          .replyWithError({ 'message': 'this is error message for testing', 'code': true })

        const checkerParas = {
          mockDefaultState,
          keywords,
          typeReq: types.SEARCH_AUTHORS_REQUEST,
          typeFail: types.SEARCH_AUTHORS_FAILURE,
          error: true
        }
        return failChecker(checkerParas)
      })
    })
  })

  context('Server error 404', function () {
    it('Actual actions should be same as expected actions', function () {
      const keywords = ''
      const mockDefaultState = mockDefaultStates.initialState
      const searchParas = { ...mockSearchParasSet.keyNullSearchParas, page: NUMBER_OF_FIRST_RESPONSE_PAGE }
      nock('http://localhost:8080')
        .get('/v1/search/authors')
        .query(searchParas)
        .reply(404)

      const store = mockStore(mockDefaultState)
      return store.dispatch(actions.searchAuthorsIfNeeded(keywords))
        .then(() => {
          const actionReq = store.getActions()[0]
          const actionFail = store.getActions()[1]
          const expectedActions = [
            {
              type: types.LIST_ALL_AUTHORS_REQUEST,
              keywords
            },
            {
              type: types.LIST_ALL_AUTHORS_FAILURE,
              error: InternalServerError,
              failedAt: Date.now()
            }
          ]

          expect(actionReq).to.deep.equal(expectedActions[0])
          expect(actionFail).to.contain.all.keys(expectedActions[1])
          expect(expectedActions[1]).to.contain.all.keys(actionFail)
          expect(actionFail.type).to.deep.equal(expectedActions[1].type)
          expect(actionFail.failedAt).to.be.an('number')
          expect(actionFail.error).to.be.instanceof(expectedActions[1].error)
        })
    })
  })

})
