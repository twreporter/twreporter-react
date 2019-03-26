import get from 'lodash/get'
import twreporterRedux from '@twreporter/redux'

const _ = {
  get
}
const { actions, reduxStateFields } = twreporterRedux

const {
  fetchIndexPageContent
} =  actions

/**
 *  loadData function is used for server side rendering.
 *  It depends on redux store to load data and dispatch loaded results.
 *  The loaded data is needed by `/` page.
 *
 *  @param {Object} store - redux store instance
 *  @returns {Promise} which resolves with loading successfully or rejects with error
 */
export default async function loadData({ store }) {
  await fetchIndexPageContent()(store.dispatch, store.getState)
  const error = _.get(store.getState(), [ reduxStateFields.indexPage, 'error' ])
  if (error !== null) {
    return Promise.reject(error)
  }
  return Promise.resolve()
}
