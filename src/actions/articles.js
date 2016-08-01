'use strict'
import { arrayOf, normalize } from 'normalizr'
import { article as articleSchema } from '../schemas/index'
import { camelizeKeys } from 'humps'
import { getArticleEmbeddedQuery } from '../utils/index'
import _ from 'lodash'
import * as articleUtils from '../utils/fetch-articles-funcs'
import * as types from '../constants/action-types'

function requestArticlesByTopicId(ids) {
  return {
    type: types.FETCH_ARTICLES_BY_TOPIC_IDS_REQUEST,
    topicId: _.get(ids, 0)
  }
}

function failToReceiveArticlesByTopicId(ids, error) {
  return {
    type: types.FETCH_ARTICLES_BY_TOPIC_IDS_FAILURE,
    topicId: _.get(ids, 0),
    error,
    failedAt: Date.now()
  }
}

function receiveArticlesByTopicId(response, ids) {
  return {
    type: types.FETCH_ARTICLES_BY_TOPIC_IDS_SUCCESS,
    topicId: _.get(ids, 0),
    response,
    receivedAt: Date.now()
  }
}

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

function _fetchArticles(ids = [], params = {}, isOnlyMeta = true, requestAction, successAction, failAction) {
  return dispatch => {
    dispatch(requestAction(ids))
    return articleUtils.fetchArticles(articleUtils.buildUrl(params, isOnlyMeta ? 'meta' : 'article'))
      .then((response) => {
        let camelizedJson = camelizeKeys(response)
        let normalized = normalize(camelizedJson.items, arrayOf(articleSchema))
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

    params = articleUtils.setupWhereParam('_id', idsToFetch, params)
    if (!isOnlyMeta) {
      // add default embedded
      params.embedded = params.embedded ? params.embedded : getArticleEmbeddedQuery()
    }

    return dispatch(_fetchArticles(idsToFetch, params, isOnlyMeta, requestArticles, receiveArticles, failToReceiveArticles))
  }
}

export function fetchArticlesByTopicIdIfNeeded(topicId = '', params = [], isOnlyMeta = true)  {
  return (dispatch, getState) => {
    if (_.get(getState(), [ 'entities', 'articlesByTopics', topicId ])) {
      return Promise.resolve()
    }

    params = articleUtils.setupWhereParam('topics', [ topicId ], params)
    if (!isOnlyMeta) {
      // add default embedded
      params.embedded = params.embedded ? params.embedded : getArticleEmbeddedQuery()
    }

    return dispatch(_fetchArticles([ topicId ], params, isOnlyMeta, requestArticlesByTopicId, receiveArticlesByTopicId, failToReceiveArticlesByTopicId))
  }
}
