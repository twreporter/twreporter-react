'use strict'
import * as types from '../constants/action-types'

function article(state = {}, action) {
  switch (action.type) {
    case types.FETCH_ARTICLE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        slug: action.slug,
        error: null
      })
    case types.FETCH_ARTICLE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        slug: action.slug,
        error: action.error,
        lastUpdated: action.failedAt
      })
    case types.FETCH_ARTICLE_SUCCESS:
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

export default article
