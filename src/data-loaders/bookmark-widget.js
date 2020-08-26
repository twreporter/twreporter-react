import loggerFactory from '../logger'
import statusCodeConst from '../constants/status-code'
import twreporterRedux from '@twreporter/redux'
// lodash
import get from 'lodash/get'

const logger = loggerFactory.getLogger()

const _ = {
  get,
}

const reduxStatePropKey = twreporterRedux.reduxStateFields

const host = {
  master: 'http://testtest.twreporter.org:3000',
  preview: 'http://testtest.twreporter.org:3000',
  staging: 'https://staging.twreporter.org',
  release: 'https://www.twreporter.org',
  // `next` release branch is reserved for online migration purpose
  next: 'https://next.twreporter.org',
}[process.env.RELEASE_BRANCH || 'master']

/**
 *  loadData function is used for server side rendering.
 *  It depends on redux store to load data and dispatch loaded results.
 *  The loaded data is needed by `a/:slug` page.
 *
 *  @param {Object} match - `match` object of `react-router`
 *  @param {Object} match.params - key/value pairs parsed from the URL corresponding to the dynamic segments of the path
 *  @param {string} match.params.slug - dynamic path segment
 *  @param {Object} store - redux store instance
 *  @returns {Promise} which resolves when loading finishes
 */
export default function loadData({ match, store }) {
  const state = store.getState()
  const slug = _.get(match, 'params.slug')
  const isAuthed = _.get(state, [reduxStatePropKey.auth, 'isAuthed'])
  if (isAuthed) {
    const jwt = _.get(state, [reduxStatePropKey.auth, 'accessToken'])
    const userID = _.get(state, [reduxStatePropKey.auth, 'userInfo', 'user_id'])
    return store.actions
      .getSingleBookmark(jwt, userID, slug, host)
      .catch(failAction => {
        const err = _.get(failAction, 'payload.error')
        if (_.get(err, 'statusCode') !== statusCodeConst.notFound) {
          logger.errorReport({
            report: err,
            message: 'Bookmark widget data loader can not load data.',
          })
        }
      })
  }
  return Promise.resolve()
}
