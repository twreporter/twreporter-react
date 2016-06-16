'use strict'
import { arrayOf, normalize } from 'normalizr'
import { article as articleSchema } from '../schemas/index'
import { camelizeKeys } from 'humps'
import { formatUrl, getArticleEmbeddedQuery } from '../utils/index'
import { InternalServerError, NotFoundError } from '../lib/custom-error'
import _ from 'lodash'
import * as types from '../constants/action-types'
import fetch from 'isomorphic-fetch'
import qs from 'qs'

function requestArticles(ids) {
  return {
    type: types.FETCH_ARTICLES_REQUEST,
    ids
  }
}

function failToReceiveArticles(ids, error) {
  return {
    type: types.FETCH_ARTICLES_FAILURE,
    ids,
    error,
    failedAt: Date.now()
  }
}

function receiveArticles(response, ids) {
  return {
    type: types.FETCH_ARTICLES_SUCCESS,
    ids,
    response,
    receivedAt: Date.now()
  }
}

function buildQueryURL(params = {}) {
  let query = {}
  let whitelist = [ 'where', 'sort', 'embedded' ]
  _.forEach(whitelist, (ele) => {
    if (params.hasOwnProperty(ele)) {
      if (ele === 'where' || ele === 'embedded') {
        query[ele] = JSON.stringify(params[ele])
      } else {
        query[ele] = params[ele]
      }
    }
  })
  query = qs.stringify(query)
  return formatUrl(`posts?${query}`)
}

function buildArticlesURL(ids = [], params = {}) {
  params = params || {}
  _.merge(params.where, {
    '_id': {
      '$in': ids
    }
  })
  params.sort = params.sort || '-publishedDate'
  params.embedded = params.embedded || getArticleEmbeddedQuery()
  return buildQueryURL(params)
}

function fetchArticles(ids = [], params = {}) {
  return dispatch => {
    dispatch(requestArticles(ids))
    return fetch(buildArticlesURL(ids, params))
    .then((response) => {
      let status = response.status
      if (status === 404) {
        throw new NotFoundError('Articles [ ' +  _.join(ids, ',') + ' ] are not found')
      } else if (status >= 400) {
        throw new InternalServerError('Bad response from API, response: ' + JSON.stringify(response))
      }
      return response.json()
    })
    .then((response) => {
      let camelizedJson = camelizeKeys(response)
      let normalized = normalize(camelizedJson.items, arrayOf(articleSchema))
      dispatch(receiveArticles(normalized, ids))
    }, (error) => {
      return dispatch(failToReceiveArticles(ids, error))
    })
  }
}


/* Fetch articles by their ids if those are not existed in the state
 * @param {string[]} ids - article ids to fetch
 * @param {object} params - params for composing query param of api
 * @param {string} [params.sort=-publishedDate] -the way returned articles are sorted by
 * @param {object} params.where - where query param
 * @param {object} params.embedded - embedded query param
 */
export function fetchArticlesByIdsIfNeeded(ids = [], params = {}) {
  return (dispatch, getState) => {
    const articles = _.get(getState(), [ 'entities', 'articles' ], {})
    let idToFetch = []
    for(let id of ids) {
      if (!articles.hasOwnProperty(id)) {
        idToFetch.push(id)
      }
    }

    if (idToFetch.length === 0) {
      return Promise.resolve()
    }

    return dispatch(fetchArticles(idToFetch, params))
  }
}
