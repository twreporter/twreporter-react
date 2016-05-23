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
        const queryObj = JSON.parse(_.get(query, 'embedded'))
        let aricleRes = res.body
        let writers =  _.get(aricleRes, 'writters')

        // combine author images data if the query contains 'authorImages'
        if(_.get(queryObj, 'authorImages')) {
          const imgIds = _.uniq(_.map(writers, (writers)=>{ return '"' + writers.image + '"' }))
          const imgQuery = encodeURI(`where={"_id":{"$in":[${imgIds}]}}`)
          const imgUrl = `${API_PROTOCOL}://${API_HOST}:${API_PORT}/images?${imgQuery}`

          superAgent['get'](imgUrl).timeout(500)
          .end(function (err, res) {
            if (err) {
              reject(err)
            } else {
              const imgItems = _.get(res.body, '_items')
              writers.forEach((writer) => {
                let match = _.filter(imgItems, '_id', writer.image)
                const wImg = _.get(match, [ 0, 'image' ])
                writer.image = wImg
              })
              resolve(aricleRes)
            }
          })
        } else {
          resolve(aricleRes)
        }
      }
    })
  })
}
