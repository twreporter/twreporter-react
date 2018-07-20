import { addStyledWrapperDecorator } from '../components/shared/ComponentDecorators'
import { camelizeKeys } from 'humps'
import { connect } from 'react-redux'
import { SITE_META, SITE_NAME } from '../constants/index'
import BannerFactory from '../components/topic/Banner'
import CardsFactory from '../components/topic/Cards'
import Description from '../components/topic/Description'
import Footer from '@twreporter/react-components/lib/footer'
import FullScreenImage from '../components/shared/FullScreenImage'
import Header from '../components/topic/Header'
import Helmet from 'react-helmet'
import LeadingVideo from '../components/shared/LeadingVideo'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'
import SystemError from '../components/SystemError'
import twreporterRedux from '@twreporter/redux'
// lodash
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import merge from 'lodash/merge'

const { actions, reduxStateFields, utils } = twreporterRedux

const _  = {
  forEach,
  get,
  merge
}

const bannerFactory = new BannerFactory()
const cardsFactory = new CardsFactory()

const Container = styled.div`
  position: relative;
  border: 1px solid black;
`

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

  constructor(props) {
    super(props)
    this.state = {
      viewportHeight: '100vh'
    }
  }

  componentWillMount() {
    const { fetchAFullTopic, params } = this.props
    const slug = _.get(params, 'slug')
    fetchAFullTopic(slug)
  }
  
  componentDidMount() {
    this._updateViewportHeight()
  }

  componentDidUpdate() {
    this._updateViewportHeight()
  }

  componentWillReceiveProps(nextProps) {
    const { fetchAFullTopic, params } = nextProps
    const { selectedTopic } = this.props
    if (_.get(selectedTopic, 'slug') !== _.get(params, 'slug')) {
      fetchAFullTopic(_.get(params, 'slug'))
    }
  }

  _updateViewportHeight() {
    if (typeof window === 'object') {
      /*
        The height we want is which of the viewport that actually be seen by users.
        But the common used DOM properties have several problems:
          `documentElement.clientHeight` -> In iOS, the return value pretends that the URL and tab bars are visible, even if they are not.
          `window.innerHeight` -> It includes the area covered by scroll bars (user cannot see the area actually)
        The best way to get the value may be: (window.innerHeight - scroll bar height)
        Since this page should not have horizontal scroll bar, we can use `window.innerHeight` directly.
        Reference: https://stackoverflow.com/a/31655549
      */
      const heightString = window.innerHeight ? `${window.innerHeight}px` : '100vh'
      if (this.state.viewportHeight !== heightString) {
        this.setState({
          viewportHeight: heightString
        })
      }
    }
  }

  render() {
    const { entities, params, selectedTopic } = this.props
    const { viewportHeight } = this.state
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

    const leadingBackgroundElement = videoSrc ? (
      <LeadingVideo
        filetype={_.get(leadingVideo, 'filetype')}
        src={videoSrc}
        title={title}
        poster={ogImage}
        topicLeadingVideo
      />
    ) : (
      <FullScreenImage
        alt={_.get(leadingImage, 'description')}
        imgSet={_.get(topic, 'leadingImage.resizedTargets')}
        portraitImgSet={_.get(topic, 'leadingImagePortrait.resizedTargets')}
      />
    )

    return (
      <Container>
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
        <Banner
          headline={headline}
          title={title}
          subtitle={subtitle}
          publishedDate={publishedDate}
          viewportHeight={viewportHeight}
          backgroundElement={leadingBackgroundElement}
        />
        <Description
          topicDescription={description}
          teamDescription={teamDescription}
        />
        <BgColoredCards
          items={relateds}
        />
        <Footer />
      </Container>
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
