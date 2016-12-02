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
              }, 1000)
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
    const currentPage = _.get(state, 'authorsList.currentPage', 0)
    const targetPage  = currentPage + 1
    const returnDelay = currentPage<1 ? 0 : 1000
    if (!isFetching && !isFinish) {
      return dispatch(fetchAuthors(targetPage, returnDelay))
    }
    return
  }
}
