import categoryConst from '../constants/category'
import dataLoaderConst from '../constants/data-loaders'
import twreporterRedux from '@twreporter/redux'

const listID = categoryConst.ids.photography

const {
  fetchListedPosts,
  fetchPhotographyPostsOnIndexPage
} =  twreporterRedux.actions


/**
 *  loadData function is used for server side rendering.
 *  It depends on redux store to load data and dispatch loaded results.
 *  The loaded data is needed by `photography` page.
 *
 *  @param {Object} store - redux store instance
 *  @returns {Promise} which resolves with loading successfully or rejects with error
 */
export default async function loadData({ store }) {
  try {
    await Promise.all([
      store.dispatch(fetchPhotographyPostsOnIndexPage()),
      store.dispatch(fetchListedPosts(listID,
        dataLoaderConst.listType.categories, dataLoaderConst.maxResult))
    ])
  } catch (err) {
    console.warn('Fetch posts of photography page occurs server side error:', err) // eslint-disable-line
  }
}
