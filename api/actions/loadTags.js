import superAgent from 'superagent'
import config from '../config'

export default function loadTags(req) {
  return new Promise((resolve, reject) => {
    const query = req.query
    const { API_PROTOCOL, API_PORT, API_HOST } = config
    const url = `${API_PROTOCOL}://${API_HOST}:${API_PORT}/tags`

    superAgent['get'](url)
    .timeout(500)
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
