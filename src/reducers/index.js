'use strict'
import { articlesByCats, articlesByTags } from './articles'
import { categories, tags } from './groups'
import { combineReducers } from 'redux'
import { merge } from 'lodash'
import { routerStateReducer as router } from 'redux-router'
import * as ActionTypes from '../actions'
import device from './device'
import selectedArticle from './article'

// Updates an entity cache in response to any action with response.entities.
function entities(state = {}, action) {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }
  return state
}

function errorMessage(state = null, action) {
  const { type, error } = action

  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return action.error
  }

  return state
}

const rootReducer = combineReducers({
  articlesByCats,
  articlesByTags,
  categories,
  errorMessage,
  entities,
  device,
  selectedArticle,
  tags,
  router
})

export default rootReducer
