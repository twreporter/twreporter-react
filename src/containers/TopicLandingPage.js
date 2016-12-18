'use strict'
import DocumentMeta from 'react-document-meta'
import React, { Component } from 'react'
// import VisibilitySensor from 'react-visibility-sensor';
import cx from 'classnames'
import { connect } from 'react-redux'
import Header from '../components/topic/Header'
import LeadingVideo from '../components/shared/LeadingVideo'
import Footer from '../components/Footer'
import SystemError from '../components/SystemError'
import TopicCards from '../components/topic/Cards'
import arrowDownIcon from '../../static/asset/arrow-down.svg'
import style from '../components/topic/Topic.scss'
import { date2yyyymmdd } from '../lib/date-transformer'
import { SITE_META, SITE_NAME } from '../constants/index'
import { fetchTopicIfNeeded } from '../actions/topic'

// lodash
import forEach from 'lodash/forEach'
import get from 'lodash/get'

const logo = 'https://www.twreporter.org/asset/logo.png'

const _  = {
  forEach,
  get
}

class TopicLandingPage extends Component {
  static fetchData({ params, store }) {
    return store.dispatch(fetchTopicIfNeeded(params.slug))
  }

  constructor(props) {
    super(props)
    this.state = {
      isLeadingVideoScrolledOver: false
    }
    // this.checkIfScrollOverLeadingVideo = this._checkIfScrollOverLeadingVideo.bind(this)
  }

  componentWillMount() {
    const { fetchTopicIfNeeded, params } = this.props
    let slug = _.get(params, 'slug')
    fetchTopicIfNeeded(slug)
  }

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  componentWillReceiveProps(nextProps) {
    const { fetchTopicIfNeeded, params, selectedTopic } = nextProps
    let slug = _.get(params, 'slug')
    if (_.get(selectedTopic, 'slug') !== slug) {
      fetchTopicIfNeeded(slug)
    }
  }

  _denormalizeArticles(ids) {
    const articles = _.get(this.props, 'entities.articles')
    let rtn = []
    _.forEach(ids, (id) => {
      const article = _.get(articles, id)
      if (article) {
        rtn.push(article)
      }
    })

    return rtn
  }
  /*
  _checkIfScrollOverLeadingVideo(isVisible) {
    if (!isVisible && this._isMounted) {
      this.setState({
        isLeadingVideoScrolledOver: true
      });
    } else {
      this.setState({
        isLeadingVideoScrolledOver: false
      })
    }
    }
  */

  render() {
    // const { isLeadingVideoScrolledOver } = this.state
    const { selectedTopic, entities } = this.props
    const topicId = _.get(selectedTopic, 'id')
    const error = _.get(selectedTopic, 'error', null)

    if (error !== null) {
      return (
        <div>
          <SystemError error={error} />
          <Footer />
        </div>
      )
    }

    if (!topicId) {
      return null
    }

    const topic = _.get(entities, [ 'topics', topicId ], {})
    // const { leadingImagePortrait, LeadingVideo
    const { leadingImage, leadingVideo, publishedDate, relateds, subtitle, title } = topic
    const description = _.get(topic, 'description.html', '')
    const teamDescription = _.get(topic, 'teamDescription.html', '')

    const relatedArticles = this._denormalizeArticles(relateds)
    const slug = _.get(selectedTopic, 'slug')
    const canonical = `${SITE_META.URL}topics/${slug}`

    const meta = {
      title: title ? title + SITE_NAME.SEPARATOR + SITE_NAME.FULL : SITE_NAME.FULL,
      description: description || SITE_META.DESC,
      canonical,
      meta: {
        property: {
          'og:title': title,
          'og:description': _.get(topic, 'ogDescription', description),
          'og:image': _.get(leadingImage, 'image.resizedTargets.tablet.url', logo),
          'og:url': canonical,
          'og:type': 'website'
        } },
      auto: { ograph: true }
    }

    return (
      <DocumentMeta {...meta}>
        <div className={style['container']}>
          <div>
            <Header
              isFixedToTop={false}
              title={title}
            />
            {/*
            <VisibilitySensor
              onChange={this.checkIfScrollOverLeadingVideo}
              partialVisibility={true}
              >
            */}
            <LeadingVideo
              classNames={{
                container: style['leading-block'],
                video: style.video,
                poster: style.video,
                audioBt: style['audio-bt']
              }}
              filetype={_.get(leadingVideo, 'video.filetype')}
              poster={_.get(leadingImage, 'image.resizedTargets')}
              src={_.get(leadingVideo, 'video.url')}
              title="polina"
            />
            {/*</VisibilitySensor>*/}
            <div className={style['main-title-block']}>
              <h1>{title}</h1>
              <h2>{subtitle}</h2>
              <span>{date2yyyymmdd(publishedDate, '.')} 最新更新</span>
            </div>
            <img className={style['arrow-down-icon']} src={arrowDownIcon} role="presentation" />
          </div>
          <div
            className={cx(style.description, 'center-block', 'text-center')}
            dangerouslySetInnerHTML={{ __html: description }}
          />
          <div
            className={cx(style['team-description'], 'center-block', 'text-center')}
            dangerouslySetInnerHTML={{ __html: teamDescription }}
          />
          <div className={style['cards-container']}>
            <TopicCards
              items={relatedArticles}
            />
          </div>
          <Footer/>
        </div>
      </DocumentMeta>
    )
  }
}

function mapStateToProps(state) {
  return {
    entities: state.entities || {},
    selectedTopic: state.selectedTopic || {}
  }
}

export { TopicLandingPage }
export default connect(mapStateToProps, { fetchTopicIfNeeded })(TopicLandingPage)
