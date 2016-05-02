/*eslint no-unused-vars: 1*/

'use strict'
import { article as articleSchema } from '../schemas/index'
import { camelizeKeys } from 'humps'
import { formatUrl } from '../utils/index'
import { normalize } from 'normalizr'
import * as types from '../constants/action-types'
import config from '../../server/config'
import fetch from 'isomorphic-fetch'
import qs from 'qs'

function requestArticle(slug) {
  return {
    type: types.FETCH_ARTICLE_REQUEST,
    slug
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

function receiveArticle(response) {
  return {
    type: types.FETCH_ARTICLE_SUCCESS,
    response,
    receivedAt: Date.now()
  }
}

function fetchArticle(slug) {
  return dispatch => {
    dispatch(requestArticle(slug))
    let query = qs.stringify({ embedded: JSON.stringify( { authors: 1, tags:1, categories:1 } ) })
    return fetch(formatUrl(`posts/${slug}?${query}`))
    .then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from API')
      }
      return response.json()
    })
    .then((response) => {
      const camelizedJson = camelizeKeys(response)
      dispatch(receiveArticle(normalize(camelizedJson, articleSchema)))
    }, (error) => {
      dispatch(failToReceiveArticle(slug, error))
    })
  }
}

function shouldFetchArticle(state, slug) {
  const articles = state.entities.articles
  if (!articles[slug]) {
    return true
  }
  return false
}

export function fetchArticleIfNeeded(slug) {
  return (dispatch, getState) => {
    if (shouldFetchArticle(getState(), slug)) {
      return dispatch(fetchArticle(slug))
    }
  }
}
