import { connect } from 'react-redux'
import { List } from '@twreporter/react-components/lib/listing-page'
import categoryConst from '../constants/category'
import dataLoaderConst from '../constants/data-loaders'
import Helmet from 'react-helmet'
import loggerFactory from '../logger'
import Pagination from '../components/Pagination'
import PropTypes from 'prop-types'
import querystring from 'querystring'
import React, { PureComponent } from 'react'
import SystemError from '../components/SystemError'
import siteMeta from '../constants/site-meta'
import twreporterRedux from '@twreporter/redux'

// utils
import cloneUtils from '../utils/clone-entity'

// lodash
import forEach from 'lodash/forEach'
import get from 'lodash/get'

const _ = {
  forEach,
  get,
}

const { actions, reduxStateFields, utils } = twreporterRedux
const { fetchPostsByCategoryListId } = actions
const logger = loggerFactory.getLogger()

class Category extends PureComponent {
  componentDidMount() {
    this.fetchPostsWithCatch()
  }

  componentDidUpdate(prevProps) {
    if (this.props.catId !== prevProps.catId ||
      this.props.page !== prevProps.page
    ) {
      this.fetchPostsWithCatch()
    }
  }

  fetchPostsWithCatch() {
    const {
      catId,
      fetchPostsByCategoryListId,
      nPerPage,
      page,
    } = this.props

    fetchPostsByCategoryListId(catId, nPerPage, page)
      .catch((failAction) => {
        logger.errorReport({
          report: _.get(failAction, 'payload.error'),
          message: `Error to fetch posts (category id: '${catId}', page: ${page}, nPerPage: ${nPerPage}).`
        })
      })
  }

  render() {
    const {
      catLabel,
      error,
      isFetching,
      page,
      pathname,
      posts,
      totalPages,
    } = this.props

    // Error handling
    if (error) {
      return (
        <SystemError error={error} />
      )
    }

    const title = catLabel + siteMeta.name.separator + siteMeta.name.full
    const canonical = `${siteMeta.urlOrigin}${pathname}`

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
          catName={catLabel}
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
 *  @typedef {import('../utils/clone-entity').ClonedPost} ClonedPost
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
 *  @param {string} listId - category list id
 *  @return {number}
 */
function totalPagesProp(state, listId, nPerPage) {
  const total = _.get(state, [reduxStateFields.lists, listId, 'total'], 0)
  return Math.ceil(total / nPerPage)
}

/**
 *  @param {ReduxState} state
 *  @param {string} listId - category list id
 *  @return {bool}
 */
function isFetchingProp(state, listId) {
  return _.get(state, [reduxStateFields.lists, listId, 'isFetching'])
}

/**
 *  @param {ReduxState} state
 *  @param {string} listId - category list id
 *  @return {Object} error object
 */
function errorProp(state, listId) {
  return _.get(state, [reduxStateFields.lists, listId, 'error'])
}

/**
 *  @param {ReduxState} state
 *  @param {string} listId - category list id
 *  @param {number} page - current page
 *  @return {ClonedPost[]}
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
 *  @typedef {Object} CategoryProps
 *  @property {string} catId - category list id
 *  @property {string} catLabel - category label
 *  @property {Object} error - error object
 *  @property {bool} isFetching - if it is requesting api or not
 *  @property {number} page - current page for pagination
 *  @property {string} pathname - URL path
 *  @property {ClonedPost[]} posts - array of posts
 *  @property {number} totalPages - total page for pagination
 */

/**
 *  @param {ReduxState} state
 *  @param {Object} props
 *  @param {Object} props.location - react-router location object
 *  @param {string} props.location.pathname
 *  @param {Object} props.match - react-router match object
 *  @param {Object} props.match.params
 *  @param {string} props.match.params.category
 *  @return {CategoryProps}
 */
function mapStateToProps(state, props) {
  const location = _.get(props, 'location')
  const pathSegment = _.get(props, 'match.params.category')
  const catId = categoryConst.ids[pathSegment]
  const catLabel = categoryConst.labels[pathSegment]
  const pathname = _.get(location, 'pathname', `/categories/${pathSegment}`)

  const page = pageProp(location)
  const nPerPage = dataLoaderConst.categoryListPage.nPerPage

  return {
    catId,
    catLabel,
    error: errorProp(state, catId),
    isFetching: isFetchingProp(state, catId),
    nPerPage,
    page,
    pathname,
    posts: postsProp(state, catId, page),
    totalPages: totalPagesProp(state, catId, nPerPage),
  }
}

Category.defaultProps = {
  catId: '',
  catLabel: '',
  error: null,
  isFetching: false,
  posts: [],
  totalPages: 0,
  nPerPage: dataLoaderConst.categoryListPage.nPerPage,
}

Category.propTypes = {
  catId: PropTypes.string,
  catLabel: PropTypes.string,
  error: PropTypes.object,
  fetchPostsByCategoryListId: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  nPerPage: PropTypes.number,
  page: PropTypes.number.isRequired,
  pathname: PropTypes.string.isRequired,

  //TODO: define metaOfPost
  // posts: PropTypes.arrayOf(propTypesConst.metaOfPost),
  posts: PropTypes.array,
  totalPages: PropTypes.number,
}

export { Category }
export default connect(mapStateToProps, { fetchPostsByCategoryListId })(Category)

