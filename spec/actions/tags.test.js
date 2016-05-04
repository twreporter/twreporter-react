/*global afterEach, describe, it*/
'use strict'
import { expect } from 'chai'
import { merge } from 'lodash'
import * as actions from '../../src/actions/tags'
import * as types from '../../src/constants/action-types'
import configureMockStore from 'redux-mock-store'
import mockTags from './mocks/tags'
import nock from 'nock'
import thunk from 'redux-thunk'
import qs from 'qs'

// for formatURl function in src/utils/index.js
global.__SERVER__ = true

const middlewares = [ thunk ]
const mockDefaultStore = {
  tags: {}
}
const mockStore = configureMockStore(middlewares)
const mockTagsName = [ 'mock-tag-1', 'mock-tag-2' ]

let query = qs.stringify({ where: JSON.stringify( { name: { '$in':  mockTagsName } }) })

describe('tags action', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates FETCH_TAGS_REQUEST and FETCH_TAGS_SUCCESS when tags has been fetched', () => {
    nock('http://localhost:3030/')
      .get(`/tags/?${query}`)
      .reply(200, mockTags)

    const expectedActions = [
      { type: types.FETCH_TAGS_REQUEST, tags: mockTagsName },
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
        expect(action.response.entities.tags.hasOwnProperty('572315331cece3ae858dffe3')).to.be.true
        expect(action.response.entities.tags.hasOwnProperty('572315471cece3ae858dffe4')).to.be.true
        expect(action.response.result).to.deep.equal([ '572315331cece3ae858dffe3', '572315471cece3ae858dffe4' ])
      })
  })

  it('creates FETCH_TAGS_REQUEST and FETCH_TAGS_FAILURE when fetching tags occurs error', () => {

    nock('http://localhost:3030/')
      .get(`/tags/?${query}`)
      .reply(404, {})

    const expectedActions = [
      { type: types.FETCH_TAGS_REQUEST, tags: mockTagsName },
      { type: types.FETCH_TAGS_FAILURE, tags: mockTagsName, error: new Error('Bad response from API') }
    ]
    const store = mockStore(mockDefaultStore)

    return store.dispatch(actions.fetchTagsIfNeeded(mockTagsName))
      .then(() => { // return of async actions
        expect(store.getActions()[0]).to.deep.equal(expectedActions[0])
        expect(store.getActions()[1].type).to.deep.equal(expectedActions[1].type)
        expect(store.getActions()[1].tags).to.deep.equal(expectedActions[1].tags)
        expect(store.getActions()[1].error.toString()).to.deep.equal(expectedActions[1].error.toString())
      })
  })

  it('does not create any action when tags are already fetched', () => {
    const store = mockStore(merge({}, mockDefaultStore, { tags: { [mockTagsName[0]]: {}, [mockTagsName[1]]: {} } }))
    expect(store.dispatch(actions.fetchTagsIfNeeded(mockTagsName))).to.equal(undefined)
  })
})
