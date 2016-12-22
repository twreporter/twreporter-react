'use strict'

import * as CONSTANTS from '../constants/index'

import { MAX_RESULTS_PER_FETCH, MAX_RESULTS_PER_SEARCH, REQUEST_PAGE_START_FROM, RETURN_DELAY } from '../constants/authors-list'
import { arrayOf, normalize } from 'normalizr'

import { InternalServerError } from '../lib/custom-error'
import { author as authorSchema } from '../schemas/index'
import { camelizeKeys } from 'humps'
import fetch from 'isomorphic-fetch'
import forOwn from 'lodash/forOwn'
import { formatUrl } from '../utils/index'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'

const _ = {
  get,
  forOwn,
  sortBy
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
      keywords,
      filters: 'articlesCount>0',
      hitsPerPage: (keywords === '') ? MAX_RESULTS_PER_FETCH : MAX_RESULTS_PER_SEARCH,
      page: targetPage
    }
    // Trans searchParas object to url parameters:
    let searchParasArray = []
    // * Iterates over own enumerable properties of the object
    _.forOwn(searchParas, (value, key)=>{
      searchParasArray.push([ key,value ])
    })
    // * Sort the parameters by their keys
    let sortedArray = _.sortBy(searchParasArray, (item)=>(item[0]))
    let stringArray = sortedArray.map((item)=>(item[0]+'='+item[1]))
    let urlParasString = stringArray.join('&') // To "aa=A&ab=B&ac=C&ad=D&ae=E"
    let url = formatUrl(`searchAuthors?${urlParasString}`)
    // Call our API server to fetch the data
    return fetch(url)
      .then((response) => {
        if (response.status >= 400) {
          throw new InternalServerError('Bad response from API, response:' + JSON.stringify(response))
        }
        return response.json()
      })
      .then((content) => {
        const hits = _.get(content, 'hits', {})
        const camelizedJson = camelizeKeys(hits)
        let response = normalize(camelizedJson, arrayOf(authorSchema))
        const currentPage = content.page
        const isFinish = ( currentPage >= content.nbPages - 1 )
        const receivedAt = Date.now()
        const returnParas = { keywords, replaceAll, response, currentPage, isFinish, receivedAt }
        // delay for displaying loading spinner
        function delayDispatch() {
          return new Promise((resolve, reject)=> { // eslint-disable-line no-unused-vars
            setTimeout(() => {
              resolve()
            }, returnDelay)
          })
        }
        if (returnDelay > 0) {
          return delayDispatch().then(()=>{
            return dispatch(receiveSearchAuthors(returnParas))
          })
        }
        return dispatch(receiveSearchAuthors(returnParas))
      },
      (error) => {
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
