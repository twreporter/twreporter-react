'use strict'
import { InternalServerError } from '../lib/custom-error'
import { camelizeKeys } from 'humps'
import { formatUrl } from '../utils/index'
import { arrayOf, normalize } from 'normalizr'
import { author as authorSchema } from '../schemas/index'
import * as CONSTANTS from '../constants/index'
import fetch from 'isomorphic-fetch'
import get from 'lodash/get'

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

export function fetchAuthors(targetPage=1) {
  return (dispatch, getState) => { // eslint-disable-line no-unused-vars
    let url = formatUrl('authors?page='+targetPage)
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
          return dispatch(receiveAuthors(items, currentPage, isFinish, receivedAt))
        },
        (error) => {
          let failedAt = Date.now()
          return dispatch(failToReceiveAuthors(error, failedAt))
        })
  }
}

// Check if
//   the entities.authors is empty &&
//   is not fetching data &&
//   is currentPage >= finalPage
function shouldFetchAuthors(authorNum, isFetching, isFinish) {
  if ((authorNum <= 0) && !isFetching && !isFinish) {
    return true
  }
  return false
}

export function fetchAuthorsIfNeeded() {
  return (dispatch, getState) => {
    const state = getState()
    let authorNum = _.get(state, 'entities.authors.length', 0)
    let isFetching = _.get(state, 'authorsList.isFetching', false)
    let isFinish = _.get(state, 'authorsList.isFinish', false)
    let targetPage = _.get(state, 'authorsList.currentPage', 0) + 1
    if(shouldFetchAuthors(authorNum, isFetching, isFinish)) {
      return dispatch(fetchAuthors(targetPage))
    }
  }
}
