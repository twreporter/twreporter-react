'use strict'
import { InternalServerError, NotFoundError } from '../lib/custom-error'
import { arrayOf, normalize } from 'normalizr'
import { article as articleSchema } from '../schemas/index'
import { camelizeKeys } from 'humps'
import { devCatListId, prodCatListId, devTopicListId, prodTopicListId } from '../conf/list-id'
import { formatUrl, getArticleEmbeddedQuery } from '../utils/index'
import _ from 'lodash'
import * as types from '../constants/action-types'
import fetch from 'isomorphic-fetch'
import qs from 'qs'


function requestArticlesByTagId(ids) {
  return {
    type: types.FETCH_ARTICLES_BY_TAG_ID_REQUEST,
    id: _.get(ids, 0)
  }
}

function failToReceiveArticlesByTagId(ids, error) {
  return {
    type: types.FETCH_ARTICLES_BY_TAG_ID_FAILURE,
    id: _.get(ids, 0),
    error,
    failedAt: Date.now()
  }
}

function receiveArticlesByTagId(response, ids) {
  return {
    type: types.FETCH_ARTICLES_BY_TAG_ID_SUCCESS,
    id: _.get(ids, 0),
    response,
    receivedAt: Date.now()
  }
}

function requestArticlesByCatId(ids) {
  return {
    type: types.FETCH_ARTICLES_BY_CAT_ID_REQUEST,
    id: _.get(ids, 0)
  }
}

function failToReceiveArticlesByCatId(ids, error) {
  return {
    type: types.FETCH_ARTICLES_BY_CAT_ID_FAILURE,
    id: _.get(ids, 0),
    error,
    failedAt: Date.now()
  }
}

function receiveArticlesByCatId(response, ids) {
  return {
    type: types.FETCH_ARTICLES_BY_CAT_ID_SUCCESS,
    id: _.get(ids, 0),
    response,
    receivedAt: Date.now()
  }
}

function requestArticlesByTopicId(ids) {
  return {
    type: types.FETCH_ARTICLES_BY_TOPIC_ID_REQUEST,
    id: _.get(ids, 0)
  }
}

function failToReceiveArticlesByTopicId(ids, error) {
  return {
    type: types.FETCH_ARTICLES_BY_TOPIC_ID_FAILURE,
    id: _.get(ids, 0),
    error,
    failedAt: Date.now()
  }
}

function receiveArticlesByTopicId(response, ids) {
  return {
    type: types.FETCH_ARTICLES_BY_TOPIC_ID_SUCCESS,
    id: _.get(ids, 0),
    response,
    receivedAt: Date.now()
  }
}

function requestArticlesByIds(ids) {
  return {
    type: types.FETCH_ARTICLES_REQUEST,
    ids
  }
}

function failToReceiveArticlesByIds(ids, error) {
  return {
    type: types.FETCH_ARTICLES_FAILURE,
    ids,
    error,
    failedAt: Date.now()
  }
}

function receiveArticlesByIds(response, ids) {
  return {
    type: types.FETCH_ARTICLES_SUCCESS,
    ids,
    response,
    receivedAt: Date.now()
  }
}

function _buildQuery(params = {}) {
  let query = {}
  let whitelist = [ 'where', 'embedded', 'max_results', 'page', 'sort' ]
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
  return query
}

function _buildPostQueryUrl(params = {}) {
  let query = _buildQuery(params)
  return formatUrl(`posts?${query}`)
}

function _buildMetaQueryUrl(params = {}) {
  let query = _buildQuery(params)
  return formatUrl(`meta?${query}`)
}

function _buildUrl(params = {}, target) {
  params = params || {}
  params.sort = params.sort || '-publishedDate'
  if (target === 'meta') {
    return _buildMetaQueryUrl(params)
  }
  return _buildPostQueryUrl(params)
}


function _setupWhereParam(key, value, params={}) {
  params = params || {}
  value = Array.isArray(value) ? value : [ value ]
  let where = {}
  if (value.length > 0) {
    _.merge(where, params.where, {
      [key]: {
        '$in': value
      }
    })
  }
  params.where = where
  return params
}

function _fetchArticles(url) {
  return fetch(url)
    .then((response) => {
      let status = response.status
      if (status === 404) {
        throw new NotFoundError('Resource are not found by url: ', url)
      } else if (status >= 400) {
        throw new InternalServerError('Bad response from API, response: ' + JSON.stringify(response))
      }
      return response.json()
    })
}

function _fetchArticlesAndDispatchActions(ids = [], params = {}, isOnlyMeta = true, requestAction, successAction, failAction) {
  return dispatch => {
    dispatch(requestAction(ids))
    return _fetchArticles(_buildUrl(params, isOnlyMeta ? 'meta' : 'article'))
      .then((response) => {
        let camelizedJson = camelizeKeys(response)
        let normalized = normalize(camelizedJson.items, arrayOf(articleSchema))
        _.merge(normalized, { links: camelizedJson.links, meta: camelizedJson.meta })
        return dispatch(successAction(normalized, ids))
      }, (error) => {
        return dispatch(failAction(ids, error))
      })
  }
}

function _dedupArticleIds(ids = [], state, isOnlyMeta) {
  const articles = _.get(state, [ 'entities', 'articles' ], {})
  let idsToFetch = []
  for(let id of ids) {
    if (isOnlyMeta) {
      if (!articles.hasOwnProperty(id)) {
        idsToFetch.push(id)
      }
    } else {
      // use content of article to determine if the article is fully fetched or not
      if (!_.get(articles, [ id, 'content' ])) {
        idsToFetch.push(id)
      }
    }
  }
  return idsToFetch

}

function _getListId(target = 'category') {
  if (__DEVELOPMENT__) { // eslint-disable-line
    return target === 'category' ? devCatListId : devTopicListId
  }
  return target === 'category' ? prodCatListId : prodTopicListId
}

/* Fetch meta of articles by their ids if those are not existed in the state
 * properties of meta: subtitle, name, heroImage, title, topics, publishedDate, slug, links, created and id
 * @param {string[]} ids - article ids to fetch
 * @param {object} params - params for composing query param of api
 * @param {string} [params.sort=-publishedDate] -the way returned articles are sorted by
 * @param {object} params.where - where query param
 * @param {object} params.embedded - embedded query param
 * @param {boolean} isOnlyMeta - if true, only get metadata of articles. Otherwise, get full articles.
 */
export function fetchArticlesByIdsIfNeeded(ids = [], params = {}, isOnlyMeta = true) {
  return (dispatch, getState) => {

    let idsToFetch = _dedupArticleIds(ids, getState(), isOnlyMeta)
    if (idsToFetch.length === 0) {
      return Promise.resolve()
    }

    params = _setupWhereParam('_id', idsToFetch, params)
    if (!isOnlyMeta) {
      // add default embedded
      params.embedded = params.embedded ? params.embedded : getArticleEmbeddedQuery()
    }

    return dispatch(_fetchArticlesAndDispatchActions(idsToFetch, params, isOnlyMeta, requestArticlesByIds, receiveArticlesByIds, failToReceiveArticlesByIds))
  }
}

export function fetchArticlesByTopicIdIfNeeded(topicId = '', params = {}, isOnlyMeta = true)  {
  return (dispatch, getState) => {
    if (!topicId || _.get(getState(), [ 'articlesByTopics', topicId ])) {
      return Promise.resolve()
    }

    params = _setupWhereParam('topics', [ topicId ], params)
    if (!isOnlyMeta) {
      // add default embedded
      params.embedded = params.embedded ? params.embedded : getArticleEmbeddedQuery()
    }

    return dispatch(_fetchArticlesAndDispatchActions([ topicId ], params, isOnlyMeta, requestArticlesByTopicId, receiveArticlesByTopicId, failToReceiveArticlesByTopicId))
  }
}

export function fetchArticlesByTagIdIfNeeded(tagId = '', params = {}, isOnlyMeta = true) {
  return (dispatch, getState) => {
    let items = _.get(getState(), [ 'articleByTags', tagId, 'items' ], [])

    if (!tagId || items.length >= params.max_results * params.page) {
      return Promise.resolve()
    }

    params = _setupWhereParam('tags', [ tagId ], params)
    if (!isOnlyMeta) {
      // add default embedded
      params.embedded = params.embedded ? params.embedded : getArticleEmbeddedQuery()
    }

    return dispatch(_fetchArticlesAndDispatchActions([ tagId ], params, isOnlyMeta, requestArticlesByTagId, receiveArticlesByTagId, failToReceiveArticlesByTagId))
  }
}

export function fetchArticlesByCatIdIfNeeded(catId = '', params = {}, isOnlyMeta = true) {
  return (dispatch, getState) => {
    let items = _.get(getState(), [ 'articleByCats', catId, 'items' ], [])

    if (!catId || items.length >= params.max_results * params.page) {
      return Promise.resolve()
    }

    params = _setupWhereParam('categories', [ catId ], params)
    if (!isOnlyMeta) {
      // add default embedded
      params.embedded = params.embedded ? params.embedded : getArticleEmbeddedQuery()
    }

    return dispatch(_fetchArticlesAndDispatchActions([ catId ], params, isOnlyMeta, requestArticlesByCatId, receiveArticlesByCatId, failToReceiveArticlesByCatId))
  }
}


export function fetchArticlesByTopicIdNameIfNeeded(topicName = '', params = {} , isOnlyMeta = true) {
  let listId = _getListId('topic')
  let topicId = listId[topicName]
  return fetchArticlesByTopicIdIfNeeded(topicId, params, isOnlyMeta)
}

function _fetchArticlesByName(name = '', params = {}, isOnlyMeta = true, target) {
  let listId = _getListId(target)
  let id = listId[name]
  params = params || {}
  params.max_results = params.max_results || 10
  params.page = params.page || 1
  return target === 'category' ? fetchArticlesByCatIdIfNeeded(id, params, isOnlyMeta) : fetchArticlesByTagIdIfNeeded(id, params, isOnlyMeta)
}

export function fetchArticlesByCatNameIfNeeded(catName = '', params = {}, isOnlyMeta = true) {
  return _fetchArticlesByName(catName, params, isOnlyMeta, 'category')
}

export function fetchArticlesByTagNameIfNeeded(tagName = '', params = {}, isOnlyMeta = true) {
  return _fetchArticlesByName(tagName, params, isOnlyMeta, 'tag')
}

