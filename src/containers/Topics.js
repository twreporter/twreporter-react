import { connect } from 'react-redux'
import { date2yyyymmdd } from '@twreporter/core/lib/utils/date'
import { formatPostLinkTarget, formatPostLinkTo } from '../utils/url'
import { TopicsList } from '@twreporter/react-components/lib/listing-page'
import Helmet from 'react-helmet'
import loggerFactory from '../logger'
import Pagination from '../components/Pagination'
import PropTypes from 'prop-types'
import qs from 'qs'
import React, { Component } from 'react'
import siteMeta from '../constants/site-meta'
import styled from 'styled-components'
import SystemError from '../components/SystemError'
import twreporterRedux from '@twreporter/redux'
// lodash
import concat from 'lodash/concat'
import get from 'lodash/get'
import isInteger from 'lodash/isInteger'
import map from 'lodash/map'
import uniq from 'lodash/uniq'

const _ = {
  concat,
  get,
  isInteger,
  map,
  uniq
}

const { actions, reduxStateFields, utils } = twreporterRedux
const { fetchTopics, fetchAFullTopic } = actions
const { denormalizeTopics } = utils

const logger = loggerFactory.getLogger()

const PageContainer = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  padding: 30px 24px 0 24px;
`

class Topics extends Component {
  componentDidMount() {
    return this._clientFetchData(this.props)
  }

  componentDidUpdate() {
    return this._clientFetchData(this.props)
  }

  fetchAFullTopicWithCatch = (slug) => {
    return this.props.fetchAFullTopic(slug)
      .catch((failAction) => {
        // TODO render alert message
        logger.errorReport({
          report: _.get(failAction, 'payload.error'),
          message: `Error to fetch a full topic (slug: '${slug}').`
        })
      })
  }

  fetchTopicsWithCatch = (page) => {
    const numberPerPage = 5
    return this.props.fetchTopics(page, numberPerPage)
      .catch((failAction) => {
        logger.errorReport({
          report: _.get(failAction, 'payload.error'),
          message: `Error to fetch topics ( page: ${page} )`
        })
      })

  }

  _clientFetchData(props) {
    const { topics, isTopicFetching, isTopicsFetching, page, totalPages } = props
    if (
      !_.isInteger(page) ||
      page < 1 ||
      totalPages && (page > totalPages)
    ) {
      return
    }
    const topicsLength = _.get(topics, 'length', 0)
    if (topicsLength <= 0 && !isTopicsFetching) {
      return this.fetchTopicsWithCatch(page)
    }
    if (page === 1 && !isTopicFetching) {
      const firstTopic = topics[0]
      const firstTopicSlug = _.get(firstTopic, 'slug', '')
      const isFirstTopicFull = _.get(firstTopic, 'full', false)
      if (firstTopicSlug && !isFirstTopicFull) {
        this.fetchAFullTopicWithCatch(firstTopicSlug)
      }
    }
  }

  render() {
    const {
      isTopicFetching,
      isTopicsFetching,
      page,
      topicListError,
      topics,
      totalPages
    } = this.props

    const isFetching = isTopicFetching || isTopicsFetching
    const topicsLength = _.get(topics, 'length')

    if (topicListError && topicsLength <= 0) {
      return (
        <div>
          <SystemError error={topicListError} />
        </div>
      )
    }

    if (
      !_.isInteger(page) ||
      page < 1 ||
      totalPages && (page > totalPages)
    ) {
      return (
        <SystemError error={{ statusCode: 404 }} />
      )
    }

    const topicsProps = _.map(topics, (topic, index) => {
      const imgUrl = _.get(topic, 'leading_image_portrait.resized_targets.mobile.url') ||
        _.get(topic, 'leading_image.resized_targets.mobile.url') ||
        _.get(topic, 'og_image.resized_targets.mobile.url') || ''

      const imgAlt = _.get(topic, 'leading_image_portrait.description') ||
        _.get(topic, 'leading_image.description') ||
        _.get(topic, 'og_image.description') || ''

      return ({
        full: _.get(topic, 'full', false),
        id: _.get(topic, 'id', index),
        linkTo: `/topics/${_.get(topic, 'slug')}`,
        title: _.get(topic, 'title', ''),
        topic_name: _.get(topic, 'topic_name', ''),
        updatedAt: date2yyyymmdd(_.get(topic, 'published_date'), '.') || '',
        description: _.get(topic, 'og_description', ''),
        imgUrl,
        imgAlt,
        relateds: index > 0 ? null : _.map(_.get(topic, 'relateds', []), post => ({
          id: _.get(post, 'id', index),
          title: _.get(post, 'title', ''),
          imgUrl: _.get(post, 'hero_image.resized_targets.mobile.url'),
          linkTo: formatPostLinkTo(_.get(post, 'slug', ''), _.get(post, 'style', '')),
          linkTarget: formatPostLinkTarget(_.get(post, 'style', ''))
        }))
      })
    })

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
            { name: 'twitter:image', content: siteMeta.ogImage },
            { property: 'og:title', content: title },
            { property: 'og:description', content: siteMeta.desc },
            { property: 'og:image', content: siteMeta.ogImage },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: canonical }
          ]}
        />
        <TopicsList
          currentPage={page}
          topics={topicsProps}
          isFetching={isFetching}
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
  topics: PropTypes.array,
  total: PropTypes.number,
  topicListError: PropTypes.object,
  topicError: PropTypes.object,
  // react-router `location` object
  location: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  const defaultStartPage = 1
  const location = _.get(ownProps, 'location')
  const pathname = _.get(location, 'pathname', '/topics')
  const search = _.get(location, 'search')
  const query = qs.parse(search, { ignoreQueryPrefix: true })
  const page = parseInt(_.get(query, 'page', defaultStartPage), 10)
  const topicList = _.get(state, reduxStateFields.topicList)
  const selectedTopic = _.get(state, reduxStateFields.selectedTopic)

  const nPerPage = _.get(topicList, 'nPerPage', 5)
  const totalPages = _.get(topicList, 'totalPages', NaN)

  const pageItems = _.uniq(_.get(topicList, [ 'items', page ], []))
  const entities = _.get(state, reduxStateFields.entities, {})
  const topicEntities = _.get(entities, reduxStateFields.topicsInEntities, {})
  const postEntities = _.get(entities, reduxStateFields.postsInEntities, {})
  const topics = denormalizeTopics(pageItems, topicEntities, postEntities)

  const isTopicFetching = _.get(selectedTopic, 'isFetching', false)
  const isTopicsFetching = _.get(topicList, 'isFetching', false)

  const topicListError = _.get(topicList, 'error', null)
  const topicError = _.get(selectedTopic, 'error', null)

  return ({
    page,
    nPerPage,
    totalPages,
    topics,
    isTopicFetching,
    isTopicsFetching,
    topicListError,
    topicError,
    pathname
  })
}

export default connect(mapStateToProps, { fetchTopics, fetchAFullTopic })(Topics)
