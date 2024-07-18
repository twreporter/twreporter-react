import twreporterRedux from '@twreporter/redux'
// lodash
import get from 'lodash/get'

const _ = {
  get,
}

const reduxStatePropKey = twreporterRedux.reduxStateFields

/**
 *  loadData function is used for server side rendering.
 *  It depends on redux store to load data and dispatch loaded results.
 *
 *  @param {Object} store - redux store instance
 *  @returns {Promise} which resolves when loading finishes
 */
export default function loadData({ store }) {
  const state = store.getState()
  const isAuthed = _.get(state, [reduxStatePropKey.auth, 'isAuthed'])
  if (isAuthed) {
    const jwt = _.get(state, [reduxStatePropKey.auth, 'accessToken'])
    const userID = _.get(state, [reduxStatePropKey.auth, 'userInfo', 'user_id'])
    return store.actions.getUserData(jwt, userID)
  }
  return Promise.resolve()
}
