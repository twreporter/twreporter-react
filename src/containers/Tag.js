import { connect } from 'react-redux'
import { List } from '@twreporter/react-components/lib/listing-page'
import Helmet from 'react-helmet'
import loggerFactory from '../logger'
import Pagination from '../components/Pagination'
import PropTypes from 'prop-types'
import qs from 'qs'
import React, { PureComponent } from 'react'
import SystemError from '../components/SystemError'
import siteMeta from '../constants/site-meta'
import twreporterRedux from '@twreporter/redux'
// lodash
import get from 'lodash/get'
import isInteger from 'lodash/isInteger'

const _  = {
  get,
  isInteger
}

const { actions, reduxStateFields, utils } = twreporterRedux
const { fetchListedPosts } = actions

const MAXRESULT = 10
const logger = loggerFactory.getLogger()

class Tag extends PureComponent {
  componentDidMount() {
    const tagId = _.get(this.props, 'tagId')
    const page = _.get(this.props, 'page', 1)
    this.fetchPostsWithCatch(tagId, page)
  }

  componentDidUpdate() {
    const tagId = _.get(this.props, 'tagId')
    const page = _.get(this.props, 'page', 1)
    this.fetchPostsWithCatch(tagId, page)
  }

  fetchPostsWithCatch = (tagId, page) => {
    const { fetchListedPosts } = this.props
    return fetchListedPosts(tagId, 'tags', MAXRESULT, page)
      .catch((failAction) => {
        // TODO render alert message
        logger.errorReport({
          report: _.get(failAction, 'payload.error'),
          message: `Error to fetch posts (tag id: ${tagId}).`
        })
      })
  }

  _findTagName(tags, tagId) {
    if (!Array.isArray(tags)) {
      return ''
    }
    const tag = tags.find((_tag) => {
      if (_.get(_tag, 'id') === tagId) {
        return true
      }
      return false
    })
    return _.get(tag, 'name', '')
  }

  render() {
    const {
      entities,
      lists,
      page,
      tagId
    } = this.props

    const postEntities = _.get(entities, reduxStateFields.postsInEntities, {})
    const error = _.get(lists, [ tagId, 'error' ], null)

    // total items will be in that tagId
    const total = _.get(lists, [ tagId, 'total' ], 0)

    // pages will be like
    // {
    //   1: [0, 9],
    //   3: [10, 19],
    // }
    //
    // which means the items of page 1 are in items[0] to items[9],
    // the items of page 3 are in items[10] to item [19]
    const pages = _.get(lists, [ tagId, 'pages' ], {})
    const totalPages = Math.ceil(total / MAXRESULT)
    if (
      !_.isInteger(page) ||
      totalPages && (page > totalPages) ||
      page < 1
    ) {
      return (
        <SystemError error={{ statusCode: 404 }} />
      )
    }
    // denormalize the items of current page
    const itemRangeIndices = _.get(pages, `${page}`)
    const posts = itemRangeIndices ? utils.denormalizePosts(_.get(lists, [ tagId, 'items' ], []).slice(itemRangeIndices[0], itemRangeIndices[1] + 1), postEntities) : []
    const postsLen = _.get(posts, 'length', 0)
    const isFetching = postsLen === 0

    // Error handling
    if (error !== null && postsLen === 0) {
      return (
        <SystemError error={error} />
      )
    }

    let postForGettingTagName = {}
    if (posts.length > 0) {
      postForGettingTagName = posts[0]
    } else {
      const samplePostId = _.get(lists, [ tagId, 'items' , 0 ], '')
      if (samplePostId) {
        postForGettingTagName = utils.denormalizePosts([ samplePostId ], postEntities)[0]
      }
    }
    const tagName = this._findTagName(_.get(postForGettingTagName, 'tags'), tagId)
    const canonical = `${siteMeta.urlOrigin}/tag/${tagId}`
    const title = tagName + siteMeta.name.separator + siteMeta.name.full

    return (
      <div>
        <Helmet
          title={title}
          link={[
            { rel: 'canonical', href: canonical }
          ]}
          meta={[
            { name: 'description', content: siteMeta.desc },
            { name: 'twitter:title', content: title },
            { name: 'twitter:description', content: siteMeta.desc },
            { name: 'twitter:image', content: siteMeta.ogImage.url },
            { property: 'og:title', content: title },
            { property: 'og:description', content: siteMeta.desc },
            { property: 'og:image', content: siteMeta.ogImage.url },
            { property: 'og:image:width', content: siteMeta.ogImage.width },
            { property: 'og:image:height', content: siteMeta.ogImage.height },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: canonical }
          ]}
        />
        <List
          data={posts}
          tagName={tagName}
          isFetching={isFetching}
        />
        <Pagination
          currentPage={page}
          totalPages={totalPages}
        />
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  const tagId = _.get(props, 'match.params.tagId', '')
  const search = _.get(props, 'location.search')
  const query = qs.parse(search, { ignoreQueryPrefix: true })
  const page = parseInt(_.get(query, 'page', 1), 10)
  const pathname = _.get(props, 'location.pathname', `/tag/${tagId}`)
  return {
    lists: state[reduxStateFields.lists],
    entities: state[reduxStateFields.entities],
    page,
    pathname,
    tagId
  }
}

Tag.defaultProps = {
  lists: {},
  entities: {}
}

Tag.propTypes = {
  entities: PropTypes.object,
  lists: PropTypes.object,
  page: PropTypes.number.isRequired,
  pathname: PropTypes.string.isRequired,
  tagId: PropTypes.string.isRequired
}

export { Tag }
export default connect(mapStateToProps, { fetchListedPosts })(Tag)
