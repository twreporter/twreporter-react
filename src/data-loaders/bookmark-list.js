import loggerFactory from '../logger'
import twreporterRedux from '@twreporter/redux'
// lodash
import get from 'lodash/get'

const logger = loggerFactory.getLogger()

const _ = {
  get
}

const { getMultipleBookmarks } = twreporterRedux.actions
const reduxStatePropKey = twreporterRedux.reduxStateFields

const defaultLimit = 5
const defaultSort = 'created_at'

/**
 *  loadData function is used for server side rendering.
 *  It depends on redux store to load data and dispatch loaded results.
 *
 *  @param {Object} store - redux store instance
 *  @returns {Promise} which resolves when loading finishes
 */
export default function loadData({ store }) {
  const state = store.getState()
  const isAuthed = _.get(state, [ reduxStatePropKey.auth, 'isAuthed' ])
  if (isAuthed) {
    const jwt = _.get(state, [ reduxStatePropKey.auth, 'accessToken' ])
    const userID = _.get(state, [ reduxStatePropKey.auth, 'userInfo', 'user_id' ])
    return store.dispatch(getMultipleBookmarks(jwt, userID, 0, defaultLimit, defaultSort))
      .catch(err => {
        logger.errorReport({
          report: err,
          message: 'Bookmark list data loader can not load data.'
        })
      })
  }
  return Promise.resolve()
}
