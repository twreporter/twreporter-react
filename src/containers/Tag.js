import { connect } from 'react-redux'
import { List } from '@twreporter/react-components/lib/listing-page'
import Helmet from 'react-helmet'
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
const tags = 'tags'

class Tag extends PureComponent {
  componentDidMount() {
    this._fetchListedPosts()
  }

  componentDidUpdate() {
    this._fetchListedPosts()
  }

  _fetchListedPosts() {
    const { fetchListedPosts, tagId } = this.props
    const page = _.get(this.props, 'page', 1)
    fetchListedPosts(tagId, tags, MAXRESULT, page)
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
    const startPos = _.get(pages, [ page, 0 ], 0)
    const endPos = _.get(pages, [ page, 1 ], 0)
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
    const posts = utils.denormalizePosts(_.get(lists, [ tagId, 'items' ], []).slice(startPos, endPos + 1), postEntities)
    const postsLen = _.get(posts, 'length', 0)
    const isFetching = postsLen === 0

    // Error handling
    if (error !== null && postsLen === 0) {
      return (
        <SystemError error={error} />
      )
    }
    const tagName = this._findTagName(_.get(posts, [ 0, 'tags' ]), tagId)
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
            { name: 'twitter:image', content: siteMeta.ogImage },
            { property: 'og:title', content: title },
            { property: 'og:description', content: siteMeta.desc },
            { property: 'og:image', content: siteMeta.ogImage },
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
