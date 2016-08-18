
'use strict'
import { article as articleSchema } from '../schemas/index'
import { camelizeKeys } from 'humps'
import { formatUrl, getArticleEmbeddedQuery } from '../utils/index'
import { normalize } from 'normalizr'
import { InternalServerError, NotFoundError } from '../lib/custom-error'
import * as types from '../constants/action-types'
import fetch from 'isomorphic-fetch'
import qs from 'qs'
import _ from 'lodash'

function requestArticle(slug, url) {
  return {
    type: types.FETCH_ARTICLE_REQUEST,
    slug,
    url
  }
}

function failToReceiveArticle(slug, error) {
  return {
    type: types.FETCH_ARTICLE_FAILURE,
    slug,
    error,
    failedAt: Date.now()
  }
}

function receiveArticle(response, slug) {
  return {
    type: types.FETCH_ARTICLE_SUCCESS,
    slug,
    response,
    receivedAt: Date.now()
  }
}

function fetchArticle(slug) {
  return dispatch => {
    let query = qs.stringify({ embedded: JSON.stringify(getArticleEmbeddedQuery()) })
    let url = formatUrl(`posts/${slug}?${query}`)
    dispatch(requestArticle(slug, url))
    return fetch(url)
    .then((response) => {
      let status = response.status
      if (status === 404) {
        throw new NotFoundError('Article ' +  slug + ' is not found')
      } else if (status >= 400) {
        throw new InternalServerError('Bad response from API, response: ' + JSON.stringify(response))
      }
      return response.json()
    })
    .then((response) => {
      const camelizedJson = camelizeKeys(response)
      return dispatch(receiveArticle(normalize(camelizedJson, articleSchema), slug))
    }, (error) => {
      return dispatch(failToReceiveArticle(slug, error))
    })
  }
}

function shouldFetchArticle(state, slug) {
  const slugToId = _.get(state, 'slugToId', {})
  const articles = _.get(state, [ 'entities', 'articles' ], {})
  if (_.get(articles, [ slugToId[slug], 'content' ])) {
    return false
  }
  return true
}

export function fetchArticleIfNeeded(slug) {
  return (dispatch, getState) => {
    if (shouldFetchArticle(getState(), slug)) {
      return dispatch(fetchArticle(slug))
    }
    let state = getState()
    let response = {
      result: _.get(state, [ 'slugToId', slug ])
    }
    return dispatch(receiveArticle(response, slug))
  }
}
