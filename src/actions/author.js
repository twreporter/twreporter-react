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

export function receiveAuthorCollection(authorId, items, currentPage, isFinish, receivedAt) {
  let receiveAuthorCollection = {
    authorId,
    type: CONSTANTS.FETCH_AUTHOR_COLLECTION_SUCCESS,
    response: items
  }
  if (typeof authorId === 'string') {
    receiveAuthorCollection[authorId] = {
      collectIndexList: items.result,
      currentPage,
      isFinish,
      receivedAt
    }
  }
  return receiveAuthorCollection
}

export function fetchAuthorCollection(targetPage = 1, authorId='') {
  return (dispatch, getState) => { // eslint-disable-line no-unused-vars
    const maxResults = 4
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
          return dispatch(receiveAuthorCollection(authorId, items, currentPage, isFinish, receivedAt))
        },
        (error) => {
          let failedAt = Date.now()
          return dispatch(failToReceiveAuthorCollection(error, failedAt))
        })
  }
}

// Check if
//   is not fetching data &&
//   is currentPage >= finalPage

export function fetchAuthorIfNeeded(authorId) {
  return (dispatch, getState) => {
    const state = getState()
    const isFetching = _.get(state, [ 'author', authorId, 'isFetching' ], false)
    const isFinish = _.get(state, [ 'author', authorId, 'isFinish' ], false)
    let targetPage = _.get(state, [ 'author', authorId, 'currentPage' ], 0) + 1
    if(!isFetching && !isFinish) {
      return dispatch(fetchAuthorCollection(targetPage,authorId))
    }
  }
}
