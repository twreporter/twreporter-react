/*eslint no-unused-vars: 1*/

import { CALL_API } from '../middleware/api'
export const LOADED_ARTICLES_REQUEST = 'LOADED_ARTICLES_REQUEST'
export const LOADED_MULTI_TAGGED_ARTICLES_SUCCESS = 'LOADED_MULTI_TAGGED_ARTICLES_SUCCESS'
export const LOADED_MULTI_TAGGED_ARTICLES_FAILURE = 'LOADED_MULTI_TAGGED_ARTICLES_FAILURE'
export const LOADED_ARTICLES_SUCCESS = 'LOADED_ARTICLES_SUCCESS'
export const LOADED_ARTICLES_FAILURE = 'LOADED_ARTICLES_FAILURE'

function fetchArticlesByTags(tags) {
  let params = {}
  tags = Array.isArray(tags) ? tags : [ tags ]
  if (tags) {
    params.tags = tags
  }
  return {
    [CALL_API]: {
      method: 'get',
      path: '/tags',
      params,
      tags,
      types: [ LOADED_ARTICLES_REQUEST, LOADED_MULTI_TAGGED_ARTICLES_SUCCESS, LOADED_MULTI_TAGGED_ARTICLES_FAILURE ]
    }
  }
}

function fetchArticles(params, tags) {
  return {
    [CALL_API]: {
      method: 'get',
      path: '/article',
      params,
      tags,
      types: [ LOADED_ARTICLES_REQUEST, LOADED_ARTICLES_SUCCESS, LOADED_ARTICLES_FAILURE ]
    }
  }
}

export function loadMultiTaggedArticles(tags) {
  return (dispatch, getState) => {
    return dispatch(fetchArticlesByTags(tags))
  }
}

export function loadArticles(tags, count, page) {
  let _tags = {}
  let params = {}
  let where = {}
  if (tags) {
    _tags['$in'] = Array.isArray(tags) ? tags : [ tags ]
    where.tags = _tags
  }
  params.where = JSON.stringify(where)
  params.max_results = count || 10
  params.page = page || 0
  params.sort = '-lastPublish'
  return (dispatch, getState) => {
    return dispatch(fetchArticles(params, tags))
  }
}
