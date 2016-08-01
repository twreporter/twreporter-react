'use strict'
import { formatUrl } from './index'
import _ from 'lodash'
import fetch from 'isomorphic-fetch'
import qs from 'qs'
import { InternalServerError, NotFoundError } from '../lib/custom-error'

function buildQuery(params = {}) {
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

function buildPostQueryUrl(params = {}) {
  let query = buildQuery(params)
  return formatUrl(`posts?${query}`)
}

function buildMetaQueryUrl(params = {}) {
  let query = buildQuery(params)
  return formatUrl(`meta?${query}`)
}

function buildUrl(params = {}, target) {
  params = params || {}
  params.sort = params.sort || '-publishedDate'
  if (target === 'meta') {
    return buildMetaQueryUrl(params)
  }
  return buildPostQueryUrl(params)
}

function fetchArticles(url) {
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

function setupWhereParam(key, value, params={}) {
  params = params || {}
  value = Array.isArray(value) ? value : [ value ]
  if (value.length > 0) {
    _.merge(params.where, {
      [key]: {
        '$in': value
      }
    })
  }
  return params
}

export {
  buildMetaQueryUrl,
  buildPostQueryUrl,
  buildQuery,
  buildUrl,
  fetchArticles,
  setupWhereParam
}
