/*eslint no-console: 0*/
import superAgent from 'superagent'
import config from '../config'
import constants from '../constants'
import { InternalServerError, NotFoundError } from '../../src/lib/custom-error'

// lodash
import get from 'lodash/get'
import merge from 'lodash/merge'

const _ = {
  get,
  merge
}

/**
 * NOTICE: THERE IS NO WAY TO GET FULL TOPICS RIGTH NOW,
 * ONLY TO GET SINGLE FULL TOPIC.
 * @param {object} req - request object of express
 * @param {array} params
 * @return a Promise
 */
export function loadTopics(req, params = []) {
  const slug = _.get(params, 0, '')
  if (slug) {
    return loadTopic(req, slug)
  }
  return Promise.reject(new InternalServerError('Load topics per request is not implemented yet'))
}

/**
 * Get single topic from RESTful webservice
 * @param {object} req - request object of express
 * @param {string} slug - slug of the topic
 * @return Promise which has the topic object
 */
function loadTopic(req, slug) {
  return new Promise((resolve, reject) => {
    const query = req.query
    const { API_PROTOCOL, API_PORT, API_HOST } = config
    let url = `${API_PROTOCOL}://${API_HOST}:${API_PORT}/topics`

    if (slug) {
      _.merge(query, { where: JSON.stringify({ slug: slug }) })
    } else {
      return reject(new NotFoundError('Topic is not found by slug: ' + slug))
    }

    superAgent['get'](url).timeout(constants.timeout)
    .query(query)
    .end(function (err, res) {
      if (err) {
        reject(err)
      } else {
        const topic = _.get(res, [ 'body', '_items', 0 ])
        if (!topic) {
          return reject(new NotFoundError('Topic is not found by query :' +  JSON.stringify(query)))
        }
        return resolve(topic)
      }
    })
  })
}

