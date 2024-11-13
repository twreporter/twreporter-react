/* eslint camelcase: ["error", {"properties": "never", ignoreDestructuring: true}] */
import React, { useEffect, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import styled from 'styled-components'
// utils
import loggerFactory from '../logger'
import memoizeOne from 'memoize-one'
import cloneUtils from '../utils/shallow-clone-entity'
// constants
import siteMeta from '../constants/site-meta'
// components
import Banner from '../components/topic/banner'
import Description from '../components/topic/description'
import Related from '../components/topic/related'
import SystemError from '../components/SystemError'
// @twreporter
import { replaceGCSUrlOrigin } from '@twreporter/core/lib/utils/storage-url-processor'
import twreporterRedux from '@twreporter/redux'
// lodash
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import merge from 'lodash/merge'
const _ = {
  forEach,
  get,
  merge,
}

const logger = loggerFactory.getLogger()
const { actions, reduxStateFields } = twreporterRedux
const {
  entities,
  relatedPostsOf,
  selectedTopic,
  postsInEntities,
  topicsInEntities,
} = reduxStateFields
const { fetchAFullTopic, fetchRelatedPostsOfAnEntity } = actions

const Container = styled.div`
  position: relative;
`

const BannerPlaceholder = styled.div`
  height: 100vh;
  background: transparent;
`

const emptySlug = ''

const TopicLandingPage = () => {
  const dispatch = useDispatch()
  const { slug: slugToFetch } = useParams()
  const topicId = useSelector(state =>
    _.get(state, [entities, topicsInEntities, 'slugToId', slugToFetch], '')
  )
  const errorOfTopic = useSelector(state =>
    _.get(state, [selectedTopic, 'error'], null)
  )
  const errorOfRelateds = useSelector(state =>
    _.get(state, [relatedPostsOf, 'byId', topicId, 'error'], null)
  )
  const isFetchingTopic = useSelector(state =>
    _.get(state, [selectedTopic, 'isFetching'], false)
  )
  const isFetchingRelateds = useSelector(state =>
    _.get(state, [relatedPostsOf, 'byId', topicId, 'isFetching'], false)
  )
  const topic = useSelector(state => topicProp(state, topicId))
  const relateds = useSelector(state => relatedsProp(state, topicId))
  const hasMoreRelateds = useSelector(
    state =>
      _.get(state, [relatedPostsOf, 'byId', topicId, 'more', 'length'], 0) > 0
  )

  const fetchAFullTopicWithCatch = slug => {
    if (slug === emptySlug) return

    dispatch(fetchAFullTopic(slug))
      .catch(failAction => {
        logger.errorReport({
          report: _.get(failAction, 'payload.error'),
          message: `Error to fetch a full topic, topic slug: '${slug}'. `,
        })
      })
      .then(successAction => {
        const topicId = _.get(successAction, 'payload.topic.id', '')
        if (topicId) {
          return dispatch(fetchRelatedPostsOfAnEntity(topicId))
        }
      })
      .catch(failAction => {
        logger.errorReport({
          report: _.get(failAction, 'payload.error'),
          message: `Error to fetch a topic's related posts, topic slug: '${slug}'. `,
        })
      })
  }

  const loadMore = () => {
    const id = _.get(topic, 'id', '')
    const slug = _.get(topic, 'slug', '')

    if (id && hasMoreRelateds) {
      return dispatch(fetchRelatedPostsOfAnEntity(id)).catch(failAction => {
        logger.errorReport({
          report: _.get(failAction, 'payload.error'),
          message: `Error to fetch topic's related posts, topic slug: '${slug}'. `,
        })
      })
    }
  }

  useEffect(() => {
    fetchAFullTopicWithCatch(slugToFetch)
  }, [slugToFetch])

  const renderLoadingElements = () => (
    <Container>
      <BannerPlaceholder />
    </Container>
  )

  const renderTopic = topic => {
    const {
      title_position: titlePosition,
      og_image: ogImage,
      leading_image: leadingImage,
      leading_video: leadingVideo,
      leading_image_portrait: leadingImagePortrait,
      headline,
      subtitle,
      title,
      slug,
    } = topic
    const topicDescription = _.get(topic, 'description.api_data', [])
    const teamDescription = _.get(topic, 'team_description.api_data', [])
    const ogDescription = _.get(topic, 'og_description', '') || siteMeta.desc
    const ogTitle = _.get(topic, 'og_title', '') || _.get(topic, 'title', '')
    const publishedDate = _.get(topic, 'published_date', '')

    const canonical = `${siteMeta.urlOrigin}/topics/${slug}`
    const fullTitle = ogTitle + siteMeta.name.separator + siteMeta.name.full

    let metaImg = siteMeta.ogImage
    if (_.get(topic, 'og_image.resized_targets.tablet.url')) {
      metaImg = topic.og_image.resized_targets.tablet
    } else if (_.get(topic, 'leading_image.resized_targets.tablet.url')) {
      metaImg = topic.leading_image.resized_targets.tablet
    }

    const metaOgImage = [
      { property: 'og:image', content: replaceGCSUrlOrigin(metaImg.url) },
    ]
    if (metaImg.height) {
      metaOgImage.push({ property: 'og:image:height', content: metaImg.height })
    }
    if (metaImg.width) {
      metaOgImage.push({ property: 'og:image:width', content: metaImg.width })
    }

    return (
      <Fragment>
        <Helmet
          prioritizeSeoTags
          title={fullTitle}
          link={[{ rel: 'canonical', href: canonical }]}
          meta={[
            { name: 'description', content: ogDescription },
            { name: 'twitter:title', content: fullTitle },
            { name: 'twitter:description', content: ogDescription },
            {
              name: 'twitter:image',
              content: replaceGCSUrlOrigin(metaImg.url),
            },
            { name: 'twitter:card', content: 'summary_large_image' },
            { property: 'og:title', content: fullTitle },
            { property: 'og:description', content: ogDescription },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: canonical },
            { property: 'og:rich_attachment', content: 'true' },
            ...metaOgImage,
          ]}
        />
        <Banner
          theme={titlePosition}
          headline={headline}
          title={title}
          subtitle={subtitle}
          publishedDate={publishedDate}
          leadingVideo={leadingVideo}
          leadingImage={leadingImage}
          leadingImagePortrait={leadingImagePortrait}
          ogImage={ogImage}
        />
        <Description
          topicDescription={topicDescription}
          teamDescription={teamDescription}
        />
      </Fragment>
    )
  }

  if (errorOfTopic || slugToFetch === '') {
    return <SystemError error={errorOfTopic || { statusCode: 404 }} />
  }

  if (isFetchingTopic) {
    return renderLoadingElements()
  }

  if (!topic) {
    return <SystemError error={{ statusCode: 500 }} />
  }

  return (
    <Container>
      {renderTopic(topic)}
      <Related
        items={relateds}
        format={_.get(topic, 'relateds_format')}
        background={_.get(topic, 'relateds_background')}
        isFetching={isFetchingRelateds}
        hasMore={hasMoreRelateds}
        loadMore={loadMore}
        // TODO: show error message to user
        error={errorOfRelateds}
      />
    </Container>
  )
}

/**
 *  @typedef {import('@twreporter/redux/lib/typedef').ReduxState} ReduxState
 */

/**
 *  @typedef {import('../utils/shallow-clone-entity').FullTopic} FullTopic
 */

/**
 *  @typedef {import('../utils/shallow-clone-entity').MetaOfPost} MetaOfPost
 */

const memoizeShallowCloneFullTopic = memoizeOne(
  cloneUtils.shallowCloneFullTopic
)

/**
 *  This function returns a topic which is cloned from entities state.
 *  @param {ReduxState} state
 *  @param {string} id - id of topic
 *  @return {FullTopic}
 */
function topicProp(state, id) {
  const topic = _.get(state, [entities, topicsInEntities, 'byId', id], null)
  return memoizeShallowCloneFullTopic(topic)
}

/**
 *  This function returns cloned related posts of the topic.
 *  @param {ReduxState} state
 *  @param {string} id - id of topic
 *  @return {MetaOfPost[]}
 */
function relatedsProp(state, id) {
  const relatedPostIds = _.get(state, [relatedPostsOf, 'byId', id, 'items'], [])
  const relateds = []
  _.forEach(relatedPostIds, postId => {
    const post = _.get(state, [entities, postsInEntities, 'byId', postId], null)
    if (post !== null) {
      relateds.push(cloneUtils.shallowCloneMetaOfPost(post))
    }
  })
  return relateds
}

export { TopicLandingPage }
export default TopicLandingPage
