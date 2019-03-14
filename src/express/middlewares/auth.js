import get from 'lodash/get'
import uh from '@twreporter/universal-header'

const _ = {
  get
}

const developmentEnv = 'development'
const masterBranch = 'master'

const { actionTypes, actions } = uh
const authActions = actions.auth

/**
 *  Decode the payload of JWT from base64 string into JSON object
 *
 *  @param {string} jwt
 *  @return {Object} JSON object or null if decoding fails
 */
function decodePayload(jwt) {
  try {
    const payload = _.get(jwt.split('.'), 1)
    return JSON.parse(Buffer.from(payload, 'base64').toString('utf8'))
  } catch (err) {
    console.warn('extract payload from jwt error: ', err) // eslint-disable-line
    return null
  }
}

/**
 *  This middleware handles requests with Cookie: id_token=<id_token_value>.
 *  It updates the redux store with userInfo and access token.
 *  Moreover, it add Set-Cookie header onto the response.
 *
 *  @param {string} namespace - namespace is used in `req` object to avoid from overwriting the existed field
 *  @param {Object} options
 *  @param {string} options.releaseBranch - release branch, it could be 'master', 'test', 'staging' or 'release'
 *  @param {string} options.nodeEnv - node environment, it could be 'development' or 'production'
 */
function authMiddleware(namespace, options) {
  return function middleware(req, res, next) {
    const store = _.get(req, [ namespace, 'reduxStore' ])
    if (!store) {
      next(new Error(`req.${namespace}.reduxStore is not existed`))
      return
    }

    const subdomainsArr = _.get(req, 'subdomains', [])

    const idToken = _.get(req, 'cookies.id_token')

    // user is authenticated
    if (idToken) {
      const userInfo = decodePayload(idToken)
      const accessTokenKeyName = subdomainsArr.join('_') + '_access_token'
      const accessToken = _.get(req, [ 'signedCookies', accessTokenKeyName ])

      // and authorized
      if (accessToken) {
        // check accessToken and idToken payload.
        // If those tokens refer to the same person,
        // skip requesting api to get accessToken.
        const userInfoInAccessToken = decodePayload(accessToken)
        if (_.get(userInfoInAccessToken, 'user_id') === _.get(userInfo, 'user_id')) {
          store.dispatch({
            type: actionTypes.AUTH_SUCCESS,
            payload: {
              data: {
                jwt: accessToken
              }
            }
          })
          next()
          return
        }
      }

      const { nodeEnv=developmentEnv, releaseBranch=masterBranch } = options
      const cookieList = req.get('cookie')
      // try to get authorization token
      return store.dispatch(authActions.getAccessToken(cookieList, releaseBranch))
        .then(() => {
          const reduxState = store.getState()
          const jwt = _.get(reduxState, 'auth.accessToken', '')
          const isAuthed = _.get(reduxState, 'auth.isAuthed', false)
          if (jwt && isAuthed) {
            // add `Set-Cookie` response header
            res.cookie(accessTokenKeyName, jwt, {
              maxAge: 60 * 60 * 24 * 14 * 1000, // 2 weeks
              httpOnly: nodeEnv !== developmentEnv,
              secure: nodeEnv !== developmentEnv,
              domain: _.get(req, 'hostname', subdomainsArr.join('.') + '.twreporter.org'),
              signed: true
            })
          }
        })
        .catch(err => console.warn(err)) // eslint-disable-line
        .then(() => {
          next()
        })
    }
    next()
  }
}


export default authMiddleware
