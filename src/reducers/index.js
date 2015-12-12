import * as ActionTypes from '../actions';
import merge from 'lodash/object/merge';
import paginate from './paginate';
import articles from './articles';
import device from './device';
import { routerStateReducer as router } from 'redux-router';
import { combineReducers } from 'redux';

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
  device,
  router
})

export default rootReducer
