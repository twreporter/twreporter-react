import { connect } from 'react-redux'
import { List } from '@twreporter/react-components/lib/listing-page'
import Helmet from 'react-helmet'
import loggerFactory from '../logger'
import Pagination from '../components/Pagination'
import PropTypes from 'prop-types'
import querystring from 'querystring'
import React, { PureComponent } from 'react'
import SystemError from '../components/SystemError'
import dataLoaderConst from '../constants/data-loaders'
import siteMeta from '../constants/site-meta'
import twreporterRedux from '@twreporter/redux'

// utils
import cloneUtils from '../utils/clone-entity'

// lodash
import find from 'lodash/find'
import forEach from 'lodash/forEach'
import get from 'lodash/get'

const _  = {
  find,
  forEach,
  get,
}

const { actions, reduxStateFields, utils } = twreporterRedux
const { fetchPostsByTagListId } = actions

const logger = loggerFactory.getLogger()

class Tag extends PureComponent {
  componentDidMount() {
    this.fetchPostsWithCatch()
  }

  componentDidUpdate(prevProps) {
    if (this.props.tagId !== prevProps.tagId ||
      this.props.page !== prevProps.page
    ) {
      this.fetchPostsWithCatch()
    }
  }

  fetchPostsWithCatch() {
    const {
      nPerPage,
      tagId,
      fetchPostsByTagListId,
      page,
    } = this.props

    fetchPostsByTagListId(tagId, nPerPage, page)
      .catch((failAction) => {
        logger.errorReport({
          report: _.get(failAction, 'payload.error'),
          message: `Error to fetch posts (tag id: '${tagId}').`
        })
      })
  }

  _findTagName(post, tagId) {
    const tags = _.get(post, 'tags', [])
    const tag = _.find(tags, _tag => {
      return _.get(_tag, 'id') === tagId
    })
    return _.get(tag, 'name', '')
  }

  render() {
    const {
      error,
      isFetching,
      page,
      pathname,
      posts,
      tagId,
      totalPages,
    } = this.props

    // Error handling
    if (error) {
      return (
        <SystemError error={error} />
      )
    }

    const tagName = this._findTagName(_.get(posts, '0'), tagId)
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
          showSpinner={true}
        />
        <Pagination
          currentPage={page}
          totalPages={totalPages}
        />
      </div>
    )
  }
}

/**
 *  @typedef {import('@twreporter/redux/lib/typedef').ReduxState} ReduxState
 */

/**
 *  @typedef {import('../utils/clone-entity').MetaOfPost} MetaOfPost
 */

/**
 *  @param {Object} [location={}] - react-router location object
 *  @return {number} current page
 */
function pageProp(location={}) {
  const defaultPage = 1
  const search = _.get(location, 'search', '')
  const searchWithoutPrefix = typeof search === 'string' ? search.replace(/^\?/, '') : search
  const pageStr = _.get(querystring.parse(searchWithoutPrefix), 'page', '1')
  let page = parseInt(pageStr, 10)

  if (isNaN(page)) {
    page = defaultPage
  }

  return page
}

/**
 *  @param {ReduxState} state
 *  @param {string} listId - tag list id
 *  @param {number} nPerPage - number per page
 *  @return {number}
 */
function totalPagesProp(state, listId, nPerPage) {
  const total = _.get(state, [reduxStateFields.lists, listId, 'total'], 0)
  return Math.ceil(total / nPerPage)
}

/**
 *  @param {ReduxState} state
 *  @param {string} listId - tag list id
 *  @return {bool}
 */
function isFetchingProp(state, listId) {
  return _.get(state, [reduxStateFields.lists, listId, 'isFetching'])
}

/**
 *  @param {ReduxState} state
 *  @param {string} listId - tag list id
 *  @return {Object} error object
 */
function errorProp(state, listId) {
  return _.get(state, [reduxStateFields.lists, listId, 'error'])
}

/**
 *  @param {ReduxState} state
 *  @param {string} listId - tag list id
 *  @param {number} page - current page
 *  @return {MetaOfPost[]}
 */
function postsProp(state, listId, page) {
  const { entities, postsInEntities, lists } = reduxStateFields
  const postEntities = _.get(state, [entities, postsInEntities, 'byId'])
  const listObj = _.get(state, [ lists, listId ])
  const itemsRange = _.get(listObj, ['pages', page])
  const postIds = _.get(listObj, 'items', [])
  const postIdsForCurPage = Array.isArray(itemsRange) && Array.isArray(postIds) ?
    postIds.slice(itemsRange[0], itemsRange[1] + 1) : []
  const posts = []
  _.forEach(postIdsForCurPage, postId => {
    const post = _.get(postEntities, postId)
    if (post) {
      posts.push(cloneUtils.cloneMetaOfPost(post))
    }
  })
  return posts
}


/**
 *  @typedef {Object} TagProps
 *  @property {string} tagId - tag list id
 *  @property {Object} error - error object
 *  @property {bool} isFetching - if it is requesting api or not
 *  @property {number} page - current page for pagination
 *  @property {string} pathname - URL path
 *  @property {MetaOfPost[]} posts - array of posts
 *  @property {number} totalPages - total page for pagination
 */

/**
 *  @param {ReduxState} state
 *  @param {Object} props
 *  @param {Object} props.location - react-router location object
 *  @param {string} props.location.pathname
 *  @param {Object} props.match - react-router match object
 *  @param {Object} props.match.params
 *  @param {string} props.match.params.tagId
 *  @return {TagProps}
 */
function mapStateToProps(state, props) {
  const location = _.get(props, 'location')
  const tagId = _.get(props, 'match.params.tagId')
  const pathname = _.get(location, 'pathname', `/tag/${tagId}`)

  const page = pageProp(location)
  const nPerPage = dataLoaderConst.tagListPage.nPerPage

  return {
    tagId,
    error: errorProp(state, tagId),
    isFetching: isFetchingProp(state, tagId),
    page,
    pathname,
    posts: postsProp(state, tagId, page),
    totalPages: totalPagesProp(state, tagId, nPerPage),
  }
}

Tag.defaultProps = {
  error: null,
  isFetching: false,
  nPerPage: dataLoaderConst.tagListPage.nPerPage,
  posts: [],
  totalPages: 0,
}

Tag.propTypes = {
  error: PropTypes.object,
  fetchPostsByTagListId: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  nPerPage: PropTypes.number,
  page: PropTypes.number.isRequired,
  pathname: PropTypes.string.isRequired,

  //TODO: define metaOfPost
  // posts: PropTypes.arrayOf(propTypesConst.metaOfPost),
  posts: PropTypes.array,
  tagId: PropTypes.string.isRequired,
  totalPages: PropTypes.number,
}

export { Tag }
export default connect(mapStateToProps, { fetchPostsByTagListId })(Tag)
