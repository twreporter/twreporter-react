import get from 'lodash/get'
import loggerFactory from '../logger'

const _ = {
  get,
}

const logger = loggerFactory.getLogger()

/**
 *  loadData function is used for server side rendering.
 *  It depends on redux store to load data and dispatch loaded results.
 *  The loaded data is needed by `a/:slug` page.
 *
 *  @param {Object} props
 *  @param {Object} props.match - `match` object of `react-router`
 *  @param {Object} props.match.params - key/value pairs parsed from the URL corresponding to the dynamic segments of the path
 *  @param {string} props.match.params.slug - dynamic path segment
 *  @param {Object} props.store - redux store instance
 *  @returns {Promise} which resolves with loading successfully or rejects with error
 */
export default function loadData({ match, store }) {
  const slug = _.get(match, 'params.slug')
  return store.actions.fetchAFullPost(slug).then(successAction => {
    const postId = _.get(successAction, 'payload.post.id', '')
    if (postId) {
      return store.actions
        .fetchRelatedPostsOfAnEntity(postId)
        .catch(failAction => {
          logger.errorReport({
            report: _.get(failAction, 'payload.error'),
            message: `Error to fetch a post's related posts, post slug: '${slug}'. `,
          })
        })
    }
  })
}
