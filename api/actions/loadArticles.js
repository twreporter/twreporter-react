/*eslint no-console: 0*/

import superAgent from 'superagent'
import config from '../config'
import constants from '../constants'
import querystring from 'qs'

// lodash
import filter from 'lodash/filter'
import get from 'lodash/get'
import merge from 'lodash/merge'
import uniq from 'lodash/uniq'

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
    if (slug) {
      merge(query, { where: JSON.stringify({ slug: slug }) })
    }
    superAgent['get'](url).timeout(constants.timeout)
    .query(query)
    .end(function (err, res) {
      if (err) {
        reject(err)
      } else {
        let embedded
        try {
          embedded = JSON.parse(get(query, 'embedded', null))
        } catch (error) {
          console.warning('Parse embedded error:', error)
        }
        let aricleRes = get(res.body, '_items.0')
        let writers =  []
        const list = [ 'writters', 'photographers', 'designers', 'engineers' ]
        list.forEach((item) => {
          let aArr = get(aricleRes, item, [])
          aArr.forEach((author) => {
            let authorImg = get(author, 'image', null)
            if(authorImg) {
              writers.push(authorImg)
            }
          })
        })

        // combine author images data if the query contains 'authorImages'
        if(get(embedded, 'authorImages')) {
          const imgIds = uniq(writers)
          const imgQuery = querystring.stringify({ where: JSON.stringify({ _id: { '$in': imgIds } } ) })
          const imgUrl = `${API_PROTOCOL}://${API_HOST}:${API_PORT}/images?${imgQuery}`

          superAgent['get'](imgUrl).timeout(constants.timeout)
          .end(function (err, res) {
            if (err) {
              console.warning('AUTHOR IMAGE LOADING FAILED:', err)
            } else {
              const imgItems = get(res.body, '_items')

              list.forEach((item) => {
                let authors = get(aricleRes, item, [])
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
    let authorImg = get(author, 'image', null)
    if(authorImg) {
      let match = filter(imgItems, '_id', authorImg)
      const wImg = get(match, [ 0, 'image' ])
      author.image = wImg
    }
  })
}
