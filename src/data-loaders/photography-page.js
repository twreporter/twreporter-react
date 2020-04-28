import categoryConst from '../constants/category'
import dataLoaderConst from '../constants/data-loaders'

const listID = categoryConst.ids.photography

/**
 *  loadData function is used for server side rendering.
 *  It depends on redux store to load data and dispatch loaded results.
 *  The loaded data is needed by `photography` page.
 *
 *  @param {Object} store - redux store instance
 *  @returns {Promise} which resolves with loading successfully or rejects with error
 */
export default function loadData({ store }) {
  return Promise.all([
    store.actions.fetchPhotographyPostsOnIndexPage(),
    store.actions.fetchListedPosts(listID,
      dataLoaderConst.listType.categories, dataLoaderConst.maxResult)
  ])
}
