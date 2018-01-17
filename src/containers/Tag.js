import Helmet from 'react-helmet'
import Pagination from '../components/Pagination'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import SystemError from '../components/SystemError'
import get from 'lodash/get'
import twreporterRedux from '@twreporter/redux'
import withLayout from '../helpers/with-layout'
import { SITE_META, SITE_NAME } from '../constants/index'
import { List } from '@twreporter/react-components/lib/listing-page'
import { connect } from 'react-redux'

const _  = {
  get
}

const { actions, reduxStateFields, utils } = twreporterRedux
const { fetchListedPosts } = actions

const MAXRESULT = 10
const tags = 'tags'

class Tag extends PureComponent {
  // params are passed from Route component of react-router
  static fetchData({ params, store, query }) {
    /* fetch page 1 if page is invalid */
    let page = parseInt(_.get(query, 'page', 1), 10)
    if (isNaN(page) || page < 0) {
      page = 1
    }
    return store.dispatch(fetchListedPosts(params.tagId, tags, MAXRESULT, page))
  }

  componentWillMount() {
    const { fetchListedPosts, tagId } = this.props
    const page = _.get(this.props, 'page', 1)

    fetchListedPosts(tagId, tags, MAXRESULT, page)
  }

  componentWillReceiveProps(nextProps) {
    const { fetchListedPosts, tagId } = nextProps
    const page = _.get(nextProps, 'page', 1)

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
    let isFetching = false

    const { lists, entities, page, pathname, tagId } = this.props
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

    // page is provided, but not fecth yet
    if (startPos === 0 && endPos === 0) {
      isFetching = true
    }

    // denormalize the items of current page
    const posts = utils.denormalizePosts(_.get(lists, [ tagId, 'items' ], []).slice(startPos, endPos + 1), postEntities)

    const totalPages = Math.ceil(total / MAXRESULT)
    const postsLen = _.get(posts, 'length', 0)

    // Error handling
    if (error !== null && postsLen === 0) {
      return (
        <SystemError error={error} />
      )
    } else if (postsLen === 0) {
      isFetching = true
    }

    const tagName = this._findTagName(_.get(posts, [ 0, 'tags' ]), tagId)
    const canonical = `${SITE_META.URL}tag/${tagId}`
    const title = tagName + SITE_NAME.SEPARATOR + SITE_NAME.FULL

    return (
      <div>
        <Helmet
          title={title}
          link={[
            { rel: 'canonical', href: canonical }
          ]}
          meta={[
            { name: 'description', content: SITE_META.DESC },
            { name: 'twitter:title', content: title },
            { name: 'twitter:description', content: SITE_META.DESC },
            { name: 'twitter:image', content: SITE_META.OG_IMAGE },
            { property: 'og:title', content: title },
            { property: 'og:description', content: SITE_META.DESC },
            { property: 'og:image', content: SITE_META.OG_IMAGE },
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
          pathname={pathname}
        />
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  const location = _.get(props, 'location')
  const params = _.get(props, 'params')
  const page = parseInt(_.get(location, 'query.page', 1), 10)
  const tagId = _.get(params, 'tagId', '')
  const pathname = _.get(location, 'pathname', `/tag/${tagId}`)
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
  lists: PropTypes.object,
  entities: PropTypes.object,
  tagId: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  pathname: PropTypes.string.isRequired
}

export { Tag }
export default connect(mapStateToProps, { fetchListedPosts: actions.fetchListedPosts })(withLayout(Tag))
