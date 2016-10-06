'use strict'
import * as types from '../constants/action-types'

// lodash
import get from 'lodash/get'
import merge from 'lodash/merge'
import uniq from 'lodash/uniq'

function articles(state = {}, action = {}) {
  let _state = {}
  let id = action.id
  switch (action.type) {
    case types.FETCH_ARTICLES_BY_GROUP_UUID_REQUEST:
    case types.FETCH_RELATED_ARTICLES_REQUEST:
      if (state.hasOwnProperty(id)) {
        merge(_state, {
          isFetching: true
        })
      } else {
        merge(_state, {
          isFetching: true,
          error: null,
          hasMore: false,
          items: []
        })
      }
      return merge({}, state, {
        [ id ]: _state
      })

    case types.FETCH_ARTICLES_BY_GROUP_UUID_FAILURE:
    case types.FETCH_RELATED_ARTICLES_FAILURE:
      merge(_state, {
        isFetching: false,
        error: action.error,
        lastUpdated: action.failedAt
      })
      return merge({}, state, {
        [ id ]: _state
      })

    case types.FETCH_RELATED_ARTICLES_SUCCESS:
      return merge({}, state, {
        [ id ]: {
          isFetching: false,
          hasMore: false,
          error: null,
          items: get(action, 'relatedIds'),
          total: get(action, 'relatedIds.length'),
          lastUpdated: action.receivedAt
        }
      })

    case types.FETCH_ARTICLES_BY_GROUP_UUID_SUCCESS:
      _state = get(state, id)
      let total = get(_state, 'total') || get(action, 'response.meta.total')
      let items = get(_state, 'items')
      let hasMore = get(_state, 'hasMore')

      // dedup items
      items = uniq(items.concat(get(action, 'response.result')))

      if (items.length >= total) {
        hasMore = false
      } else {
        hasMore = true
      }

      return merge({}, state, {
        [ id ]: {
          isFetching: false,
          hasMore,
          error: null,
          items,
          total,
          lastUpdated: action.receivedAt
        }
      })
    default:
      return state
  }
}

export function relatedArticles(state = {}, action = {}) {
  switch (action.type) {
    case types.FETCH_RELATED_ARTICLES_REQUEST:
    case types.FETCH_RELATED_ARTICLES_FAILURE:
    case types.FETCH_RELATED_ARTICLES_SUCCESS:
      return articles(state, action)
    default:
      return state
  }
}

export function articlesByUuids(state = {}, action = {}) {
  switch (action.type) {
    case types.FETCH_ARTICLES_BY_GROUP_UUID_REQUEST:
    case types.FETCH_ARTICLES_BY_GROUP_UUID_FAILURE:
    case types.FETCH_ARTICLES_BY_GROUP_UUID_SUCCESS:
      return articles(state, action)
    default:
      return state
  }
}

export function featureArticles(state = {}, action = {})  {
  switch (action.type) {
    case types.FETCH_FEATURE_ARTICLES_REQUEST:
      return merge({}, state, {
        isFetching: true,
        error: null
      })
    case types.FETCH_FEATURE_ARTICLES_FAILURE:
      return merge({}, state, {
        isFetching: false,
        error: action.error,
        lastUpdated: action.failedAt
      })
    case types.FETCH_FEATURE_ARTICLES_SUCCESS:
      return {
        isFetching: false,
        error: null,
        items: get(action, 'response.result'),
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}
