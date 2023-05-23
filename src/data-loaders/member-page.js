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
    // TODO: add redux
  }
  return Promise.resolve()
}
