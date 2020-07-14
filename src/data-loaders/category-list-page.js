import querystring from 'querystring'
import get from 'lodash/get'
import categoryConst from '../constants/category'
import dataLoaderConst from '../constants/data-loaders'

const _ = {
  get
}

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
  const defaultPage = 1
  const search = _.get(location, 'search', '')
  const searchWithoutPrefix = typeof search === 'string' ? search.replace(/^\?/, '') : search
  const pageStr = _.get(querystring.parse(searchWithoutPrefix), 'page', '1')
  let page = parseInt(pageStr, 10)

  if (isNaN(page) || page < defaultPage) {
    page = defaultPage
  }

  const pathSegment = _.get(match, 'params.category', '')
  const catId = categoryConst.ids[pathSegment]
  return store.actions.fetchPostsByCategoryListId(catId,
    dataLoaderConst.categoryListPage.nPerPage, page)
}
