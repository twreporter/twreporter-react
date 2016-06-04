
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
    let query = qs.stringify({ embedded: JSON.stringify(getArticleEmbeddedQuery()) })
    let finialResponse = {}
    return fetch(formatUrl(`posts/${slug}?${query}`))
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
      let relateds = _.get(response, 'relateds', [])
      finialResponse = response

      if (_.get(relateds, '0')) {
        let query = qs.stringify({ where: '{"_id":{"$in":' + JSON.stringify(relateds) + '}}' })
        return fetch(formatUrl(`posts/?${query}`))
      } else {
        return {
          status: 200,
          json: () => {}
        }
      }
    })
    .then((relatedsResponse) => {
      let status = relatedsResponse.status
      if (status === 404) {
        throw new NotFoundError('Relateds of Article ' +  slug + ' is not found')
      } else if (status >= 400) {
        throw new InternalServerError('Bad response from API, response: ' + JSON.stringify(relatedsResponse))
      }
      return relatedsResponse.json()
    })
    .then((relatedsResponse) => {
      finialResponse.relateds = _.get(relatedsResponse, '_items', [])
      const camelizedJson = camelizeKeys(finialResponse)
      return dispatch(receiveArticle(normalize(camelizedJson, articleSchema)))
    }, (error) => {
      return dispatch(failToReceiveArticle(slug, error))
    })
  }
}

function shouldFetchArticle(state, slug) {
  const articles = state.entities.articles || {}
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
    return Promise.resolve()
  }
}
