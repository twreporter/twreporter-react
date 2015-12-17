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
  let articles = {}
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
        let results = response.results
        let tags = action.tags || []
        for (let i =0; i < tags.length; i++) {
          let tag = tags[i]
          let camelizedJson = camelizeKeys(results[i]._items)
          articles[tag] = camelizedJson
        }
      }
      return Object.assign({}, state, articles)

    case ActionType.LOADED_ARTICLES_SUCCESS:
      /* data structure:
          response: {
            results: {
              _items: [ ... ]
            }
          }
      */
      if (action.response) {
        const tags = action.tags || []
        let response = parseResponse(action.response)
        let items = response._items
        items = camelizeKeys(items)

        for (let item of items) {
          if (!item) {
            break
          }
          const _tags = item.tags
          for (let _tag of _tags) {
            if (tags.indexOf(_tag) > -1) {
              if (!Array.isArray(articles[_tag])) {
                articles[_tag] = []
              }
              articles[_tag].push(item)
              break
            }
          }
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
