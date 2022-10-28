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

const Category = ({
  catLabel,
  subcategoryList,
  activeTabIndex,
  listId,
  pathname,
  posts,
  error,
  isFetching,
  fetchPostsByCategorySetListId,
  nPerPage,
  totalPages,
  page,
}) => {
  useEffect(() => {
    fetchPostsByCategorySetListId(listId, nPerPage, page).catch(failAction => {
      logger.errorReport({
        report: _.get(failAction, 'payload.error'),
        message: `Error to fetch posts (category id: '${listId}', page: ${page}, nPerPage: ${nPerPage}).`,
      })
    })
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
            title={catLabel}
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
 *  @return {boolean}
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
 *  @typedef {Object} CategoryProps
 *  @property {string} listId - category set id
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
  const categoryPath = _.get(props, 'match.params.category')
  const subcategoryPath = _.get(props, 'match.params.subcategory')
  const categoryId = CATEGORY_ID[categoryPath]
  const subcategoryId = SUBCATEGORY_ID[subcategoryPath]
  const listId =
    categoryId && subcategoryId ? `${categoryId}_${subcategoryId}` : categoryId
  const catLabel = CATEGORY_LABEL[categoryPath]

  const defaultPathname = subcategoryPath
    ? `/categories/${categoryPath}/${subcategoryPath}`
    : `/categories/${categoryPath}`
  const pathname = _.get(location, 'pathname', defaultPathname)
  const subcategoryList = _.map(CATEGORY_SET[categoryPath], subcategoryKey => {
    const path = subcategoryKey
    const label = SUBCATEGORY_LABEL[subcategoryKey]
    const id = SUBCATEGORY_ID[subcategoryKey]
    const link =
      subcategoryKey !== 'all'
        ? `/categories/${categoryPath}/${path}`
        : `/categories/${categoryPath}`
    const isExternal = false
    return { id, label, link, path, isExternal }
  })
  const activeTabIndex = subcategoryPath
    ? _.findIndex(subcategoryList, ['path', subcategoryPath])
    : 0
  const page = pageProp(location)
  const nPerPage = dataLoaderConst.categoryListPage.nPerPage

  return {
    catLabel,
    subcategoryList,
    activeTabIndex,
    listId,
    error: errorProp(state, listId),
    isFetching: isFetchingProp(state, listId),
    nPerPage,
    page,
    pathname,
    posts: postsProp(state, listId, page),
    totalPages: totalPagesProp(state, listId, nPerPage),
  }
}

Category.defaultProps = {
  catLabel: '',
  subcategoryList: [],
  activeTabIndex: 0,
  error: null,
  isFetching: false,
  posts: [],
  totalPages: 0,
  nPerPage: dataLoaderConst.categoryListPage.nPerPage,
}

Category.propTypes = {
  catLabel: PropTypes.string,
  subcategoryList: PropTypes.array,
  activeTabIndex: PropTypes.number,
  listId: PropTypes.String,
  error: PropTypes.object,
  fetchPostsByCategorySetListId: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  nPerPage: PropTypes.number,
  page: PropTypes.number.isRequired,
  pathname: PropTypes.string.isRequired,

  // TODO: define metaOfPost
  // posts: PropTypes.arrayOf(propTypesConst.metaOfPost),
  posts: PropTypes.array,
  totalPages: PropTypes.number,
}

export { Category }
export default connect(
  mapStateToProps,
  { fetchPostsByCategorySetListId }
)(Category)
