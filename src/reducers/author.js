'use strict'

import * as types from '../constants/action-types'
import { REQUEST_PAGE_START_FROM } from '../constants/author-page'

import get from 'lodash/get'
import isArray from 'lodash/isArray'
import merge from 'lodash/merge'
import uniq from 'lodash/uniq'

const _ = {
  get,
  isArray,
  merge,
  uniq
}

const initialStates = {
  isFetching: false
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
      const previousCollectionIdList = _.get(state, [ authorId, 'collectIndexList' ], [])
      const saveToState = {
        isFetching: false,
        [authorId]: {
          collectIndexList: _.uniq(previousCollectionIdList.concat(_.get(response, 'result', []))),
          currentPage,
          totalResults,
          receivedAt,
          isFinish: (currentPage - REQUEST_PAGE_START_FROM + 1 >= totalPages)
        }
      }
      return _.merge({}, state, saveToState)
    case types.FETCH_AUTHOR_COLLECTION_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        error: action.error,
        failedAt: action.failedAt
      })
    default:
      return state
  }
}
