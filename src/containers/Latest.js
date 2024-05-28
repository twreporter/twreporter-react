import { ReactReduxContext, connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import PropTypes from 'prop-types'
import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
// context
import { CoreContext } from '../contexts'
// components
import SystemError from '../components/SystemError'
import Skeleton from '../components/skeleton'
// utils
import loggerFactory from '../logger'
import { shallowCloneMetaOfPost } from '../utils/shallow-clone-entity'
import { getBookmarkFromPost } from '../utils/bookmark'
// constants
import dataLoaderConst from '../constants/data-loaders'
import siteMeta from '../constants/site-meta'
// @twreporter
import twreporterRedux from '@twreporter/redux'
import mq from '@twreporter/core/lib/utils/media-query'
import { useStore, useBookmark } from '@twreporter/react-components/lib/hook'
import Divider from '@twreporter/react-components/lib/divider'
import { CardList } from '@twreporter/react-components/lib/listing-page'
import { TitleTab } from '@twreporter/react-components/lib/title-bar'
import { PillButton } from '@twreporter/react-components/lib/button'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
// lodash
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import map from 'lodash/map'
import findIndex from 'lodash/findIndex'
import merge from 'lodash/merge'
import concat from 'lodash/concat'
import sortBy from 'lodash/sortBy'
const _ = {
  forEach,
  get,
  map,
  findIndex,
  merge,
  concat,
  sortBy,
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
  margin: 64px 0 24px 0;

  ${mq.tabletOnly`
    margin: 32px 0 24px 0;
  `}
  ${mq.mobileOnly`
    margin: 24px 0;
    width: 86.66666666666667%;
  `}
`
const CardListContainer = styled.div`
  ${mq.mobileOnly`
    width: 86.66666666666667%;
  `}
`
const LoadMoreBox = styled.div`
  width: 100%;
  ${mq.mobileOnly`
    width: 86.66666666666667%;
  `}
`
const LoadMoreButton = styled(PillButton)`
  width: 100%;
  max-width: 480px;
  margin: 64px auto;
  display: flex;
  justify-content: center;
  ${mq.tabletAndBelow`
    margin: 48px auto;
  `}

  ${props => (props.$show ? '' : 'display: none;')}
`
const SkeletonBox = styled.div`
  ${props => (props.$show ? '' : 'display: none;')}
`
const ListSkeleton = styled(Skeleton)`
  padding: 24px 0;
`
const Gray300Divider = styled(Divider)`
  color: ${colorGrayscale.gray300};
`
const GetSomeSpace = styled.div`
  width: 100%;
  height: ${props => props.$height};
  ${props => (props.$show ? '' : 'display: none;')}
`

const Latest = ({
  // redux state
  jwt,
  isAuthed,
  latestTagList,
  activeTabIndex,
  tagId,
  isFetching,
  nPerPage,
  totalPages,
  // redux actions
  fetchPostsByTagListId,
  fetchLatestPosts,
  fetchLatestTags,
}) => {
  const listId = tagId || LATEST_LIST_ID
  const location = useLocation()
  const pathname = _.get(location, 'pathname', `/latest/${tagId}`)
  const { releaseBranch, toastr } = useContext(CoreContext)

  const state = useContext(ReactReduxContext).store.getState()
  const error = _.get(state, [reduxStateFields.lists, listId, 'error'])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const store = useStore()
  const { addAction, removeAction } = useBookmark(store)
  const normalizePosts = rawPosts => {
    return _.forEach(rawPosts, post => {
      post['is_bookmarked'] = !!post.bookmarkId
      post['toggle_bookmark'] = async () => {
        if (post.bookmarkId) {
          try {
            await removeAction(post.bookmarkId)
            toastr({ text: '已取消收藏' })
          } catch (err) {
            toastr({ text: '連線失敗，請再試一次' })
          }
        } else {
          try {
            await addAction(getBookmarkFromPost(post))
            toastr({ text: '已收藏' })
          } catch (err) {
            toastr({ text: '連線失敗，請再試一次' })
          }
        }
        onBookmarkUpdate()
      }
    })
  }
  const [posts, setPosts] = useState(
    normalizePosts(postsProp(state, listId, 1, page))
  )
  const onBookmarkUpdate = () =>
    setPosts(normalizePosts(postsProp(state, listId, 1, page)))

  useEffect(() => {
    fetchLatestTags().catch(failAction => {
      logger.errorReport({
        report: _.get(failAction, 'payload.error'),
        message: `Error to fetch latest tags`,
      })
    })
  }, [])
  useEffect(() => {
    const getPosts = async () => {
      try {
        const toggleBookmark = !!isAuthed
        if (tagId) {
          await fetchPostsByTagListId(
            tagId,
            nPerPage,
            page,
            jwt,
            toggleBookmark
          )
        } else {
          await fetchLatestPosts(nPerPage, page, jwt, toggleBookmark)
        }
      } catch (failAction) {
        logger.errorReport({
          report: _.get(failAction, 'payload.error'),
          message: `Error to fetch posts (tag id: '${tagId}', page: ${page}, nPerPage: ${nPerPage}).`,
        })
      }
    }
    getPosts()
  }, [
    tagId,
    activeTabIndex,
    page,
    nPerPage,
    fetchPostsByTagListId,
    fetchLatestPosts,
  ])
  useEffect(() => {
    // set loading true at init state
    // set loading false when post ready
    setIsLoading(isFetching || isFetching === undefined)
  }, [isFetching])
  useEffect(() => {
    setPage(1)
  }, [listId])
  useEffect(() => {
    if (isFetching || isFetching === undefined) {
      return
    }
    setPosts(normalizePosts(postsProp(state, listId, 1, page)))
  }, [isFetching, listId])

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
  const loadMore = () => {
    if (isFetching || isLoading) {
      return
    }
    setPage(page + 1)
  }

  return (
    <div>
      <Helmet
        prioritizeSeoTags
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
        <CardListContainer>
          <CardList
            data={posts}
            showSpinner={true}
            showIsBookmarked={!!isAuthed}
            releaseBranch={releaseBranch}
          />
        </CardListContainer>
        <LoadMoreBox>
          <SkeletonBox $show={isLoading}>
            <ListSkeleton />
            <Gray300Divider />
            <ListSkeleton />
            <Gray300Divider />
            <ListSkeleton />
            <Gray300Divider />
          </SkeletonBox>
          <LoadMoreButton
            loading={isLoading}
            onClick={loadMore}
            style={PillButton.Style.DARK}
            type={PillButton.Type.PRIMARY}
            size={PillButton.Size.L}
            text="載入更多"
            $show={totalPages > page}
          />
        </LoadMoreBox>
        <GetSomeSpace $height={'120px'} $show={totalPages <= page} />
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
 *  @param {number} page - current page
 *  @return {MetaOfPost[]}
 */
function postsProp(state, listId, fromPage = 1, toPage = 1) {
  const { entities, postsInEntities, lists } = reduxStateFields
  const postEntities = _.get(state, [entities, postsInEntities, 'byId'])
  const listObj = _.get(state, [lists, listId])
  const itemsRangeFrom = _.get(listObj, ['pages', fromPage])
  const itemsRangeTo = _.get(listObj, ['pages', toPage])
  const postIds = _.get(listObj, 'items', [])
  const postIdsForCurPage =
    Array.isArray(itemsRangeFrom) &&
    Array.isArray(itemsRangeTo) &&
    Array.isArray(postIds)
      ? postIds.slice(itemsRangeFrom[0], itemsRangeTo[1] + 1)
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
  let latestTagList = [{ text: '所有文章', link: '/latest', isExternal: false }]
  latestTagList = _.concat(
    latestTagList,
    _.map(_.sortBy(latestTag, ['latest_order']), tag => {
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
 *  @param {ReduxState} state
 *  @param {Object} props
 */
function mapStateToProps(state, props) {
  const jwt = _.get(state, [reduxStateFields.auth, 'accessToken'], '')
  const isAuthed = _.get(state, [reduxStateFields.auth, 'isAuthed'], false)
  const tagId = _.get(props, 'match.params.tagId')
  const { latestTagList, activeTabIndex } = titleTabProp(state, tagId)
  const nPerPage = dataLoaderConst.latestPage.nPerPage
  const listId = tagId || LATEST_LIST_ID

  return {
    jwt,
    isAuthed,
    latestTagList,
    activeTabIndex,
    tagId,
    isFetching: isFetchingProp(state, listId),
    nPerPage,
    totalPages: totalPagesProp(state, listId, nPerPage),
  }
}

Latest.defaultProps = {
  // redux state
  jwt: '',
  isAuthed: false,
  latestTagList: [],
  activeTabIndex: 0,
  isFetching: false,
  nPerPage: dataLoaderConst.latestPage.nPerPage,
  totalPages: 0,
}

Latest.propTypes = {
  // redux state
  jwt: PropTypes.string,
  isAuthed: PropTypes.bool,
  latestTagList: PropTypes.array,
  activeTabIndex: PropTypes.number,
  tagId: PropTypes.string,
  isFetching: PropTypes.bool,
  nPerPage: PropTypes.number,
  totalPages: PropTypes.number,
  // redux action
  fetchPostsByTagListId: PropTypes.func.isRequired,
  fetchLatestPosts: PropTypes.func.isRequired,
  fetchLatestTags: PropTypes.func.isRequired,
}

export { Latest }
export default connect(
  mapStateToProps,
  { fetchPostsByTagListId, fetchLatestPosts, fetchLatestTags }
)(Latest)
