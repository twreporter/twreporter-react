/*eslint no-unused-vars: 1*/

'use strict'
import config from '../../server/config'
import fetch from 'isomorphic-fetch'
import * as types from '../constants/action-types'

export function selectArticle(slug) {
  return {
    type: types.SELECT_ARTICLE,
    slug
  }
}

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
    error
    // failedAt: Date.now()
  }
}

function receiveArticle(slug, article) {
  return {
    type: types.FETCH_ARTICLE_SUCCESS,
    slug,
    article
    // receivedAt: Date.now()
  }
}

function fetchArticle(slug) {
  return dispatch => {
    dispatch(requestArticle(slug))
    return fetch(`http://${config.apiHost}:${config.apiPort}/posts/${slug}`)
    .then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from API')
      }
      return response.json()
    })
    .then((article) => {
      dispatch(receiveArticle(slug, article))
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
