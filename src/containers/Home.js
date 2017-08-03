/*eslint no-unused-vars:0, no-console:0 */
import Helmet from 'react-helmet'
import React from 'react'
import categoryString from '../constants/category-strings'
import categoryURI from '../conf/category-uri'
import IndexPageComposite from 'twreporter-react-index-page-components'
import styled from 'styled-components'
import twreporterRedux from 'twreporter-redux'
import { SITE_NAME, SITE_META } from '../constants/index'
import { connect } from 'react-redux'
import { getImageSrcSet } from '../utils/image-processor.js'

// lodash
import get from 'lodash/get'
import keys from 'lodash/keys'
import set from 'lodash/set'

const { ReviewsSection, CategorySection, PhotographySection, ReporterIntro, SideBar, TopicsSection, Header, EditorPicks, InforgraphicSection, LatestSection, LatestTopicSection, ScrollFadein } = IndexPageComposite.components
const { moduleIdObj, moduleLabelObj, moduleBackgounds } = IndexPageComposite.utility
const { fetchIndexPageContent, fetchCategoriesPostsOnIndexPage } =  twreporterRedux.actions
const { denormalizePosts, denormalizeTopics } = twreporterRedux.utils
const fieldNames = twreporterRedux.reduxStateFields

const _ = {
  get,
  keys,
  set
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

  componentWillMount() {
    this.props.fetchIndexPageContent()
  }

  componentDidMount() {
    this.props.fetchCategoriesPostsOnIndexPage()
  }

  render() {
    const microData = (
      <div itemScope itemType="http://www.schema.org/SiteNavigationElement">
        <div>
          <meta itemProp="name" content="首頁" />
          <link itemProp="url" href="https://www.twreporter.org/" />
        </div>
        <div>
          <meta itemProp="name" content="人權．社會" />
          <link itemProp="url" href="https://www.twreporter.org/categories/human_rights_and_society" />
        </div>
        <div>
          <meta itemProp="name" content="環境．教育" />
          <link itemProp="url" href="https://www.twreporter.org/categories/environment_and_education" />
        </div>
        <div>
          <meta itemProp="name" content="政治．經濟" />
          <link itemProp="url" href="https://www.twreporter.org/categories/politics_and_economy" />
        </div>
        <div>
          <meta itemProp="name" content="生活．醫療" />
          <link itemProp="url" href="https://www.twreporter.org/categories/living_and_medical_care" />
        </div>
        <div>
          <meta itemProp="name" content="文化．藝術" />
          <link itemProp="url" href="https://www.twreporter.org/categories/culture_and_art" />
        </div>
        <div>
          <meta itemProp="name" content="國際．兩岸" />
          <link itemProp="url" href="https://www.twreporter.org/categories/international" />
        </div>
        <div>
          <meta itemProp="name" content="觀點" />
          <link itemProp="url" href="https://www.twreporter.org/categories/reviews" />
        </div>
        <div>
          <meta itemProp="name" content="多媒體" />
          <link itemProp="url" href="https://www.twreporter.org/categories/infographic" />
        </div>
        <div>
          <meta itemProp="name" content="影像" />
          <link itemProp="url" href="https://www.twreporter.org/photography" />
        </div>
      </div>
    )

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
            "@id": "https://www.twreporter.org/categories/human_rights_and_society",
            "name": "人權．社會"
          }
        },{
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@id": "https://www.twreporter.org/categories/environment_and_education",
            "name": "環境．教育"
          }
        },{
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@id": "https://www.twreporter.org/categories/politics_and_economy",
            "name": "政治．經濟"
          }
        },{
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@id": "https://www.twreporter.org/categories/living_and_medical_care",
            "name": "生活．醫療"
          }
        },{
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@id": "https://www.twreporter.org/categories/culture_and_art",
            "name": "文化．藝術"
          }
        },{
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@id": "https://www.twreporter.org/categories/international",
            "name": "國際．兩岸"
          }
        },{
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@id": "https://www.twreporter.org/categories/reviews",
            "name": "評論"
          }
        }, {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@id": "https://www.twreporter.org/categories/infographic",
            "name": "多媒體"
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
        <SideBar
          moduleLabelObj={moduleLabelObj}
        >
          <FirstModuleWrapper
            moduleId={moduleIdObj.editorPick}
          >
            <LatestSection data={this.props[fieldNames.sections.latestSection]} />
            <EditorPicks data={this.props[fieldNames.sections.editorPicksSection]} />
          </FirstModuleWrapper>
          <ScrollFadein moduleId={moduleIdObj.latestTopic}>
            <LatestTopicSection
              data={this.props[fieldNames.sections.latestTopicSection]}
            />
          </ScrollFadein>
          <ScrollFadein moduleId={moduleIdObj.review}>
            <ReviewsSection
              data={this.props[fieldNames.sections.reviewsSection]}
              moreURI={`categories/${categoryURI.reviews}`}
            />
          </ScrollFadein>
          <ScrollFadein moduleId={moduleIdObj.category}>
            <CategorySection
              data={this.props.categories}
            />
          </ScrollFadein>
          <ScrollFadein
            moduleId={moduleIdObj.topic}
            backgroundColor={moduleBackgounds.topic}
          >
            <TopicsSection
              items={this.props[fieldNames.sections.topicsSection]}
            />
          </ScrollFadein>
          <ScrollFadein
            backgroundColor={moduleBackgounds.photography}
            moduleId={moduleIdObj.photography}
          >
            <PhotographySection
              items={this.props[fieldNames.sections.photosSection]}
              moreURI="photography"
            />
          </ScrollFadein>
          <ScrollFadein
            moduleId={moduleIdObj.infographic}
            backgroundColor={moduleBackgounds.infographic}
          >
            <InforgraphicSection
              items={this.props[fieldNames.sections.infographicsSection]}
              moreURI={`categories/${categoryURI.infographic}`}
            />
          </ScrollFadein>
          <ScrollFadein moduleId={moduleIdObj.donation}>
            <ReporterIntro />
          </ScrollFadein>
        </SideBar>
        { microData }
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: webSiteJSONLD }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbListJSONLD }} />
      </Container>
    )
  }
}

function buildCategorySectionData(state) {
  const buildData = (post) => {
    return {
      id: _.get(post, 'id', ''),
      slug: _.get(post, 'slug', ''),
      title: _.get(post, 'title', ''),
      img: {
        src: _.get(post, 'hero_image.resized_targets.tiny.url',''),
        description: _.get(post, 'hero_image.description',''),
        srcset: getImageSrcSet(_.get(post, 'hero_image.resized_targets'))
      },
      style: _.get(post, 'style', '')
    }
  }

  const catFields = _.keys(fieldNames.categories)
  const postEntities = _.get(state, [ fieldNames.entities, fieldNames.postsInEntities ], {})
  const selected = []
  const data = []

  catFields.forEach((field) => {
    let post
    const slugs = _.get(state, [ fieldNames.indexPage, fieldNames.categories[field] ], [])
    if (Array.isArray(slugs)) {
      for (let i = 0; i < slugs.length; i+=1) {
        const slug = slugs[i]
        if (selected.indexOf(slug) === -1) {
          post = buildData(_.get(denormalizePosts(slug, postEntities), 0))
          post.id = field + '-' + post.id
          post.listName = categoryString[field]
          post.moreURI = `categories/${categoryURI[field]}`
          data.push(post)
          break
        }
      }
      if (typeof post !== 'object' && slugs.length > 0) {
        post = buildData(_.get(denormalizePosts(slugs[0], postEntities), 0))
        post.id = field + '-' + post.id
        post.listName = categoryString[field]
        post.moreURI = `categories/${categoryURI[field]}`
        data.push(post)
      }
    }
  })
  return data
}

function mapStateToProps(state) {
  const entities = _.get(state, fieldNames.entities, {})
  const indexPageState = _.get(state, fieldNames.indexPage, {})

  // get post entities
  const postEntities = _.get(entities, fieldNames.postsInEntities, {})

  // get topic entities
  const topicEntities = _.get(entities, fieldNames.topicsInEntities, {})

  // restore the posts
  const sections = fieldNames.sections
  const latest = denormalizePosts(_.get(indexPageState, sections.latestSection, []), postEntities)
  const editorPicks = denormalizePosts(_.get(indexPageState, sections.editorPicksSection, []), postEntities)
  const reviews = denormalizePosts(_.get(indexPageState, sections.reviewsSection, []), postEntities)
  const photoPosts = denormalizePosts(_.get(indexPageState, sections.photosSection, []), postEntities)
  const infoPosts = denormalizePosts(_.get(indexPageState, sections.infographicsSection, []), postEntities)

  // restore the topics
  const latestTopic = _.get(denormalizeTopics(_.get(indexPageState, sections.latestTopicSection), topicEntities, postEntities), 0, {})
  const topics = denormalizeTopics(_.get(indexPageState, sections.topicsSection, []), topicEntities, postEntities)

  // restore

  return {
    [fieldNames.sections.latestSection]: latest,
    [fieldNames.sections.editorPicksSection]: editorPicks,
    [fieldNames.sections.latestTopicSection]: latestTopic,
    [fieldNames.sections.reviewsSection]: reviews,
    [fieldNames.sections.topicsSection]: topics,
    [fieldNames.sections.photosSection]: photoPosts,
    [fieldNames.sections.infographicsSection]: infoPosts,
    categories: buildCategorySectionData(state)
  }
}

export { Homepage }
export default connect(mapStateToProps, { fetchIndexPageContent, fetchCategoriesPostsOnIndexPage })(Homepage)
