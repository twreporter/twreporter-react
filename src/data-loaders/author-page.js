import twreporterRedux from '@twreporter/redux'
// lodash
import get from 'lodash/get'

const _ = {
  get
}

const { fetchAuthorCollectionIfNeeded, fetchAuthorDetails } = twreporterRedux.actions

/**
 *  loadData function is used for server side rendering.
 *  It depends on redux store to load data and dispatch loaded results.
 *  The loaded data is needed by `author/:authorId` page.
 *
 *  @param {Object} match - `match` object of `react-router`
 *  @param {Object} match.params - key/value pairs parsed from the URL corresponding to the dynamic segments of the path
 *  @param {string} match.params.authorId - dynamic path segment
 *  @param {Object} store - redux store instance
 *  @returns {Promise} which resolves when loading finishes
 */
export default function loadData({ match, store }) {
  const authorId = _.get(match, 'params.authorId', '')
  return Promise.all([ store.dispatch(fetchAuthorCollectionIfNeeded(authorId)), store.dispatch(fetchAuthorDetails(authorId)) ])
    .catch(error => {
      console.error(error) // eslint-disable-line no-console
    })
}
