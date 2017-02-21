/* global describe, context, it, afterEach */

/*
  Testing functions:
    fetchTopicIfNeeded
*/

'use strict'

import { expect } from 'chai'
import thunk from 'redux-thunk'
import nock from 'nock'
import omit from 'lodash/omit'
import * as actions from '../topic'
import * as types from '../../constants/action-types'
import configureMockStore from 'redux-mock-store'
import { formatUrl } from '../../utils/index'

const _ = {
  omit
}

global.__SERVER__ = true

describe('Testing fetchTopicIfNeeded: ', () => {
  const middlewares = [ thunk ]
  const mockStore = configureMockStore(middlewares)
  
  context('If id does not exisit:', () => {
    describe('Dispatch fetchTopic(slug)', () => {
      afterEach(() => {
        nock.cleanAll()
      })
      it('Should dispatch FETCH_TOPIC_REQUEST and FETCH_TOPIC_SUCCESS', () => {
        const slug = 'mock-slug'
        const url = formatUrl(`topics/${slug}`) // http://localhost:3030/api/topics/mock-slug
        const path = url.slice(21)
        const mockApiRespnse = {
          slug,
          _id: '585235c3e7c6090d0080f757',
          topic_name: 'Mock Topic Name',
          title: 'Mock Title',
          subtitle: 'Mock Sub-Title',
          og_title: 'Mock Open Graph Title',
          _updated: 'Thu, 01 Jan 1970 00:00:00 GMT'
        }
        const expectedResponse = {
          entities: {
            topics: {
              '585235c3e7c6090d0080f757': {
                slug,
                id: '585235c3e7c6090d0080f757',
                topicName: 'Mock Topic Name',
                title: 'Mock Title',
                subtitle: 'Mock Sub-Title',
                ogTitle: 'Mock Open Graph Title',
                updated: 'Thu, 01 Jan 1970 00:00:00 GMT'
              }
            }
          },
          'result': '585235c3e7c6090d0080f757'
        }
        const expectedRequestAction = {
          type: types.FETCH_TOPIC_REQUEST,
          slug,
          url
        }
        const expectiedReceivedAction = {
          type: types.FETCH_TOPIC_SUCCESS,
          slug,
          response: expectedResponse
        }
        nock(url)
          .get(path)
          .reply(200, mockApiRespnse)
        const store = mockStore({})
        return store.dispatch(actions.fetchTopicIfNeeded(slug))
          .then(() => {
            const dispatchedActions = store.getActions()
            expect(dispatchedActions[0]).to.deep.equal(expectedRequestAction)
            expect(_.omit(dispatchedActions[1], 'receivedAt')).to.deep.equal(expectiedReceivedAction)
          })
      })
      it('Should dispatch FETCH_TOPIC_REQUEST and FETCH_TOPIC_FAILURE', () => {
        const slug = 'mock-slug'
        const url = formatUrl(`topics/${slug}`) // http://localhost:3030/api/topics/mock-slug
        const expectedRequestAction = {
          type: types.FETCH_TOPIC_REQUEST,
          slug,
          url
        }
        const expectiedfailedAction = {
          type: types.FETCH_TOPIC_FAILURE,
          slug,
          error: {
            status: 500
          }
        }
        nock(url)
          .get('')
          .reply(500, {})
        const store = mockStore({})
        return store.dispatch(actions.fetchTopicIfNeeded(slug))
          .then(() => {
            const dispatchedActions = store.getActions()
            expect(dispatchedActions[0]).to.deep.equal(expectedRequestAction)
            expect(_.omit(dispatchedActions[1], 'failedAt')).to.deep.equal(expectiedfailedAction)
          })
      })
    })
  })
  context('If id exisit:', () => {
    describe('Dispatch receiveTopic(response, slug)', () => {
      it('Should dispatch FETCH_TOPIC_SUCCESS', () => {
        const expectiedReceivedAction = {
          type: types.FETCH_TOPIC_SUCCESS,
          slug: 'mock-slug',
          response: {
            result: 'mockId'
          }
        }
        const store = mockStore({
          topicSlugToId: {
            'mock-slug': 'mockId'
          }
        })
        store.dispatch(actions.fetchTopicIfNeeded('mock-slug'))
        const dispatchedActions = store.getActions()
        expect(_.omit(dispatchedActions[0], 'receivedAt')).to.deep.equal(expectiedReceivedAction)
      })
    })
  })
})
