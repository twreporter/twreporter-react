'use strict'
// import VisibilitySensor from 'react-visibility-sensor';
import Header from '../components/topic/Header'
import Helmet from 'react-helmet'
import LeadingVideo from '../components/shared/LeadingVideo'
import Footer from '../components/Footer'
import React, { Component } from 'react'
import SystemError from '../components/SystemError'
import TopicCards from '../components/topic/Cards'
import arrowDownIcon from '../../static/asset/arrow-down.svg'
import cx from 'classnames'
import style from '../components/topic/Topic.scss'
import { connect } from 'react-redux'
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

    const fullTitle = title + SITE_NAME.SEPARATOR + SITE_NAME.FULL
    const ogDescription =  _.get(topic, 'ogDescription', SITE_META.DESC)
    const image = _.get(leadingImage, 'image.resizedTargets.tablet.url', logo)

    return (
      <div className={style['container']}>
        <Helmet
          title={fullTitle}
          link={[
            { rel: 'canonical', href: canonical }
          ]}
          meta={[
            { name: 'description', content: ogDescription },
            { name: 'twitter:title', content: fullTitle },
            { name: 'twitter:description', content: ogDescription },
            { name: 'twitter:image', content: image },
            { name: 'twitter:card', content: 'summary_large_image' },
            { property: 'og:title', content: fullTitle },
            { property: 'og:description', content: ogDescription },
            { property: 'og:image', content: image },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: canonical },
            { property: 'og:rich_attachment', content: 'true' }
          ]}
        />
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
            title={title}
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
