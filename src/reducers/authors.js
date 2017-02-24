'use strict'

import * as types from '../constants/action-types'

import { NUMBER_OF_FIRST_RESPONSE_PAGE } from '../constants/authors-list'
import assign from 'lodash/assign'
import get from 'lodash/get'
import uniq from 'lodash/uniq'

const _ = {
  assign,
  get,
  uniq
}

const initSearchedAuthorsListStates = {
  keywords: '',
  isFetching: false,
  currentPage: NUMBER_OF_FIRST_RESPONSE_PAGE - 1,
  items: [],
  error: null,
  lastUpdated: 0
}

/*  
  Algolia set hitsPerPage limit up to 1000 items per search.
  So if number of authors grows over 1000,
  it will need to save hasMore in state to add loadmore function as case LIST_ALL_AUTHORS_SUCCESS.
*/

export const searchedAuthorsList = (state = initSearchedAuthorsListStates, action = {}) => {
  const keywords = _.get(action, 'keywords', '')
  switch (action.type) {
    case types.SEARCH_AUTHORS_REQUEST:
      return _.assign({}, initSearchedAuthorsListStates, {
        keywords,
        isFetching: true
      })
    case types.SEARCH_AUTHORS_SUCCESS:
      return _.assign({}, state, {
        keywords,
        isFetching: false,
        currentPage: _.get(action, 'response.currentPage', NUMBER_OF_FIRST_RESPONSE_PAGE - 1),
        items: _.get(action, 'response.result', []),
        error: null,
        lastUpdated: action.receivedAt
      })
    case types.SEARCH_AUTHORS_FAILURE:
      return _.assign({}, state, {
        keywords,
        isFetching: false,
        error: action.error,
        lastUpdated: action.failedAt
      })
    default:
      return state
  }
}

const initAuthorsListStates = {
  isFetching: false,
  currentPage: NUMBER_OF_FIRST_RESPONSE_PAGE - 1,
  hasMore: false,
  items: [],
  error: null,
  lastUpdated: 0
}

export const authorsList = (state = initAuthorsListStates, action = {}) => {
  switch (action.type) {
    case types.LIST_ALL_AUTHORS_REQUEST:
      return _.assign({}, state, {
        isFetching: true
      })
    case types.LIST_ALL_AUTHORS_SUCCESS:
      const currentPage = _.get(action, 'response.currentPage', NUMBER_OF_FIRST_RESPONSE_PAGE - 1)
      const totalPages = _.get(action, 'response.totalPages', 0)
      const previousAuthorsInList = _.get(state, 'items', [])
      const nextAuthorsInList = previousAuthorsInList.concat(_.get(action, 'response.result', []))  // Concat array if list all
      return _.assign({}, state, {
        isFetching: false,
        currentPage,
        hasMore: currentPage - NUMBER_OF_FIRST_RESPONSE_PAGE + 1 < totalPages,
        items: nextAuthorsInList,
        error: null,
        lastUpdated: action.receivedAt
      })
    case types.LIST_ALL_AUTHORS_FAILURE:
      return _.assign({}, state, {
        isFetching: false,
        error: action.error,
        lastUpdated: action.failedAt
      })
    default:
      return state
  }
}
