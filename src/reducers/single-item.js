'use strict'
import * as types from '../constants/action-types'

function singleItem(state = {}, action) {
  switch (action.type) {
    case types.FETCH_ARTICLE_REQUEST:
    case types.FETCH_TOPIC_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        slug: action.slug,
        error: null
      })
    case types.FETCH_ARTICLE_FAILURE:
    case types.FETCH_TOPIC_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        slug: action.slug,
        error: action.error,
        lastUpdated: action.failedAt
      })
    case types.FETCH_ARTICLE_SUCCESS:
    case types.FETCH_TOPIC_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        error: null,
        id: action.response.result,
        slug: action.slug,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

export default singleItem
