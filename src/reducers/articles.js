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

function _groupArticles(state = {}, action) {
  let _state = {}
  let id = action.id
  switch (action.type) {
    case types.FETCH_ARTICLES_BY_TOPIC_ID_REQUEST:
    case types.FETCH_ARTICLES_BY_CATS_REQUEST:
    case types.FETCH_ARTICLES_BY_TAGS_REQUEST:
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
    case types.FETCH_ARTICLES_BY_CATS_FAILURE:
    case types.FETCH_ARTICLES_BY_TAGS_FAILURE:
      _.merge(_state, {
        isFetching: false,
        error: action.error,
        lastUpdated: action.failedAt
      })
      return _.merge({}, state, {
        [ id ]: _state
      })
    case types.FETCH_ARTICLES_BY_TOPIC_ID_SUCCESS:
    case types.FETCH_ARTICLES_BY_CATS_SUCCESS:
    case types.FETCH_ARTICLES_BY_TAGS_SUCCESS:
      _state = _.get(state, id)
      let total = _.get(_state, 'total')
      let items = _.get(_state, 'items')
      let hasMore = _.get(_state, 'hasMore')
      if (!total) {
        total = _.get(action, 'response.meta.total')
      }

      items = items.concat(_.get(action, 'response.result'))

      if (items.length >= total) {
        hasMore = false
      } else {
        hasMore = true
      }

      return _.merge({}, state, {
        [ id ]: {
          isFetching: false,
          hasMore: hasMore,
          error: null,
          items: items,
          lastUpdated: action.receivedAt
        }
      })
    default:
      return state
  }
}

function articlesByTopicId(state = {}, action) {
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
    case types.FETCH_ARTICLES_BY_TAGS_REQUEST:
    case types.FETCH_ARTICLES_BY_TAGS_FAILURE:
    case types.FETCH_ARTICLES_BY_TAGS_SUCCESS:
      return _groupArticles(state, action)
    default:
      return state
  }
}

export function articlesByCats(state = {}, action = {}) {
  switch(action.type) {
    case types.FETCH_ARTICLES_BY_CATS_REQUEST:
    case types.FETCH_ARTICLES_BY_CATS_FAILURE:
    case types.FETCH_ARTICLES_BY_CATS_SUCCESS:
      return _groupArticles(state, action)
    default:
      return state
  }
}

export {
  articlesByIds,
  articlesByTopicId
}
