'use strict'
import superAgent from 'superagent'
import config from '../config'
import constants from '../constants'

export function loadAuthors(req, path) { // eslint-disable-line no-unused-vars
  return new Promise((resolve, reject) => {
    const query = req.query
    const { API_PROTOCOL, API_PORT, API_HOST } = config
    const url = `${API_PROTOCOL}://${API_HOST}:${API_PORT}/contacts`
    // url = http://localhost:8080/contacts

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
