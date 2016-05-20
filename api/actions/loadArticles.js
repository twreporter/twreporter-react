import _ from 'lodash'
import superAgent from 'superagent'
import config from '../config'

export default function loadArticles(req, params = []) {
  return new Promise((resolve, reject) => {
    const query = req.query
    const { API_PROTOCOL, API_PORT, API_HOST } = config
    let url = `${API_PROTOCOL}://${API_HOST}:${API_PORT}/posts`
    let slug = typeof params[0] === 'string' ? params[0] : null
    url = slug ? `${url}/${slug}` : url
    superAgent['get'](url).timeout(500)
    .query(query)
    .end(function (err, res) {
      if (err) {
        reject(err)
      } else {
        console.log('\n ***QUERY', query, url)
        const queryObj = JSON.parse(_.get(query, 'embedded'))
        const aricleRes = res.body
        const writers =  _.get(aricleRes, 'writters')
        if(_.get(queryObj, 'authorImages')) {
          // combine author images data if the query contains 'authorImages'
          const imgIds = _.uniq(_.map(writers, (writers)=>{ return '"' + writers.image + '"' }))
          const imgQuery = encodeURI(`where={"_id":{"$in":[${imgIds}]}}`)
          const imgUrl = `${API_PROTOCOL}://${API_HOST}:${API_PORT}/images?${imgQuery}`
          console.log('\n ***WRITERS', imgQuery, imgUrl)

          superAgent['get'](imgUrl).timeout(500)
          .end(function (err, res) {
            if (err) {
              reject(err)
            } else {
              console.log('\n ***IMAGES', res.body)
            }
          })
        } else {
          resolve(aricleRes)
        }
      }
    })
  })
}
