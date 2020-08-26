import get from 'lodash/get'
import loggerFactory from '../logger'

const _ = {
  get,
}

const logger = loggerFactory.getLogger()

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
  return store.actions.fetchAFullTopic(slug).then(successAction => {
    const topicId = _.get(successAction, 'payload.topic.id', '')
    if (topicId) {
      return store.actions
        .fetchRelatedPostsOfAnEntity(topicId)
        .catch(failAction => {
          logger.errorReport({
            report: _.get(failAction, 'payload.error'),
            message: `Error to fetch a topic's related posts, topic slug: '${slug}'. `,
          })
        })
    }
  })
}
