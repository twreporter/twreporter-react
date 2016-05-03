/*eslint no-unused-vars: 1*/

'use strict'
import { camelizeKeys } from 'humps'
import { formatUrl } from '../utils/index'
import { arrayOf, normalize } from 'normalizr'
import { tag as tagSchema } from '../schemas/index'
import * as types from '../constants/action-types'
import config from '../../server/config'
import fetch from 'isomorphic-fetch'
import qs from 'qs'

function requestTags(tags) {
  return {
    type: types.FETCH_TAGS_REQUEST,
    tags
  }
}

function failToReceiveTags(tags, error) {
  return {
    type: types.FETCH_TAGS_FAILURE,
    tags,
    error,
    failedAt: Date.now()
  }
}

function receiveTags(response) {
  return {
    type: types.FETCH_TAGS_SUCCESS,
    response,
    receivedAt: Date.now()
  }
}

function fetchTags(tags) {
  return dispatch => {
    dispatch(requestTags(tags))
    let query = qs.stringify({ where: JSON.stringify( { name: { '$in': tags } }) })
    return fetch(formatUrl(`tags/?${query}`))
    .then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from API')
      }
      return response.json()
    })
    .then((response) => {
      const camelizedJson = camelizeKeys(response)
      dispatch(receiveTags(normalize(camelizedJson.items, arrayOf(tagSchema))))
    }, (error) => {
      dispatch(failToReceiveTags(tags, error))
    })
  }
}

function dedupTags(state, tags) {
  const existedTags = state.tags
  let rtn = []
  tags.forEach((tag) => {
    if (!existedTags.hasOwnProperty(tag) || existedTags[tag].error ) {
      rtn.push(tag)
    }
  })
  return rtn
}

export function fetchTagsIfNeeded(tags) {
  return (dispatch, getState) => {
    let deduppedTags = dedupTags(getState(), tags)

    if (deduppedTags.length !== 0) {
      return dispatch(fetchTags(deduppedTags))
    }
  }
}
