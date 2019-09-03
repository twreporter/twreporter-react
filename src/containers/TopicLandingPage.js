import { connect } from 'react-redux'
import { SITE_META, SITE_NAME } from '../constants/index'
import Banner from '../components/topic/banner'
import Related from '../components/topic/related'
import Description from '../components/topic/description'
import TopicHeader from '../components/topic/header'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'
import SystemError from '../components/SystemError'
// @twreporter
import { date2yyyymmdd } from '@twreporter/core/lib/utils/date'
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

const Container = styled.div`
  position: relative;
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
    const { fetchAFullTopic, match } = this.props
    const slug = _.get(match, 'params.slug')
    fetchAFullTopic(slug)
  }

  render() {
    const { entities, match, selectedTopic } = this.props
    const error = _.get(selectedTopic, 'error')
    if (error) {
      return (
        <SystemError error={error} />
      )
    }
    const slug = _.get(selectedTopic, 'slug') // {string}
    if (slug !== _.get(match, 'params.slug')) {
      console.warn('The `selectedTopic.slug` in redux store does not match the slug in url.') // eslint-disable-line no-console
    }

    const postEntities = _.get(entities, reduxStateFields.postsInEntities, {})
    const topicEntities = _.get(entities, reduxStateFields.topicsInEntities, {})
    const topic = utils.denormalizeTopics(slug, topicEntities, postEntities)[0]
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
    const ogDescription =  _.get(topic, 'og_description', '') || SITE_META.DESC
    const ogTitle = _.get(topic, 'og_title', '') || _.get(topic, 'title', '')
    const publishedDate = date2yyyymmdd(_.get(topic, 'published_date'), '.')

    const canonical = `${SITE_META.URL}topics/${slug}`
    const fullTitle = ogTitle + SITE_NAME.SEPARATOR + SITE_NAME.FULL
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
            { name: 'twitter:image', content: og_image },
            { name: 'twitter:card', content: 'summary_large_image' },
            { property: 'og:title', content: fullTitle },
            { property: 'og:description', content: ogDescription },
            { property: 'og:image', content: og_image },
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
          backgorund={relateds_background}
        />
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

export { TopicLandingPage }
export default connect(mapStateToProps, { fetchAFullTopic: actions.fetchAFullTopic })(TopicLandingPage)
