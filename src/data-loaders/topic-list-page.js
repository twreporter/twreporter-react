import dataLoaderConst from '../constants/data-loaders'
import qs from 'qs'
import get from 'lodash/get'
import twreporterRedux from '@twreporter/redux'

const _ = {
  get
}

const firstPage = 1
const { reduxStateFields }  = twreporterRedux

export default function loadData({ store, location }) {
  const search = _.get(location, 'search', '')
  const query = qs.parse(search, { ignoreQueryPrefix: true })
  /* fetch page 1 if page is invalid */
  let page = parseInt(_.get(query, 'page', 1), 10)
  if (isNaN(page) || page < 0) {
    page = firstPage
  }
  return store.actions.fetchTopics(page, dataLoaderConst.numPerPage)
    .then(() => {
      /* fetch full topic if is at first page */
      if (page === firstPage) {
        const state = store.getState()
        const firstTopicSlug = _.get(state, [ reduxStateFields.topicList, 'items', firstPage, 0 ], '')
        if (firstTopicSlug) {
          return store.actions.fetchAFullTopic(firstTopicSlug)
        }
      }
    })
}
