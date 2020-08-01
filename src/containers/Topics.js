import { connect } from 'react-redux'
import { date2yyyymmdd } from '@twreporter/core/lib/utils/date'
import { formatPostLinkTarget, formatPostLinkTo } from '../utils/url'
import { TopicsList } from '@twreporter/react-components/lib/listing-page'
import Helmet from 'react-helmet'
import loggerFactory from '../logger'
import Pagination from '../components/Pagination'
import PropTypes from 'prop-types'
import querystring from 'querystring'
import React, { Component } from 'react'
import siteMeta from '../constants/site-meta'
import styled from 'styled-components'
import SystemError from '../components/SystemError'
import twreporterRedux from '@twreporter/redux'
// lodash
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import map from 'lodash/map'

const _ = {
  forEach,
  get,
  map,
}

const { actions, reduxStateFields, utils } = twreporterRedux
const { fetchTopics, fetchFeatureTopic } = actions
const { denormalizeTopics } = utils

const logger = loggerFactory.getLogger()

const PageContainer = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  padding: 30px 24px 0 24px;
`

const firstPage = 1

class Topics extends Component {
  componentDidMount() {
    this.fetchTopicsWithCatch()
    this.featchFeatureTopicWithCatch()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.page !== this.props.page) {
      this.fetchTopicsWithCatch()
      this.featchFeatureTopicWithCatch()
    }
  }

  fetchTopicsWithCatch() {
    const  {
      fetchTopics,
      nPerPage,
      page,
    } = this.props

    fetchTopics(page, nPerPage)
      .catch((failAction) => {
        logger.errorReport({
          report: _.get(failAction, 'payload.error'),
          message: `Error to fetch topics ( page: ${page} )`
        })
      })
  }

  featchFeatureTopicWithCatch() {
    const  {
      fetchFeatureTopic,
      page,
    } = this.props

    if (page === firstPage) {
      fetchFeatureTopic()
        .catch((failAction) => {
          logger.errorReport({
            report: _.get(failAction, 'payload.error'),
            message: `Error to fetch feature topic`
          })
        })
    }
  }

  render() {
    const {
      error,
      isFetching,
      page,
      pathname,
      topics,
      totalPages,
    } = this.props

    // Error handling
    if (error) {
      return (
        <SystemError error={error} />
      )
    }

    /* For helmet */
    const canonical = `${siteMeta.urlOrigin}/topics`
    const title = '專題' + siteMeta.name.separator + siteMeta.name.full
    return (
      <PageContainer>
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
        <TopicsList
          currentPage={page}
          topics={topics}
          isFetching={isFetching}
          showSpinner={true}
        />
        <Pagination
          currentPage={page}
          totalPages={totalPages}
        />
      </PageContainer>
    )
  }
}

Topics.propTypes = {
  error: PropTypes.object,
  isFetching: PropTypes.bool,
  nPerPage: PropTypes.number,
  page: PropTypes.number,
  pathname: PropTypes.string,
  topics: PropTypes.array,
  totalPages: PropTypes.number,
}

/**
 *  @typedef {import('@twreporter/redux/lib/typedef').ReduxState} ReduxState
 */

/**
 *  @param {Object} [location={}] - react-router location object
 *  @return {number} current page
 */
function pageProp(location={}) {
  const search = _.get(location, 'search', '')
  const searchWithoutPrefix = typeof search === 'string' ? search.replace(/^\?/, '') : search
  const pageStr = _.get(querystring.parse(searchWithoutPrefix), 'page', `${firstPage}`)
  let page = parseInt(Array.isArray(pageStr) ? pageStr[0] : pageStr, 10)

  if (isNaN(page) || page < firstPage) {
    page = firstPage
  }

  return page
}

/**
 *  @param {ReduxState} state
 *  @return {number} how many topics to show per page
 */
function nPerPageProp(state) {
  const defaultValue = 5
  const nPerPage = parseInt(_.get(state, [reduxStateFields.topicList, 'nPerPage']), 10)

  if (isNaN(nPerPage)) {
    return defaultValue
  }

  return nPerPage
}

/**
 *  @param {ReduxState} state
 *  @return {number} total pages
 */
function totalPagesProp(state) {
  return _.get(state, [reduxStateFields.topicList, 'totalPages'], 0)
}

/**
 *  @param {ReduxState} state
 *  @return {boolean} indicate if it's requesting api or not
 */
function isFetchingProp(state) {
  return _.get(state, [reduxStateFields.topicList, 'isFetching'])
}

/**
 *  @param {ReduxState} state
 *  @return {Object} error object
 */
function errorProp(state) {
  return _.get(state, [reduxStateFields.topicList, 'error'])
}

/**
 *  @typedef {Object} PostProp
 *  @property {string} id - post id
 *  @property {string} title - post title
 *  @property {string} imgUrl - image url
 *  @property {string} linkTo - hyperlink of the post
 *  @property {string|undefined} linkTarget - target attribute of <a>
 */

/**
 *  @typedef {Object} TopicProp
 *  @property {boolean} full - if the topic is full object or only contains metadata
 *  @property {string} id - topic id
 *  @property {string} linkTo - hyperlink of the topic
 *  @property {string} title - topic title
 *  @property {string} shortTitle - topic short title
 *  @property {string} updatedAt - topic last updated time
 *  @property {string} description - topic og description
 *  @property {string} imgUrl - image url
 *  @property {string} imgAlt - image alt
 *  @property {PostProp[]} relateds
 */


/**
 *  This function extracts neccessary fields to create a new object
 *  for rendering.
 *
 *  @param {import('@twreporter/redux/lib/typedef').MetaOfTopic} [topic={}]
 *  @return {TopicProp}
 */
function topicProp(topic) {
  const imgUrl = _.get(topic, 'leading_image_portrait.resized_targets.mobile.url') ||
    _.get(topic, 'leading_image.resized_targets.mobile.url') ||
    _.get(topic, 'og_image.resized_targets.mobile.url')

  const imgAlt = _.get(topic, 'leading_image_portrait.description') ||
    _.get(topic, 'leading_image.description') ||
    _.get(topic, 'og_image.description') || ''

  return {
    full: _.get(topic, 'full', false),
    id: _.get(topic, 'id', ''),
    linkTo: `/topics/${_.get(topic, 'slug', '')}`,
    title: _.get(topic, 'title', ''),
    shortTitle: _.get(topic, 'short_title', ''),
    updatedAt: date2yyyymmdd(_.get(topic, 'published_date'), '.') || '',
    description: _.get(topic, 'og_description', ''),
    imgUrl,
    imgAlt,
    relateds: [],
  }
}

/**
 *  This function restores feature topic with embedded posts
 *  according to `ReduxState['featureTopic']`.
 *
 *  @param {ReduxState} state
 *  @return {TopicProp}
 */
function restoreFeatureTopic(state) {
  const {
    entities,
    featureTopic,
    postsInEntities,
    topicList,
    topicsInEntities,
  } = reduxStateFields

  const topicId = _.get(state, [featureTopic, 'id'],
    _.get(state, [topicList, 'items', `${firstPage}`, '0']))

  if (!topicId) {
    return null
  }

  const postEntities = _.get(state, [entities, postsInEntities, 'byId'])
  const topicEntities = _.get(state, [entities, topicsInEntities, 'byId'])

  const lastThreeRelatedPostIds = _.get(state, [featureTopic, 'lastThreeRelatedPostIds'], [])
  const relatedPosts = _.map(lastThreeRelatedPostIds, id => {
    const post = postEntities[id]
    const isExternal = _.get(post, 'is_external', false)
    const slug = _.get(post, 'slug', '')
    return {
      id: _.get(post, 'id', ''),
      title: _.get(post, 'title', ''),
      imgUrl: _.get(post, 'hero_image.resized_targets.mobile.url'),
      linkTo: isExternal ? `/i/${slug}` : `/a/${slug}`,
      linkTarget: isExternal ? '_blank' : undefined,
    }
  })
  const topic = topicProp(topicEntities[topicId])
  topic.relateds = relatedPosts

  return topic
}

/**
 *  This function is to create an array of TopicProp elements
 *  for rendering.
 *
 *  @param {ReduxState} state
 *  @param {number} page - current page
 *  @return {TopicProp[]}
 */
function topicsProp(state, page) {
  const { entities, topicsInEntities, topicList } = reduxStateFields
  const topicEntities = _.get(state, [entities, topicsInEntities, 'byId'])
  const listObj = _.get(state, topicList)
  const ids = _.get(listObj, ['items', page], [])
  const topics = []
  _.forEach(ids, id => {
    const topic = _.get(topicEntities, id)
    if (topic) {
      topics.push(topicProp(topic))
    }
  })

  const featureTopic = restoreFeatureTopic(state)
  if (page === firstPage && featureTopic !== null ) {
    topics[0] = featureTopic
  }

  return topics
}

/**
 *  @typedef {Object} TopicsProps
 *  @property {Object} error - error object
 *  @property {boolean} isFetching - if it is requesting api or not
 *  @property {number} nPerPage - how many topics to show per page
 *  @property {number} page - current page for pagination
 *  @property {string} pathname - URL path
 *  @property {TopicProp[]} topics - array of topics
 *  @property {number} totalPages - total page for pagination
 */

/**
 *  @param {ReduxState} state
 *  @param {Object} props
 *  @param {Object} props.location - react-router location object
 *  @param {string} props.location.pathname
 *  @param {Object} props.match - react-router match object
 *  @param {Object} props.match.params
 *  @param {string} props.match.params.tagId
 *  @return {TopicsProps}
 */
function mapStateToProps(state, props) {
  const location = _.get(props, 'location')
  const pathname = _.get(location, 'pathname', `/topics`)

  const page = pageProp(location)

  return {
    error: errorProp(state),
    isFetching: isFetchingProp(state),
    nPerPage: nPerPageProp(state),
    page,
    pathname,
    topics: topicsProp(state, page),
    totalPages: totalPagesProp(state),
  }
}

export default connect(mapStateToProps, { fetchTopics, fetchFeatureTopic })(Topics)
