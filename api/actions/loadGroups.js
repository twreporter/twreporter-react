'use strict'
import superAgent from 'superagent'
import config from '../config'
import constants from '../constants'

const { API_HOST, API_PATH, API_PORT, API_PROTOCOL } = config

function loadGroups(req, path) {
  return new Promise((resolve, reject) => {
    const query = req.query
    const url = `${API_PROTOCOL}://${API_HOST}:${API_PORT}${API_PATH}${path}`

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
