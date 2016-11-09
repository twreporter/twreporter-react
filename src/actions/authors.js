'use strict'
import { InternalServerError } from '../lib/custom-error'
import { camelizeKeys } from 'humps'
import { formatUrl } from '../utils/index'
import { arrayOf, normalize } from 'normalizr'
import { author as authorSchema } from '../schemas/index'
import * as CONSTANTS from '../constants/index'
import fetch from 'isomorphic-fetch'

export function fetchAuthorsIfNeeded() {
  return (dispatch, getState) => { // eslint-disable-line no-unused-vars
    // request for fetching all authors
    dispatch({
      type: CONSTANTS.FETCH_AUTHORS_REQUEST
    })

    return fetch(formatUrl('authors'))
      .then((response) => {
        if (response.status >= 400) {
          throw new InternalServerError('Bad response from API, response:' + JSON.stringify(response))
        }
        return response.json()
      })
      .then((response) => {
        const camelizedJson = camelizeKeys(response)
        dispatch({
          type: CONSTANTS.FETCH_AUTHORS_SUCCESS,
          response: normalize(camelizedJson.items, arrayOf(authorSchema)),
          receivedAt: Date.now()
        })
      }, (error) => {
        dispatch({
          type: CONSTANTS.FETCH_AUTHORS_FAILURE,
          error,
          failedAt: Date.now()
        })
      })
  }
}

// // action-types
//
// export const LOAD_MORE = 'LOAD_MORE'
// export const FILETER_BY_AUTHOR_NAME = 'FILETER_BY_AUTHOR_NAME'
//
// //action-creators
//
// export function loadMore() {
//   return {
//     type: LOAD_MORE
//   }
// }
//
// export function filterByAuthorName(keyword) {
//   return {
//     type: FILETER_BY_AUTHOR_NAME,
//     keyword
//   }
// }
