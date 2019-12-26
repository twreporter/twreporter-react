import { getSignInHref } from '@twreporter/core/lib/utils/sign-in-href'
import { matchPath } from 'react-router-dom'
import get from 'lodash/get'
import getRoutes from '../../routes'
import twreporterRedux from '@twreporter/redux'
import loggerFactory from '../../logger'

const _ = {
  get
}

const developmentEnv = 'development'
const masterBranch = 'master'

const { actions, actionTypes } = twreporterRedux
const { getAccessToken } = actions

const logger = loggerFactory.getLogger()

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
    logger.warn('Fail to extract payload from jwt, ', err)
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
      return next(new Error(`req.${namespace}.reduxStore is not existed`))
    }

    /*
      Host: "tobi.ferrets.example.com"
        => req.subdomains = ["ferrets", "tobi"]
      Ref: https://expressjs.com/en/api.html#req.subdomains
     */
    const subdomainsArr = _.get(req, 'subdomains', [])

    const routes = getRoutes()
    const authorizationRequired = routes.some(route => matchPath(req.path, route) && route.authorizationRequired)// Use `Array.prototype.some` to imitate `<Switch>` behavior of selecting only the first to match
    const currentHref = `${req.protocol}://${req.get('host')}${req.originalUrl}` // Ref: https://stackoverflow.com/questions/10183291/how-to-get-the-full-url-in-express
    const signInHref = getSignInHref(currentHref)
    // Check if the user is authenticated.
    // If the user is authenticated, handle user authorization:
    const idToken = _.get(req, 'cookies.id_token')
    if (idToken) {
      const userInfoInIdToken = decodePayload(idToken)
      const accessTokenKeyName = subdomainsArr.join('_') + '_access_token'
      const accessToken = _.get(req, [ 'signedCookies', accessTokenKeyName ])
      // Check If the user is also authorized.
      // If the user is authenticated and authorized, dispatch AUTH_SUCCESS action directly:
      if (accessToken) {
        const userInfoInAccessToken = decodePayload(accessToken)
        // Make sure both tokens refer to the same person
        if (_.get(userInfoInAccessToken, 'user_id') === _.get(userInfoInIdToken, 'user_id')) {
          store.dispatch({
            type: actionTypes.AUTH_SUCCESS,
            payload: {
              data: {
                jwt: accessToken
              }
            }
          })
          return next()
        }
      }
      // If the user is authenticated but not authorized, try to get access token:
      const { nodeEnv=developmentEnv, releaseBranch=masterBranch } = options
      const cookieList = req.get('cookie')
      return store.dispatch(getAccessToken(cookieList, releaseBranch))
        .then(() => {
          const reduxState = store.getState()
          const jwt = _.get(reduxState, 'auth.accessToken', '')
          const isAuthed = _.get(reduxState, 'auth.isAuthed', false)
          if (jwt && isAuthed) {
            // Add `Set-Cookie` to response header
            res.cookie(accessTokenKeyName, jwt, {
              maxAge: 60 * 60 * 24 * 14 * 1000, // 2 weeks
              httpOnly: nodeEnv !== developmentEnv,
              secure: nodeEnv !== developmentEnv,
              domain: _.get(req, 'hostname', subdomainsArr.join('.') + '.twreporter.org'),
              signed: true
            })
            next()
          } else {
            // The user should always get access token (authorized successfully) if she/he is authenticated.
            // If the user is authenticated but failed to get access token, log out the error and skip authorization if authorization is not requred.
            // If the page requires authorization, throw an error to express.
            const errorMessage = `The user ${_.get(userInfoInIdToken, 'user_id')} has id token but failed to get access token.`
            if (authorizationRequired) {
              next(new Error(errorMessage))
            } else {
              logger.warn(errorMessage)
              next()
            }
          }
        })
        .catch(err => {
          // The action `getAccessToken()` should return a Promise always resolved.
          // If an unexpected error occoured, log out the error and skip authorization if authorization is not requred.
          // If the page requires authorization, throw an error to express.
          const errorMessage = 'An unexpected error occoured when the server try to get access token. Skip authorization.'
          if (authorizationRequired) {
            next(err)
          } else {
            logger.warn(errorMessage)
            logger.warn(err)
            next()
          }
        })
    }
    // If the user is not authenticated, redirect to sign-in page if the requested page requires authorization:
    if (authorizationRequired) {
      res.redirect(302, signInHref)
    } else {
      next()
    }
  }
}


export default authMiddleware
