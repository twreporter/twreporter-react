import reduxStatePropKey from '../constants/redux-state-prop-key'
import twreporterRedux from '@twreporter/redux'
// lodash
import get from 'lodash/get'

const _ = {
  get
}

const { getMultipleBookmarks } = twreporterRedux.actions

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
      .catch(error => {
        console.error(error) // eslint-disable-line no-console
      })
  }
  return Promise.resolve()
}
