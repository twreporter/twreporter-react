import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet-async'
import PropTypes from 'prop-types'
import querystring from 'querystring'
import React, { useEffect, useMemo } from 'react'
import styled from 'styled-components'
// components
import SystemError from '../components/SystemError'
import Pagination from '../components/Pagination'
import EmptyState from '../components/EmptyState'
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
import {
  CATEGORY_ID,
  CATEGORY_LABEL,
  SUBCATEGORY_ID,
  SUBCATEGORY_LABEL,
  CATEGORY_SET,
} from '@twreporter/core/lib/constants/category-set'
// lodash
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import map from 'lodash/map'
import findIndex from 'lodash/findIndex'
const _ = {
  forEach,
  get,
  map,
  findIndex,
}
// global var
const { actions, reduxStateFields } = twreporterRedux
const { fetchPostsByCategorySetListId } = actions
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
const ListContainer = styled.div`
  ${mq.mobileOnly`
    width: 86.66666666666667%;
  `}
`

const Category = ({ location, match }) => {
  const categoryPath = useMemo(() => _.get(match, 'params.category'), [match])
  const subcategoryPath = useMemo(() => _.get(match, 'params.subcategory'), [
    match,
  ])
  const pathname = useMemo(() => _.get(location, 'pathname', defaultPathname), [
    location,
  ])

  const categoryId = CATEGORY_ID[categoryPath]
  const subcategoryId = SUBCATEGORY_ID[subcategoryPath]
  const listId =
    categoryId && subcategoryId ? `${categoryId}_${subcategoryId}` : categoryId
  const catLabel = CATEGORY_LABEL[categoryPath]

  const { subcategoryList, activeTabIndex } = useMemo(
    () => titleTabProp(categoryPath, subcategoryPath),
    [categoryPath, subcategoryPath]
  )
  const defaultPathname = subcategoryPath
    ? `/categories/${categoryPath}/${subcategoryPath}`
    : `/categories/${categoryPath}`

  const nPerPage = dataLoaderConst.categoryListPage.nPerPage
  const page = useMemo(() => pageProp(location), [location])
  const totalPages = useSelector(state =>
    Math.ceil(
      _.get(state, [reduxStateFields.lists, listId, 'total'], 0) / nPerPage
    )
  )
  const error = useSelector(state =>
    _.get(state, [reduxStateFields.lists, listId, 'error'])
  )
  const isFetching = useSelector(state =>
    _.get(state, [reduxStateFields.lists, listId, 'isFetching'])
  )
  const posts = useSelector(state => postsProp(state, listId, page))
  console.log('page', page, totalPages)

  const dispatch = useDispatch()
  const fetchPostsByCategorySetListIdWithCatch = async () => {
    try {
      await dispatch(fetchPostsByCategorySetListId(listId, nPerPage, page))
    } catch (err) {
      logger.errorReport({
        report: _.get(err, 'payload.error'),
        message: `Error to fetch posts (category id: '${listId}', page: ${page}, nPerPage: ${nPerPage}).`,
      })
    }
  }

  useEffect(() => {
    fetchPostsByCategorySetListIdWithCatch()
  }, [
    catLabel,
    activeTabIndex,
    page,
    listId,
    fetchPostsByCategorySetListId,
    nPerPage,
  ])

  // Error handling
  if (error) {
    return <SystemError error={error} />
  }

  const title = catLabel + siteMeta.name.separator + siteMeta.name.full
  const canonical = `${siteMeta.urlOrigin}${pathname}`
  const tabs = _.map(subcategoryList, subcategory => {
    const { label, link, isExternal } = subcategory
    return {
      text: label,
      link,
      isExternal,
    }
  })
  const listJSX =
    isFetching === false && (!posts || posts.length === 0) ? (
      <EmptyState />
    ) : (
      <List data={posts} isFetching={isFetching} showSpinner={true} />
    )

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
            title={catLabel}
            tabs={tabs}
            activeTabIndex={activeTabIndex}
          />
        </TitleTabContainer>
        <ListContainer>{listJSX}</ListContainer>
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
 *  @param {string} listId - category list id
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
 *  @param {string} categoryPath - category pathname
 *  @param {string} subcategoryPath - subcategory pathname
 *  @return {Object} - subcategoryList, activeTabIndex
 */
function titleTabProp(categoryPath, subcategoryPath) {
  const subcategoryList = _.map(CATEGORY_SET[categoryPath], subcategoryKey => {
    const path = subcategoryKey
    const label = SUBCATEGORY_LABEL[subcategoryKey]
    const id = SUBCATEGORY_ID[subcategoryKey]
    const link =
      subcategoryKey !== 'all'
        ? `/categories/${categoryPath}/${path}`
        : `/categories/${categoryPath}`
    return { id, label, link, path, isExternal: false }
  })
  const activeTabIndex = subcategoryPath
    ? _.findIndex(subcategoryList, ['path', subcategoryPath])
    : 0

  return { subcategoryList, activeTabIndex }
}
Category.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
}

export { Category }
export default Category
