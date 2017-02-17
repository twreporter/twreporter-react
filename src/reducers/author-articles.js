'use strict'

import * as types from '../constants/action-types'
import { NUMBER_OF_FIRST_RESPONSE_PAGE } from '../constants/author-page'

import get from 'lodash/get'
import uniq from 'lodash/uniq'
import assign from 'lodash/assign'

const _ = {
  assign,
  get,
  uniq
}

const initialSubState = {
  isFetching: false,
  error: null,
  collectIndexList: [],
  currentPage: NUMBER_OF_FIRST_RESPONSE_PAGE - 1,  // Means no data has been fetched. Ex.: Initial currentPage equals -1 because the response of Algolia start from page 0.
  totalResults: 0,
  lastUpdated: 0
}

export const articlesByAuthor = (state = {}, action = {}) => {
  const authorId = _.get(action, 'authorId', '')
  const previousSubState = _.get(state, authorId, null)
  let nextSubState = {}
  switch (action.type) {
    case types.FETCH_AUTHOR_COLLECTION_REQUEST:
      nextSubState = _.assign({}, initialSubState, previousSubState, { isFetching: true })
      return _.assign({}, state, {
        [authorId]: nextSubState
      })
    case types.FETCH_AUTHOR_COLLECTION_SUCCESS:
      const previousCollectionIdList = _.get(state, [ authorId, 'collectIndexList' ], [])
      const { currentPage, totalPages, totalResults,  receivedAt } = action
      nextSubState = _.assign({}, initialSubState, {
        isFetching: false,
        collectIndexList: _.uniq(previousCollectionIdList.concat(_.get(action, 'response.result', []))),
        currentPage,
        totalResults,
        hasMore: (currentPage - NUMBER_OF_FIRST_RESPONSE_PAGE + 1) < totalPages,
        lastUpdated: receivedAt
      })
      return _.assign({}, state, {
        [authorId]: nextSubState
      })
    case types.FETCH_AUTHOR_COLLECTION_FAILURE:
      nextSubState = _.assign({}, initialSubState, {
        isFetching: false,
        error: action.error,
        lastUpdated: action.failedAt
      })
      return _.assign({}, state, {
        [authorId]: nextSubState
      })
    default:
      return state
  }
}
