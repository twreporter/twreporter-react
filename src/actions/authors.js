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
  get: get
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

export function receiveAuthors(items, meta, receivedAt) {
  return {
    type: CONSTANTS.FETCH_AUTHORS_SUCCESS,
    response: items,
    meta,
    receivedAt
  }
}

export function fetchAuthors(page=1) {
  return (dispatch, getState) => { // eslint-disable-line no-unused-vars
    let url = formatUrl('authors?page='+page)
    dispatch(requestAuthors(url))
    return fetch(url)
    // => fetch('http://localhost:3030/authors?page=') or fetch('api/authors')
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
          let receivedAt = Date.now()
          return dispatch(receiveAuthors(items, meta, receivedAt))
        },
        (error) => {
          let failedAt = Date.now()
          return dispatch(failToReceiveAuthors(error, failedAt))
        })
  }
}

export function fetchAuthorsIfNeeded() {
  return (dispatch, getState) => {
    if(shouldFetchAuthors(getState())) {
      return dispatch(fetchAuthors())
    } else {
      return
    }
  }
}

function shouldFetchAuthors(state) {
  const isFetching = _.get(state, 'authorsList.isFetching' )
  const authorNum = _.get(state, 'entities.authors.length', 0)
  if (authorNum > 0 || isFetching) {
    return false
  }
  return true

}

export function shouldLoadMoreAuthors(state) {
  const currentPage = _.get(state, [ 'authorsList', 'meta', 'page' ])
  const maxResultsPerPage = _.get(state, [ 'authorsList', 'meta', 'maxResults' ], 12)
  const totalResults = _.get(state, [ 'authorsList', 'meta', 'total' ], 300)
  const finalPage = Math.ceil(totalResults/maxResultsPerPage)
  if (currentPage>=finalPage) {
    return false
  } else {
    return true
  }
}

export function loadMoreAuthors() {
  return (dispatch, getState) => {
    let state = getState()
    let currentPage = _.get(state, [ 'authorsList', 'meta', 'page' ])
    if (shouldLoadMoreAuthors(state)) {
      dispatch(fetchAuthors(currentPage+1))
    } else {
      return
    }
  }
}
