'use strict'
import { articlesByUuids, featureArticles, relatedArticles } from './articles'
import { categories, tags } from './groups'
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { FatalError } from '../lib/custom-error'
import _ from 'lodash'
import * as types from '../constants/action-types'
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
      return _.merge({}, state, {
        [action.slug]: _.get(action, 'response.result' )
      })
    case types.FETCH_ARTICLES_BY_GROUP_UUID_SUCCESS:
    case types.FETCH_FEATURE_ARTICLES_SUCCESS:
    case types.FETCH_RELATED_ARTICLES_SUCCESS:
      let rtn = {}
      let articles = _.get(action, [ 'response', 'entities', 'articles' ], {})
      _.forEach(articles, (article) => {
        rtn[article.slug] = article.id
      })
      return _.merge({}, state, rtn)
    default:
      return state
  }
}

function fatalError(state = null, action) {
  switch (action.type) {
    case types.FETCH_ARTICLE_FAILURE:
      const { error } = action
      if ( error instanceof FatalError ) {
        return error
      }
      return state
    default:
      return state
  }
}

const rootReducer = combineReducers({
  articlesByUuids,
  featureArticles,
  relatedArticles,
  categories,
  fatalError,
  device,
  selectedArticle,
  tags,
  routing: routerReducer,
  header,
  slugToId,
  entities
})

export default rootReducer
