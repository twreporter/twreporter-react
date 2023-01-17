import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import querystring from 'querystring'
import React, { useEffect } from 'react'
import styled from 'styled-components'
// components
import SystemError from '../components/SystemError'
import Pagination from '../components/Pagination'
// utils
import loggerFactory from '../logger'
import { shallowCloneMetaOfPost } from '../utils/shallow-clone-entity'
// constants
import dataLoaderConst from '../constants/data-loaders'
import siteMeta from '../constants/site-meta'
// @twreporter
import twreporterRedux from '@twreporter/redux'
import mq from '@twreporter/core/lib/utils/media-query'
import { List } from '@twreporter/react-components/lib/listing-page'
import { TitleTab } from '@twreporter/react-components/lib/title-bar'
// lodash
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import map from 'lodash/map'
import findIndex from 'lodash/findIndex'
import merge from 'lodash/merge'
import concat from 'lodash/concat'
const _ = {
  forEach,
  get,
  map,
  findIndex,
  merge,
  concat,
}
// global var
const { actions, reduxStateFields, LATEST_LIST_ID } = twreporterRedux
const { fetchPostsByTagListId, fetchLatestPosts, fetchLatestTags } = actions
const logger = loggerFactory.getLogger()

const Container = styled.div`
  margin: 0 auto;
  max-width: 1130px; //hd

  ${mq.desktopOnly`
    max-width: 922px;
  `}
  ${mq.tabletOnly`
    max-width: 698px;
  `}
  ${mq.mobileOnly`
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 767px;
  `}
`

const TitleTabContainer = styled.div`
  margin: 64px 0;

  ${mq.tabletOnly`
    margin: 32px 0;
  `}
  ${mq.mobileOnly`
    margin: 24px 0;
    width: 86.66666666666667%;
  `}
`

const Latest = ({
  latestTagList,
  activeTabIndex,
  tagId,
  pathname,
  posts,
  error,
  isFetching,
  fetchPostsByTagListId,
  fetchLatestPosts,
  fetchLatestTags,
  nPerPage,
  totalPages,
  page,
}) => {
  useEffect(() => {
    fetchLatestTags().catch(failAction => {
      logger.errorReport({
        report: _.get(failAction, 'payload.error'),
        message: `Error to fetch latest tags`,
      })
    })
  }, [])
  useEffect(() => {
    const catchFunc = failAction => {
      logger.errorReport({
        report: _.get(failAction, 'payload.error'),
        message: `Error to fetch posts (tag id: '${tagId}', page: ${page}, nPerPage: ${nPerPage}).`,
      })
    }
    if (tagId) {
      fetchPostsByTagListId(tagId, nPerPage, page).catch(catchFunc)
    } else {
      fetchLatestPosts(nPerPage, page).catch(catchFunc)
    }
  }, [
    tagId,
    activeTabIndex,
    page,
    nPerPage,
    fetchPostsByTagListId,
    fetchLatestPosts,
  ])

  // Error handling
  if (error) {
    return <SystemError error={error} />
  }

  const titleText = '最新'
  const title = titleText + siteMeta.name.separator + siteMeta.name.full
  const canonical = `${siteMeta.urlOrigin}${pathname}`
  const tabs = _.map(latestTagList, latestTag => {
    const { text, link, isExternal } = latestTag
    return {
      text,
      link,
      isExternal,
    }
  })

  return (
    <div>
      <Helmet
        title={title}
        link={[{ rel: 'canonical', href: canonical }]}
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
          { property: 'og:url', content: canonical },
        ]}
      />
      <Container>
        <TitleTabContainer>
          <TitleTab
            title={titleText}
            tabs={tabs}
            activeTabIndex={activeTabIndex}
          />
        </TitleTabContainer>
        <List data={posts} isFetching={isFetching} showSpinner={true} />
        <Pagination currentPage={page} totalPages={totalPages} />
      </Container>
    </div>
  )
}

/**
 *  @typedef {import('@twreporter/redux/lib/typedef').ReduxState} ReduxState
 */

/**
 *  @typedef {import('../utils/shallow-clone-entity').MetaOfPost} MetaOfPost
 */

/**
 *  @param {Object} [location={}] - react-router location object
 *  @return {number} current page
 */
function pageProp(location = {}) {
  const defaultPage = 1
  const search = _.get(location, 'search', '')
  const searchWithoutPrefix =
    typeof search === 'string' ? search.replace(/^\?/, '') : search
  const pageStr = _.get(querystring.parse(searchWithoutPrefix), 'page', '1')
  let page = parseInt(Array.isArray(pageStr) ? pageStr[0] : pageStr, 10)

  if (isNaN(page) || page < defaultPage) {
    page = defaultPage
  }

  return page
}

/**
 *  @param {ReduxState} state
 *  @param {string} listId - tag id
 *  @return {number}
 */
function totalPagesProp(state, listId, nPerPage) {
  const total = _.get(state, [reduxStateFields.lists, listId, 'total'], 0)
  return Math.ceil(total / nPerPage)
}

/**
 *  @param {ReduxState} state
 *  @param {string} listId - tag id
 *  @return {boolean}
 */
function isFetchingProp(state, listId) {
  return _.get(state, [reduxStateFields.lists, listId, 'isFetching'])
}

/**
 *  @param {ReduxState} state
 *  @param {string} listId - tag id
 *  @return {Object} error object
 */
function errorProp(state, listId) {
  return _.get(state, [reduxStateFields.lists, listId, 'error'])
}

/**
 *  @param {ReduxState} state
 *  @param {string} listId - tag id
 *  @param {number} page - current page
 *  @return {MetaOfPost[]}
 */
function postsProp(state, listId, page) {
  const { entities, postsInEntities, lists } = reduxStateFields
  const postEntities = _.get(state, [entities, postsInEntities, 'byId'])
  const listObj = _.get(state, [lists, listId])
  const itemsRange = _.get(listObj, ['pages', page])
  const postIds = _.get(listObj, 'items', [])
  const postIdsForCurPage =
    Array.isArray(itemsRange) && Array.isArray(postIds)
      ? postIds.slice(itemsRange[0], itemsRange[1] + 1)
      : []
  const posts = []
  _.forEach(postIdsForCurPage, postId => {
    const post = _.get(postEntities, postId)
    if (post) {
      posts.push(shallowCloneMetaOfPost(post))
    }
  })
  return posts
}

/**
 *  @param {ReduxState} state
 *  @param {string} listId - tag id
 *  @return {Object} - latestTagList, activeTabIndex
 */
function titleTabProp(state, listId) {
  const latestPageState = _.get(state, reduxStateFields.latest, {})
  const latestTag = _.get(latestPageState, 'latestTag', [])
  let latestTagList = [{ text: '全部', link: '/latest', isExternal: false }]
  latestTagList = _.concat(
    latestTagList,
    _.map(latestTag, tag => {
      const { id, name } = tag
      return {
        id,
        text: name,
        link: `/latest/${id}`,
        isExternal: false,
      }
    })
  )
  const activeTabIndex = listId ? _.findIndex(latestTagList, ['id', listId]) : 0

  return { latestTagList, activeTabIndex }
}

/**
 *  @typedef {Object} LatestProps
 *  @property {string} tagId - tag id
 *  @property {Object} latestTagList - latest tag list
 *  @property {number} activeTabIndex - index of active tag
 *  @property {Object} error - error object
 *  @property {boolean} isFetching - if it is requesting api or not
 *  @property {number} page - current page for pagination
 *  @property {number} nPerPage - number per page
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
 *  @param {string} props.match.params.category
 *  @return {CategoryProps}
 */
function mapStateToProps(state, props) {
  const location = _.get(props, 'location')
  const tagId = _.get(props, 'match.params.tagId')
  const pathname = _.get(location, 'pathname', `/latest/${tagId}`)
  const { latestTagList, activeTabIndex } = titleTabProp(state, tagId)
  const page = pageProp(location)
  const nPerPage = dataLoaderConst.latestPage.nPerPage
  const listId = tagId || LATEST_LIST_ID

  return {
    latestTagList,
    activeTabIndex,
    tagId,
    error: errorProp(state, listId),
    isFetching: isFetchingProp(state, listId),
    nPerPage,
    page,
    pathname,
    posts: postsProp(state, listId, page),
    totalPages: totalPagesProp(state, listId, nPerPage),
  }
}

Latest.defaultProps = {
  latestTagList: [],
  activeTabIndex: 0,
  error: null,
  isFetching: false,
  posts: [],
  totalPages: 0,
  nPerPage: dataLoaderConst.latestPage.nPerPage,
}

Latest.propTypes = {
  latestTagList: PropTypes.array,
  activeTabIndex: PropTypes.number,
  tagId: PropTypes.string,
  error: PropTypes.object,
  fetchPostsByTagListId: PropTypes.func,
  fetchLatestPosts: PropTypes.func,
  fetchLatestTags: PropTypes.func,
  isFetching: PropTypes.bool,
  nPerPage: PropTypes.number,
  page: PropTypes.number,
  pathname: PropTypes.string,

  // TODO: define metaOfPost
  // posts: PropTypes.arrayOf(propTypesConst.metaOfPost),
  posts: PropTypes.array,
  totalPages: PropTypes.number,
}

export { Latest }
export default connect(
  mapStateToProps,
  { fetchPostsByTagListId, fetchLatestPosts, fetchLatestTags }
)(Latest)
