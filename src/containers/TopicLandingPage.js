/* eslint no-unused-vars:0 */
/* --↑↑ For UI testing, should be modified before deployed ↑↑-- */
'use strict'

import React, { Component, PropTypes } from 'react'
import { SITE_META, SITE_NAME } from '../constants/index'

import BannerFactory from '../components/topic/Banner'
import CardsFactory from '../components/topic/Cards'
import Footer from '../components/Footer'
// import VisibilitySensor from 'react-visibility-sensor';
import Header from '../components/topic/Header'
import Helmet from 'react-helmet'
import LeadingVideo from '../components/shared/LeadingVideo'
import SystemError from '../components/SystemError'
import { addStyledWrapperDecorator } from '../components/shared/ComponentDecorators'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { denormalizeArticles } from '../utils/index'
import { fetchTopicIfNeeded } from '../actions/topic'
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import styles from './TopicLandingPage.scss'

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
      /* --↓↓ For UI testing, should be remove before deployed ↓↓-- */
      bannerTheme: 'center',
      cardsTheme: 'in-row',
      cardsContainerBgColor: '#d8d8d8',
      /* --↑↑ For UI testing, should be remove before deployed ↑↑-- */
      isLeadingVideoScrolledOver: false
    }
    /* --↓↓ For UI testing, should be remove before deployed ↓↓-- */
    this._changeBannerTheme = this._changeBannerTheme.bind(this)
    this._changeCardsTheme = this._changeCardsTheme.bind(this)
    this._changeCardsBgColor = this._changeCardsBgColor.bind(this)
    /* --↑↑ For UI testing, should be remove before deployed ↑↑-- */

    // this.checkIfScrollOverLeadingVideo = this._checkIfScrollOverLeadingVideo.bind(this)
  }

  /* --↓↓ For UI testing, should be remove before deployed ↓↓-- */
  _changeBannerTheme(event) {
    return this.setState({ bannerTheme: event.target.innerHTML })
  }

  _changeCardsTheme(event) {
    return this.setState({ cardsTheme: event.target.innerHTML })
  }

  _changeCardsBgColor(event) {
    return this.setState({ cardsContainerBgColor: event.target.innerHTML })
  }
  /* --↑↑ For UI testing, should be remove before deployed ↑↑-- */

  componentWillMount() {
    const { fetchTopicIfNeeded, params } = this.props
    let slug = _.get(params, 'slug')
    fetchTopicIfNeeded(slug)
    this.bannerFactory = new BannerFactory
    this.cardsFactory = new CardsFactory
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
    
    const slug = _.get(selectedTopic, 'slug') // {string}

    const topic = _.get(entities, [ 'topics', topicId ], {})
    const {
      leadingImage, // leadingImage {object} - Topic leading image infos
      leadingVideo, // leadingVideo {object} - Topic leading video infos
      publishedDate,// publishedDate {string} -  Date format as "Mon, 19 Dec 2016 00:00:00 GMT"
      relateds,     // relateds {array} - Array of the ids of related articles
      headline,     // headline {string} - Topic headine
      subtitle,     // subtitle {string} - Topic subtitle
      title         // title {string} - Topic title
    } = topic
    const bannerTheme = _.get(topic, 'titlePosition', 'center') // {string} - Theme of banner, should be one of ['bottom-left', 'center', 'bottom' ]
    const cardsTheme = _.get(topic, 'relatedsFormat', 'in-row') // {string} - Theme of cards, should be one of ['in-rows', 'in-column' ]
    const cardsContainerBgColor = _.get(topic, 'relatedsBackground', '#d8d8d8') // {string} - HEX value of cards container bg-color
    const description = _.get(topic, 'description.html', '') // {string}
    const teamDescription = _.get(topic, 'teamDescription.html', '') // {string}
    const ogDescription =  _.get(topic, 'ogDescription', SITE_META.DESC) // {string}

    const image = _.get(leadingImage, 'image.resizedTargets.tablet.url', logo) // {string}
    
    const relatedArticles = denormalizeArticles(relateds, entities)
    const canonical = `${SITE_META.URL}topics/${slug}`
    const fullTitle = title + SITE_NAME.SEPARATOR + SITE_NAME.FULL

    /* --↓↓ For UI testing, should be modified before deployed ↓↓-- */
    const Banner = this.bannerFactory.buildWithTheme(this.state.bannerTheme)
    const Cards = this.cardsFactory.buildWithTheme(this.state.cardsTheme)
    const BgColoredCards = addStyledWrapperDecorator(Cards, { backgroundColor: this.state.cardsContainerBgColor })
    /* --↑↑ For UI testing, should be modified before deployed ↑↑-- */

    return (
      <div className={styles['topic-page-conainer']}>
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
        {/* --↓↓ For UI testing, should be modified before deployed ↓↓-- */}
        <div className={styles['theme-changer']}>
          <p><span onClick={this._changeBannerTheme}>{'center'}</span>{' / '}<span onClick={this._changeBannerTheme}>{'bottom'}</span>{' / '}<span onClick={this._changeBannerTheme}>{'bottom-left'}</span></p>
          <p><span onClick={this._changeCardsTheme}>{'in-row'}</span>{' / '}<span onClick={this._changeCardsTheme}>{'in-column'}</span></p>
          <p><span onClick={this._changeCardsBgColor}>{'#d8d8d8'}</span>{' / '}<span onClick={this._changeCardsBgColor}>{'#738498'}</span></p>
        </div>
        {/* --↑↑ For UI testing, should be modified before deployed ↑↑-- */}
        <LeadingVideo
          classNames={{
            container: styles['leading-block'],
            video: styles.video,
            poster: styles.video,
            audioBt: styles['audio-bt']
          }}
          filetype={_.get(leadingVideo, 'video.filetype')}
          poster={_.get(leadingImage, 'image.resizedTargets')}
          src={_.get(leadingVideo, 'video.url')}
          title={title}
        />
        {/*</VisibilitySensor>*/}
        <Banner
          headline={headline}
          title={title}
          subtitle={subtitle}
          publishedDate={publishedDate}
        />
        <Description
          topicDescription={description}
          teamDescription={teamDescription}
        />
        <BgColoredCards
          items={relatedArticles}
          /* --↓↓ For UI testing, should be modified before deployed ↓↓-- */
          cardsTheme={this.state.cardsTheme}
          /* --↑↑ For UI testing, should be modified before deployed ↑↑-- */
        />
        <Footer />
      </div>
    )
  }
}

const Description = (props) => {
  const { topicDescription, teamDescription } = props
  return (
    <div className={styles['description']}>
      <div className={classNames(styles['topic-description'], 'center-block', 'text-center')} dangerouslySetInnerHTML={{ __html: topicDescription }} />
      <div className={classNames(styles['team-description'], 'center-block', 'text-center')} dangerouslySetInnerHTML={{ __html: teamDescription }} />
    </div>
  )
}

Description.propTypes = {
  topicDescription: PropTypes.string.isRequired,
  teamDescription: PropTypes.string.isRequired
}

function mapStateToProps(state) {
  return {
    entities: state.entities || {},
    selectedTopic: state.selectedTopic || {}
  }
}

export { TopicLandingPage }
export default connect(mapStateToProps, { fetchTopicIfNeeded })(TopicLandingPage)
