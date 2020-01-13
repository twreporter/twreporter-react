import { connect } from 'react-redux'
import Banner from '../components/topic/banner'
import Description from '../components/topic/description'
import Helmet from 'react-helmet'
import loggerFactory from '../logger'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import Related from '../components/topic/related'
import siteMeta from '../constants/site-meta'
import styled from 'styled-components'
import SystemError from '../components/SystemError'
import TopicHeader from '../components/topic/header'
// @twreporter
import twreporterRedux from '@twreporter/redux'
// lodash
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import merge from 'lodash/merge'

const logger = loggerFactory.getLogger()

const { actions, reduxStateFields, utils } = twreporterRedux

const _  = {
  forEach,
  get,
  merge
}

const Container = styled.div`
  position: relative;
`

const BannerPlaceholder = styled.div`
  height: 100vh;
  background: transparent;
`

class TopicLandingPage extends Component {
  static defaultProps = {
    entities: {},
    selectedTopic: {}
  }

  static propTypes = {
    // from redux store
    entities: PropTypes.object,
    selectedTopic: PropTypes.object,
    // react-router `match` object
    match: PropTypes.object.isRequired
  }

  componentDidMount() {
    const { match } = this.props
    const slug = _.get(match, 'params.slug')
    return this.fetchAFullTopicWithCatch(slug)
  }

  fetchAFullTopicWithCatch = (slug) => {
    const { fetchAFullTopic } = this.props
    return fetchAFullTopic(slug)
      // TODO render alert message for users
      .catch((failAction) => {
        logger.errorReport({
          report: _.get(failAction, 'payload.error'),
          message: `Error to fetch a full topic, topic slug: '${slug}'. `
        })
      })
  }

  _renderLoadingElements() {
    /* TODO: Add loading mockup or spinner */
    return (
      <Container>
        <TopicHeader />
        <BannerPlaceholder />
      </Container>
    )
  }

  _renderTopic(slug) {
    const { entities } = this.props
    const postEntities = _.get(entities, reduxStateFields.postsInEntities, {})
    const topicEntities = _.get(entities, reduxStateFields.topicsInEntities, {})
    const topic = _.get(utils.denormalizeTopics(slug, topicEntities, postEntities), '0')
    if (!topic) {
      logger.errorReport({
        message: `There is no topic in store corresponding with the given slug: ${slug}`
      })
      return <SystemError error={{ statusCode: 404 }} />
    }
    const {
      relateds_background,
      relateds_format,
      title_position,
      og_image,
      leading_image,
      leading_video,
      leading_image_portrait,
      relateds,
      headline,
      subtitle,
      title
    } = topic
    const topicDescription = _.get(topic, 'description.api_data', [])
    const teamDescription = _.get(topic, 'team_description.api_data', [])
    const ogDescription =  _.get(topic, 'og_description', '') || siteMeta.desc
    const ogTitle = _.get(topic, 'og_title', '') || _.get(topic, 'title', '')
    const ogImageUrl = _.get(topic, 'og_image.resized_targets.tablet.url') || _.get(topic, 'leading_image.resized_targets.tablet.url')
    const publishedDate = _.get(topic, 'published_date', '')

    const canonical = `${siteMeta.urlOrigin}/topics/${slug}`
    const fullTitle = ogTitle + siteMeta.name.separator + siteMeta.name.full
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
            { name: 'twitter:image', content: ogImageUrl },
            { name: 'twitter:card', content: 'summary_large_image' },
            { property: 'og:title', content: fullTitle },
            { property: 'og:description', content: ogDescription },
            { property: 'og:image', content: ogImageUrl },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: canonical },
            { property: 'og:rich_attachment', content: 'true' }
          ]}
        />
        <Banner
          theme={title_position}
          headline={headline}
          title={title}
          subtitle={subtitle}
          publishedDate={publishedDate}
          leadingVideo={leading_video}
          leadingImage={leading_image}
          leadingImagePortrait={leading_image_portrait}
          ogImage={og_image}
        />
        <TopicHeader />
        <Description
          topicDescription={topicDescription}
          teamDescription={teamDescription}
        />
        <Related
          items={relateds}
          format={relateds_format}
          background={relateds_background}
        />
      </Container>
    )
  }

  render() {
    const { selectedTopic } = this.props
    const error = _.get(selectedTopic, 'error')
    if (error) {
      return (
        <SystemError error={error} />
      )
    }
    const isFetching = _.get(selectedTopic, 'isFetching', false)
    const slug = _.get(selectedTopic, 'slug')
    if (isFetching || !slug) {
      return this._renderLoadingElements()
    }
    return this._renderTopic(slug)
  }
}

function mapStateToProps(state) {
  return {
    entities: state[reduxStateFields.entities] || {},
    selectedTopic: state[reduxStateFields.selectedTopic] || {}
  }
}

export { TopicLandingPage }
export default connect(mapStateToProps, { fetchAFullTopic: actions.fetchAFullTopic })(TopicLandingPage)
