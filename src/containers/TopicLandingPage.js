/* eslint camelcase: ["error", {"properties": "never", ignoreDestructuring: true}] */

import { connect } from 'react-redux'
import { replaceGCSUrlOrigin } from '@twreporter/core/lib/utils/storage-url-processor'
import Banner from '../components/topic/banner'
import Description from '../components/topic/description'
import Helmet from 'react-helmet'
import loggerFactory from '../logger'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Related from '../components/topic/related'
import memoizeOne from 'memoize-one'
import siteMeta from '../constants/site-meta'
import styled from 'styled-components'
import SystemError from '../components/SystemError'

// utils
import cloneUtils from '../utils/shallow-clone-entity'

// @twreporter
import twreporterRedux from '@twreporter/redux'

// lodash
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import merge from 'lodash/merge'

const logger = loggerFactory.getLogger()
const { actions, reduxStateFields } = twreporterRedux
const { fetchAFullTopic, fetchRelatedPostsOfAnEntity } = actions
const _ = {
  forEach,
  get,
  merge,
}

const Container = styled.div`
  position: relative;
`

const BannerPlaceholder = styled.div`
  height: 100vh;
  background: transparent;
`

const emptySlug = ''

class TopicLandingPage extends Component {
  static defaultProps = {
    errorOfTopic: null,
    errorOfRelateds: null,
    isFetchingTopic: false,
    isFetchingRelateds: false,
    topic: null,
    relateds: [],
    hasMoreRelateds: false,
    slugToFetch: emptySlug,
  }

  static propTypes = {
    errorOfTopic: PropTypes.object,
    errorOfRelateds: PropTypes.object,
    isFetchingTopic: PropTypes.bool,
    isFetchingRelateds: PropTypes.bool,
    // TODO: topic: propTypesConst.fullTopic
    topic: PropTypes.object,
    // TODO: relateds: PropTypes.arrayOf(propTypesConst.post)
    relateds: PropTypes.array,
    hasMoreRelateds: PropTypes.bool,
    slugToFetch: PropTypes.string,
    fetchAFullTopic: PropTypes.func,
    fetchRelatedPostsOfAnEntity: PropTypes.func,
  }

  componentDidMount() {
    const { slugToFetch } = this.props
    this.fetchAFullTopicWithCatch(slugToFetch)
  }

  fetchAFullTopicWithCatch = slug => {
    if (slug === emptySlug) {
      return
    }

    const { fetchAFullTopic, fetchRelatedPostsOfAnEntity } = this.props
    fetchAFullTopic(slug)
      // TODO render alert message for users
      .catch(failAction => {
        logger.errorReport({
          report: _.get(failAction, 'payload.error'),
          message: `Error to fetch a full topic, topic slug: '${slug}'. `,
        })
      })
      .then(successAction => {
        const topicId = _.get(successAction, 'payload.topic.id', '')
        if (topicId) {
          return fetchRelatedPostsOfAnEntity(topicId)
        }
      })
      .catch(failAction => {
        logger.errorReport({
          report: _.get(failAction, 'payload.error'),
          message: `Error to fetch a topic's related posts, topic slug: '${slug}'. `,
        })
      })
  }

  loadMore = () => {
    const { fetchRelatedPostsOfAnEntity, topic, hasMoreRelateds } = this.props

    const id = _.get(topic, 'id', '')
    const slug = _.get(topic, 'slug', '')

    if (id && hasMoreRelateds) {
      return fetchRelatedPostsOfAnEntity(id).catch(failAction => {
        logger.errorReport({
          report: _.get(failAction, 'payload.error'),
          message: `Error to fetch topic's related posts, topic slug: '${slug}'. `,
        })
      })
    }
  }

  _renderLoadingElements() {
    /* TODO: Add loading mockup or spinner */
    return (
      <Container>
        <BannerPlaceholder />
      </Container>
    )
  }

  _renderTopic(topic) {
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

    let metaImg
    if (_.get(topic, 'og_image.resized_targets.tablet.url')) {
      metaImg = topic.og_image.resized_targets.tablet
    } else if (_.get(topic, 'leading_image.resized_targets.tablet.url')) {
      metaImg = topic.leading_image.resized_targets.tablet
    } else {
      metaImg = siteMeta.ogImage
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
      <React.Fragment>
        <Helmet
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
      </React.Fragment>
    )
  }

  render() {
    const {
      errorOfTopic,
      errorOfRelateds,
      isFetchingTopic,
      isFetchingRelateds,
      topic,
      relateds,
      hasMoreRelateds,
    } = this.props

    if (errorOfTopic) {
      return <SystemError error={errorOfTopic} />
    }

    if (isFetchingTopic) {
      return this._renderLoadingElements()
    }

    if (!topic) {
      return <SystemError error={{ statusCode: 500 }} />
    }

    return (
      <Container>
        {this._renderTopic(topic)}
        <Related
          items={relateds}
          format={_.get(topic, 'relateds_format')}
          background={_.get(topic, 'relateds_background')}
          isFetching={isFetchingRelateds}
          hasMore={hasMoreRelateds}
          loadMore={this.loadMore}
          // TODO: show error message to user
          error={errorOfRelateds}
        />
      </Container>
    )
  }
}

const {
  entities,
  relatedPostsOf,
  selectedTopic,
  postsInEntities,
  topicsInEntities,
} = reduxStateFields

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

/**
 *  @typedef {Object} TopicLandingPageProps
 *  @property {Object} errorOfTopic
 *  @property {Object} errorOfRelateds
 *  @property {boolean} isFetchingTopic
 *  @property {boolean} isFetchingRelateds
 *  @property {Object} topic
 *  @property {MetaOfPost[]} relateds
 *  @property {boolean} hasMoreRelateds
 *  @property {string} slugToFetch - topic slug to fetch due to no content in redux state
 */

/**
 *  @param {ReduxState} state
 *  @param {Object} props
 *  @param {Object} props.match - react-router match object
 *  @param {Object} props.match.params
 *  @param {string} props.match.params.slug
 *  @return {TopicLandingPageProps}
 */
function mapStateToProps(state, props) {
  const currentTopicSlug = _.get(props, 'match.params.slug', emptySlug)

  const defaultRtn = {
    errorOfTopic: null,
    errorOfRelateds: null,
    isFetchingTopic: false,
    isFetchingRelateds: false,
    topic: null,
    relateds: [],
    hasMoreRelateds: false,
    slugToFetch: emptySlug,
  }

  if (currentTopicSlug === emptySlug) {
    return Object.assign(defaultRtn, {
      errorOfTopic: { statusCode: 404 },
    })
  }

  // user clicks another topic
  const slug = _.get(state, [selectedTopic, 'slug'], emptySlug)
  if (currentTopicSlug !== slug) {
    return Object.assign(defaultRtn, {
      isFetchingTopic: true,
      // set slugToFetch to current topic slug to
      // make requests to api server to fetch that topic
      slugToFetch: currentTopicSlug,
    })
  }

  // the results of a full topic or corresponding related posts are changed
  const topicId = _.get(
    state,
    [entities, topicsInEntities, 'slugToId', slug],
    ''
  )
  return {
    errorOfTopic: _.get(state, [selectedTopic, 'error'], null),
    errorOfRelateds: _.get(
      state,
      [relatedPostsOf, 'byId', topicId, 'error'],
      null
    ),
    isFetchingTopic: _.get(state, [selectedTopic, 'isFetching'], false),
    isFetchingRelateds: _.get(
      state,
      [relatedPostsOf, 'byId', topicId, 'isFetching'],
      false
    ),
    topic: topicProp(state, topicId),
    relateds: relatedsProp(state, topicId),
    hasMoreRelateds:
      _.get(state, [relatedPostsOf, 'byId', topicId, 'more', 'length'], 0) > 0,
    // set slugToFetch to empty string to
    // avoid from re-fetching the topic already in redux state
    slugToFetch: emptySlug,
  }
}

export { TopicLandingPage }
export default connect(
  mapStateToProps,
  { fetchAFullTopic, fetchRelatedPostsOfAnEntity }
)(TopicLandingPage)
