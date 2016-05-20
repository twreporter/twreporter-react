
'use strict'
import { arrayOf, normalize } from 'normalizr'
import { article as articleSchema } from '../schemas/index'
import { camelizeKeys } from 'humps'
import { formatUrl, getArticleEmbeddedQuery } from '../utils/index'
import { merge } from 'lodash'
import _ from 'lodash'
import * as CONSTANTS from '../constants/index'
import fetch from 'isomorphic-fetch'
import { fetchTagsIfNeeded, fetchCategoriesIfNeeded } from './groups'
import qs from 'qs'

const groupEnum = CONSTANTS.groupEnum

function requestArticles(groupType, groupNames) {
  let type = groupType === groupEnum.CATEGORY ? CONSTANTS.FETCH_ARTICLES_BY_CATS_REQUEST : CONSTANTS.FETCH_ARTICLES_BY_TAGS_REQUEST
  return {
    type: type,
    groups: groupNames
  }
}

function failToReceiveArticles(groupType, groupNames, error) {
  let type = groupType === groupEnum.CATEGORY ? CONSTANTS.FETCH_ARTICLES_BY_CATS_FAILURE : CONSTANTS.FETCH_ARTICLES_BY_TAGS_FAILURE
  return {
    type: type,
    groups: groupNames,
    error,
    failedAt: Date.now()
  }
}

function receiveArticles(groupType, groupNames, response) {
  let type = groupType === groupEnum.CATEGORY ? CONSTANTS.FETCH_ARTICLES_BY_CATS_SUCCESS : CONSTANTS.FETCH_ARTICLES_BY_TAGS_SUCCESS
  return {
    type: type,
    groups: groupNames,
    response,
    receivedAt: Date.now()
  }
}

function fetchArticles(groupType, groupNames = [], url = '') {
  return dispatch => {
    dispatch(requestArticles(groupType, groupNames))
    return fetch(url)
    .then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from API')
      }
      return response.json()
    })
    .then((response) => {
      let camelizedJson = camelizeKeys(response)
      let normalized = normalize(camelizedJson.items, arrayOf(articleSchema))
      dispatch(receiveArticles( groupType, groupNames, merge(normalized, { links: camelizedJson.links, meta: camelizedJson.meta })))
    }, (error) =>  {
      dispatch(failToReceiveArticles(groupType, groupNames, error))
    })
  }
}

function buildQueryURL(groupType, groupIds = [], count = 10, page = 1) {
  let query = {}
  let where = {}
  if (groupIds.length !== 0) {
    let group = groupType === groupEnum.CATEGORY ? 'categories' : 'tags'
    where[group] = {
      '$in': groupIds
    }
  } else {
    return new Error('There is no tag/category ids to build query')
  }
  query.where = JSON.stringify(where)
  query.max_results = count || 10
  query.page = page || 0
  query.sort = '-publishedDate'
  query.embedded = JSON.stringify( getArticleEmbeddedQuery() )
  query = qs.stringify(query)
  return formatUrl(`posts?${query}`)
}

function getNextUrl(state = {}, groupType, groupNames = [], count = 10, page = 1) {
  let existedArticles
  let existedGroups
  if (groupType === groupEnum.CATEGORY) {
    existedArticles = state.articlesByCats
    existedGroups = state.categories
  } else if (groupType === groupEnum.TAG) {
    existedArticles = state.articlesByTags
    existedGroups = state.tags
  } else {
    return null
  }

  groupNames = Array.isArray(groupNames) ? groupNames : [ groupNames ]
  const groupNameStr = groupNames.join()
  const articles = _.get(existedArticles, [ groupNameStr ])
  if (articles) {
    // articles are already loaded
    if (articles.items.length >= count * page) {
      return null
    }
    return existedArticles[groupNameStr].nextUrl
  }

  // for the first time to get the articles
  // build the query string
  let groupIds = []
  // get group ids by group name from state
  groupNames.forEach((groupName) => {
    let id = _.get(existedGroups, [ groupName, 'id' ])
    if (id) {
      groupIds.push(id)
    }
  })
  return buildQueryURL(groupType, groupIds, count, page)
}

function fetchArticlesIfNeeded(groupType, groupNames, count, page) {
  return (dispatch, getState) => {
    let fetchGroup
    if (groupType === groupEnum.CATEGORY) {
      fetchGroup = fetchCategoriesIfNeeded
    } else if (groupType === groupEnum.TAG) {
      fetchGroup = fetchTagsIfNeeded
    } else {
      return dispatch(failToReceiveArticles(groupType, groupNames, new Error('group type should be tag or category')))
    }

    // load group ids by group names
    return dispatch(fetchGroup(groupNames)).then(() => {
      const nextUrl = getNextUrl(getState(), groupType, groupNames, count, page)
      if (nextUrl instanceof Error) {
        // dispatch fail action
        return dispatch(failToReceiveArticles(groupType, groupNames, nextUrl))
      } else if (nextUrl) {
        return dispatch(fetchArticles(groupType, groupNames, nextUrl))
      } else {
        // if nextUrl is null or '', then it means no more to load
        return Promise.resolve()
      }
    })
  }
}

export function fetchTaggedArticlesIfNeeded(tags, count, page) {
  return (dispatch) => {
    return dispatch(fetchArticlesIfNeeded(groupEnum.TAG, tags, count, page))
  }
}

export function fetchCategorizedArticlesIfNeeded(categories, count, page) {
  return (dispatch) => {
    return dispatch(fetchArticlesIfNeeded(groupEnum.CATEGORY, categories, count, page))
  }
}
