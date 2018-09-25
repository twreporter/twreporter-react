/* global describe, it */

import { author as authorSchema } from '../../schemas/article-schema'
import { camelizeKeys } from 'humps'
import { expect } from 'chai'
import { normalize } from 'normalizr'
import * as actions from '../author-details'
import * as actionTypes from '../../constants'
import configureStore from 'redux-mock-store'
import nock from 'nock'
import thunk from 'redux-thunk'

const mockStore = configureStore([ thunk ])

const authorId = 'mock-author-id'
const searchParas = {
  keywords: authorId,
  filters: 'articlesCount>0',
  hitsPerPage: 1,
  page: 0
}

describe('Test action creators of author-details', function () {
  describe('Test action creator `requestFetchAuthorDetails`', function () {
    const createdAction = actions.requestFetchAuthorDetails(authorId)
    it('should return an action with property `type`', function () {
      const expectedActionType = actionTypes.FETCH_AUTHOR_DETAILS_REQUEST
      expect(createdAction).to.have.property('type').equals(expectedActionType)
    })
    it('should return an action with property `keywords`', function () {
      expect(createdAction).to.have.property('keywords').equals(authorId)
    })
  })
  describe('Test action creator `failToFetchAuthorDetails`', function () {
    const error = new Error('mock-error')
    const createdAction = actions.failToFetchAuthorDetails(error)
    it('should return an action with property `type`', function () {
      const expectedActionType = actionTypes.FETCH_AUTHOR_DETAILS_FAILURE
      expect(createdAction).to.have.property('type').equals(expectedActionType)
    })
    it('should return an action with property `error`', function () {
      expect(createdAction).to.have.property('error').equals(error)
    })
  })
  describe('Test action creator `receiveFetchAuthorDetails`', function () {
    const normalizedData = {
      entities: [ {
        id: authorId
      } ],
      results: [ 'mock-author-id' ]
    }
    const createdAction = actions.receiveFetchAuthorDetails(normalizedData)
    it('should return an action with property `type`', function () {
      const expectedActionType = actionTypes.FETCH_AUTHOR_DETAILS_SUCCESS
      expect(createdAction).to.have.property('type').equals(expectedActionType)
    })
    it('should return an action with property `normalizedData`', function () {
      expect(createdAction).to.have.property('normalizedData').deep.equals(normalizedData)
    })
  })
  describe('Test action creator `fetchAuthorDetails`', function () {
    const store = mockStore({})
    this.afterEach(function () {
      store.clearActions()
      nock.cleanAll()
    })
    it('should dispatch an action created by `requestFetchAuthorDetails`', function (done) {
      nock('http://localhost:8080')
        .get('/v1/search/authors')
        .query(searchParas)
        .reply(200, { hits: [] })
      store.dispatch(actions.fetchAuthorDetails(authorId))
        .then(function () {
          const actionsInStore = store.getActions()
          expect(actionsInStore[0]).to.deep.equal(actions.requestFetchAuthorDetails(authorId))
          done()
        })
        .catch(function (error) {
          done(error)
        })
    })
    it('should dispatch an action created by `receiveFetchAuthorDetails` if fetching successed', function (done) {
      const mockAuthorData = { id: authorId, email: 'mock-email', thumbnail: {} }
      const normalizedData = normalize(camelizeKeys(mockAuthorData), authorSchema)
      nock('http://localhost:8080')
        .get('/v1/search/authors')
        .query(searchParas)
        .reply(200, { hits: [ mockAuthorData ] })
      store.dispatch(actions.fetchAuthorDetails(authorId))
        .then(function () {
          const actionsInStore = store.getActions()
          expect(actionsInStore[1]).to.deep.equal(actions.receiveFetchAuthorDetails(normalizedData))
          done()
        })
        .catch(function (error) {
          done(error)
        })
    })
    it('should dispatch an action created by `failToFetchAuthorDetails` if fetching failed', function (done) {
      nock('http://localhost:8080')
        .get('/v1/search/authors')
        .query(searchParas)
        .reply(500)
      store.dispatch(actions.fetchAuthorDetails(authorId))
        .then(function () {
          const actionsInStore = store.getActions()
          expect(actionsInStore[1]).to.deep.equal(actions.failToFetchAuthorDetails(new Error('Bad response from API.')))
          done()
        })
        .catch(function (error) {
          done(error)
        })
    })
  })
})
