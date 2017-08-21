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
import { CSSTransitionGroup } from 'react-transition-group'
import concat from 'lodash/concat'
import map from 'lodash/map'
import get from 'lodash/get'
import uniq from 'lodash/uniq'

const _ = {
  concat,
  get,
  map,
  uniq
}

const { actions, reduxStateFields, utils } = twreporterRedux
const { fetchTopics, fetchAFullTopic } = actions
const { denormalizeTopics } = utils
const { PageContent, TopSection, ListSection, PostsContainer, PostItem, TopicItem } = TopicsComponents
const N_OF_FIRSTPAGE = 5
const N_PER_PAGE = 5

const StyledCSSTransitionGroup = styled(CSSTransitionGroup)`
  .topics-container-effect-enter {
    opacity: 0;
  }

  .topics-container-effect-enter.topics-container-effect-enter-active {
    opacity: 1;
    transition: opacity 300ms linear;
  }
`

const PageContainer = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;
  padding: 30px 0 0 0;
`

class Topics extends Component {
  static fetchData({ store }) {
    return store.dispatch(fetchTopics(N_OF_FIRSTPAGE))
      .then(() => {
        const state = store.getState()
        const topicList = _.get(state, reduxStateFields.topicList)
        const items = _.get(topicList, 'items', [])
        const firstTopicSlug = _.get(items, 0, '')
        if (firstTopicSlug) {
          return store.dispatch(fetchAFullTopic(firstTopicSlug))
        }
        return Promise.resolve('No firstTopicSlug')
      })
  }
  constructor(props) {
    super(props)
    this._loadMore = this._loadMore.bind(this)
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

  shouldComponentUpdate(nextProps) {
    /* wait for implement loading spinner */
    /* Only re-render when first topic is full and topics.length > 0 (aka. all data is prepared) */
    const { topics, isTopicsFetching } = nextProps
    return (_.get(topics, [ 0, 'full' ], false) && (_.get(topics, 'length', 0) > 0) && !isTopicsFetching)
  }

  _clientFetchData(props) {
    const { topics, isTopicFetching, isTopicsFetching } = props
    const topicsLength = _.get(topics, 'length', 0)
    if (topicsLength <= 0) {
      if (!isTopicsFetching) {
        return this.props.fetchTopics(N_OF_FIRSTPAGE)
      }
    } else {
      if (!isTopicFetching) {
        const firstTopic = topics[0]
        const isFirstTopicFull = _.get(firstTopic, 'full', false)
        if (!isFirstTopicFull) {
          const firstTopicSlug = _.get(firstTopic, 'slug', '')
          this.props.fetchAFullTopic(firstTopicSlug)
        }
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
        updatedAt={date2yyyymmdd(_.get(item, 'published_date'), '.') || ''}
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
    const { topics, total, topicListError, topicError, isTopicsFetching } = this.props
    
    const canonical = `${SITE_META.URL}topics`
    const title = '專題' + SITE_NAME.SEPARATOR + SITE_NAME.FULL
    const topicsLength = _.get(topics, 'length')
    const isFirstTopicFull = _.get(topics, [ 0, 'full' ], false)
    if (topicsLength <= 0) {
      if (topicListError) {
        return (<div><SystemError error={topicListError} /></div>)
      }
    }
  
    /* Render blank page if data is not all-prepared */
    /* wait for implement loading spinner */
    if (!isFirstTopicFull || topicsLength <= 0 || isTopicsFetching) {
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
          <StyledCSSTransitionGroup
            transitionName="topics-container-effect"
            transitionEnterTimeout={300}
            transitionLeave={false}
          />
        </PageContainer>
      )
    }
    const topicsJSX = this._buildTopicBoxes(topics)
    const topTopicJSX = topicsJSX[0]
    const otherTopicsJSX = !topicError ? topicsJSX.slice(1) : topTopicJSX
    const topRelatedPosts = _.get(topics, [ 0, 'relateds' ], []).slice(0, 3)
    const topTopicName = _.get(topics, [ 0, 'topic_name' ], '')
    const topTopicSlug = _.get(topics, [ 0, 'slug' ], '')
    const hasMore = topicsLength < total
    
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
        <StyledCSSTransitionGroup
          transitionName="topics-container-effect"
          transitionEnterTimeout={300}
          transitionLeave={false}
        >
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
        </StyledCSSTransitionGroup>
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

function mapStateToProps(state) {
  const topicList = _.get(state, reduxStateFields.topicList)
  const selectedTopic = _.get(state, reduxStateFields.selectedTopic)
  const items = _.uniq(_.get(topicList, 'items', []))
  const entities = _.get(state, reduxStateFields.entities, {})
  const topicEntities = _.get(entities, reduxStateFields.topicsInEntities, {})
  const postEntities = _.get(entities, reduxStateFields.postsInEntities, {})
  
  const topics = denormalizeTopics(items, topicEntities, postEntities)

  const isTopicFetching = _.get(selectedTopic, 'isFetching', false)
  const isTopicsFetching = _.get(topicList, 'isFetching', false)

  const total = _.get(topicList, 'total')
  const topicListError = _.get(topicList, 'error', null)
  const topicError = _.get(selectedTopic, 'error', null)

  const pageTheme = _.get(state, 'header.pageTheme', BRIGHT)
  
  return ({
    topics,
    total,
    topicListError,
    topicError,
    isTopicFetching,
    isTopicsFetching,
    pageTheme
  })
}

export default connect(mapStateToProps, { fetchTopics, fetchAFullTopic, setHeaderInfo })(Topics)
