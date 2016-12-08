/*eslint no-console: 0*/

import { InternalServerError, NotFoundError } from '../../src/lib/custom-error'

import superAgent from 'superagent'
import config from '../config'
import constants from '../constants'

// lodash
import get from 'lodash/get'
import merge from 'lodash/merge'

const _ = {
  get,
  merge
}

export function loadMetaOfArticles(req) {
  return new Promise((resolve, reject) => {
    const query = req.query
    const { API_PROTOCOL, API_PORT, API_HOST } = config
    let url = `${API_PROTOCOL}://${API_HOST}:${API_PORT}/meta`
    superAgent['get'](url)
      .timeout(constants.timeout)
      .query(query)
      .end(function (err, res) {
        if (err) {
          reject(err)
        } else {
          resolve(res.body)
        }
      })
  })
}


/**
 * NOTICE: THERE IS NO WAY TO GET FULL ARTICLES RIGTH NOW,
 * ONLY TO GET SINGLE FULL ARTICLE.
 * @param {object} req - request object of express
 * @param {array} params
 * @return a Promise
 */
export function loadArticles(req, params = []) {
  const slug = _.get(params, 0, '')
  if (slug) {
    return loadArticle(req, slug)
  }
  return Promise.reject(new InternalServerError('Load articles per request is not implemented yet'))
}

/**
 * Get single article from RESTful webservice
 * @param {object} req - request object of express
 * @param {array} slug - slug of the article
 * @return Promise which has the article object
 */
function loadArticle(req, slug) {
  return new Promise((resolve, reject) => {
    const query = req.query
    const { API_PROTOCOL, API_PORT, API_HOST } = config
    let url = `${API_PROTOCOL}://${API_HOST}:${API_PORT}/posts`

    if (slug) {
      _.merge(query, { where: JSON.stringify({ slug: slug }) })
    } else {
      return reject(new NotFoundError('Article is not found by slug: ' + slug))
    }

    superAgent['get'](url).timeout(constants.timeout)
    .query(query)
    .end(function (err, res) {
      if (err) {
        reject(err)
      } else {
        const article = _.get(res, [ 'body', '_items', 0 ])
        if (!article) {
          return reject(new NotFoundError('Article is not found by query :' +  JSON.stringify(query)))
        }
        return resolve(article)
      }
    })
  })
}
