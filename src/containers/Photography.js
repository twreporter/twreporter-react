import { Helmet } from 'react-helmet-async'
import React, { useEffect, useState } from 'react'
import loggerFactory from '../logger'
import { useDispatch, useSelector } from 'react-redux'
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

const Photography = () => {
  const listId = _.get(CATEGORY_ID, CATEGORY_PATH.photography, '')
  const nPerPage = dataLoaderConst.photographyPage.nPerPage

  const dispatch = useDispatch()
  const error = useSelector(state =>
    _.get(state, [reduxStateFields.lists, listId, 'error'], null)
  )
  const hasMore = useSelector(state => hasMoreProp(state, listId))
  const posts = useSelector(state => postsProp(state, listId))

  const [page, setPage] = useState(Math.ceil(posts.length / nPerPage + 1))
  useEffect(() => {
    if (!hasMore) {
      return
    }

    dispatch(fetchPostsByCategorySetListId(listId, nPerPage, page)).catch(
      failAction => {
        // TODO render alter message
        logger.errorReport({
          report: _.get(failAction, 'payload.error'),
          message: `Error to fetch posts (category id: ${listId}, page: ${page}, nPerPage: ${nPerPage}).`,
        })
      }
    )
  }, [listId, page, fetchPostsByCategorySetListId])

  // Error handling
  if (error) {
    return <SystemError error={error} />
  }

  const loadMore = () => setPage(page + 1)
  const topNewsNum = 6

  const style = {
    backgroundColor: colors.photographyColor,
  }

  const canonical = siteMeta.urlOrigin + '/photography'
  const title = '影像' + siteMeta.name.separator + siteMeta.name.full
  return (
    <div style={style}>
      <Helmet
        prioritizeSeoTags
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

export { Photography }
export default Photography
