import { combineReducers } from 'redux'
import { merge } from 'lodash'
import { routerStateReducer as router } from 'redux-router'
import * as ActionTypes from '../actions'
import selectedArticle from './article'
import articles from './articles'
import device from './device'

// Updates an entity cache in response to any action with response.entities.
function entities(state = { articlesByTags: {}, selectedArticle: {} }, action) {
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
  errorMessage,
  articles,
  entities,
  device,
  selectedArticle,
  router
})

export default rootReducer
