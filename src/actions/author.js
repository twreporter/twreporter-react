'use strict'

import * as CONSTANTS from '../constants/index'

import { MAX_ARTICLES_PER_FETCH, REQUEST_PAGE_START_FROM } from '../constants/author-page'
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

export function receiveAuthorCollection({ authorId, items, collectIndexList, currentPage, isFinish, totalResults, receivedAt } = {}) {
  let receiveAuthorCollection = {
    type: CONSTANTS.FETCH_AUTHOR_COLLECTION_SUCCESS,
    authorId,
    response: items // objects {entities:{},result:[]}
  }
  if (typeof authorId === 'string') {
    receiveAuthorCollection[authorId] = {
      collectIndexList, //array
      currentPage,
      isFinish,
      totalResults,
      receivedAt
    }
  }
  return receiveAuthorCollection
}

export function fetchAuthorCollection({ targetPage = REQUEST_PAGE_START_FROM, authorId='' } = {}) {
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
        const hits = _.get(content, 'hits', {})
        const camelizedJson = camelizeKeys(hits)
        let items = normalize(camelizedJson, arrayOf(articleSchema))
        const collectIndexList = items.result
        const currentPage = content.page
        const isFinish = ( currentPage >= content.nbPages-1 )
        const receivedAt = Date.now()
        const totalResults = content.nbHits
        return dispatch(receiveAuthorCollection({ authorId, items, collectIndexList, currentPage, isFinish, totalResults, receivedAt }))
      },
      (error) => {
        let failedAt = Date.now()
        return dispatch(failToReceiveAuthorCollection(error, failedAt))
      })
  }
}

export function fetchAuthorCollectionIfNeeded(authorId) {
  return (dispatch, getState) => {
    const state = getState()
    const isFetching = _.get(state, [ 'author', authorId, 'isFetching' ], false)
    const isFinish = _.get(state, [ 'author', authorId, 'isFinish' ], false)
    let targetPage = _.get(state, [ 'author', authorId, 'currentPage' ], REQUEST_PAGE_START_FROM -1) + 1
    if(!isFetching && !isFinish) {
      return dispatch(fetchAuthorCollection({ targetPage, authorId }))
    }
  }
}
