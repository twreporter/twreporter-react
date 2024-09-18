import React, { useMemo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet-async'
import PropTypes from 'prop-types'
import querystring from 'querystring'
import styled from 'styled-components'
import loggerFactory from '../logger'
import mq from '../utils/media-query'
// constants
import dataLoaderConst from '../constants/data-loaders'
import siteMeta from '../constants/site-meta'
// utils
import { shallowCloneMetaOfPost } from '../utils/shallow-clone-entity'
// components
import Pagination from '../components/Pagination'
import SystemError from '../components/SystemError'
// @twreporter
import twreporterRedux from '@twreporter/redux'
import { List } from '@twreporter/react-components/lib/listing-page'
// lodash
import find from 'lodash/find'
import forEach from 'lodash/forEach'
import get from 'lodash/get'
const _ = {
  find,
  forEach,
  get,
}

const PageContainer = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  padding-left: 24px;
  padding-right: 24px;
  ${mq.mobileOnly`
    padding-top: 24px;
  `}
  ${mq.tabletOnly`
    padding-top: 32px;
  `}
  ${mq.desktopAndAbove`
    padding-top: 64px;
  `}
`

const ListContainer = styled.div`
  margin-top: 45px;
`

const { actions, reduxStateFields } = twreporterRedux
const { fetchPostsByTagListId } = actions

const logger = loggerFactory.getLogger()

const Tag = ({ location, match }) => {
  const tagId = useMemo(() => _.get(match, 'params.tagId'), [match])
  const page = useMemo(() => pageProp(location), [location])
  const nPerPage = dataLoaderConst.tagListPage.nPerPage

  const error = useSelector(state =>
    _.get(state, [reduxStateFields.lists, tagId, 'error'], null)
  )
  const isFetching = useSelector(state =>
    _.get(state, [reduxStateFields.lists, tagId, 'isFetching'], false)
  )
  const totalPages = useSelector(state =>
    Math.ceil(
      _.get(state, [reduxStateFields.lists, tagId, 'total'], 0) / nPerPage
    )
  )
  const posts = useSelector(state => postsProp(state, tagId, page))

  useEffect(() => {
    fetchPostsWithCatch()
  }, [])

  useEffect(() => {
    fetchPostsWithCatch()
  }, [tagId, page])

  const dispatch = useDispatch()
  const fetchPostsWithCatch = async () => {
    try {
      await dispatch(fetchPostsByTagListId(tagId, nPerPage, page))
    } catch (err) {
      logger.errorReport({
        report: _.get(err, 'payload.error'),
        message: `Error to fetch posts (tag id: '${tagId}').`,
      })
    }
  }

  const findTagName = (post, tagId) => {
    const tags = _.get(post, 'tags', [])
    const tag = _.find(tags, _tag => {
      return _.get(_tag, 'id') === tagId
    })
    return _.get(tag, 'name', '')
  }

  // Error handling
  if (error) {
    return <SystemError error={error} />
  }

  const tagName = findTagName(_.get(posts, '0'), tagId)
  const canonical = `${siteMeta.urlOrigin}/tag/${tagId}`
  const title = tagName + siteMeta.name.separator + siteMeta.name.full

  return (
    <PageContainer>
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
      <ListContainer>
        <List
          data={posts}
          tagName={tagName}
          isFetching={isFetching}
          showSpinner={true}
          showCategory={true}
        />
      </ListContainer>
      <Pagination currentPage={page} totalPages={totalPages} />
    </PageContainer>
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

  if (isNaN(page)) {
    page = defaultPage
  }

  return page
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

Tag.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export { Tag }
export default Tag
