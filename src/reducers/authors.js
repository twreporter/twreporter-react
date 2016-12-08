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
  authorsInList: []
}

function customizer(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue)
  }
}

export const authorsList = (state = initialStates, action = {}) => {
  switch (action.type) {
    case types.SEARCH_AUTHORS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case types.SEARCH_AUTHORS_SUCCESS:
      return _.mergeWith({}, state, {
        isFetching: false,
        currentPage: action.currentPage,
        isFinish: action.isFinish,
        authorsInList: action.authorsInList
      }, customizer)
    case types.SEARCH_AUTHORS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      })
    default:
      return state
  }
}

// export const authorsList = (state = initialStates, action = {}) => {
//   switch (action.type) {
//     case types.FETCH_AUTHORS_REQUEST:
//       return Object.assign({}, state, {
//         isFetching: true
//       })
//     case types.FETCH_AUTHORS_SUCCESS:
//       return _.mergeWith({}, state, {
//         isFetching: false,
//         currentPage: action.currentPage,
//         isFinish: action.isFinish,
//         authorsInList: action.authorsInList
//       }, customizer)
//     case types.FETCH_AUTHORS_FAILURE:
//       return Object.assign({}, state, {
//         isFetching: false,
//         error: action.error
//       })
//     default:
//       return state
//   }
// }
