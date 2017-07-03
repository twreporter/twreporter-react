/*eslint no-unused-vars:0, no-console:0 */
import Header from 'twreporter-react-index-page-components/lib/components/header'
import EditorPicks from 'twreporter-react-index-page-components/lib/components/editor-picks'
import Helmet from 'react-helmet'
import InfographicSection from 'twreporter-react-index-page-components/lib/components/infographic-section'
import Latest from 'twreporter-react-index-page-components/lib/components/latest'
import LatestTopic from 'twreporter-react-index-page-components/lib/components/latest-topic'
import React from 'react'
import Reviews from 'twreporter-react-index-page-components/lib/components/reviews'
import Category from 'twreporter-react-index-page-components/lib/components/category'
import PhotographySection from 'twreporter-react-index-page-components/lib/components/photography-section'
import ReporterIntro from 'twreporter-react-index-page-components/lib/components/reporter-intro'
import SideBar, { moduleIdObj } from 'twreporter-react-index-page-components/lib/components/side-bar'
import TopicsSection from 'twreporter-react-index-page-components/lib/components/topics-section'
import clone from 'lodash/clone'
import get from 'lodash/get'
import set from 'lodash/set'
import isEqual from 'lodash/isEqual'
import styled from 'styled-components'
import twreporterRedux from 'twreporter-redux'
import { SITE_NAME, SITE_META } from '../constants/index'
import { connect } from 'react-redux'

const { fetchIndexPageContent } =  twreporterRedux.actions
const { denormalizePosts, denormalizeTopics } = twreporterRedux.utils
const fieldNames = twreporterRedux.reduxStateFields

const _ = {
  clone,
  get,
  set,
  isEqual
}

const Container = styled.div`
  width 100%;
  margin: 0 auto;
  background-color: white;
  overflow: hidden;
`

const FirstModuleWrapper = styled.div`
  hegight: auto;
`

class Homepage extends React.Component {
  static async fetchData({ store }) {
    await fetchIndexPageContent()(store.dispatch, store.getState)
    const error = _.get(store.getState(), [ fieldNames.indexPage, 'error' ])
    if (error !== null) {
      return Promise.reject(error)
    }
  }

  async componentWillMount() {
    await this.props.fetchIndexPageContent()
  }

  shouldComponentUpdate(nextProps, nextState) {
    for (let property in this.props) {
      if (Object.prototype.hasOwnProperty.call(nextProps, property) && !_.isEqual(this.props[property], nextProps[property])) {
        if (property === 'location') {
          return false
        }
      }
    }
    return false
  }

  render() {
    // TODO Need to change categories
    const microData = (
      <div itemScope itemType="http://www.schema.org/SiteNavigationElement">
        <div>
          <meta itemProp="name" content="首頁" />
          <link itemProp="url" href="https://www.twreporter.org/" />
        </div>
        <div>
          <meta itemProp="name" content="台灣" />
          <link itemProp="url" href="https://www.twreporter.org/category/taiwan" />
        </div>
        <div>
          <meta itemProp="name" content="文化" />
          <link itemProp="url" href="https://www.twreporter.org/category/culture" />
        </div>
        <div>
          <meta itemProp="name" content="國際" />
          <link itemProp="url" href="https://www.twreporter.org/category/intl" />
        </div>
        <div>
          <meta itemProp="name" content="影像" />
          <link itemProp="url" href="https://www.twreporter.org/photography" />
        </div>
        <div>
          <meta itemProp="name" content="評論" />
          <link itemProp="url" href="https://www.twreporter.org/category/review" />
        </div>
      </div>
    )

    const organizationJSONLD = `
      {
        "@context" : "http://schema.org",
        "@type" : "Organization",
        "legalName" : "財團法人報導者文化基金會",
        "alternateName": "報導者 The Reporter",
        "url": "https://www.twreporter.org/",
        "logo": "https://www.twreporter.org/storage/images/logo.png",
        "sameAs": [
          "http://www.facebook.com/twreporter",
          "https://www.instagram.com/twreporter/",
          "https://www.youtube.com/channel/UCbWm0FTcQgRyc--ZsAzGcRA"
        ],
        "potentialAction" : {
          "@type" : "SearchAction",
          "target" : "https://www.twreporter.org/search?q={search_term}",
          "query-input" : "required name=search_term"
        }
      }
    `

    const webSiteJSONLD = `
      {
        "@context" : "http://schema.org",
        "@type" : "WebSite",
        "name" : "報導者 The Reporter",
        "url" : "https://www.twreporter.org/",
        "potentialAction" : {
          "@type" : "SearchAction",
          "target" : "https://www.twreporter.org/search?q={search_term}",
          "query-input" : "required name=search_term"
        }
      }
    `

    // TODO Need to change categories
    const breadcrumbListJSONLD = `
    {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@id": "https://www.twreporter.org/",
            "name": "首頁"
          }
        },{
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@id": "https://www.twreporter.org/category/taiwan",
            "name": "台灣"
          }
        },{
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@id": "https://www.twreporter.org/category/intl",
            "name": "國際"
          }
        },{
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@id": "https://www.twreporter.org/category/culture",
            "name": "文化"
          }
        },{
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@id": "https://www.twreporter.org/category/review",
            "name": "評論"
          }
        }, {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@id": "https://www.twreporter.org/photography",
            "name": "影像"
          }
        }]
      }
    `
    return (
      <Container>
        <Helmet
          title={SITE_NAME.FULL}
          link={[
            { rel: 'canonical', href: SITE_META.URL }
          ]}
          meta={[
            { name: 'description', content: SITE_META.DESC },
            { name: 'twitter:title', content: SITE_NAME.FULL },
            { name: 'twitter:image', content: SITE_META.LOGO },
            { name: 'twitter:description', content: SITE_META.DESC },
            { property: 'og:title', content: SITE_NAME.FULL },
            { property: 'og:description', content: SITE_META.DESC },
            { property: 'og:image', content: SITE_META.LOGO },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: SITE_META.URL }
          ]}
        />
        <SideBar>
          <FirstModuleWrapper
            moduleId={moduleIdObj.editorPick}
          >
            <Header />
            <Latest data={this.props[fieldNames.latest]} />
            <EditorPicks data={this.props[fieldNames.editorPicks]} />
          </FirstModuleWrapper>
          <LatestTopic
            data={this.props[fieldNames.latestTopic]}
            moduleId={moduleIdObj.latestTopic}
          />
          <Reviews
            data={this.props[fieldNames.reviews]}
            moduleId={moduleIdObj.review}
          />
          <Category
              data={this.props.category}
              moduleId={moduleIdObj.category}
          />
          <TopicsSection
            moduleId={moduleIdObj.topic}
            items={this.props[fieldNames.topics]}
          />
          <PhotographySection
            moduleId={moduleIdObj.photography}
            items={this.props[fieldNames.photos]}
          />
          <InfographicSection
            moduleId={moduleIdObj.infographic}
            items={this.props[fieldNames.infographics]}
          />
          <ReporterIntro
            moduleId={moduleIdObj.donation}
          />
        </SideBar>
        { microData }
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webSiteJSONLD }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: organizationJSONLD }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbListJSONLD }} />
      </Container>
    )
  }
}

function mapStateToProps(state) {
  const entities = _.get(state, fieldNames.entities, {})
  const indexPageState = _.get(state, fieldNames.indexPage, {})

  // get post entities
  const postEntities = _.get(entities, fieldNames.posts, {})

  // get topic entities
  const topicEntities = _.get(entities, fieldNames.topics, {})

  // restore the posts
  const latest = denormalizePosts(_.get(indexPageState, fieldNames.latest, []), postEntities)
  const editorPicks = denormalizePosts(_.get(indexPageState, fieldNames.editorPicks, []), postEntities)
  const reviews = denormalizePosts(_.get(indexPageState, fieldNames.reviews, []), postEntities)
  const photoPosts = denormalizePosts(_.get(indexPageState, fieldNames.photos, []), postEntities)
  const infoPosts = denormalizePosts(_.get(indexPageState, fieldNames.infographics, []), postEntities)

  // restore the topics
  const latestTopic = _.get(denormalizeTopics(_.get(indexPageState, fieldNames.latestTopic), topicEntities, postEntities), 0, {})
  const topics = denormalizeTopics(_.get(indexPageState, fieldNames.topics, []), topicEntities, postEntities)

  return {
    [fieldNames.latest]: latest,
    [fieldNames.editorPicks]: editorPicks,
    [fieldNames.latestTopic]: latestTopic,
    [fieldNames.reviews]: reviews,
    [fieldNames.topics]: topics,
    [fieldNames.photos]: photoPosts,
    [fieldNames.infographics]: infoPosts
  }
}

export { Homepage }
export default connect(mapStateToProps, { fetchIndexPageContent })(Homepage)
