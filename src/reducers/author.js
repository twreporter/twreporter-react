'use strict'
import * as types from '../constants/action-types'
import isArray from 'lodash/isArray'
import mergeWith from 'lodash/mergeWith'
import get from 'lodash/get'

const _ = {
  isArray,
  mergeWith,
  get
}

const initialStates = {
  isFetching: false
}

function customizer(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
}

export const author = (state = initialStates, action = {}) => {
  switch (action.type) {
    case types.FETCH_AUTHOR_COLLECTION_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case types.FETCH_AUTHOR_COLLECTION_SUCCESS:
      let addToStore = action
      addToStore.isFetching = false
      return _.mergeWith({}, state, addToStore, customizer)
    case types.FETCH_AUTHOR_COLLECTION_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      })
    default:
      return state
  }
}
