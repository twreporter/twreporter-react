/*global before, afterEach, describe, it*/
'use strict'
import { expect } from 'chai'
import { merge } from 'lodash'
import * as actions from '../../../src/actions/groups'
import * as types from '../../../src/constants/action-types'
import configureMockStore from 'redux-mock-store'
import mockTags from './mocks/tags'
import mockCats from './mocks/categories'
import nock from 'nock'
import thunk from 'redux-thunk'
import qs from 'qs'

// for formatURl function in src/utils/index.js
global.__SERVER__ = true

const middlewares = [ thunk ]
const mockDefaultStore = {
  tags: {},
  categories: {}
}
const mockStore = configureMockStore(middlewares)
const mockTagsName = [ 'tag-1', 'tag-2' ]
const mockCatsName = [ 'category-1', 'category-2' ]

describe('tags action', () => {
  let query
  before(() => {
    query = qs.stringify({ where: JSON.stringify( { name: { '$in':  mockTagsName } }) })
  })
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates FETCH_TAGS_REQUEST and FETCH_TAGS_SUCCESS when tags has been fetched', () => {
    nock('http://localhost:3030/')
      .get(`/tags?${query}`)
      .reply(200, mockTags)

    const expectedActions = [
      { type: types.FETCH_TAGS_REQUEST, groups: mockTagsName },
      { type: types.FETCH_TAGS_SUCCESS }
    ]
    const store = mockStore(mockDefaultStore)

    return store.dispatch(actions.fetchTagsIfNeeded(mockTagsName))
      .then(() => { // return of async actions
        const action = store.getActions()[1]
        expect(store.getActions()[0]).to.deep.equal(expectedActions[0])
        expect(action.type).to.deep.equal(expectedActions[1].type)
        expect(action.response).to.be.an('object')
        expect(action.response.entities).to.be.an('object')
        expect(action.response.entities.tags).to.be.an('object')
        expect(action.response.entities.tags.hasOwnProperty('tag-id-1')).to.be.true
        expect(action.response.entities.tags.hasOwnProperty('tag-id-2')).to.be.true
        expect(action.response.result).to.deep.equal([ 'tag-id-1', 'tag-id-2' ])
      })
  })

  it('creates FETCH_TAGS_REQUEST and FETCH_TAGS_FAILURE when fetching tags occurs error', () => {

    nock('http://localhost:3030/')
      .get(`/tags?${query}`)
      .reply(404, {})

    const expectedActions = [
      { type: types.FETCH_TAGS_REQUEST, groups: mockTagsName },
      { type: types.FETCH_TAGS_FAILURE, groups: mockTagsName, error: new Error('Bad response from API') }
    ]
    const store = mockStore(mockDefaultStore)

    return store.dispatch(actions.fetchTagsIfNeeded(mockTagsName))
      .then(() => { // return of async actions
        expect(store.getActions()[0]).to.deep.equal(expectedActions[0])
        expect(store.getActions()[1].type).to.deep.equal(expectedActions[1].type)
        expect(store.getActions()[1].groups).to.deep.equal(expectedActions[1].groups)
        expect(store.getActions()[1].error.toString()).to.contain(expectedActions[1].error.toString())
      })
  })

  it('does not create any action when tags are already fetched', () => {
    const store = mockStore(merge({}, mockDefaultStore, { tags: { [mockTagsName[0]]: {}, [mockTagsName[1]]: {} } }))
    expect(store.dispatch(actions.fetchTagsIfNeeded(mockTagsName))).to.be.an.instanceof(Promise)
  })
})

describe('categories action', () => {
  let query
  before(() => {
    query = qs.stringify({ where: JSON.stringify( { name: { '$in':  mockCatsName } }) })
  })
  afterEach(() => {
    nock.cleanAll()
  })

  it('dispatch request and receive actions when categories has been fetched', () => {
    nock('http://localhost:3030/')
      .get(`/postcategories?${query}`)
      .reply(200, mockCats)

    const expectedActions = [
      { type: types.FETCH_CATEGORIES_REQUEST, groups: mockCatsName },
      { type: types.FETCH_CATEGORIES_SUCCESS }
    ]
    const store = mockStore(mockDefaultStore)

    return store.dispatch(actions.fetchCategoriesIfNeeded(mockCatsName))
      .then(() => { // return of async actions
        const action = store.getActions()[1]
        expect(store.getActions()[0]).to.deep.equal(expectedActions[0])
        expect(action.type).to.deep.equal(expectedActions[1].type)
        expect(action.response).to.be.an('object')
        expect(action.response.entities).to.be.an('object')
        expect(action.response.entities.categories).to.be.an('object')
        expect(action.response.entities.categories.hasOwnProperty('category-id-1')).to.be.true
        expect(action.response.entities.categories.hasOwnProperty('category-id-2')).to.be.true
        expect(action.response.result).to.deep.equal([ 'category-id-1', 'category-id-2' ])
      })
  })

  it('dispatch request and failure actions when fetching categories occurs error', () => {

    nock('http://localhost:3030/')
      .get(`/postcategories?${query}`)
      .reply(404, {})

    const expectedActions = [
      { type: types.FETCH_CATEGORIES_REQUEST, groups: mockCatsName },
      { type: types.FETCH_CATEGORIES_FAILURE, groups: mockCatsName, error: new Error('Bad response from API') }
    ]
    const store = mockStore(mockDefaultStore)

    return store.dispatch(actions.fetchCategoriesIfNeeded(mockCatsName))
      .then(() => { // return of async actions
        expect(store.getActions()[0]).to.deep.equal(expectedActions[0])
        expect(store.getActions()[1].type).to.deep.equal(expectedActions[1].type)
        expect(store.getActions()[1].groups).to.deep.equal(expectedActions[1].groups)
        expect(store.getActions()[1].error.toString()).to.contain(expectedActions[1].error.toString())
      })
  })

  it('does not create any action when categories are already fetched', () => {
    const store = mockStore(merge({}, mockDefaultStore, { categories: { [mockCatsName[0]]: {}, [mockCatsName[1]]: {} } }))
    expect(store.dispatch(actions.fetchCategoriesIfNeeded(mockCatsName))).to.be.an.instanceof(Promise)
  })
})
