'use strict'

import fetch from 'isomorphic-fetch'
import get from 'lodash/get'
import omit from 'lodash/omit'
import qs from 'qs'
import twreporterRedux from '@twreporter/redux'
import { InternalServerError } from '../custom-error'
import { MAX_ARTICLES_PER_FETCH, NUMBER_OF_FIRST_RESPONSE_PAGE, RETURN_DELAY_TIME } from '../constants/author-page'
import { schema, normalize } from 'normalizr'
import { article as articleSchema } from '../schemas/article-schema'
import { camelizeKeys } from 'humps'
import * as CONSTANTS from '../constants/index'

const formAPIURL = twreporterRedux.utils.formAPIURL

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

/**
 * NormalizedData
 * @typedef {Object} NormalizedData
 * @property {Object} entities - flatten entity objects
 * @property {string[]} result - an array of top entity ids
 */

/**
 * ReceiveAuthorCollectionAction
 * 
 * @typedef {Object} ReceiveAuthorCollectionAction
 * @property {string} type - CONSTANTS.FETCH_AUTHOR_COLLECTION_SUCCESS
 * @property {string} authorId
 * @property {NormalizedData} normalizedData
 * @property {number} currentPage
 * @property {number} totalPages
 * @property {number} totalResults
 * @property {number} receivedAt
 */

export function fetchAuthorCollection({ targetPage, authorId, returnDelay }) {
  return (dispatch, getState) => { // eslint-disable-line no-unused-vars
    const searchParas = {
      keywords: authorId,
      hitsPerPage: MAX_ARTICLES_PER_FETCH,
      page: targetPage
    }
    // Trans searchParas object to url parameters:
    const urlParasString = qs.stringify(searchParas)
    const url = formAPIURL(`search/posts?${urlParasString}`, false)
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
          const receiveAuthorCollectionAction = {
            type: CONSTANTS.FETCH_AUTHOR_COLLECTION_SUCCESS,
            authorId,
            normalizedData: normalize(camelizeKeys(responseItems), new schema.Array(articleSchema)),
            currentPage: _.get(responseObject, 'page', NUMBER_OF_FIRST_RESPONSE_PAGE - 1),
            totalPages: _.get(responseObject, 'nbPages', 0),
            totalResults: _.get(responseObject, 'nbHits', 0),
            receivedAt: Date.now()
          }
          // delay for displaying loading spinner
          if (returnDelay > 0) {
            return new Promise(function (resolve) {
              setTimeout(function () { resolve(dispatch(receiveAuthorCollectionAction)) }, returnDelay)
            })
          }
          return dispatch(receiveAuthorCollectionAction)
        })
      .catch(error => dispatch(failToReceiveAuthorCollection(authorId, error)))
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
    const { currentPage, isFetching, hasMore } = articlesDataOfAnAuthor
    if(!isFetching && hasMore) {
      return dispatch(fetchAuthorCollection({
        authorId,
        targetPage: currentPage + 1,
        returnDelay: RETURN_DELAY_TIME
      }))
    }
  }
}
