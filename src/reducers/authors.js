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

const initAuthorsStates = {
  keywords: '',
  isFetching: false,
  currentPage: NUMBER_OF_FIRST_RESPONSE_PAGE - 1,
  hasMore: false,
  authorsInList: [],
  lastUpdated: 0
}

const authors = (state = initAuthorsStates, action = {}) => {
  const keywords = _.get(action, 'keywords', '')
  switch (action.type) {
    case types.SEARCH_AUTHORS_REQUEST:
    case types.LIST_ALL_AUTHORS_REQUEST:
      return _.assign({}, state, {
        keywords,
        isFetching: true
      })
    case types.LIST_ALL_AUTHORS_SUCCESS:
    case types.SEARCH_AUTHORS_SUCCESS:
      const currentPage = _.get(action, 'currentPage', NUMBER_OF_FIRST_RESPONSE_PAGE - 1)
      const totalPages = _.get(action, 'totalPages', 0)
      const previousAuthorsInList = _.get(state, 'authorsInList', [])
      const nextAuthorsInList = (action.type === types.SEARCH_AUTHORS_SUCCESS && currentPage <= NUMBER_OF_FIRST_RESPONSE_PAGE) ?
        _.get(action, 'response.result', []) : // Replace the previous list with new one 
        previousAuthorsInList.concat(_.get(action, 'response.result', []))  // Concat array if list all
      return _.assign({}, state, {
        keywords,
        isFetching: false,
        currentPage,
        hasMore: currentPage - NUMBER_OF_FIRST_RESPONSE_PAGE + 1 < totalPages,
        authorsInList: nextAuthorsInList,
        lastUpdated: action.receivedAt
      })
    case types.LIST_ALL_AUTHORS_FAILURE:
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

export const authorsList = (initState = { typeOfAuthorsListToRender: 'allAuthors' }, action = {}) => {
  switch (action.type) {
    case types.SET_AUTHORS_LIST_TYPE:
      return _.assign({}, initState, {
        typeOfAuthorsListToRender: action.typeOfAuthorsListToRender
      })
    case types.LIST_ALL_AUTHORS_REQUEST:
    case types.LIST_ALL_AUTHORS_SUCCESS:
      return _.assign({}, initState, {
        typeOfAuthorsListToRender: 'allAuthors'
      })
    case types.SEARCH_AUTHORS_REQUEST:
    case types.SEARCH_AUTHORS_SUCCESS:
      return _.assign({}, initState, {
        typeOfAuthorsListToRender: 'searchedAuthors'
      })
    default: 
      return initState
  }
}

export const searchedAuthors = (state = initAuthorsStates, action = {}) => {
  switch (action.type) {
    case types.SEARCH_AUTHORS_REQUEST:
    case types.SEARCH_AUTHORS_SUCCESS:
    case types.SEARCH_AUTHORS_FAILURE:
      return authors(state, action)
    default:
      return state
  }
}

export const allAuthors = (state = initAuthorsStates, action = {}) => {
  switch (action.type) {
    case types.LIST_ALL_AUTHORS_REQUEST:
    case types.LIST_ALL_AUTHORS_SUCCESS:
    case types.LIST_ALL_AUTHORS_FAILURE:
      return authors(state, action)
    default:
      return state
  }
}
