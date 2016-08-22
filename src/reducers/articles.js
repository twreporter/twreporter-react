'use strict'
import * as types from '../constants/action-types'
import _ from 'lodash'

function articles(state = {}, action = {}) {
  let _state = {}
  let id = action.id
  switch (action.type) {
    case types.FETCH_ARTICLES_BY_GROUP_UUID_REQUEST:
    case types.FETCH_RELATED_ARTICLES_REQUEST:
      if (state.hasOwnProperty(id)) {
        _.merge(_state, {
          isFetching: true
        })
      } else {
        _.merge(_state, {
          isFetching: true,
          error: null,
          hasMore: false,
          items: []
        })
      }
      return _.merge({}, state, {
        [ id ]: _state
      })

    case types.FETCH_ARTICLES_BY_GROUP_UUID_FAILURE:
    case types.FETCH_RELATED_ARTICLES_FAILURE:
      _.merge(_state, {
        isFetching: false,
        error: action.error,
        lastUpdated: action.failedAt
      })
      return _.merge({}, state, {
        [ id ]: _state
      })

    case types.FETCH_RELATED_ARTICLES_SUCCESS:
      return _.merge({}, state, {
        [ id ]: {
          isFetching: false,
          hasMore: false,
          error: null,
          items: _.get(action, 'relatedIds'),
          total: _.get(action, 'relatedIds.length'),
          lastUpdated: action.receivedAt
        }
      })

    case types.FETCH_ARTICLES_BY_GROUP_UUID_SUCCESS:
      _state = _.get(state, id)
      let total = _.get(_state, 'total') || _.get(action, 'response.meta.total')
      let items = _.get(_state, 'items')
      let hasMore = _.get(_state, 'hasMore')

      // dedup items
      items = _.uniq(items.concat(_.get(action, 'response.result')))

      if (items.length >= total) {
        hasMore = false
      } else {
        hasMore = true
      }

      return _.merge({}, state, {
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
      return _.merge({}, state, {
        isFetching: true,
        error: null
      })
    case types.FETCH_FEATURE_ARTICLES_FAILURE:
      return _.merge({}, state, {
        isFetching: false,
        error: action.error,
        lastUpdated: action.failedAt
      })
    case types.FETCH_FEATURE_ARTICLES_SUCCESS:
      return {
        isFetching: false,
        error: null,
        items: _.get(action, 'response.result'),
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}
