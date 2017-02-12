'use strict'

import * as types from '../constants/action-types'

import { REQUEST_PAGE_START_FROM } from '../constants/authors-list'
import isArray from 'lodash/isArray'
import mergeWith from 'lodash/mergeWith'

const _ = {
  isArray,
  mergeWith
}

const initialStates = {
  isFetching: false,
  currentPage: REQUEST_PAGE_START_FROM - 1,
  isFinish: false,
  authorsInList: []
}

function concatIfIsArray(previousArray, inputValue) {
  if (_.isArray(previousArray)) {
    return previousArray.concat(inputValue)
  }
}

export const authorsList = (state = initialStates, action = {}) => {
  switch (action.type) {
    case types.SEARCH_AUTHORS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case types.SEARCH_AUTHORS_SUCCESS:
      const { keywords, replaceAll, currentPage, isFinish, authorsInList } = action
      const actionObjToAdd = {
        keywords,
        replaceAll,
        isFetching: false,
        currentPage,
        isFinish,
        authorsInList
      }
      if (action.replaceAll === true) {
        return Object.assign({}, state, actionObjToAdd)
      }
      return _.mergeWith({}, state, actionObjToAdd, concatIfIsArray)
    case types.SEARCH_AUTHORS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
        failedAt: action.failedAt
      })
    default:
      return state
  }
}
