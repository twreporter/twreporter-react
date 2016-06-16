'use strict'
import * as types from '../constants/action-types'

function articles(state = {}, action) {
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

export default articles
