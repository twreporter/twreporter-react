'use strict'
import { InternalServerError } from '../lib/custom-error'
import { camelizeKeys } from 'humps'
import { formatUrl } from '../utils/index'
import { arrayOf, normalize } from 'normalizr'
import { article as metaSchema } from '../schemas/index'
import * as CONSTANTS from '../constants/index'
import fetch from 'isomorphic-fetch'
import get from 'lodash/get'

const _ = {
  get
}

export function requestAuthorCollection() {
  return {
    type: CONSTANTS.FETCH_AUTHOR_COLLECTION_REQUEST
  }
}

export function failToReceiveAuthorCollection(error, failedAt) {
  return {
    type: CONSTANTS.FETCH_AUTHOR_COLLECTION_FAILURE,
    error,
    failedAt
  }
}

export function receiveAuthorCollection(items, currentPage, isFinish, receivedAt) {
  return {
    type: CONSTANTS.FETCH_AUTHOR_COLLECTION_SUCCESS,
    response: items,
    collectIndexList: items.result,
    currentPage,
    isFinish,
    receivedAt
  }
}

export function fetchAuthorCollection(targetPage = 1, maxResults = 10, authorId='571dd6e3dae62379576d7ef9') {
  return (dispatch, getState) => { // eslint-disable-line no-unused-vars
    let url = formatUrl(`meta?where={"writters": { "$in": ["${authorId}"]}}&max_results=${maxResults}&page=${targetPage}`)
    dispatch(requestAuthorCollection(url))
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
          let items = normalize(camelizedJson.items, arrayOf(metaSchema))
          let meta = camelizedJson.meta
          let currentPage = _.get(meta, 'page', 1)
          let maxResultsPerPage = meta.maxResults
          let totalResults = meta.total
          let finalPage = Math.ceil(totalResults/maxResultsPerPage)
          let isFinish = currentPage >= finalPage ? true : false
          let receivedAt = Date.now()
          return dispatch(receiveAuthorCollection(items, currentPage, isFinish, receivedAt))
        },
        (error) => {
          let failedAt = Date.now()
          return dispatch(failToReceiveAuthorCollection(error, failedAt))
        })
  }
}

// Check if
//   the entities.authors is empty &&
//   is not fetching data &&
//   is currentPage >= finalPage
// function shouldFetchAuthors(authorNum, isFetching, isFinish) {
//   if ((authorNum <= 0) && !isFetching && !isFinish) {
//     return true
//   }
//   return false
// }
//
// export function fetchAuthorsIfNeeded() {
//   return (dispatch, getState) => {
//     const state = getState()
//     let authorNum = _.get(state, 'entities.authors.length', 0)
//     let isFetching = _.get(state, 'authorsList.isFetching', false)
//     let isFinish = _.get(state, 'authorsList.isFinish', false)
//     let targetPage = _.get(state, 'authorsList.currentPage', 0) + 1
//     if(shouldFetchAuthors(authorNum, isFetching, isFinish)) {
//       return dispatch(fetchAuthorCollection(targetPage))
//     }
//   }
// }
