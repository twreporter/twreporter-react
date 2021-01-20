import { connect } from 'react-redux'
import categoryConst from '../constants/category'
import CSSTransition from 'react-transition-group/CSSTransition'
import Helmet from 'react-helmet'
import loggerFactory from '../logger'
import IndexPageComposite from '@twreporter/index-page'
import LoadingSpinner from '../components/Spinner'
import PropTypes from 'prop-types'
import qs from 'qs'
import React from 'react'
import sideBarFactory from '../components/side-bar/side-bar-factory'
import siteMeta from '../constants/site-meta'
import styled, { css } from 'styled-components'
import twreporterRedux from '@twreporter/redux'

// utils
import cloneUtils from '../utils/shallow-clone-entity'

// lodash
import get from 'lodash/get'
import map from 'lodash/map'
import merge from 'lodash/merge'

const {
  CategorySection,
  DonationBoxSection,
  EditorPicks,
  InforgraphicSection,
  LatestSection,
  LatestTopicSection,
  NewsLetterSection,
  PhotographySection,
  PodcastBoxSection,
  ReviewsSection,
  TopicsSection,
} = IndexPageComposite.components
const { fetchIndexPageContent, fetchFeatureTopic } = twreporterRedux.actions
const fieldNames = twreporterRedux.reduxStateFields
const logger = loggerFactory.getLogger()

const _ = {
  get,
  map,
  merge,
}

const reactTransitionCSS = css`
  .spinner-exit {
    opacity: 1;
  }
  .spinner-exit-active {
    opacity: 0;
    transition: opacity 400ms ease 1600ms;
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
    label: '',
  },
  {
    id: 'editorPick',
    label: '編輯精選',
  },
  {
    id: 'latestTopic',
    label: '最新專題',
  },
  {
    id: 'donation-box',
    label: '',
  },
  {
    id: 'review',
    label: '評論',
  },
  {
    id: 'news-letter',
    label: '',
  },
  {
    id: 'categories',
    label: '議題',
  },
  {
    id: 'topic',
    label: '專題',
  },
  {
    id: 'photography',
    label: '攝影',
  },
  {
    id: 'infographic',
    label: '多媒體',
  },
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
  footer: 'white',
}

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  background-color: white;
  overflow: hidden;
  ${reactTransitionCSS}
`

const Background = styled.div`
  background-color: ${props =>
    props['backgroundColor'] ? props['backgroundColor'] : ''};
`

const webSiteJSONLD = {
  '@context': 'http://schema.org',
  '@type': 'WebSite',
  name: '報導者 The Reporter',
  url: 'https://www.twreporter.org/',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.twreporter.org/search?q={search_term}',
    'query-input': 'required name=search_term',
  },
}

const siteNavigationJSONLD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SiteNavigationElement',
      url: 'https://www.twreporter.org/',
      name: '首頁',
    },
    {
      '@type': 'SiteNavigationElement',
      url: 'https://www.twreporter.org/topics',
      name: '最新專題',
    },
    {
      '@type': 'SiteNavigationElement',
      url: 'https://www.twreporter.org/categories/human_rights_and_society',
      name: '人權．社會',
    },
    {
      '@type': 'SiteNavigationElement',
      url: 'https://www.twreporter.org/categories/environment_and_education',
      name: '環境．教育',
    },
    {
      '@type': 'SiteNavigationElement',
      url: 'https://www.twreporter.org/categories/politics_and_economy',
      name: '政經．產業',
    },
    {
      '@type': 'SiteNavigationElement',
      url: 'https://www.twreporter.org/categories/living_and_medical_care',
      name: '生活．醫療',
    },
    {
      '@type': 'SiteNavigationElement',
      url: 'https://www.twreporter.org/categories/culture_and_art',
      name: '文化．藝術',
    },
    {
      '@type': 'SiteNavigationElement',
      url: 'https://www.twreporter.org/categories/international',
      name: '國際．兩岸',
    },
    {
      '@type': 'SiteNavigationElement',
      url: 'https://www.twreporter.org/categories/infographic',
      name: '多媒體',
    },
    {
      '@type': 'SiteNavigationElement',
      url: 'https://www.twreporter.org/photography',
      name: '影像',
    },
    {
      '@type': 'SiteNavigationElement',
      url: 'https://www.twreporter.org/categories/reviews',
      name: '評論',
    },
  ],
}

class Homepage extends React.PureComponent {
  static propTypes = {
    fetchIndexPageContent: PropTypes.func,
    fetchFeatureTopic: PropTypes.func,
    isSpinnerDisplayed: PropTypes.bool,
    categories: PropTypes.array,
  }

  constructor(props) {
    super(props)
    this._sidebar = React.createRef()
  }

  componentDidMount() {
    this.fetchIndexPageContentWithCatch()
    this.fetchFeatureTopicWithCatch().then(() => {
      // EX: if the url path is /?section=categories
      // after this component mounted and rendered,
      // the browser will smoothly scroll to categories section
      const search = _.get(this.props, 'location.search', '')
      const query = qs.parse(search, { ignoreQueryPrefix: true })
      const section = _.get(query, 'section', '')
      if (this._sidebar.current && section) {
        this._sidebar.current.handleClickAnchor(section)
      }
    })
  }

  fetchIndexPageContentWithCatch = () => {
    return this.props.fetchIndexPageContent().catch(failAction => {
      // TODO render alter message
      logger.errorReport({
        report: _.get(failAction, 'payload.error'),
        message:
          'Error to fetch posts in sections except for categories section on index page.',
      })
    })
  }

  fetchFeatureTopicWithCatch = () => {
    return this.props.fetchFeatureTopic().catch(failAction => {
      // TODO render alter message
      logger.errorReport({
        report: _.get(failAction, 'payload.error'),
        message: 'Error to fetch feature topic on index page.',
      })
    })
  }
  render() {
    const { isSpinnerDisplayed } = this.props
    const latestTopicData = this.props[fieldNames.sections.latestTopicSection]
    const latestTopicJSX = latestTopicData ? (
      <LatestTopicSection data={latestTopicData} />
    ) : null
    const SideBar = sideBarFactory.getIndexPageSideBar()
    return (
      <Container>
        <CSSTransition
          in={isSpinnerDisplayed}
          classNames="spinner"
          timeout={2000}
          enter={false}
          mountOnEnter
          unmountOnExit
        >
          <LoadingCover>
            <LoadingSpinner alt="首頁載入中" />
          </LoadingCover>
        </CSSTransition>
        <Helmet
          title={siteMeta.name.full}
          link={[{ rel: 'canonical', href: siteMeta.urlOrigin + '/' }]}
          meta={[
            { name: 'description', content: siteMeta.desc },
            { name: 'twitter:title', content: siteMeta.name.full },
            { name: 'twitter:image', content: siteMeta.ogImage.url },
            { name: 'twitter:description', content: siteMeta.desc },
            { property: 'og:title', content: siteMeta.name.full },
            { property: 'og:description', content: siteMeta.desc },
            { property: 'og:image', content: siteMeta.ogImage.url },
            { property: 'og:image:width', content: siteMeta.ogImage.width },
            { property: 'og:image:height', content: siteMeta.ogImage.height },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: siteMeta.urlOrigin + '/' },
          ]}
        />
        <SideBar ref={this._sidebar} anchors={anchors}>
          <LatestSection data={this.props[fieldNames.sections.latestSection]} />
          <EditorPicks
            data={this.props[fieldNames.sections.editorPicksSection]}
          />
          {latestTopicJSX}
          <DonationBoxSection />
          <ReviewsSection
            data={this.props[fieldNames.sections.reviewsSection]}
            moreURI={`categories/${categoryConst.pathSegments.reviews}`}
          />
          <NewsLetterSection />
          <Background backgroundColor={moduleBackgounds.category}>
            <CategorySection data={this.props.categories} />
          </Background>
          <Background backgroundColor={moduleBackgounds.topic}>
            <TopicsSection
              data={this.props[fieldNames.sections.topicsSection]}
            />
          </Background>
          <PodcastBoxSection />
          <Background backgroundColor={moduleBackgounds.photography}>
            <PhotographySection
              data={this.props[fieldNames.sections.photosSection]}
              moreURI="photography"
            />
          </Background>
          <Background backgroundColor={moduleBackgounds.infographic}>
            <InforgraphicSection
              data={this.props[fieldNames.sections.infographicsSection]}
              moreURI={`categories/${categoryConst.pathSegments.infographic}`}
            />
          </Background>
        </SideBar>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJSONLD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteNavigationJSONLD),
          }}
        />
      </Container>
    )
  }
}

/**
 *  ReduxState type definition
 *  @typedef {import('@twreporter/redux/lib/typedef').ReduxState} ReduxState
 */

/**
 *  ObjectID type definition
 *  @typedef {import('@twreporter/redux/lib/typedef').ObjectID} ObjectID
 */

/**
 *  @typedef {import('../utils/shallow-clone-entity').MetaOfPost} MetaOfPost
 */

/**
 *  @typedef {import('../utils/shallow-clone-entity').MetaOfTopic} MetaOfTopic
 */

/**
 *  @param {ObjectID[]} ids
 *  @param {Object} entities
 *  @param {Function} cloneFunc -
 *  @return {Object[]}
 */
function cloneEntities(ids, entities, cloneFunc) {
  return _.map(ids, id => {
    return cloneFunc(entities[id])
  })
}

/**
 *  @param {ReduxState["index_page"]} indexPageState
 *  @param {string} section
 *  @param {Object} entities
 *  @return {MetaOfPost[]}
 */
function restoreSectionWithPosts(indexPageState, section, entities) {
  const ids = _.get(indexPageState, section, [])
  return cloneEntities(ids, entities, cloneUtils.shallowCloneMetaOfPost)
}

/**
 *  @param {ReduxState['index_page']} indexPageState
 *  @param {string} section
 *  @param {Object} entities
 *  @return {MetaOfTopic[]}
 */
function restoreSectionWithTopics(indexPageState, section, entities) {
  const ids = _.get(indexPageState, section, [])
  return cloneEntities(ids, entities, cloneUtils.shallowCloneMetaOfTopic)
}

/**
 *  This functions restore posts or topic(s) in
 *  `ReduxState.index_page.latest_section`,
 *  `ReduxState.index_page.editor_picks_section`,
 *  `ReduxState.index_page.latest_topic_section`,
 *  `ReduxState.index_page.reviews_section`,
 *  `ReduxState.index_page.topics_section`,
 *  `ReduxState.index_page.photos_section`.
 *  `ReduxState.index_page.infographics_section`.
 *
 *  @param {ReduxState['index_page']} indexPageState
 *  @param {ReduxState['entities']['posts']['byId']} postEntities
 *  @param {ReduxState['entities']['topics']['byId']} topicEntities
 *  @return {Object.<string, MetaOfPost[] | MetaOfTopic[]> | {}}
 */
function restoreSections(indexPageState, postEntities, topicEntities) {
  const {
    latestTopicSection,
    topicsSection,
    ...otherSections
  } = fieldNames.sections

  let rtn = {}
  for (const key in otherSections) {
    rtn[otherSections[key]] = restoreSectionWithPosts(
      indexPageState,
      otherSections[key],
      postEntities
    )
  }

  rtn[latestTopicSection] = _.get(
    restoreSectionWithTopics(indexPageState, latestTopicSection, topicEntities),
    0
  )
  rtn[topicsSection] = restoreSectionWithTopics(
    indexPageState,
    topicsSection,
    topicEntities
  )

  return rtn
}

/**
 *  CategoryPost type definition
 *  @typedef {MetaOfPost} CategoryPost
 *  @property {string} listName
 *  @property {string} moreURI
 */

/**
 *  This functions restore posts in
 *  `ReduxState.index_page.culture_and_art`,
 *  `ReduxState.index_page.environment_and_education`,
 *  `ReduxState.index_page.international`,
 *  `ReduxState.index_page.living_and_medical_care`,
 *  `ReduxState.index_page.politics_and_economy`,
 *  `ReduxState.index_page.human_rights_and_society`.
 *
 *  @param {ReduxState['index_page']} indexPageState
 *  @param {ReduxState['entities']['posts']['byId']} entities
 *  @return {CategoryPost[]}
 */
function restoreCategories(indexPageState, entities) {
  let rtn = []
  const categories = fieldNames.categories
  for (const key in categories) {
    const ids = _.get(indexPageState, categories[key], [])
    const clonedPosts = cloneEntities(
      ids,
      entities,
      cloneUtils.shallowCloneMetaOfPost
    )
    rtn = rtn.concat(
      _.map(clonedPosts, post => {
        post['listName'] = categoryConst.labels[categories[key]]
        post['moreURI'] = `categories/${categories[key]}`
        return post
      })
    )
  }
  return rtn
}

/**
 *  FeatureTopic type definition
 *  @typedef {MetaOfTopic} FeatureTopic
 *  @property {MetaOfPost[]} relateds
 */

/**
 *  This function restores feature topic with embedded posts
 *  according to `ReduxState.featureTopic`.
 *
 *  @param {ReduxState['featureTopic']} featureTopicState
 *  @param {ReduxState['entities']['posts']['byId']} postEntities
 *  @param {ReduxState['entities']['topics']['byId']} topicEntities
 *  @return {{} | FeatureTopic}
 */
function restoreFeatureTopic(featureTopicState, postEntities, topicEntities) {
  const topicId = _.get(featureTopicState, 'id')

  if (!topicId) {
    return {}
  }

  const lastThreeRelatedPostIds = _.get(
    featureTopicState,
    'lastThreeRelatedPostIds',
    []
  )
  const relatedPosts = cloneEntities(
    lastThreeRelatedPostIds,
    postEntities,
    cloneUtils.shallowCloneMetaOfPost
  )
  const clonedTopic = cloneUtils.shallowCloneMetaOfTopic(topicEntities[topicId])
  clonedTopic['relateds'] = relatedPosts

  return clonedTopic
}

/**
 *  HomepageProps type definition
 *  @typedef {Object} HomepageProps
 *  @property {MetaOfPost[]} [latest_section]
 *  @property {MetaOfPost[]} [editor_picks_section]
 *  @property {FeatureTopic | {}} [latest_topic_section]
 *  @property {MetaOfPost[]} [reviews_section]
 *  @property {MetaOfTopic[]} [topics_section]
 *  @property {MetaOfPost[]} [photos_section]
 *  @property {MetaOfPost[]} [infographics_section]
 *  @property {CategoryPost[]} categories
 *  @property {boolean} isSpinnerDisplayed
 *  @property {boolean} ifAuthenticated
 */

/**
 *  This function subscribes to redux store.
 *  If redux store state changed,
 *  this function will collect the latest state
 *  and pass those changed state to `Homepage` React component
 *  as component `props`.
 *
 *  @param {ReduxState} state
 *  @return {HomepageProps}
 */
function mapStateToProps(state) {
  const entities = _.get(state, fieldNames.entities, {})
  const indexPageState = _.get(state, fieldNames.indexPage, {})
  const featureTopicState = _.get(state, fieldNames.featureTopic, {})
  const postEntities = _.get(entities, [fieldNames.postsInEntities, 'byId'], {})
  const topicEntities = _.get(
    entities,
    [fieldNames.topicsInEntities, 'byId'],
    {}
  )

  return _.merge(
    {},
    restoreSections(indexPageState, postEntities, topicEntities),
    {
      [fieldNames.sections.latestTopicSection]: restoreFeatureTopic(
        featureTopicState,
        postEntities,
        topicEntities
      ),
    },
    {
      categories: restoreCategories(indexPageState, postEntities),
    },
    {
      isSpinnerDisplayed: !_.get(indexPageState, 'isReady', false),
      ifAuthenticated: _.get(state, ['auth', 'authenticated'], false),
    }
  )
}

export { Homepage }
export default connect(
  mapStateToProps,
  { fetchIndexPageContent, fetchFeatureTopic }
)(Homepage)
