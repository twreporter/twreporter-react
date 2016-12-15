'use strict'
import { article as articleSchema } from '../schemas/index'
import { camelizeKeys } from 'humps'
import { formatUrl } from '../utils/index'
import { normalize } from 'normalizr'
import { InternalServerError, NotFoundError } from '../lib/custom-error'
import * as types from '../constants/action-types'
import fetch from 'isomorphic-fetch'
import qs from 'qs'

// lodash
import get from 'lodash/get'

const _ = {
  get
}

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

/**
 * Fetch article from posts endpoint on the FE server
 * @param {string} slug - Article slug
 * @param {string} query - Query string for the url
 * @return {object} A Promise
 */
function fetchArticle(slug, query) {
  return dispatch => {
    let url = query ? formatUrl(`posts/${slug}?${query}`) : formatUrl(`posts/${slug}`)
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


/**
 * Given article slug, return article id of that slug
 * @param {object} state
 * @param {object} state.articleSlugToId - A mapping table storing article slug to article id
 * @param {string} slug - Article slug
 * @return {string} Article id
 */
function getArticleId(state, slug) {
  return _.get(state, [ 'articleSlugToId', slug ], '')
}

/**
 * Check if we should load article from Remote endpoint
 * @param {object} state
 * @param {object} state.entities
 * @param {object} state.entities.articles - articles already fetched
 * @param {string} id - Article id
 * @return {bool}
 */
function shouldFetchArticle(state, id) {
  const articles = _.get(state, [ 'entities', 'articles' ])
  if (_.get(articles, [ id, 'content' ])) {
    return false
  }
  return true
}

/**
 * @param {object} state
 * @param {object} state.entities
 * @param {object} state.entities.articles - articles already fetched
 * @param {string} id - Article id
 * @return {string} Query string for the url
 */
function getQueryParam(state, id) {
  const topicId = _.get(state, [ 'entities', 'articles', id, 'topics' ])
  if (!_.get(state, [ 'entities', 'topics', topicId ])) {
    // fetch article embedded with topic
    return qs.stringify({ embedded: JSON.stringify({ topics: 1 }) })
  }
  return ''
}

export function fetchArticleIfNeeded(slug) {
  return (dispatch, getState) => {
    const state = getState()
    const id = getArticleId(state, slug)
    if (shouldFetchArticle(state, id)) {
      const query = getQueryParam(state, id)
      return dispatch(fetchArticle(slug, query))
    }
    const response = {
      result: _.get(state, [ 'articleSlugToId', slug ])
    }
    return dispatch(receiveArticle(response, slug))
  }
}
