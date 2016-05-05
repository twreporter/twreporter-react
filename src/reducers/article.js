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
        slug: action.response.result,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function selectedArticle(state = {}, action) {
  switch(action.type) {
    case types.FETCH_ARTICLE_SUCCESS:
    case types.FETCH_ARTICLE_REQUEST:
    case types.FETCH_ARTICLE_FAILURE:
      return Object.assign({}, state, article(state, action))
    default:
      return state
  }
}

export default selectedArticle
