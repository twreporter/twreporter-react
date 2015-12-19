/*eslint no-console: 0*/
/* global console */
import * as ActionType from '../actions/articles'
import { camelizeKeys } from 'humps'

function parseResponse(response = {}) {
  if (response && response.text) {
    try {
      response = JSON.parse(response.text)
    } catch (e) {
      console.log('JSON.parse response occurs error', e)
    }
  }
  return response
}

function tagArticles(state = {}, action) {
  const response = action.response
  let rtn = {}
  switch (action.type) {
    case ActionType.LOADED_MULTI_TAGGED_ARTICLES_SUCCESS:
      /* data structure:
          response: {
            results: {
              0: {
                _items: [ ... ]
              },
              1 : {
                _items: [ ... ]
              }
            }
          }
      */
      if (response) {
        let results = response.results
        let tags = action.tags || []
        for (let i =0; i < tags.length; i++) {
          let tag = tags[i]
          let result = results[i]
          let items = result.items || []
          let total = result.meta && result.meta.total
          rtn[tag] = {
            items: items,
            total: total,
            hasMore: total > items.length ? true : false
          }
        }
      }
      return Object.assign({}, state, rtn)

    case ActionType.LOADED_ARTICLES_SUCCESS:
      /* data structure:
          response: {
            results: {
              _items: [ ... ]
            }
          }
      */
      if (response) {
        let tag = ''
        if ('string' === typeof action.tags) {
          tag = action.tags
        } else if (Array.isArray(action.tags)) {
          tag = action.tags.toString()
        }

        let items = response.items
        const meta = response.meta

        items = state[tag] ? state[tag].items.concat(items) : items

        rtn[tag] = {
          items: items,
          total: meta.total,
          hasMore: meta.total > items.length ? true : false
        }
      }
      return Object.assign({}, state, rtn)

    case ActionType.LOADED_MULTI_TAGGED_ARTICLES_FAILURE:
    case ActionType.LOADED_ARTICLES_FAILURE:
      return state

    default:
      return state
  }
}

function articles(state = {}, action) {
  switch(action.type) {
    case ActionType.LOADED_MULTI_TAGGED_ARTICLES_SUCCESS:
    case ActionType.LOADED_ARTICLES_SUCCESS:
      if (action.response) {
        action.response = camelizeKeys(parseResponse(action.response))
      }
      return tagArticles(state, action)

    case ActionType.LOADED_ARTICLES_FAILURE:
    case ActionType.LOADED_MULTI_TAGGED_ARTICLES_FAILURE:
      return state

    default:
      return state
  }
}

export default articles
