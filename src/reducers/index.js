'use strict'
import { articlesByCats, articlesByTags } from './group-articles'
import { categories, tags } from './groups'
import { combineReducers } from 'redux'
import { routerStateReducer as router } from 'redux-router'
import { FatalError } from '../lib/custom-error'
import _ from 'lodash'
import * as types from '../constants/action-types'
import articlesByIds from './articles'
import device from './device'
import header from './header'
import selectedArticle from './article'

// Updates an entity cache in response to any action with response.entities.
function entities(state = {}, action) {
  if (action.response && action.response.entities) {
    return _.merge({}, state, action.response.entities)
  }
  return state
}

function slugToId(state = {}, action) {
  switch (action.type) {
    case types.FETCH_ARTICLE_SUCCESS:
    case types.FETCH_ARTICLES_BY_CATS_SUCCESS:
    case types.FETCH_ARTICLES_BY_TAGS_SUCCESS:
      let rtn = {}
      let articles = _.get(action, [ 'response', 'entities', 'articles' ], {})
      for(let id in articles) {
        if (articles.hasOwnProperty(id)) {
          rtn[articles[id].slug] = id
        }
      }
      return _.merge({}, state, rtn)
    default:
      return state
  }
}

function fatalError(state = null, action) {
  const { error } = action

  if ( error instanceof FatalError ) {
    return action.error
  } else {
    return null
  }

  return state
}

const rootReducer = combineReducers({
  articlesByIds,
  articlesByCats,
  articlesByTags,
  categories,
  fatalError,
  device,
  selectedArticle,
  tags,
  router,
  header,
  slugToId,
  entities
})

export default rootReducer
