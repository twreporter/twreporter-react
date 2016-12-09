'use strict'

import * as ALGOLIA from '../constants/algolia'
import * as CONSTANTS from '../constants/index'

import { arrayOf, normalize } from 'normalizr'

import { InternalServerError } from '../lib/custom-error'
import { REQUEST_PAGE_START_FROM, MAX_RESULTS_PER_FETCH, RETURN_DELAY } from '../constants/authors-list'
import algoliasearch from 'algoliasearch'
import { author as authorSchema } from '../schemas/index'
import { camelizeKeys } from 'humps'
import fetch from 'isomorphic-fetch'
import { formatUrl } from '../utils/index'
import get from 'lodash/get'
import { hitsToEntities } from '../utils/algolia'

const _ = {
  get
}

export function requestAuthors() {
  return {
    type: CONSTANTS.FETCH_AUTHORS_REQUEST
  }
}

export function failToReceiveAuthors(error, failedAt) {
  return {
    type: CONSTANTS.FETCH_AUTHORS_FAILURE,
    error,
    failedAt
  }
}

export function receiveAuthors(items, currentPage, isFinish, receivedAt) {
  return {
    type: CONSTANTS.FETCH_AUTHORS_SUCCESS,
    response: items,
    authorsInList: items.result,
    currentPage,
    isFinish,
    receivedAt
  }
}

export function requestSearchAuthors(keyWords) {
  return {
    type: CONSTANTS.SEARCH_AUTHORS_REQUEST,
    keyWords: keyWords
  }
}

export function failToSearchAuthors(error, failedAt) {
  return {
    type: CONSTANTS.SEARCH_AUTHORS_FAILURE,
    error,
    failedAt
  }
}

export function receiveSearchAuthors(response, currentPage, isFinish, receivedAt) {
  return {
    type: CONSTANTS.SEARCH_AUTHORS_SUCCESS,
    response: response,
    authorsInList: response.result,
    currentPage,
    isFinish,
    receivedAt
  }
}

export function searchAuthors(targetPage = REQUEST_PAGE_START_FROM, returnDelay = 0, keyWords='', maxResults = MAX_RESULTS_PER_FETCH) {
  return (dispatch, getState) => { // eslint-disable-line no-unused-vars
    const searchParas = {
      hitsPerPage: maxResults,
      page: targetPage
    }
    let client = algoliasearch(ALGOLIA.APP_ID, ALGOLIA.SEARCH_API_KEY)
    let index = client.initIndex(ALGOLIA.CONTACTS_INDEX)
    dispatch(requestSearchAuthors(keyWords))
    return index.search(keyWords, searchParas)
      .then(function searchSuccess(content) {
        const response = hitsToEntities(content.hits, 'authors')
        const currentPage = content.page
        const isFinish = ( currentPage >= content.nbPages )
        const receivedAt = Date.now()
        function delayDispatch() {
          return new Promise((resolve, reject)=> { // eslint-disable-line no-unused-vars
            setTimeout(() => {
              resolve()
            }, 1000)
          })
        }
        return delayDispatch().then(()=>{
          return dispatch(receiveSearchAuthors(response, currentPage, isFinish, receivedAt))
        })
      }
      )
      .catch(function searchFailure(error) {
        let failedAt = Date.now()
        return dispatch(failToSearchAuthors(error, failedAt))
      })
  }
}

export function fetchAuthors(targetPage, returnDelay = 0, maxResults = 12) {
  return (dispatch, getState) => { // eslint-disable-line no-unused-vars
    let url = formatUrl(`authors?max_results=${maxResults}&page=${targetPage}`)
    dispatch(requestAuthors(url))
    return fetch(url)
      .then((response) => {
        if (response.status >= 400) {
          throw new InternalServerError('Bad response from API, response:' + JSON.stringify(response))
        }
        return response.json()
      })
      .then(
        (response) => {
          const camelizedJson = camelizeKeys(response)
          let items = normalize(camelizedJson.items, arrayOf(authorSchema))
          let meta = camelizedJson.meta
          let currentPage = _.get(meta, 'page', 1)
          let maxResultsPerPage = meta.maxResults
          let totalResults = meta.total
          let finalPage = Math.ceil(totalResults/maxResultsPerPage)
          let isFinish = currentPage >= finalPage ? true : false
          let receivedAt = Date.now()
          function delayDispatch() {
            return new Promise((resolve, reject)=> { // eslint-disable-line no-unused-vars
              setTimeout(() => {
                resolve()
              }, returnDelay)
            })
          }
          return delayDispatch().then(()=>{
            return dispatch(receiveAuthors(items, currentPage, isFinish, receivedAt))
          })
        },
        (error) => {
          let failedAt = Date.now()
          return dispatch(failToReceiveAuthors(error, failedAt))
        })
  }
}


export function fetchAuthorsIfNeeded() {
  return (dispatch, getState) => {
    const state = getState()
    const isFetching  = _.get(state, 'authorsList.isFetching', false)
    const isFinish    = _.get(state, 'authorsList.isFinish', false)
    const currentPage = _.get(state, 'authorsList.currentPage', REQUEST_PAGE_START_FROM -1)
    const targetPage  = currentPage + 1
    const returnDelay = currentPage < REQUEST_PAGE_START_FROM ? 0 : RETURN_DELAY
    if (!isFetching && !isFinish) {
      return dispatch(searchAuthors(targetPage, returnDelay))
    }
    return
  }
}
