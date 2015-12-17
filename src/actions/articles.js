/*eslint no-unused-vars: 1*/

import { CALL_API } from '../middleware/api'
export const LOADED_ARTICLES_REQUEST = 'LOADED_ARTICLES_REQUEST'
export const LOADED_TAGGED_ARTICLES_SUCCESS = 'LOADED_TAGGED_ARTICLES_SUCCESS'
export const LOADED_TAGGED_ARTICLES_FAILURE = 'LOADED_TAGGED_ARTICLES_FAILURE'

const API_URL = 'http://api.twreporter.org'


function fetchArticlesByTags(tags) {
  let params = ''
  if (tags) {
    if (Array.isArray(tags)) {
      params = {
        'tags': tags
      }
    } else {
      params = {
        'tags': [ tags ]
      }
    }
  }
  return {
    [CALL_API]: {
      method: 'post',
      url: API_URL + '/tags',
      params: params,
      types: [ LOADED_ARTICLES_REQUEST, LOADED_TAGGED_ARTICLES_SUCCESS, LOADED_TAGGED_ARTICLES_FAILURE ]
    }
  }
}

/*
function fetchArticles(tag, count, page) {
    let where = {}
    let tags = {}
    if (tag) {
        tags['$in'] = tag
        where.tags = tags
    }
    return {
        [CALL_API]: {
            method: 'get',
            url: API_URL + '/articles',
            params: {
                where: where,
                max_results: count,
                page: page
            },
            types: [LOADED_ARTICLES_REQUEST, LOADED_TAGGED_ARTICLES_SUCCES, LOADED_TAGGED_ARTICLES_FAILURE]
        }
    }
}
*/

export function loadArticles(tags) {
  return (dispatch, getState) => {
    return dispatch(fetchArticlesByTags(tags))
  }
}

/* for load more
export function loadMoreArticles(tag, count, page) {
    return (dispatch, getState) => {
        return dispatch(fetchArticles(tag, count, page))
    }
}
*/
