/*eslint no-console: 0*/

import _ from 'lodash'
import superAgent from 'superagent'
import config from '../config'
import constants from '../constants'
import querystring from 'qs'

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

export function loadArticles(req, params = []) {
  return new Promise((resolve, reject) => {
    const query = req.query
    const { API_PROTOCOL, API_PORT, API_HOST } = config
    let url = `${API_PROTOCOL}://${API_HOST}:${API_PORT}/posts`
    let slug = typeof params[0] === 'string' ? params[0] : null
    url = slug ? `${url}/${slug}` : url
    superAgent['get'](url).timeout(constants.timeout)
    .query(query)
    .end(function (err, res) {
      if (err) {
        reject(err)
      } else {
        const embedded = JSON.parse(_.get(query, 'embedded', null))
        let aricleRes = res.body
        let writers =  []
        const list = [ 'writters', 'photographers', 'designers', 'engineers' ]
        list.forEach((item) => {
          let aArr = _.get(aricleRes, item, [])
          aArr.forEach((author) => {
            if(author.image) {
              writers.push(author.image)
            }
          })
        })

        // combine author images data if the query contains 'authorImages'
        if(_.get(embedded, 'authorImages')) {
          const imgIds = _.uniq(writers)
          const imgQuery = querystring.stringify({ where: JSON.stringify({ _id: { '$in': imgIds } } ) })
          const imgUrl = `${API_PROTOCOL}://${API_HOST}:${API_PORT}/images?${imgQuery}`

          superAgent['get'](imgUrl).timeout(constants.timeout)
          .end(function (err, res) {
            if (err) {
              console.warning('AUTHOR IMAGE LOADING FAILED:', err)
            } else {
              const imgItems = _.get(res.body, '_items')

              list.forEach((item) => {
                let authors = _.get(aricleRes, item, [])
                addImage(authors, imgItems)
              })
            }
            resolve(aricleRes)
          })
        } else {
          resolve(aricleRes)
        }
      }
    })
  })
}

function addImage(authors, imgItems) {
  authors.forEach((author) => {
    if(author.image) {
      let match = _.filter(imgItems, '_id', author.image)
      const wImg = _.get(match, [ 0, 'image' ])
      author.image = wImg
    }
  })
}
