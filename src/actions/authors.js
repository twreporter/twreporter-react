'use strict'
import assign from 'lodash/assign'
import fetch from 'isomorphic-fetch'
import get from 'lodash/get'
import map from 'lodash/map'
import omit from 'lodash/omit'
import qs from 'qs'
import twreporterRedux from '@twreporter/redux'
import { InternalServerError } from '../custom-error'
import { MAX_RESULTS_PER_FETCH, MAX_RESULTS_PER_SEARCH, NUMBER_OF_FIRST_RESPONSE_PAGE, RETURN_DELAY_TIME } from '../constants/authors-list'
import { author as authorSchema } from '../schemas/article-schema'
import { schema, normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import * as CONSTANTS from '../constants/index'

const formAPIURL = twreporterRedux.utils.formAPIURL

const _ = {
  assign,
  get,
  map,
  omit
}

export function requestSearchAuthors(keywords = '') {
  return {
    type: (keywords === '') ? CONSTANTS.LIST_ALL_AUTHORS_REQUEST : CONSTANTS.SEARCH_AUTHORS_REQUEST,
    keywords: keywords
  }
}

export function failToSearchAuthors(keywords = '', error) {
  return {
    type: (keywords === '') ? CONSTANTS.LIST_ALL_AUTHORS_FAILURE : CONSTANTS.SEARCH_AUTHORS_FAILURE,
    error,
    failedAt: Date.now()
  }
}

/**
 * NormalizedData
 * @typedef {Object} NormalizedData
 * @property {Object} entities
 * @property {string[]} result
 */

/**
 * ReceiveSearchAuthorsAction
 *
 * @typedef {Object} ReceiveSearchAuthorsAction
 * @property {string} keywords
 * @property {NormalizedData} normalizedData
 * @property {number} currentPage
 * @property {number} totalPages
 * @property {number} receivedAt
 */

export function searchAuthors({ keywords, targetPage, returnDelay }) {
  return (dispatch, getState) => { // eslint-disable-line no-unused-vars
    const searchParas = {
      keywords,
      filters: 'articlesCount>0',
      hitsPerPage: (keywords === '') ? MAX_RESULTS_PER_FETCH : MAX_RESULTS_PER_SEARCH,
      page: targetPage
    }
    // Trans searchParas object to url parameters:
    let urlParasString = qs.stringify(searchParas)
    let url = formAPIURL(`search/authors?${urlParasString}`, false)
    dispatch(requestSearchAuthors(keywords))
    // Call our API server to fetch the data
    return fetch(url)
      .then((response) => {
        if (response.status >= 400) {
          // console.log(response)
          throw new InternalServerError('Bad response from API, response:' + JSON.stringify(response))
        }
        return response.json()
      })
      .then((responseObject) => {
        const authors = _.get(responseObject, 'hits', {})
        const receiveSearchAuthorsAction = {
          type: (keywords === '') ? CONSTANTS.LIST_ALL_AUTHORS_SUCCESS : CONSTANTS.SEARCH_AUTHORS_SUCCESS,
          keywords,
          normalizedData: Array.isArray(authors) ? normalize(camelizeKeys(authors), new schema.Array(authorSchema)) : normalize(camelizeKeys(authors), authorSchema),
          currentPage: _.get(responseObject, 'page', NUMBER_OF_FIRST_RESPONSE_PAGE - 1),
          totalPages: _.get(responseObject, 'nbPages', 0),
          receivedAt: Date.now()
        }
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
            return dispatch(receiveSearchAuthorsAction)
          })
        }
        return dispatch(receiveSearchAuthorsAction)
      },
      (error) => {
        return dispatch(failToSearchAuthors(keywords, error))
      })
  }
}

/*
  Algolia set hitsPerPage limit up to 1000 items per search.
  So if number of authors grows over 1000,
  it will need to check hasMore  as case lsat all authors.
*/

export function searchAuthorsIfNeeded(currentKeywords = '') {
  /* --------- list all authors --------- */
  if (currentKeywords === '') {
    return (dispatch, getState) => {
      const currentState = getState()
      const authorsList = _.get(currentState, 'authorsList', {})
      const { isFetching, currentPage, hasMore } = authorsList
      if (currentPage < NUMBER_OF_FIRST_RESPONSE_PAGE) { // Situation 1/3: If no data exists => fetch first page immediately
        return dispatch(searchAuthors({
          keywords: '',
          targetPage: NUMBER_OF_FIRST_RESPONSE_PAGE,
          returnDelay: 0
        }))
      }
      // If current page >= NUMBER_OF_FIRST_RESPONSE_PAGE:
      if (!isFetching && hasMore) { // Situation 2/3: If already have data AND not fetching AND has more => delay && next page
        return dispatch(searchAuthors({
          keywords: '',
          targetPage: currentPage + 1,
          returnDelay: RETURN_DELAY_TIME
        }))
      }
      return Promise.resolve('Promise Resolved') // Situation 3/3: If already have all data (not has more) OR is fetching => do nothing
    }
  }
  /* --------- searching authors --------- */
  return (dispatch, getState) => {
    const currentState = getState()
    const authorsList = _.get(currentState, 'searchedAuthorsList', {})
    const previousKeywords = _.get(authorsList, 'keywords')
    if ( currentKeywords !== previousKeywords) { // Situation 1/2:If keywords are new => search
      return dispatch(searchAuthors({
        keywords: currentKeywords,
        targetPage: NUMBER_OF_FIRST_RESPONSE_PAGE,
        returnDelay: 0
      }))
    }
    return Promise.resolve('Promise Resolved') // Situation 2/2:If keywords are the same => do nothing
  }
}
