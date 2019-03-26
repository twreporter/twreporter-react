import qs from 'qs'
import get from 'lodash/get'
import categoryConst from '../constants/category'
import dataLoaderConst from '../constants/data-loaders'
import twreporterRedux from '@twreporter/redux'

const _ = {
  get
}

const {
  actions
} = twreporterRedux

const {
  fetchListedPosts
} = actions

/**
 *  loadData function is used for server side rendering.
 *  It depends on redux store to load data and dispatch loaded results.
 *  The loaded data is needed by `categories/:category` page.
 *
 *  @param {Object} location - `location` object of `reqct-router`
 *  @param {string} location.search - the URL query string
 *  @param {Object} match - `match` object of `react-router`
 *  @param {Object} match.params -  key/value pairs parsed from the URL corresponding to the dynamic segments of the path
 *  @param {string} match.params.category - dynamic path segment
 *  @param {Object} store - redux store instance
 *  @returns {Promise} which resolves when loading finishes
 */
export default function loadData({ location, match, store }) {
  const search = _.get(location, 'search', '')
  const query = qs.parse(search, { ignoreQueryPrefix: true })
  /* fetch page 1 if query is invalid */
  let page = parseInt(_.get(query, 'page', 1), 10)
  if (isNaN(page) || page < 0) {
    page = 1
  }

  const pathSegment = _.get(match, 'params.category', '')
  const catId = categoryConst.ids[pathSegment]
  return store.dispatch(fetchListedPosts(catId, dataLoaderConst.listType.categories,
    dataLoaderConst.maxResult, page))
}
