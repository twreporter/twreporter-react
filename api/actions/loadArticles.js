import superAgent from 'superagent'
import config from '../constants'

export default function loadArticles(req) {
  return new Promise((resolve, reject) => {
    const query = req.query
    const url = config.API + '/article'
    superAgent['get'](url).timeout(500)
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
