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
import { CSSTransitionGroup } from 'react-transition-group'
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
const { PageContent, TopSection, ListSection, PostsContainer, PostItem, TopicItem } = TopicsList

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

  // shouldComponentUpdate(nextProps) {
  //   /* wait for implement loading spinner */
  //   /* Only re-render when first topic is full and topics.length > 0 (aka. all data is prepared) */
  //   const locationPage = _.get(nextProps, 'location.query.page', 1)
  //   const { topics, isTopicsFetching } = nextProps
  //   return ((locationPage != 1 || _.get(topics, [ 0, 'full' ], false)) && (_.get(topics, 'length', 0) > 0) && !isTopicsFetching)
  // }

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
    const { topics, page, totalPages, topicListError, topicError, pathname } = this.props
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
    
    const isFirstPage = page === 1
    const isFirstTopicFull = _.get(topics, [ 0, 'full' ], false)

    /* Render blank page if data is not all-prepared */
    /* wait for implement loading spinner */
    if ((isFirstPage && !isFirstTopicFull) || (!topicsLength || topicsLength < 0)) {
      return (
        <PageContainer>
          <StyledCSSTransitionGroup
            transitionName="topics-container-effect"
            transitionEnterTimeout={300}
            transitionLeave={false}
          />
        </PageContainer>
      )
    }

    /* Build PageContent */
    const topicsJSX = this._buildTopicBoxes(topics)
    let topTopicJSX = null
    let listedTopicsJSX = null
    let topRelatedPosts = null
    let topTopicName = null
    let topTopicSlug = null
    if (isFirstPage) {
      topTopicJSX = topicsJSX[0]
      listedTopicsJSX = topicsJSX.slice(1)
      topRelatedPosts = _.get(topics, [ 0, 'relateds' ], []).slice(0, 3)
      topTopicName = _.get(topics, [ 0, 'topic_name' ], '')
      topTopicSlug = _.get(topics, [ 0, 'slug' ], '')
    } else {
      listedTopicsJSX = topicsJSX
    }

    const TopSectionJSX = (!isFirstPage || topicError) ? null : (
      <TopSection topicName={topTopicName} topicUrl={`${LINK_PREFIX.TOPICS}${topTopicSlug}`}>
        {topTopicJSX}
        <PostsContainer>
          {this._buildRelatedPosts(topRelatedPosts)}
        </PostsContainer>
      </TopSection>
    )

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
        <StyledCSSTransitionGroup
          transitionName="topics-container-effect"
          transitionEnterTimeout={300}
          transitionLeave={false}
        >
        <PageContent>
          {TopSectionJSX}
          <ListSection>
            {listedTopicsJSX}
          </ListSection>
        </PageContent>
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          pathname={pathname}
        />
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

function mapStateToProps(state, ownProps) {
  const location = _.get(ownProps, 'location')
  const pathname = _.get(location, 'pathname', '/topics')
  const locationPage = parseInt(_.get(location, 'query.page', 1), 10)
  const topicList = _.get(state, reduxStateFields.topicList)
  const selectedTopic = _.get(state, reduxStateFields.selectedTopic)

  const page = locationPage || _.get(topicList, 'page', 1) 
  const nPerPage = _.get(topicList, 'nPerPage', 5)
  const totalPages = _.get(topicList, 'totalPages', NaN)

  const pageItems = _.uniq(_.get(topicList, [ 'items', locationPage || page ], []))
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
