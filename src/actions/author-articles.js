'use strict'

import * as CONSTANTS from '../constants/index'

import { MAX_ARTICLES_PER_FETCH, NUMBER_OF_FIRST_RESPONSE_PAGE, RETURN_DELAY_TIME } from '../constants/author-page'
import { arrayOf, normalize } from 'normalizr'

import { InternalServerError } from '../lib/custom-error'
import { article as articleSchema } from '../schemas/index'
import { camelizeKeys } from 'humps'
import fetch from 'isomorphic-fetch'
import get from 'lodash/get'
import omit from 'lodash/omit'
import { formatUrl } from '../utils/index'
import { urlParasToString } from '../utils/url-paras-to-string'

const _ = {
  get,
  omit
}

export function requestAuthorCollection(authorId) {
  return {
    type: CONSTANTS.FETCH_AUTHOR_COLLECTION_REQUEST,
    authorId
  }
}

export function failToReceiveAuthorCollection(authorId, error) {
  return {
    type: CONSTANTS.FETCH_AUTHOR_COLLECTION_FAILURE,
    authorId,
    error,
    failedAt: Date.now()
  }
}

export function receiveAuthorCollection({ authorId, items, responseContext }) {
  return {
    type: CONSTANTS.FETCH_AUTHOR_COLLECTION_SUCCESS,
    authorId,
    response: items, // responseObject.hit
    currentPage: _.get(responseContext, 'page', NUMBER_OF_FIRST_RESPONSE_PAGE - 1),
    totalPages: _.get(responseContext, 'nbPages', 0),
    totalResults: _.get(responseContext, 'nbHits', 0),
    receivedAt: Date.now()
  }
}

export function fetchAuthorCollection({ targetPage, authorId, returnDelay }) {
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
      .then(
        (responseObject) => {
          const responseItems = _.get(responseObject, 'hits', {})    // responseObject.hit
          const responseContext = _.omit(responseObject, 'hits', {}) // All the other things in responseObject except responseObject.hit
          const camelizedJson = camelizeKeys(responseItems)
          const items = normalize(camelizedJson, arrayOf(articleSchema))
          const returnParas = { authorId, items, responseContext }
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
      (error) => dispatch(failToReceiveAuthorCollection(error))
    )
  }
}

export function fetchAuthorCollectionIfNeeded(authorId) {
  return (dispatch, getState) => {
    const currentState = getState()
    const articlesDataOfAnAuthor = _.get(currentState, [ 'articlesByAuthor', authorId ], null)
    // If state.articlesByAuthor[authorId] does not exist:
    if (articlesDataOfAnAuthor === null) {
      return dispatch(fetchAuthorCollection({
        authorId,
        targetPage: NUMBER_OF_FIRST_RESPONSE_PAGE,
        returnDelay: 0
      }))
    }
    //  If state.articlesByAuthor[authorId] exists:
    const { currentPage, isFetching, isFinish } = articlesDataOfAnAuthor
    if(!isFetching && !isFinish) {
      return dispatch(fetchAuthorCollection({
        authorId,
        targetPage: currentPage + 1,
        returnDelay: RETURN_DELAY_TIME
      }))
    }
  }
}
