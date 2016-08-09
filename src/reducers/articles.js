'use strict'
import * as types from '../constants/action-types'
import _ from 'lodash'

export function articlesByIds(state = {}, action = {}) {
  switch (action.type) {
    case types.FETCH_ARTICLES_REQUEST:
      return _.merge({}, state, {
        isFetching: true,
        ids: action.ids,
        error: null
      })
    case types.FETCH_ARTICLES_FAILURE:
      return _.merge({}, state, {
        isFetching: false,
        ids: action.ids,
        error: action.error,
        lastUpdated: action.failedAt
      })
    case types.FETCH_ARTICLES_SUCCESS:
      return _.merge({}, state, {
        isFetching: false,
        error: null,
        ids: action.ids,
        lastUpdated: action.receivedAt
      })
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
      return _.merge({}, state, {
        isFetching: false,
        error: null,
        items: _.get(action, 'response.result'),
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function _groupArticles(state = {}, action = {}) {
  let _state = {}
  let id = action.id
  switch (action.type) {
    case types.FETCH_ARTICLES_BY_TOPIC_ID_REQUEST:
    case types.FETCH_ARTICLES_BY_CAT_ID_REQUEST:
    case types.FETCH_ARTICLES_BY_TAG_ID_REQUEST:
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
    case types.FETCH_ARTICLES_BY_TOPIC_ID_FAILURE:
    case types.FETCH_ARTICLES_BY_CAT_ID_FAILURE:
    case types.FETCH_ARTICLES_BY_TAG_ID_FAILURE:
      _.merge(_state, {
        isFetching: false,
        error: action.error,
        lastUpdated: action.failedAt
      })
      return _.merge({}, state, {
        [ id ]: _state
      })
    case types.FETCH_ARTICLES_BY_TOPIC_ID_SUCCESS:
    case types.FETCH_ARTICLES_BY_CAT_ID_SUCCESS:
    case types.FETCH_ARTICLES_BY_TAG_ID_SUCCESS:
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

export function articlesByTopics(state = {}, action = {}) {
  switch (action.type) {
    case types.FETCH_ARTICLES_BY_TOPIC_ID_REQUEST:
    case types.FETCH_ARTICLES_BY_TOPIC_ID_FAILURE:
    case types.FETCH_ARTICLES_BY_TOPIC_ID_SUCCESS:
      return _groupArticles(state, action)
    default:
      return state
  }
}

export function articlesByTags(state = {}, action = {}) {
  switch(action.type) {
    case types.FETCH_ARTICLES_BY_TAG_ID_REQUEST:
    case types.FETCH_ARTICLES_BY_TAG_ID_FAILURE:
    case types.FETCH_ARTICLES_BY_TAG_ID_SUCCESS:
      return _groupArticles(state, action)
    default:
      return state
  }
}

export function articlesByCats(state = {}, action = {}) {
  switch(action.type) {
    case types.FETCH_ARTICLES_BY_CAT_ID_REQUEST:
    case types.FETCH_ARTICLES_BY_CAT_ID_FAILURE:
    case types.FETCH_ARTICLES_BY_CAT_ID_SUCCESS:
      return _groupArticles(state, action)
    default:
      return state
  }
}

