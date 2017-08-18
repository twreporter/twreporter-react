import React, { Component } from 'react'
import Helmet from 'react-helmet'
import { TopicsComponents } from 'twreporter-react-listing-components'
import twreporterRedux from 'twreporter-redux'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { date2yyyymmdd, formatPostLinkTo, formatPostLinkTarget } from '../utils'
import { LINK_PREFIX, BRIGHT, SITE_META, SITE_NAME } from '../constants/'
import More from '../components/More'
import { setHeaderInfo } from '../actions/header'

import map from 'lodash/map'
import get from 'lodash/get'

const _ = {
  get,
  map
}

const { actions, reduxStateFields, utils } = twreporterRedux
const { fetchTopics, fetchAFullTopic } = actions
const { denormalizeTopics } = utils
const { PageContent, TopSection, ListSection, PostsContainer, PostItem, TopicItem } = TopicsComponents
const N_OF_FIRSTPAGE = 5
const N_PER_PAGE = 5

const PageContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 30px 0 0 0;
`

class Topics extends Component {
  constructor(props) {
    super(props)
    this._loadMore = this._loadMore.bind(this)
  }
  componentWillMount() {
    const { items, topicEntities, setHeaderInfo } = this.props
    setHeaderInfo({
      pageTheme: BRIGHT
    })
    if (items.length <= 0) {
      return this.props.fetchTopics(N_OF_FIRSTPAGE)
    } else {
      const firstTopicSlug = items[0]
      const isFirstTopicFull = _.get(topicEntities, [ firstTopicSlug, 'full' ], false)
      if (!isFirstTopicFull) {
        this.props.fetchAFullTopic(firstTopicSlug)
      }
    }
  }
  componentWillReceiveProps(nextProps) {
    const { items, topicEntities } = nextProps
    if (items.length <= 0) {
      this.props.fetchTopics(N_OF_FIRSTPAGE)
    } else {
      const firstTopicSlug = items[0]
      const isFirstTopicFull = _.get(topicEntities, [ firstTopicSlug, 'full' ], false)
      if (!isFirstTopicFull) {
        this.props.fetchAFullTopic(firstTopicSlug)
      }
    }
  }

  _loadMore() {
    this.props.fetchTopics(N_PER_PAGE)
  }
  
  _buildRelatedPosts(posts) {
    const _buildPostJSX = (post, index) => {
      const slug = _.get(post, 'slug')
      const style = _.get(post, 'style')
      return (
        <PostItem
          key={`topic-post-${_.get(post, 'id', index)}`}
          title={_.get(post, 'title')}
          imgUrl={_.get(post, 'hero_image.resized_targets.mobile.url')}
          linkTo={formatPostLinkTo(slug, style)}
          linkTarget={formatPostLinkTarget(style)}
        />
      )
    }
    return _.map(posts, _buildPostJSX)
  }

  _buildTopicBoxes(topics) {
    const _buildTopicBox = (item, index='') => (
      <TopicItem
        key={`topic-item-${_.get(item, 'id', index)}`}
        title={_.get(item, 'title', '')}
        updatedAt={date2yyyymmdd(_.get(item, 'updated_at'), '.') || ''}
        description={_.get(item, 'og_description', '')}
        imgUrl={_.get(item, 'og_image.resized_targets.mobile.url', '') || _.get(item, 'leading_image.resized_targets.mobile.url', '') }
        imgAlt={_.get(item, 'og_image.description', '') || _.get(item, 'leading_image.description', '')}
        isFull={index === 0}
        url={`${LINK_PREFIX.TOPICS}${_.get(item, 'slug')}`}
      />
    )
    return _.map(topics, _buildTopicBox)
  }

  render() {
    const { items, total, topicEntities, postEntities, topicListError, topicError } = this.props
    const topics = denormalizeTopics(items, topicEntities, postEntities)
    const topicsLength = topics.length
    if (topicsLength <= 0) {
      if (topicListError) {
        return (<div><SystemError error={topicListError} /></div>)
      }
      return null
    }
    const topicsJSX = this._buildTopicBoxes(topics)
    const topTopicJSX = topicsJSX[0]
    const otherTopicsJSX = !topicError ? topicsJSX.slice(1) : topTopicJSX
    const topRelatedPosts = _.get(topics, [ 0, 'relateds' ], []).slice(0, 3)
    const topTopicName = _.get(topics, [ 0, 'topic_name' ], '')
    const topTopicSlug = _.get(topics, [ 0, 'slug' ], '')
    const hasMore = topicsLength < total
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
        <PageContent>
          {topicError ? null : (
            <TopSection topicName={topTopicName} topicUrl={`${LINK_PREFIX.TOPICS}${topTopicSlug}`}>
              {topTopicJSX}
              <PostsContainer>
                {this._buildRelatedPosts(topRelatedPosts)}
              </PostsContainer>
            </TopSection>)}
          <ListSection>
            {otherTopicsJSX}
          </ListSection>
        </PageContent>
        {!hasMore ? null : (
          <div>
            <More loadMore={this._loadMore}>
              <span style={{ color: topicListError ? 'red' : 'white' }}>{topicListError ? '載入更多（請重試）' : '載入更多'}</span>
            </More>
          </div>
        )}
      </PageContainer>
    )
  }
}

function mapStateToProps(state) {
  const items = _.get(state, [ reduxStateFields.topicList, 'items' ], [])
  const total = _.get(state, [ reduxStateFields.topicList, 'total' ])
  const topicListError = _.get(state, [ reduxStateFields.topicList, 'error' ], null)
  const topicError = _.get(state, [ reduxStateFields.selectedTopic, 'error' ], null)
  const entities = _.get(state, reduxStateFields.entities, {})
  const topicEntities = _.get(entities, reduxStateFields.topicsInEntities, {})
  const postEntities = _.get(entities, reduxStateFields.postsInEntities, {})
  return ({
    items,
    total,
    topicEntities,
    postEntities,
    topicListError,
    topicError
  })
}

export default connect(mapStateToProps, { fetchTopics, fetchAFullTopic, setHeaderInfo })(Topics)
