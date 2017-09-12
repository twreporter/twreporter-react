/*eslint no-unused-vars:0, no-console:0 */
import Helmet from 'react-helmet'
import React from 'react'
import categoryString from '../constants/category-strings'
import categoryURI from '../conf/category-uri'
import { IndexPageComposite } from 'twreporter-react-components'
import styled, { keyframes } from 'styled-components'
import twreporterRedux from 'twreporter-redux'
import { SITE_NAME, SITE_META } from '../constants/index'
import { connect } from 'react-redux'
import { CSSTransitionGroup } from 'react-transition-group'
import { Footer } from 'twreporter-react-components'
import LoadingSpinner from '../components/Spinner'

// lodash
import get from 'lodash/get'
import keys from 'lodash/keys'
import set from 'lodash/set'

const { CategorySection, EditorPicks, InforgraphicSection,
  LatestSection, LatestTopicSection, NewsLetterSection, PhotographySection,
  ReporterIntro,  ReviewsSection, SideBar, TopicsSection } = IndexPageComposite.components
const { fetchIndexPageContent, fetchCategoriesPostsOnIndexPage } =  twreporterRedux.actions
const { denormalizePosts, denormalizeTopics } = twreporterRedux.utils
const fieldNames = twreporterRedux.reduxStateFields

const _ = {
  get,
  keys,
  set
}

const StyledCSSTransitionGroup = styled(CSSTransitionGroup)`
  .spinner-leave {
    opacity: 1;
  }

  .spinner-leave.spinner-leave-active {
    opacity: 0;
    transition: opacity 400ms linear 1600ms;
  }
`

const LoadingCover = styled.div`
  position: fixed;
  height: 100vh;
  width: 100%;
  z-index: 1999;
  background-color: white;
  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const anchors = [
  {
    id: 'latest',
    label: ''
  }, {
    id: 'editorPick',
    label: '編輯精選'
  }, {
    id: 'latestTopic',
    label: '最新專題'
  }, {
    id: 'review',
    label: '評論'
  }, {
    id: 'news-letter',
    label: ''
  }, {
    id: 'category',
    label: '分類'
  }, {
    id: 'topic',
    label: '專題'
  }, {
    id: 'photography',
    label: '攝影'
  }, {
    id: 'infographic',
    label: '多媒體'
  }, {
    id: 'aboutus',
    label: '關於我們'
  }
]

const moduleBackgounds = {
  latest: '#f2f2f2',
  editorPick: 'white',
  latestTopic: '#f2f2f2',
  review: 'white',
  category: '#e2e2e2',
  topic: '#f2f2f2',
  photography: '#08192d',
  infographic: '#f2f2f2',
  donation: 'white'
}

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  background-color: white;
  overflow: hidden;
`

const Background = styled.div`
  background-color: ${props => (props.backgroundColor ? props.backgroundColor : '')};
`

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

const webSiteJSONLD = {
  '@context' : 'http://schema.org',
  '@type' : 'WebSite',
  'name' : '報導者 The Reporter',
  'url' : 'https://www.twreporter.org/',
  'potentialAction' : {
    '@type' : 'SearchAction',
    'target' : 'https://www.twreporter.org/search?q={search_term}',
    'query-input' : 'required name=search_term'
  }
}

const breadcrumbListJSONLD = {
  '@context': 'http://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': [ {
    '@type': 'ListItem',
    'position': 1,
    'item': {
      '@id': 'https://www.twreporter.org/',
      'name': '首頁'
    }
  },{
    '@type': 'ListItem',
    'position': 2,
    'item': {
      '@id': 'https://www.twreporter.org/categories/human_rights_and_society',
      'name': '人權．社會'
    }
  },{
    '@type': 'ListItem',
    'position': 2,
    'item': {
      '@id': 'https://www.twreporter.org/categories/environment_and_education',
      'name': '環境．教育'
    }
  },{
    '@type': 'ListItem',
    'position': 2,
    'item': {
      '@id': 'https://www.twreporter.org/categories/politics_and_economy',
      'name': '政治．經濟'
    }
  },{
    '@type': 'ListItem',
    'position': 2,
    'item': {
      '@id': 'https://www.twreporter.org/categories/living_and_medical_care',
      'name': '生活．醫療'
    }
  },{
    '@type': 'ListItem',
    'position': 2,
    'item': {
      '@id': 'https://www.twreporter.org/categories/culture_and_art',
      'name': '文化．藝術'
    }
  },{
    '@type': 'ListItem',
    'position': 2,
    'item': {
      '@id': 'https://www.twreporter.org/categories/international',
      'name': '國際．兩岸'
    }
  },{
    '@type': 'ListItem',
    'position': 2,
    'item': {
      '@id': 'https://www.twreporter.org/categories/reviews',
      'name': '評論'
    }
  }, {
    '@type': 'ListItem',
    'position': 2,
    'item': {
      '@id': 'https://www.twreporter.org/categories/infographic',
      'name': '多媒體'
    }
  }, {
    '@type': 'ListItem',
    'position': 2,
    'item': {
      '@id': 'https://www.twreporter.org/photography',
      'name': '影像'
    }
  } ]
}

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
    const { isSpinnerDisplayed } = this.props
    return (
      <Container>
        <StyledCSSTransitionGroup
          transitionName="spinner"
          transitionEnter={false}
          transitionLeaveTimeout={2000}
        >
        {!isSpinnerDisplayed ? null : (
          <LoadingCover key="loader">
            <LoadingSpinner alt="首頁載入中" />
          </LoadingCover>
        )}
        </StyledCSSTransitionGroup>
        <Helmet
          title={SITE_NAME.FULL}
          link={[
            { rel: 'canonical', href: SITE_META.URL }
          ]}
          meta={[
            { name: 'description', content: SITE_META.DESC },
            { name: 'twitter:title', content: SITE_NAME.FULL },
            { name: 'twitter:image', content: SITE_META.OG_IMAGE },
            { name: 'twitter:description', content: SITE_META.DESC },
            { property: 'og:title', content: SITE_NAME.FULL },
            { property: 'og:description', content: SITE_META.DESC },
            { property: 'og:image', content: SITE_META.OG_IMAGE },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: SITE_META.URL }
          ]}
        />
        <SideBar
          anchors={anchors}
        >
          <LatestSection data={this.props[fieldNames.sections.latestSection]} />
          <EditorPicks data={this.props[fieldNames.sections.editorPicksSection]} />
          <LatestTopicSection
            data={this.props[fieldNames.sections.latestTopicSection]}
          />
          <ReviewsSection
            data={this.props[fieldNames.sections.reviewsSection]}
            moreURI={`categories/${categoryURI.reviews}`}
          />
          <NewsLetterSection />
          <Background
            backgroundColor={moduleBackgounds.category}
          >
            <CategorySection
              data={this.props.categories}
            />
          </Background>
          <Background
            backgroundColor={moduleBackgounds.topic}
          >
            <TopicsSection
              data={this.props[fieldNames.sections.topicsSection]}
            />
          </Background>
          <Background
            backgroundColor={moduleBackgounds.photography}
          >
            <PhotographySection
              data={this.props[fieldNames.sections.photosSection]}
              moreURI="photography"
            />
          </Background>
          <Background
            backgroundColor={moduleBackgounds.infographic}
          >
            <InforgraphicSection
              data={this.props[fieldNames.sections.infographicsSection]}
              moreURI={`categories/${categoryURI.infographic}`}
            />
          </Background>
          <ReporterIntro />
        </SideBar>
        { microData }
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJSONLD) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbListJSONLD) }} />
        <Footer />
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
      hero_image: _.get(post, 'hero_image'),
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

  // check if spinner should be displayed
  const err = _.get(indexPageState, 'error', null)
  const isFetching = _.get(indexPageState, 'isFetching', false)
  const isSpinnerDisplayed = (latest.length <= 0) && isFetching && !err

  // restore

  return {
    [fieldNames.sections.latestSection]: latest,
    [fieldNames.sections.editorPicksSection]: editorPicks,
    [fieldNames.sections.latestTopicSection]: latestTopic,
    [fieldNames.sections.reviewsSection]: reviews,
    [fieldNames.sections.topicsSection]: topics,
    [fieldNames.sections.photosSection]: photoPosts,
    [fieldNames.sections.infographicsSection]: infoPosts,
    categories: buildCategorySectionData(state),
    isSpinnerDisplayed
  }
}

export { Homepage }
export default connect(mapStateToProps, { fetchIndexPageContent, fetchCategoriesPostsOnIndexPage })(Homepage)
