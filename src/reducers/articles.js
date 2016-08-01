'use strict'
import * as types from '../constants/action-types'
import _ from 'lodash'

function articlesByIds(state = {}, action) {
  switch (action.type) {
    case types.FETCH_ARTICLES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        ids: action.ids,
        error: null
      })
    case types.FETCH_ARTICLES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        ids: action.ids,
        error: action.error,
        lastUpdated: action.failedAt
      })
    case types.FETCH_ARTICLES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        error: null,
        ids: action.ids,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function articlesByTopicId(state = {}, action) {
  let topicId = _.get(action, 'topicId')
  switch (action.type) {
    case types.FETCH_ARTICLES_BY_TOPIC_ID_REQUEST:
      return _.merge({}, state, {
        [topicId]: {
          isFetching: true
        }
      })
    case types.FETCH_ARTICLES_BY_TOPIC_ID_FAILURE:
      return _.merge({}, state, {
        [topicId]: {
          isFetching: false,
          error: action.error,
          lastUpdated: action.failedAt
        }
      })
    case types.FETCH_ARTICLES_SUCCESS:
      return _.merge({}, state, {
        [topicId]: {
          isFetching: false,
          error: null,
          ids: _.get(action, 'response.result'),
          lastUpdated: action.receivedAt
        }
      })
    default:
      return state
  }
}

export {
  articlesByIds,
  articlesByTopicId
}
