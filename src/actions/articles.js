/*eslint no-unused-vars: 1*/

'use strict'
import { arrayOf, normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import { formatUrl } from '../utils/index'
import { merge } from 'lodash'
import { CALL_API } from '../middleware/api'
import * as types from '../constants/action-types'
import { article as articleSchema } from '../schemas/index'
import config from '../../server/config'
import fetch from 'isomorphic-fetch'
import qs from 'qs'

function requestArticles(tags) {
  return {
    type: types.FETCH_ARTICLES_REQUEST,
    tags
  }
}

function failToReceiveArticles(tags, error) {
  return {
    type: types.FETCH_ARTICLES_FAILURE,
    tags,
    error,
    failedAt: Date.now()
  }
}

function receiveArticles(response) {
  return {
    type: types.FETCH_ARTICLES_SUCCESS,
    response,
    receivedAt: Date.now()
  }
}

function fetchArticles(url, tags) {
  return dispatch => {
    dispatch(requestArticles(tags))
    return fetch(url)
    .then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from API')
      }
      return response.json()
    })
    .then((response) => {
      let camelizedJson = camelizeKeys(response)
      let normalized = normalize(camelizedJson.items, arrayOf(articleSchema))
      dispatch(receiveArticles( merge(normalized, { links: camelizedJson.links, meta: camelizedJson.meta })))
    }, (error) =>  {
      dispatch(failToReceiveArticles(tags, error))
    })
  }
}

function buildQueryURL(tags, count, page) {
  let _tags = {}
  let query = {}
  let where = {}
  if (tags) {
    _tags['$in'] = Array.isArray(tags) ? tags : [ tags ]
    where.tags = _tags
  }
  query.where = JSON.stringify(where)
  query.max_results = count || 10
  query.page = page || 0
  query.sort = '-publishedDate'
  query.embedded = JSON.stringify( { authors: 1, tags:1, categories:1 } )
  query = qs.stringify(query)
  return formatUrl(`posts?${query}`)
}

function getNextUrl(state, tags, count, page) {
  const tagStr = tags.join()
  const existedTaggedArticles = state.taggedArticles
  if (existedTaggedArticles[tagStr]) {
    return existedTaggedArticles[tagStr].nextUrl
  }
  // for the first time to get the tagged articles
  return buildQueryURL(tags, count, page)
}

export function fetchArticlesIfNeeded(tags, count, page) {
  return (dispatch, getState) => {
    const nextUrl = getNextUrl(getState(), tags, count, page)
    // if nextUrl is null, then it means no more to load
    if (nextUrl) {
      return dispatch(fetchArticles(nextUrl, tags))
    }
  }
}
