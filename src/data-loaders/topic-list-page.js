import dataLoaderConst from '../constants/data-loaders'
import querystring from 'querystring'
import get from 'lodash/get'

const _ = {
  get
}

const firstPage = 1

export default function loadData({ store, location }) {
  const search = _.get(location, 'search', '')
  const query = querystring.parse(search)
  const searchWithoutPrefix = typeof search === 'string' ? search.replace(/^\?/, '') : search
  const pageStr = _.get(querystring.parse(searchWithoutPrefix), 'page', '1')
  let page = parseInt(pageStr, 10)

  if (isNaN(page) || page < firstPage) {
    page = firstPage
  }

  return store.actions.fetchTopics(page, dataLoaderConst.topicListPage.nPerPage)
    .then(() => {
      if (page === firstPage) {
        return store.actions.fetchFeatureTopic()
      }
    })
}
