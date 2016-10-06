'use strict'
import superAgent from 'superagent'
import config from '../config'
import constants from '../constants'

function loadGroups(req, path) {
  return new Promise((resolve, reject) => {
    const query = req.query
    const { API_PROTOCOL, API_PORT, API_HOST } = config
    const url = `${API_PROTOCOL}://${API_HOST}:${API_PORT}/${path}`

    superAgent['get'](url)
    .timeout(constants.timeout)
    .query(query)
    .end( function (err, res) {
      if (err) {
        reject(err)
      } else {
        resolve(res.body)
      }
    })
  })
}

export function loadTags(req) {
  return loadGroups(req, 'tags')
}

export function loadCategories(req) {
  return loadGroups(req, 'postcategories')
}
