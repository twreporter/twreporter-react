/*eslint no-console: 0*/

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

export function loadTopics(req, params = []) {
  return new Promise((resolve, reject) => {
    const query = req.query
    const { API_PROTOCOL, API_PORT, API_HOST } = config
    let url = `${API_PROTOCOL}://${API_HOST}:${API_PORT}/topics`
    let slug = typeof params[0] === 'string' ? params[0] : null
    if (slug) {
      _.merge(query, { where: JSON.stringify({ slug: slug }) })
    }
    superAgent['get'](url).timeout(constants.timeout)
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
