/* eslint no-unused-vars:0 */

'use strict'
// import VisibilitySensor from 'react-visibility-sensor';
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
// import Helmet from 'react-helmet'
import get from 'lodash/get'
import Banner from '../components/topicPage/Banner'
import Cards from '../components/topicPage/Cards'
// import Footer from '../components/Footer'
// import Header from '../components/topic/Header'
import LeadingVideo from '../components/shared/LeadingVideo'
import SystemError from '../components/SystemError'
import styles from './TopicPage.scss'
import { SITE_META, SITE_NAME } from '../constants/index'
import { fetchTopicIfNeeded } from '../actions/topic'
import { denormalizeArticles } from '../utils/index'

const _ = {
  get
}

class TopicPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isCollapse: false,
      bannerTheme: 'center-center',
      cardsTheme: 'small-cards'
    }
    this._changeBannerTheme = this._changeBannerTheme.bind(this)
    this._changeCardsTheme = this._changeCardsTheme.bind(this)
  }

  _changeBannerTheme(event) {
    return this.setState({ bannerTheme: event.target.innerHTML })
  }

  _changeCardsTheme(event) {
    return this.setState({ cardsTheme: event.target.innerHTML })
  }

  componentWillMount() {
    const { fetchTopicIfNeeded, params } = this.props
    const slug = _.get(params, 'slug')
    fetchTopicIfNeeded(slug)
  }

  componentWillReceiveProps(nextProps) {
    const { fetchTopicIfNeeded, params, selectedTopic } = nextProps
    const slug = _.get(params, 'slug')
    if (_.get(selectedTopic, 'slug') !== slug) {
      fetchTopicIfNeeded(slug)
    }
  }

  render() {
    const { selectedTopic, entities } = this.props
    const topicId = _.get(selectedTopic, 'id')
    const error = _.get(selectedTopic, 'error', null)

    if (error !== null) {
      return (
        <div>
          <SystemError error={error} />
        </div>
      )
    }
    if (!topicId) {
      return null
    }

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
    const bannerTheme = _.get(topic, 'bannerTheme', 'center-bottom') // bannerTheme {string} - Theme of banner, should be one of ['left-bottom', 'center-center', 'center-bottom' ]
    const cardsTheme = _.get(topic, 'cardsTheme', 'small-cards') // bannerTheme {string} - Theme of cards, should be one of ['wide-cards', 'small-cards' ]
    const description = _.get(topic, 'description.html', '') // {string}
    const teamDescription = _.get(topic, 'teamDescription.html', '') // {string}
    const ogDescription =  _.get(topic, 'ogDescription', SITE_META.DESC) // {string}

    const logo = 'https://www.twreporter.org/asset/logo.png'
    const image = _.get(leadingImage, 'image.resizedTargets.tablet.url', logo) // {string}

    const slug = _.get(selectedTopic, 'slug')

    const relatedArticles = denormalizeArticles(relateds, entities)
    const canonical = `${SITE_META.URL}topics/${slug}`
    const fullTitle = title + SITE_NAME.SEPARATOR + SITE_NAME.FULL
    
    return (
      <div className={styles['topic-page-conainer']}>
        {/*<Helmet />*/}
        {/*<Header />*/}
        <div className={styles['theme-changer']}>
          <p><span onClick={this._changeBannerTheme}>{'center-center'}</span>{' / '}<span onClick={this._changeBannerTheme}>{'center-bottom'}</span>{' / '}<span onClick={this._changeBannerTheme}>{'left-bottom'}</span></p>
          <p></p>
        </div>
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
        <Banner
          headline={headline}
          title={title}
          subtitle={subtitle}
          publishedDate={publishedDate}
          bannerTheme={this.state.bannerTheme}
        />
        <Description
          topicDescription={description}
          teamDescription={teamDescription}
        />
        <Cards
          items={relatedArticles}
          cardsTheme={this.state.cardsTheme}
        />
        {/*<Footer />*/}
      </div>
    )
  }
}

TopicPage.propTypes = {
  selectedTopic: PropTypes.shape({
    error: PropTypes.object,
    id: PropTypes.string,
    isFetching: PropTypes.bool,
    lastUpdated: PropTypes.number,
    slug: PropTypes.string
  }),
  entities: PropTypes.shape({
    articles: PropTypes.object,
    topics: PropTypes.object
  })
}

const Description = (props) => {
  const { topicDescription, teamDescription } = props
  return (
    <div>
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

export { TopicPage }
export default connect(mapStateToProps, { fetchTopicIfNeeded })(TopicPage)

// const 
// function applyWithTheme(WrappedComponent, theme) {
//   class SelectTopicCardsTheme extends React.Component {
//     constructor(props) {
//       super(props)
//     }
//     render() {
//       return <WrappedComponent {...this.props} theme={theme}/>
//     }
//   }
//   return SelectTopicCardsTheme
// }
