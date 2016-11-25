'use strict'
import * as types from '../constants/action-types'
import isArray from 'lodash/isArray'
import mergeWith from 'lodash/mergeWith'

const _ = {
  isArray,
  mergeWith
}

const initialStates = {
  isFetching: false,
  currentPage: 0,
  isFinish: false,
  collectIndexList: []
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
      return _.mergeWith({}, state, {
        isFetching: false,
        currentPage: action.currentPage,
        isFinish: action.isFinish,
        collectIndexList: action.collectIndexList
      }, customizer)
    case types.FETCH_AUTHOR_COLLECTION_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      })
    default:
      return state
  }
}
