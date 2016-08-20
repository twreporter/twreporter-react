'use strict'
import { CATEGORY, TAG, TOPIC } from '../constants/index'
import { InternalServerError, NotFoundError } from '../lib/custom-error'
import { arrayOf, normalize } from 'normalizr'
import { article as articleSchema } from '../schemas/index'
import { camelizeKeys } from 'humps'
import { formatUrl, getArticleEmbeddedQuery } from '../utils/index'
import _ from 'lodash'
import * as types from '../constants/action-types'
import fetch from 'isomorphic-fetch'
import qs from 'qs'

function requestArticlesByUuid(id, url) {
  return {
    type: types.FETCH_ARTICLES_BY_GROUP_UUID_REQUEST,
    id,
    url
  }
}

function failToReceiveArticlesByUuid(id, error) {
  return {
    type: types.FETCH_ARTICLES_BY_GROUP_UUID_FAILURE,
    id,
    error,
    failedAt: Date.now()
  }
}

function receiveArticlesByUuid(response, id) {
  return {
    type: types.FETCH_ARTICLES_BY_GROUP_UUID_SUCCESS,
    id,
    response,
    receivedAt: Date.now()
  }
}

function requestRelatedArticles(id, relatedIds, url) {
  return {
    type: types.FETCH_RELATED_ARTICLES_REQUEST,
    id,
    relatedIds,
    url
  }
}

function failToReceiveRelatedArticles(id, relatedIds, error) {
  return {
    type: types.FETCH_RELATED_ARTICLES_FAILURE,
    id,
    relatedIds,
    error,
    failedAt: Date.now()
  }
}

function receiveRelatedArticles(response, id, relatedIds) {
  return {
    type: types.FETCH_RELATED_ARTICLES_SUCCESS,
    id,
    relatedIds,
    response,
    receivedAt: Date.now()
  }
}

function requestFeatureArticles(url) {
  return {
    type: types.FETCH_FEATURE_ARTICLES_REQUEST,
    url
  }
}

function failToReceiveFeatureArticles(error) {
  return {
    type: types.FETCH_FEATURE_ARTICLES_FAILURE,
    error,
    failedAt: Date.now()
  }
}

function receiveFeaturedArticles(response) {
  return {
    type: types.FETCH_FEATURE_ARTICLES_SUCCESS,
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


function _setupWhereInParam(key, value, params={}) {
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

/* Fetch related articles' meta of one certain article
 * properties of meta: subtitle, name, heroImage, title, topics, publishedDate, slug, links, created and id
 * @param {string} articleId
 * @param {string[]} relatedIds - related article ids
 * @param {object} params - params for composing query param of api
 * @param {string} [params.sort=-publishedDate] -the way returned articles are sorted by
 * @param {object} params.where - where query param
 * @param {object} params.embedded - embedded query param
 * @param {boolean} isOnlyMeta - if true, only get metadata of articles. Otherwise, get full articles.
 */
export function fetchRelatedArticlesIfNeeded(articleId, relatedIds, params = {}, isOnlyMeta = true) {
  return (dispatch, getState) => {
    if (!articleId) {
      return Promise.resolve()
    }
    let articles = _.get(getState(), [ 'entities', 'articles' ], {})
    let idsToFetch = []

    _.forEach(relatedIds, (id) => {
      if (!_.has(articles, id)) {
        idsToFetch.push(id)
      }
    })

    if (_.get(idsToFetch, 'length', 0) === 0) {
      return Promise.resolve()
    }

    params = _setupWhereInParam('_id', idsToFetch, params)

    if (!isOnlyMeta) {
      // add default embedded
      params.embedded = params.embedded ? params.embedded : getArticleEmbeddedQuery()
    }

    let url = _buildUrl(params, isOnlyMeta ? 'meta' : 'article')
    dispatch(requestRelatedArticles(articleId, idsToFetch, url))
    return _fetchArticles(url)
      .then((response) => {
        let camelizedJson = camelizeKeys(response)
        let normalized = normalize(camelizedJson.items, arrayOf(articleSchema))
        return dispatch(receiveRelatedArticles(normalized, articleId, idsToFetch))
      }, (error) => {
        return dispatch(failToReceiveRelatedArticles(articleId, idsToFetch, error))
      })
  }
}

/* Fetch meta of articles according to one group uuid.
 * Group uuid could be Category, Tag or Topic uuid.
 * properties of meta: subtitle, name, heroImage, title, topics, publishedDate, slug, links, created and id
 * @param {string} uuid - Category, Tag or Topic uuid
 * @param {string} type - CATEGORY, TAG or TOPIC
 * @param {object} params - params for composing query param of api
 * @param {string} [params.sort=-publishedDate] -the way returned articles are sorted by
 * @param {object} params.where - where query param
 * @param {object} params.embedded - embedded query param
 * @param {boolean} isOnlyMeta - if true, only get metadata of articles. Otherwise, get full articles.
 */
export function fetchArticlesByUuidIfNeeded(uuid = '', type = '', params = {}, isOnlyMeta = true) {
  return (dispatch, getState) => {
    if (!uuid || _.get(getState(), [ 'articlesByUuids', uuid, 'hasMore' ]) === false) {
      return Promise.resolve()
    }

    switch (type) {
      case CATEGORY:
        params = _setupWhereInParam('categories', [ uuid ], params)
        break
      case TAG:
        params = _setupWhereInParam('tags', [ uuid ], params)
        break
      case TOPIC:
        params = _setupWhereInParam('topics', [ uuid ], params)
        break
      default:
        return Promise.resolve()
    }

    if (!isOnlyMeta) {
      // add default embedded
      params.embedded = params.embedded ? params.embedded : getArticleEmbeddedQuery()
    }

    let url = _buildUrl(params, isOnlyMeta ? 'meta' : 'article')
    dispatch(requestArticlesByUuid(uuid, url))
    return _fetchArticles(url)
      .then((response) => {
        let camelizedJson = camelizeKeys(response)
        let normalized = normalize(camelizedJson.items, arrayOf(articleSchema))
        _.merge(normalized, { links: camelizedJson.links, meta: camelizedJson.meta })
        return dispatch(receiveArticlesByUuid(normalized, uuid))
      }, (error) => {
        return dispatch(failToReceiveArticlesByUuid(uuid, error))
      })

  }
}

/* Fetch meta of articles whose 'isFeature' field is true
 * properties of meta: subtitle, name, heroImage, title, topics, publishedDate, slug, links, created and id
 * @param {object} params - params for composing query param of api
 * @param {string} [params.sort=-publishedDate] -the way returned articles are sorted by
 * @param {object} params.where - where query param
 * @param {object} params.embedded - embedded query param
 * @param {boolean} isOnlyMeta - if true, only get metadata of articles. Otherwise, get full articles.
 */
export function fetchFeatureArticles(params = {}, isOnlyMeta = true) {
  const limit = 6
  const page = 1

  return (dispatch) => {
    params = params || {}
    params.where = _.merge({}, params.where, {
      isFeatured: true
    })
    params.max_results = params.max_results || limit
    params.page = params.page || page

    let url = _buildUrl(params, isOnlyMeta ? 'meta' : 'article')
    dispatch(requestFeatureArticles(url))
    return _fetchArticles(url)
      .then((response) => {
        let camelizedJson = camelizeKeys(response)
        let normalized = normalize(camelizedJson.items, arrayOf(articleSchema))
        return dispatch(receiveFeaturedArticles(normalized))
      }, (error) => {
        return dispatch(failToReceiveFeatureArticles(error))
      })
  }
}

// no need temporarily
/*
function _getListId(target = 'category') {
  if (__DEVELOPMENT__) { // eslint-disable-line
    return target === 'category' ? devCatListId : devTopicListId
  }
  return target === 'category' ? prodCatListId : prodTopicListId
}

export function fetchArticlesByTopicIdNameIfNeeded(topicName = '', params = {} , isOnlyMeta = true) {
  let listId = _getListId('topic')
  let topicId = listId[topicName]
  return fetchArticlesByTopicIdIfNeeded(topicId, params, isOnlyMeta)
}

function _fetchArticlesByListName(name = '', params = {}, isOnlyMeta = true, target) {
  let listId = _getListId(target)
  let id = listId[name]
  params = params || {}
  params.max_results = params.max_results || 10
  params.page = params.page || 1
  return target === 'category' ? fetchArticlesByCatIdIfNeeded(id, params, isOnlyMeta) : fetchArticlesByTagIdIfNeeded(id, params, isOnlyMeta)
}

export function fetchArticlesByCatNameIfNeeded(catName = '', params = {}, isOnlyMeta = true) {
  return _fetchArticlesByListName(catName, params, isOnlyMeta, 'category')
}

export function fetchArticlesByTagNameIfNeeded(tagName = '', params = {}, isOnlyMeta = true) {
  return _fetchArticlesByListName(tagName, params, isOnlyMeta, 'tag')
}

*/
