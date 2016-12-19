'use strict'

import * as ALGOLIA from '../constants/algolia'
import * as CONSTANTS from '../constants/index'

import { MAX_RESULTS_PER_FETCH, MAX_RESULTS_PER_SEARCH, REQUEST_PAGE_START_FROM, RETURN_DELAY } from '../constants/authors-list'
import { arrayOf, normalize } from 'normalizr'

import algoliasearch from 'algoliasearch'
import { author as authorSchema } from '../schemas/index'
import { camelizeKeys } from 'humps'
import get from 'lodash/get'

const _ = {
  get
}

export function requestSearchAuthors(keywords) {
  return {
    type: CONSTANTS.SEARCH_AUTHORS_REQUEST,
    keywords: keywords
  }
}

export function failToSearchAuthors(error, failedAt) {
  return {
    type: CONSTANTS.SEARCH_AUTHORS_FAILURE,
    error,
    failedAt
  }
}

export function receiveSearchAuthors({ keywords, replaceAll, response, currentPage, isFinish, receivedAt }) {
  return {
    type: CONSTANTS.SEARCH_AUTHORS_SUCCESS,
    keywords,
    replaceAll,
    response: response,
    authorsInList: response.result,
    currentPage,
    isFinish,
    receivedAt
  }
}

export function searchAuthors({
  keywords = '',
  replaceAll = false,
  targetPage = REQUEST_PAGE_START_FROM,
  returnDelay = 0 } = {}) {
  return (dispatch, getState) => { // eslint-disable-line no-unused-vars
    const searchParas = {
      filters: 'articlesCount>0',
      hitsPerPage: (keywords === '') ? MAX_RESULTS_PER_FETCH : MAX_RESULTS_PER_SEARCH,
      page: targetPage
    }
    let client = algoliasearch(ALGOLIA.APP_ID, ALGOLIA.SEARCH_API_KEY)
    let index = client.initIndex(ALGOLIA.CONTACTS_INDEX)
    dispatch(requestSearchAuthors(keywords))
    return index.search(keywords, searchParas)
      .then(function searchSuccess(content) {
        const hits = _.get(content, 'hits', {})
        const camelizedJson = camelizeKeys(hits)
        let response = normalize(camelizedJson, arrayOf(authorSchema))
        const currentPage = content.page
        const isFinish = ( currentPage >= content.nbPages - 1 )
        const receivedAt = Date.now()
        // delay for displaying loading spinner
        function delayDispatch() {
          return new Promise((resolve, reject)=> { // eslint-disable-line no-unused-vars
            setTimeout(() => {
              resolve()
            }, returnDelay)
          })
        }
        return delayDispatch().then(()=>{
          return dispatch(receiveSearchAuthors({ keywords, replaceAll, response, currentPage, isFinish, receivedAt }))
        })
      }
      )
      .catch(function searchFailure(error) {
        let failedAt = Date.now()
        return dispatch(failToSearchAuthors(error, failedAt))
      })
  }
}


export function fetchAuthorsIfNeeded({ replaceAll=false } = {}) {
// Fetching data if is not fetching or is not finish
  return (dispatch, getState) => {
    const authorsList = _.get(getState(), 'authorsList', {})
    const keywords    = _.get(authorsList, 'keywords', '')
    const isFetching  = _.get(authorsList, 'isFetching', false)
    const isFinish    = _.get(authorsList, 'isFinish', false)
    const currentPage = _.get(authorsList, 'currentPage', REQUEST_PAGE_START_FROM -1)
    const targetPage  = currentPage + 1
    const returnDelay = currentPage < REQUEST_PAGE_START_FROM ? 0 : RETURN_DELAY
    if (!isFetching && !isFinish) {
      return dispatch(searchAuthors({ keywords, replaceAll, targetPage, returnDelay }))
    }
    return
  }
}

export function sendSearchAuthors({ keywords='', replaceAll=true, targetPage = REQUEST_PAGE_START_FROM, returnDelay = 0 } = {}) {
  return (dispatch, getState) => {
    const state = getState()
    const isFetching  = _.get(state, 'authorsList.isFetching', false)
    if (!isFetching) {
      return dispatch(searchAuthors({ keywords, replaceAll, targetPage, returnDelay }))
    }
    return
  }
}
