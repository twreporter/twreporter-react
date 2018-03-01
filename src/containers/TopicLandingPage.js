'use strict'

import PropTypes from 'prop-types'
import React, { Component } from 'react'
import BannerFactory from '../components/topic/Banner'
import CardsFactory from '../components/topic/Cards'
import Footer from '@twreporter/react-components/lib/footer'
import Header from '../components/topic/Header'
import Helmet from 'react-helmet'
import LeadingVideo from '../components/shared/LeadingVideo'
import FullScreenImage from '../components/shared/FullScreenImage'
import SystemError from '../components/SystemError'
import classNames from 'classnames'
import styles from './TopicLandingPage.scss'
import twreporterRedux from '@twreporter/redux'

// lodash
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import merge from 'lodash/merge'

import { SITE_META, SITE_NAME } from '../constants/index'
import { addStyledWrapperDecorator } from '../components/shared/ComponentDecorators'
import { camelizeKeys } from 'humps'
import { connect } from 'react-redux'

const { actions, reduxStateFields, utils } = twreporterRedux

const _  = {
  forEach,
  get,
  merge
}

const bannerFactory = new BannerFactory()
const cardsFactory = new CardsFactory()

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

class TopicLandingPage extends Component {
  static fetchData({ params, store }) {
    const slug = params.slug
    return store.dispatch(actions.fetchAFullTopic(slug))
      .then(() => {
        const state = store.getState()
        const selectedTopic = _.get(state, reduxStateFields.selectedTopic, {})
        if (_.get(selectedTopic, 'error')) {
          return Promise.reject(_.get(selectedTopic, 'error'))
        }
      })
  }

  componentWillMount() {
    const { fetchAFullTopic, params } = this.props
    const slug = _.get(params, 'slug')
    fetchAFullTopic(slug)
  }

  componentWillReceiveProps(nextProps) {
    const { fetchAFullTopic, params } = nextProps
    const { selectedTopic } = this.props

    if (_.get(selectedTopic, 'slug') !== _.get(params, 'slug')) {
      fetchAFullTopic(_.get(params, 'slug'))
    }
  }

  render() {
    const { entities, params, selectedTopic } = this.props
    const error = _.get(selectedTopic, 'error', null)

    if (error !== null) {
      return (
        <div>
          <SystemError error={error} />
          <Footer />
        </div>
      )
    }

    if (_.get(selectedTopic, 'slug') !== _.get(params, 'slug')) {
      return null
    }

    const slug = _.get(selectedTopic, 'slug') // {string}

    const postEntities = _.get(entities, reduxStateFields.postsInEntities, {})
    const topicEntities = _.get(entities, reduxStateFields.topicsInEntities, {})
    const topic = camelizeKeys(utils.denormalizeTopics(slug, topicEntities, postEntities)[0])
    const {
      leadingImage, // leadingImage {object} - Topic leading image infos
      leadingVideo, // leadingVideo {object} - Topic leading video infos
      publishedDate,// publishedDate {string} -  Date format as "Mon, 19 Dec 2016 00:00:00 GMT"
      relateds,     // relateds {array} - Array of the ids of related articles
      headline,     // headline {string} - Topic headine
      subtitle,     // subtitle {string} - Topic subtitle
      title         // title {string} - Topic title
    } = topic
    const bannerTheme = _.get(topic, 'titlePosition') || 'center' // {string} - Theme of banner
    const cardsTheme = _.get(topic, 'relatedsFormat') || 'in-row' // {string} - Theme of cards
    const cardsContainerBgColor = _.get(topic, 'relatedsBackground') || '#d8d8d8' // {string} - HEX value of cards container bg-color
    const description = _.get(topic, 'description.html', '') // {string}
    const teamDescription = _.get(topic, 'teamDescription.html', '') // {string}
    const ogDescription =  _.get(topic, 'ogDescription') || SITE_META.DESC // {string}

    const ogImage = _.get(leadingImage, 'resizedTargets.tablet.url') || SITE_META.OG_IMAGE // {string}

    const canonical = `${SITE_META.URL}topics/${slug}`
    const fullTitle = title + SITE_NAME.SEPARATOR + SITE_NAME.FULL

    const Banner = bannerFactory.buildWithTheme(bannerTheme)
    const Cards = cardsFactory.buildWithTheme(cardsTheme)
    const BgColoredCards = addStyledWrapperDecorator(Cards, { backgroundColor: cardsContainerBgColor })

    const videoSrc = _.get(leadingVideo, 'url')

    const LeadingComp = videoSrc ? (
      <LeadingVideo
        classNames={{
          container: styles['leading-block'],
          video: styles.video,
          poster: styles.video,
          audioBt: styles['audio-bt']
        }}
        filetype={_.get(leadingVideo, 'filetype')}
        src={videoSrc}
        title={title}
        poster={ogImage}
      />
    ) : (
      <FullScreenImage
        alt={_.get(leadingImage, 'description')}
        imgSet={_.get(topic, 'leadingImage.resizedTargets')}
        portraitImgSet={_.get(topic, 'leadingImagePortrait.resizedTargets')}
      />
    )

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
            { name: 'twitter:image', content: ogImage },
            { name: 'twitter:card', content: 'summary_large_image' },
            { property: 'og:title', content: fullTitle },
            { property: 'og:description', content: ogDescription },
            { property: 'og:image', content: ogImage },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: canonical },
            { property: 'og:rich_attachment', content: 'true' }
          ]}
        />
        <Header
          isFixedToTop={false}
          title={title}
        />
        {LeadingComp}
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
          items={relateds}
        />
        <Footer />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    entities: state[reduxStateFields.entities] || {},
    selectedTopic: state[reduxStateFields.selectedTopic] || {}
  }
}

TopicLandingPage.defaultProps = {
  entities: {},
  selectedTopic: {}
}

TopicLandingPage.propTypes = {
  entities: PropTypes.object,
  selectedTopic: PropTypes.object
}

export { TopicLandingPage }
export default connect(mapStateToProps, { fetchAFullTopic: actions.fetchAFullTopic })(TopicLandingPage)
