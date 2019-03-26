import get from 'lodash/get'
import twreporterRedux from '@twreporter/redux'

const _ = {
  get
}

const {
  actions,
  reduxStateFields
} = twreporterRedux

const {
  fetchAFullTopic
} = actions

/**
 *  loadData function is used for server side rendering.
 *  It depends on redux store to load data and dispatch loaded results.
 *  The loaded data is needed by `topics/:slug` page.
 *
 *  @param {Object} match - `match` object of `react-router`
 *  @param {Object} match.params - key/value pairs parsed from the URL corresponding to the dynamic segments of the path
 *  @param {string} match.params.slug - dynamic path segment
 *  @param {Object} store - redux store instance
 *  @returns {Promise} which resolves with loading successfully or rejects with error
 */
export default function loadData({ match, store }) {
  const slug = _.get(match, 'params.slug', '')
  return store.dispatch(fetchAFullTopic(slug))
    .then(() => {
      const state = store.getState()
      const selectedTopic = _.get(state, reduxStateFields.selectedTopic, {})
      if (_.get(selectedTopic, 'error')) {
        return Promise.reject(_.get(selectedTopic, 'error'))
      }
    })
}
