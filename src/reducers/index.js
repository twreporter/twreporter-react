'use strict'
import { articlesByUuids, featureArticles, relatedArticles } from './articles'
import { categories, tags } from './groups'
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import * as types from '../constants/action-types'
import device from './device'
import header from './header'
import selectedArticle from './article'
import selectedTopic from './topic'

// lodash
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import merge from 'lodash/merge'

// Updates an entity cache in response to any action with response.entities.
function entities(state = {}, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }
  return state
}

function articleSlugToId(state = {}, action) {
  switch (action.type) {
    case types.FETCH_ARTICLE_SUCCESS:
      return merge({}, state, {
        [action.slug]: get(action, 'response.result' )
      })
    case types.FETCH_TOPIC_SUCCESS:
    case types.FETCH_ARTICLES_BY_GROUP_UUID_SUCCESS:
    case types.FETCH_FEATURE_ARTICLES_SUCCESS:
    case types.FETCH_RELATED_ARTICLES_SUCCESS:
      let rtn = {}
      let articles = get(action, [ 'response', 'entities', 'articles' ], {})
      forEach(articles, (article) => {
        rtn[article.slug] = article.id
      })
      return merge({}, state, rtn)
    default:
      return state
  }
}

function topicSlugToId(state = {}, action) {
  switch (action.type) {
    case types.FETCH_TOPIC_SUCCESS:
      return merge({}, state, {
        [action.slug]: get(action, 'response.result' )
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  articlesByUuids,
  featureArticles,
  relatedArticles,
  categories,
  device,
  selectedArticle,
  selectedTopic,
  tags,
  routing: routerReducer,
  header,
  articleSlugToId,
  topicSlugToId,
  entities
})

export default rootReducer
