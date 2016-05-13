/*eslint no-console: 0*/
/* global console */
'use strict'
import { formatUrl, getArticleEmbeddedQuery } from '../utils/index'
import { merge } from 'lodash'
import * as types from '../constants/action-types'

function generateKey(groups) {
  groups = Array.isArray(groups) ? groups : [ groups ]
  return groups.sort().join()
}

function articles(state = {}, action) {
  let key = generateKey(action.groups)
  let _state = {}
  switch (action.type) {
    case types.FETCH_ARTICLES_BY_CATS_REQUEST:
    case types.FETCH_ARTICLES_BY_TAGS_REQUEST:
      if (state.hasOwnProperty(key)) {
        merge(_state, state[key], {
          isFetching: true
        })
      } else {
        merge(_state, {
          isFetching: true,
          error: null,
          nextUrl: null,
          items: []
        })
      }
      return merge({}, state, {
        [ key ]: _state
      })
    case types.FETCH_ARTICLES_BY_CATS_FAILURE:
    case types.FETCH_ARTICLES_BY_TAGS_FAILURE:
      if (state.hasOwnProperty(key)) {
        merge(_state, state[key], {
          isFetching: false,
          error: action.error,
          lastUpdated: action.failedAt
        })
      } else {
        merge(_state, {
          isFetching: false,
          error: action.error,
          nextUrl: null,
          items: [],
          lastUpdated: action.failedAt
        })
      }
      return merge({}, state, {
        [ key ]: _state
      })
    case types.FETCH_ARTICLES_BY_CATS_SUCCESS:
    case types.FETCH_ARTICLES_BY_TAGS_SUCCESS:
      let nextUrl = ''
      let response = action.response
      try {
        let nextHref = action.response.links.next.href
        let embedded = JSON.stringify(getArticleEmbeddedQuery())
        nextUrl = formatUrl(`${nextHref}&embedded=${embedded}`)
      } catch(e) {
        console.log('there is no next href ', e)
      }
      let items = state[key] && state[key].items ? state[key].items.concat(response.result) : response.result
      merge(_state, state[key], {
        isFetching: false,
        nextUrl: nextUrl,
        error: null,
        items: items,
        lastUpdated: action.receivedAt
      })
      return merge({}, state, {
        [ key ]: _state
      })
    default:
      return state
  }
}

export function articlesByTags(state = {}, action = {}) {
  switch(action.type) {
    case types.FETCH_ARTICLES_BY_TAGS_REQUEST:
    case types.FETCH_ARTICLES_BY_TAGS_FAILURE:
    case types.FETCH_ARTICLES_BY_TAGS_SUCCESS:
      return articles(state, action)
    default:
      return state
  }
}

export function articlesByCats(state = {}, action = {}) {
  switch(action.type) {
    case types.FETCH_ARTICLES_BY_CATS_REQUEST:
    case types.FETCH_ARTICLES_BY_CATS_FAILURE:
    case types.FETCH_ARTICLES_BY_CATS_SUCCESS:
      return articles(state, action)
    default:
      return state
  }
}
