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

function taggedArticles(state = {}, action) {
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
      if (action.response) {
        let response = parseResponse(action.response)
        let results = camelizeKeys(response.results)
        let tags = action.tags || []
        for (let i =0; i < tags.length; i++) {
          let tag = tags[i]
          let result = results[i]
          if (!rtn[tag]) {
            const total = result.meta && result.meta.total
            rtn[tag] = {
              items: [],
              total: total,
              hasMore: total > 0 ? true : false
            }
          }
          rtn[tag].items = rtn[tag].items.concat(result.items)
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
      if (action.response) {
        let tag = ''
        if ('string' === typeof action.tags) {
          tag = action.tags
        } else if (Array.isArray(action.tags)) {
          tag = action.tags.toString()
        }

        const response = camelizeKeys(parseResponse(action.response))
        const items = response.items
        const meta = response.meta

        for (let item of items) {
          if (!item) {
            break
          }
          if (!rtn[tag]) {
            rtn[tag] = {
              items: [],
              total: meta.total,
              hasMore: meta.total > 0 ? true : false
            }
          }

          rtn[tag].items = rtn[tag].items.concat(items)
          rtn[tag].hasMore = rtn[tag].items.length < rtn[tag].total ? true : false
        }
      }
      return Object.assign({}, state, articles)

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
      return taggedArticles(state, action)

    case ActionType.LOADED_ARTICLES_FAILURE:
    case ActionType.LOADED_MULTI_TAGGED_ARTICLES_FAILURE:
      return {}

    default:
      return state
  }
}

export default articles
