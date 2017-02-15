'use strict'

import * as types from '../constants/action-types'
import { REQUEST_PAGE_START_FROM } from '../constants/author-page'

import get from 'lodash/get'
import isArray from 'lodash/isArray'
import mergeWith from 'lodash/mergeWith'
import uniq from 'lodash/uniq'

const _ = {
  get,
  isArray,
  mergeWith,
  uniq
}

const initialStates = {
  isFetching: false
}

function concatCollectIndexList(previousValue, toAddValue, keyName) {
  if (keyName==='collectIndexList' && _.isArray(previousValue)) {
    const combinedArray = previousValue.concat(toAddValue)
    const collectIndexList = _.uniq(combinedArray) //remove duplicated
    return collectIndexList
  }
}

export const author = (state = initialStates, action = {}) => {
  switch (action.type) {
    case types.FETCH_AUTHOR_COLLECTION_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case types.FETCH_AUTHOR_COLLECTION_SUCCESS:
      const {
        authorId,
        response,
        currentPage,
        totalResults,
        totalPages,
        receivedAt } = action
      const saveToState = {
        authorId,
        isFetching: false,
        [authorId]: {
          collectIndexList: _.get(response, 'result', []),
          currentPage,
          totalResults,
          receivedAt,
          isFinish: (currentPage - REQUEST_PAGE_START_FROM + 1 >= totalPages)
        }
      }
      return _.mergeWith({}, state, saveToState, concatCollectIndexList)
    case types.FETCH_AUTHOR_COLLECTION_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error
      })
    default:
      return state
  }
}
