/* eslint no-unused-vars: [0, { "args": "all" }] */

import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import loggerFactory from '../logger'
import { camelizeKeys } from 'humps'
import { connect } from 'react-redux'
// utils
import { shallowCloneMetaOfPost } from '../utils/shallow-clone-entity'
// constants
import colors from '../constants/colors'
import dataLoaderConst from '../constants/data-loaders'
import siteMeta from '../constants/site-meta'
// components
import ArticleList from '../components/photography/article-list'
import SystemError from '../components/SystemError'
import { TopNews } from '../components/photography/top-news'
// @twreporter
import twreporterRedux from '@twreporter/redux'
import {
  CATEGORY_PATH,
  CATEGORY_ID,
} from '@twreporter/core/lib/constants/category-set'
// lodash
import forEach from 'lodash/forEach'
import get from 'lodash/get'
const _ = {
  forEach,
  get,
}

const logger = loggerFactory.getLogger()

const { fetchPostsByCategorySetListId } = twreporterRedux.actions
const reduxStateFields = twreporterRedux.reduxStateFields

const Photography = ({
  error,
  isFetching,
  listId,
  posts,
  hasMore,
  nPerPage,
  fetchPostsByCategorySetListId,
}) => {
  const [page, setPage] = useState(Math.ceil(posts.length / nPerPage + 1))
  useEffect(() => {
    if (!hasMore) {
      return
    }

    fetchPostsByCategorySetListId(listId, nPerPage, page).catch(failAction => {
      // TODO render alter message
      logger.errorReport({
        report: _.get(failAction, 'payload.error'),
        message: `Error to fetch posts (category id: ${listId}, page: ${page}, nPerPage: ${nPerPage}).`,
      })
    })
  }, [listId, page, fetchPostsByCategorySetListId])

  // Error handling
  if (error) {
    return <SystemError error={error} />
  }

  const loadMore = () => setPage(page + 1)
  const topNewsNum = 6

  const style = {
    backgroundColor: colors.photographyColor,
    color: '#FFFFEB',
  }

  const canonical = siteMeta.urlOrigin + '/photography'
  const title = '影像' + siteMeta.name.separator + siteMeta.name.full
  return (
    <div style={style}>
      <Helmet
        title={title}
        link={[{ rel: 'canonical', href: canonical }]}
        meta={[
          { name: 'description', content: siteMeta.desc },
          { name: 'twitter:title', content: title },
          { name: 'twitter:description', content: siteMeta.desc },
          { property: 'twitter:image', content: siteMeta.ogImage.url },
          { property: 'og:title', content: title },
          { property: 'og:description', content: siteMeta.desc },
          { property: 'og:image', content: siteMeta.ogImage.url },
          { property: 'og:image:width', content: siteMeta.ogImage.width },
          { property: 'og:image:height', content: siteMeta.ogImage.height },
          { property: 'og:type', content: 'website' },
          { property: 'og:url', content: canonical },
        ]}
      />
      <TopNews posts={posts.slice(0, topNewsNum)} />
      <ArticleList
        articles={posts.slice(topNewsNum)}
        hasMore={hasMore}
        loadMore={loadMore}
      />
    </div>
  )
}

Photography.defaultProps = {
  error: null,
  isFetching: false,
  listId: _.get(CATEGORY_ID, CATEGORY_PATH.photography, ''),
  posts: [],
  hasMore: false,
  nPerPage: dataLoaderConst.photographyPage.nPerPage,
}

Photography.propTypes = {
  error: PropTypes.object,
  isFetching: PropTypes.bool,
  listId: PropTypes.string,
  // TODO: PropTypes.arrayOf(propTypeConst.post),
  posts: PropTypes.array,
  hasMore: PropTypes.bool,
  nPerPage: PropTypes.number,
  fetchPostsByCategorySetListId: PropTypes.func,
}

/**
 *  @typedef {import('@twreporter/redux/lib/typedef').ReduxState} ReduxState
 */

/**
 *  @typedef {import('../utils/shallow-clone-entity').MetaOfPost} MetaOfPost
 */

/**
 *  @param {ReduxState} state
 *  @param {string} listId - photography list id
 *  @return {Object} error object
 */
function errorProp(state, listId) {
  return _.get(state, [reduxStateFields.lists, listId, 'error'])
}

/**
 *  @param {ReduxState} state
 *  @param {string} listId - photography list id
 *  @return {boolean}
 */
function isFetchingProp(state, listId) {
  return _.get(state, [reduxStateFields.lists, listId, 'isFetching'])
}

/**
 *  @param {ReduxState} state
 *  @param {string} listId - photography list id
 *  @return {MetaOfPost[]}
 */
function postsProp(state, listId) {
  const { entities, postsInEntities, lists } = reduxStateFields
  const postEntities = _.get(state, [entities, postsInEntities, 'byId'])
  const listObj = _.get(state, [lists, listId])
  const postIds = _.get(listObj, 'items', [])
  const posts = []
  _.forEach(postIds, postId => {
    const post = _.get(postEntities, postId)
    if (post) {
      posts.push(shallowCloneMetaOfPost(post))
    }
  })
  return posts
}

/**
 *  @param {ReduxState} state
 *  @param {string} listId - photography list id
 *  @return {boolean}
 */
function hasMoreProp(state, listId) {
  const listObj = _.get(state, [reduxStateFields.lists, listId], null)

  if (!listObj) {
    return true
  }

  const total = _.get(listObj, 'total', 0)
  const items = _.get(listObj, 'items.length', 0)

  return items < total
}

/**
 *  @typedef {Object} PhotographyProps
 *  @property {Object} error
 *  @property {boolean} hasMore
 *  @property {boolean} isFetching
 *  @property {string} listId
 *  @property {MetaOfPost[]} posts
 *  @property {number} nPerPage
 */

/**
 *  @param {ReduxState} state
 *  @return {PhotographyProps}
 */
function mapStateToProps(state) {
  const listId = _.get(CATEGORY_ID, CATEGORY_PATH.photography, '')
  return {
    error: errorProp(state, listId),
    hasMore: hasMoreProp(state, listId),
    isFetching: isFetchingProp(state, listId),
    listId,
    posts: postsProp(state, listId),
    nPerPage: dataLoaderConst.photographyPage.nPerPage,
  }
}

export { Photography }
export default connect(
  mapStateToProps,
  { fetchPostsByCategorySetListId }
)(Photography)
