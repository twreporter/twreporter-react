import twreporterRedux from '@twreporter/redux'

const { searchAuthorsIfNeeded } = twreporterRedux.actions

/**
 *  loadData function is used for server side rendering.
 *  It depends on redux store to load data and dispatch loaded results.
 *  The loaded data is needed by `authors` page.
 *
 *  @param {Object} store - redux store instance
 *  @returns {Promise} which resolves when loading is done
 */
export default function loadData({ store }) {
  return store.dispatch(searchAuthorsIfNeeded(''))
}
