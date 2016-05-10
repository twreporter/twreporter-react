/*eslint no-unused-vars: 1*/

'use strict'
import { arrayOf, normalize } from 'normalizr'
import { article as articleSchema } from '../schemas/index'
import { camelizeKeys } from 'humps'
import { formatUrl, getArticleEmbeddedQuery } from '../utils/index'
import { merge } from 'lodash'
import { CALL_API } from '../middleware/api'
import * as types from '../constants/action-types'
import config from '../../server/config'
import fetch from 'isomorphic-fetch'
import { fetchTagsIfNeeded } from './tags'
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

function receiveArticles(tags, response) {
  return {
    type: types.FETCH_ARTICLES_SUCCESS,
    tags,
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
      dispatch(receiveArticles( tags, merge(normalized, { links: camelizedJson.links, meta: camelizedJson.meta })))
    }, (error) =>  {
      dispatch(failToReceiveArticles(tags, error))
    })
  }
}

function buildQueryURL(tags, count, page) {
  let _tags = {}
  let query = {}
  let where = {}
  if (tags.length !== 0) {
    _tags['$in'] = Array.isArray(tags) ? tags : [ tags ]
    where.tags = _tags
  } else {
    return new Error('There is no tag ids to build query')
  }
  query.where = JSON.stringify(where)
  query.max_results = count || 10
  query.page = page || 0
  query.sort = '-publishedDate'
  query.embedded = JSON.stringify( getArticleEmbeddedQuery() )
  query = qs.stringify(query)
  return formatUrl(`posts?${query}`)
}

function getNextUrl(state, tags, count, page) {
  const tagStr = tags.join()
  const existedTaggedArticles = state.taggedArticles || {}
  if (existedTaggedArticles[tagStr]) {
    let taggedArticles = existedTaggedArticles[tagStr]
    // articles are already loaded
    if (taggedArticles.items.length >= count * page) {
      return null
    }
    return existedTaggedArticles[tagStr].nextUrl
  }
  // for the first time to get the tagged articles
  // build the query string
  const tagsInState = state.tags || {}
  let tagIds = []
  // get tag ids by tag name from store.getState()
  tags.forEach((tag) => {
    if (tagsInState.hasOwnProperty(tag) && tagsInState[tag].id) {
      tagIds.push(tagsInState[tag].id)
    }
  })
  return buildQueryURL(tagIds, count, page)
}

export function fetchArticlesIfNeeded(tags, count, page) {
  return (dispatch, getState) => {
    tags = Array.isArray(tags) ? tags : [ tags ]
    // load tag ids by tag names
    return dispatch(fetchTagsIfNeeded(tags)).then(() => {
      const nextUrl = getNextUrl(getState(), tags, count, page)
      if (nextUrl === null) {
        // if nextUrl is null, then it means no more to load
        return Promise.resolve()
      } else if (nextUrl instanceof Error) {
        // dispatch fail action
        return dispatch(failToReceiveArticles(tags, nextUrl))
      } else {
        return dispatch(fetchArticles(nextUrl, tags))
      }
    })
  }
}
