import reduxStatePropKey from '../constants/redux-state-prop-key'
import twreporterRedux from '@twreporter/redux'
// lodash
import get from 'lodash/get'

const _ = {
  get
}

const { getSingleBookmark } = twreporterRedux.actions

const host = {
  master: 'http://testtest.twreporter.org:3000',
  preview: 'http://testtest.twreporter.org:3000',
  staging: 'https://staging.twreporter.org',
  release: 'https://www.twreporter.org'
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
  const isAuthed = _.get(state, [ reduxStatePropKey.auth, 'isAuthed' ])
  if (isAuthed) {
    const jwt = _.get(state, [ reduxStatePropKey.auth, 'accessToken' ])
    const userID = _.get(state, [ reduxStatePropKey.auth, 'userInfo', 'user_id' ])
    return store.dispatch(getSingleBookmark(jwt, userID, slug, host))
      .catch(error => {
        console.error(error) // eslint-disable-line no-console
      })
  }
  return Promise.resolve()
}
