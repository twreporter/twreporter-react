/* eslint no-unused-vars:0 */

'use strict'
// import VisibilitySensor from 'react-visibility-sensor';
// import Header from '../components/topic/Header'
// import Helmet from 'react-helmet'
// import LeadingVideo from '../components/shared/LeadingVideo'
// import Footer from '../components/Footer'
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import SystemError from '../components/SystemError'
// import Cards from '../components/topic/Cards'
// import arrowDownIcon from '../../static/asset/arrow-down.svg'
import classNames from 'classnames'
import styles from './TopicPage.scss'
import { connect } from 'react-redux'
import { SITE_META, SITE_NAME, CHARACTERS_LIMIT } from '../constants/index'
import { fetchTopicIfNeeded } from '../actions/topic'
import get from 'lodash/get'
import map from 'lodash/map'
import { denormalizeArticles, replaceStorageUrlPrefix, shortenString, date2yyyymmdd } from '../utils/index'

const _ = {
  get,
  map
}


class TopicPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isCollapse: false
    }
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
    const bannerTheme = _.get(topic, 'bannerTheme', 'center-center') // bannerTheme {string} - Theme of banner, should be one of ['left-bottom', 'center-center', 'center-bottom' ]
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

    // const bannerTheme = _.get(selectedTopic, 'bannerTheme')
    // const cardsTheme = _.get(selectedTopic, 'cardsTheme')
    return (
      <div>
        {/*<Helmet />*/}
        {/*<Header />*/}
        <Banner
          headline={headline}
          title={title}
          subtitle={subtitle}
          publishedDate={publishedDate}
        />
        {/*<LeadingVideo />*/}
        <Description
          topicDescription={description}
          teamDescription={teamDescription}
        />
        <Cards
          items={relatedArticles}
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

const Banner = (props) => {
  const { headline, title, subtitle, publishedDate, bannerTheme } = props
  // const combineClassWithTheme = (className) => classNames(styles[className], bannerTheme?styles[className+'-'+bannerTheme]:false)
  // const _cnTitleBlock = combineClassWithTheme('title-box')
  // const _cnHeadline = combineClassWithTheme('headline')
  // const _cnTitle = combineClassWithTheme('title')
  // const _cnSubtitle = combineClassWithTheme('subtitle')
  // const _cnPublishedDate = combineClassWithTheme('published-date')
  return (
    <div>
      <div>{headline}</div>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <div>{publishedDate}</div>
    </div>
  )
}

Banner.propTypes = {
  headline: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  publishedDate: PropTypes.string.isRequired,
  bannerTheme: PropTypes.string.isRequired
}

const Description = (props) => {
  const { topicDescription, teamDescription } = props
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: topicDescription }} />
      <div dangerouslySetInnerHTML={{ __html: teamDescription }} />
    </div>
  )
}

Description.propTypes = {
  topicDescription: PropTypes.string.isRequired,
  teamDescription: PropTypes.string.isRequired
}

const Cards = (props) => {
  const { items, cardsTheme } = props
  const relatedRows = _.map(items, (related, index) => {
    const imageUrl = replaceStorageUrlPrefix(get(related, 'heroImage.image.resizedTargets.mobile.url', '/asset/review.png'))
    const slug = get(related, 'slug', '')
    const title = get(related, 'title', '')
    const publishedDate = date2yyyymmdd(get(related, 'publishedDate', ''), '.')
    const description = shortenString(get(related, 'ogDescription', ''), CHARACTERS_LIMIT.BOTTOM_RELATED_DESC)
    return (
      <li key={'related-' + (index++)}>
        <Link to={'/a/' + slug} >
          <div>
            <div>
              <img src={imageUrl} />
            </div>
          </div>
          <div>
            <p>{title}</p>
            <p>{description}</p>
            <p>{publishedDate}</p>
          </div>
        </Link>
      </li>
    )
  })
  return (
    <div>
      <ul>
        {relatedRows}
      </ul>
    </div>
  )
}

Cards.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    publishedDate: PropTypes.string.isRequired,
    ogDescription: PropTypes.string.isRequired,
    heroImage: PropTypes.object.isRequired
  })),
  cardsTheme: PropTypes.string.isRequired
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
