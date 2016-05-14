'use strict'
import { articlesByCats, articlesByTags } from './articles'
import { categories, tags } from './groups'
import { combineReducers } from 'redux'
import { merge } from 'lodash'
import { routerStateReducer as router } from 'redux-router'
import { FatalError } from '../lib/custom-error'
import device from './device'
import selectedArticle from './article'

// Updates an entity cache in response to any action with response.entities.
function entities(state = {}, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }
  return state
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
  articlesByCats,
  articlesByTags,
  categories,
  fatalError,
  entities,
  device,
  selectedArticle,
  tags,
  router
})

export default rootReducer
