import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { TopicsList } from 'twreporter-react-components'
import Pagination from '../components/Pagination'
import SystemError from '../components/SystemError'
import twreporterRedux from 'twreporter-redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { date2yyyymmdd, formatPostLinkTo, formatPostLinkTarget } from '../utils'
import { LINK_PREFIX, BRIGHT, SITE_META, SITE_NAME } from '../constants/'
import { setHeaderInfo } from '../actions/header'

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

const N_PER_PAGE = 5

const PageContainer = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  padding: 30px 0 0 0;
`

class Topics extends Component {
  static fetchData({ store, query }) {
    const page = parseInt(_.get(query, 'page', 1), 10)
    return store.dispatch(fetchTopics(page, N_PER_PAGE))
      .then(() => {
        /* fetch full topic if is at first page */
        if (page === 1) {
          const state = store.getState()
          const firstTopicSlug = _.get(state, [ reduxStateFields.topicList, 'items', page, 0 ], '')
          if (firstTopicSlug) {
            return store.dispatch(fetchAFullTopic(firstTopicSlug))
          }
          return Promise.resolve('At first page but there is no firstTopicSlug')
        }
        return Promise.resolve()
      })
  }

  componentWillMount() {
    const pageTheme = _.get(this.props, 'pageTheme')
    if (pageTheme !== BRIGHT) {
      this.props.setHeaderInfo({
        pageTheme: BRIGHT
      })
    }
    return this._clientFetchData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    return this._clientFetchData(nextProps)
  }

  _clientFetchData(props) {
    const { topics, isTopicFetching, isTopicsFetching, page, totalPages } = props
    if (!_.isInteger(page) || page <= 0 || page > totalPages) {
      return
    }
    const topicsLength = _.get(topics, 'length', 0)
    if (topicsLength <= 0 && !isTopicsFetching) {
      return props.fetchTopics(page, N_PER_PAGE)
    }
    if (page === 1 && !isTopicFetching) {
      const firstTopic = topics[0]
      const firstTopicSlug = _.get(firstTopic, 'slug', '')
      const isFirstTopicFull = _.get(firstTopic, 'full', false)
      if (firstTopicSlug && !isFirstTopicFull) {
        props.fetchAFullTopic(firstTopicSlug)
      }
    }
  }
  
  render() {
    const { topics, page, totalPages, topicError, topicListError, pathname, isTopicFetching, isTopicsFetching } = this.props

    const isFirstTopicWaitToFetchFull = _.get(topics, [ 1, 'full' ], false) && !topicError
    const isFetching = isTopicFetching || isTopicsFetching || isFirstTopicWaitToFetchFull
    const topicsLength = _.get(topics, 'length')

    /* If page value is invalid, render error 404 */
    if (!_.isInteger(page) || page <= 0 || page > totalPages) {
      return (
        <div>
          <SystemError
            error={{
              status: 404,
              message: `Page value should be and integer between 1 and ${totalPages}, but is ${page}`
            }}
          />
        </div>)
    }

    /* 
      If fetching list data failed and there's no topics data in the store,
      render error 500
    */
    if (topicListError && topicsLength <= 0) {
      return (
        <div>
          <SystemError
            error={{
              status: 500,
              message: topicListError
            }}
          />
        </div>
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
        linkTo: `${LINK_PREFIX.TOPICS}${_.get(topic, 'slug')}`,
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
    const canonical = `${SITE_META.URL}topics`
    const title = '專題' + SITE_NAME.SEPARATOR + SITE_NAME.FULL
    return (
      <PageContainer>
        <Helmet
          title={title}
          link={[
            { rel: 'canonical', href: canonical }
          ]}
          meta={[
            { name: 'description', content: SITE_META.DESC },
            { name: 'twitter:title', content: title },
            { name: 'twitter:description', content: SITE_META.DESC },
            { name: 'twitter:image', content: SITE_META.OG_IMAGE },
            { property: 'og:title', content: title },
            { property: 'og:description', content: SITE_META.DESC },
            { property: 'og:image', content: SITE_META.OG_IMAGE },
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
          pathname={pathname}
        />
      </PageContainer>
    )
  }
}

Topics.propTypes = {
  topics: React.PropTypes.array,
  total: React.PropTypes.number,
  topicListError: React.PropTypes.object,
  topicError: React.PropTypes.object
}

function mapStateToProps(state, ownProps) {
  const location = _.get(ownProps, 'location')
  const pathname = _.get(location, 'pathname', '/topics')
  const locationPage = parseInt(_.get(location, 'query.page', 1), 10)
  const topicList = _.get(state, reduxStateFields.topicList)
  const selectedTopic = _.get(state, reduxStateFields.selectedTopic)

  const page = locationPage || _.get(topicList, 'page', 1) 
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

  const pageTheme = _.get(state, 'header.pageTheme', BRIGHT)

  return ({
    page,
    nPerPage,
    totalPages,
    topics,
    isTopicFetching,
    isTopicsFetching,
    topicListError,
    topicError,
    pathname,
    pageTheme
  })
}

export default connect(mapStateToProps, { fetchTopics, fetchAFullTopic, setHeaderInfo })(Topics)
