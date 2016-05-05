/*eslint no-console: 0*/
/* global console */
'use strict'
import { formatUrl } from '../utils/index'
import { merge } from 'lodash'
import * as types from '../constants/action-types'

function generateKey(tags) {
  tags = Array.isArray(tags) ? tags : [ tags ]
  return tags.sort().join()
}
function articles(state = {}, action) {
  let key = generateKey(action.tags)
  let _state = {}
  switch (action.type) {
    case types.FETCH_ARTICLES_REQUEST:
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
    case types.FETCH_ARTICLES_FAILURE:
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
    case types.FETCH_ARTICLES_SUCCESS:
      let nextUrl = ''
      let response = action.response
      try {
        let href = action.response.links.next.href
        let embedded = JSON.stringify({ authors: 1, tags:1, categories:1 })
        nextUrl = formatUrl(encodeURIComponent(`${href}&embedded=${embedded}`))
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

export default function (state = {}, action) {
  switch(action.type) {
    case types.FETCH_ARTICLES_SUCCESS:
    case types.FETCH_ARTICLES_REQUEST:
    case types.FETCH_ARTICLES_FAILURE:
      return articles(state, action)
    default:
      return state
  }
}

