'use strict'

import * as CONSTANTS from '../constants/index'

import { MAX_ARTICLES_PER_FETCH, REQUEST_PAGE_START_FROM, RETURN_DELAY } from '../constants/author-page'
import { arrayOf, normalize } from 'normalizr'

import { InternalServerError } from '../lib/custom-error'
import { article as articleSchema } from '../schemas/index'
import { camelizeKeys } from 'humps'
import fetch from 'isomorphic-fetch'
import { formatUrl } from '../utils/index'
import get from 'lodash/get'
import { urlParasToString } from '../utils/url-paras-to-string'

const _ = {
  get
}

export function requestAuthorCollection(authorId) {
  return {
    type: CONSTANTS.FETCH_AUTHOR_COLLECTION_REQUEST,
    authorId
  }
}

export function failToReceiveAuthorCollection(error, failedAt) {
  return {
    type: CONSTANTS.FETCH_AUTHOR_COLLECTION_FAILURE,
    error,
    failedAt
  }
}

export function receiveAuthorCollection({ authorId, items, currentPage, totalResults, receivedAt, totalPages } = {}) {
  return {
    type: CONSTANTS.FETCH_AUTHOR_COLLECTION_SUCCESS,
    response: items,
    authorId,
    currentPage,
    totalResults,
    totalPages,
    receivedAt
  }
}

export function fetchAuthorCollection({ targetPage = REQUEST_PAGE_START_FROM, authorId = '', returnDelay = 0 } = {}) {
  return (dispatch, getState) => { // eslint-disable-line no-unused-vars
    const searchParas = {
      keywords: authorId,
      hitsPerPage: MAX_ARTICLES_PER_FETCH,
      page: targetPage
    }
    // Trans searchParas object to url parameters:
    let urlParasString = urlParasToString(searchParas)
    let url = formatUrl(`searchPosts?${urlParasString}`)
    dispatch(requestAuthorCollection(authorId))
    // Call our API server to fetch the data
    return fetch(url)
      .then((response) => {
        if (response.status >= 400) {
          throw new InternalServerError('Bad response from API, response:' + JSON.stringify(response))
        }
        return response.json()
      })
      .then((content) => {
        const currentPage = _.get(content, 'page', 0)
        const totalResults = _.get(content, 'nbHits', 0)
        const totalPages = _.get(content, 'nbPages', 0)
        const searchResultItems = _.get(content, 'hits', {})
        const camelizedJson = camelizeKeys(searchResultItems)
        const items = normalize(camelizedJson, arrayOf(articleSchema))
        const receivedAt = Date.now()
        const returnParas = { authorId, items, currentPage, totalResults, receivedAt, totalPages }
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
            return dispatch(receiveAuthorCollection(returnParas))
          })
        }
        return dispatch(receiveAuthorCollection(returnParas))
      },
      (error) => {
        let failedAt = Date.now()
        return dispatch(failToReceiveAuthorCollection(error, failedAt))
      })
  }
}

export function fetchAuthorCollectionIfNeeded(authorId) {
  return (dispatch, getState) => {
    const author = _.get(getState(), [ 'author', authorId ], {})
    const isFetching = _.get(author, 'isFetching', false)
    const isFinish = _.get(author, 'isFinish', false)
    const currentPage = _.get(author, 'currentPage', REQUEST_PAGE_START_FROM - 1)
    let targetPage = currentPage + 1
    const returnDelay = currentPage < REQUEST_PAGE_START_FROM ? 0 : RETURN_DELAY
    if(!isFetching && !isFinish) {
      return dispatch(fetchAuthorCollection({ targetPage, authorId, returnDelay }))
    }
  }
}
