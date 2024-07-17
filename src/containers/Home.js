import { connect } from 'react-redux'
import CSSTransition from 'react-transition-group/CSSTransition'
import { Helmet } from 'react-helmet-async'
import PropTypes from 'prop-types'
import React from 'react'
import qs from 'qs'
import styled, { css } from 'styled-components'
import TagManager from 'react-gtm-module'
import DOMPurify from 'isomorphic-dompurify'
// constants
import colors from '../constants/colors'
import siteMeta from '../constants/site-meta'
// utils
import mq from '../utils/media-query'
import {
  shallowCloneMetaOfPost,
  shallowCloneMetaOfTopic,
} from '../utils/shallow-clone-entity'
// components
import LoadingSpinner from '../components/Spinner'
// factory
import loggerFactory from '../logger'
import sideBarFactory from '../components/side-bar/side-bar-factory'
// @twreporter
import { AnchorWrapper as Section } from '@twreporter/react-components/lib/side-bar'
import IndexPageComposite from '@twreporter/index-page'
import twreporterRedux from '@twreporter/redux'
import {
  CATEGORY_PATH,
  CATEGORY_LABEL,
} from '@twreporter/core/lib/constants/category-set'
import { INFOGRAM_ID } from '@twreporter/core/lib/constants/infogram'
import { BRANCH_PROP_TYPES } from '@twreporter/core/lib/constants/release-branch'
import zIndexConst from '@twreporter/core/lib/constants/z-index'
import { colorGrayscale } from '@twreporter/core/lib/constants/color'
// lodash
import get from 'lodash/get'
import map from 'lodash/map'
import merge from 'lodash/merge'
import forEach from 'lodash/forEach'
const _ = {
  get,
  map,
  merge,
  forEach,
}

const {
  CategorySection,
  DonationBoxSection,
  EditorPicks,
  InforgraphicSection,
  JuniorBoxSection,
  LatestSection,
  LatestTopicSection,
  PhotographySection,
  PodcastBoxSection,
  ReviewsSection,
  TopicsSection,
} = IndexPageComposite.components
const { fetchIndexPageContent, fetchFeatureTopic } = twreporterRedux.actions
const fieldNames = twreporterRedux.reduxStateFields
const logger = loggerFactory.getLogger()

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
  z-index: ${zIndexConst.loadingCover};
  background-color: white;
  div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const moduleBackgounds = {
  latest: colorGrayscale.gray100,
  editorPick: colorGrayscale.white,
  latestTopic: colorGrayscale.gray100,
  review: colorGrayscale.white,
  category: colorGrayscale.gray200,
  topic: colorGrayscale.gray100,
  photography: colors.photographyColor,
  infographic: colorGrayscale.gray100,
  footer: colorGrayscale.white,
}

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  background-color: white;
  ${mq.mobileOnly`
    overflow: hidden;
  `}
  ${reactTransitionCSS}
`

const Background = styled.div`
  ${props =>
    props.$backgroundColor
      ? `background-color: ${props.$backgroundColor};`
      : ''}
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
      url: 'https://www.twreporter.org/categories/world',
      name: '國際兩岸',
    },
    {
      '@type': 'SiteNavigationElement',
      url: 'https://www.twreporter.org/categories/humanrights',
      name: '人權司法',
    },
    {
      '@type': 'SiteNavigationElement',
      url: 'https://www.twreporter.org/categories/politics-and-society',
      name: '政治社會',
    },
    {
      '@type': 'SiteNavigationElement',
      url: 'https://www.twreporter.org/categories/health',
      name: '醫療健康',
    },
    {
      '@type': 'SiteNavigationElement',
      url: 'https://www.twreporter.org/categories/environment',
      name: '環境永續',
    },
    {
      '@type': 'SiteNavigationElement',
      url: 'https://www.twreporter.org/categories/econ',
      name: '經濟產業',
    },
    {
      '@type': 'SiteNavigationElement',
      url: 'https://www.twreporter.org/categories/culture',
      name: '文化生活',
    },
    {
      '@type': 'SiteNavigationElement',
      url: 'https://www.twreporter.org/categories/education',
      name: '教育校園',
    },
    {
      '@type': 'SiteNavigationElement',
      url: 'https://www.twreporter.org/categories/podcast',
      name: 'Podcast',
    },
    {
      '@type': 'SiteNavigationElement',
      url: 'https://www.twreporter.org/categories/opinion',
      name: '評論',
    },
  ],
}

class Homepage extends React.PureComponent {
  static propTypes = {
    fetchIndexPageContent: PropTypes.func,
    fetchFeatureTopic: PropTypes.func,
    isSpinnerDisplayed: PropTypes.bool,
    isContentReady: PropTypes.bool,
    categories: PropTypes.array,
    releaseBranch: BRANCH_PROP_TYPES,
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

  componentDidUpdate(prevProps) {
    if (!prevProps.isContentReady && this.props.isContentReady) {
      // For client-side rendering, we notify GTM that the new component is ready
      TagManager.dataLayer({
        dataLayer: {
          event: 'gtm.load',
        },
      })
    }
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
    const { isSpinnerDisplayed, releaseBranch } = this.props
    const latestTopicData = this.props[fieldNames.sections.latestTopicSection]
    const latestTopicJSX = latestTopicData ? (
      <Section anchorId="latestTopic" anchorLabel="最新專題" showAnchor>
        <LatestTopicSection data={latestTopicData} />
      </Section>
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
          prioritizeSeoTags
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
            {
              property: 'og:updated_time',
              content: siteMeta.ogImage.updatedTime,
            },
          ]}
        />
        <SideBar ref={this._sidebar}>
          <Section anchorId="latest">
            <LatestSection
              data={this.props[fieldNames.sections.latestSection]}
            />
          </Section>
          <Section anchorId="editorPick" anchorLabel="編輯精選" showAnchor>
            <EditorPicks
              data={this.props[fieldNames.sections.editorPicksSection]}
            />
          </Section>
          {latestTopicJSX}
          <Section anchorId="donation-box">
            <DonationBoxSection />
          </Section>
          <Section anchorId="review" anchorLabel="評論" showAnchor>
            <ReviewsSection
              data={this.props[fieldNames.sections.reviewsSection]}
              moreURI={`categories/${CATEGORY_PATH.opinion}`}
            />
          </Section>
          <Section anchorId="junior">
            <JuniorBoxSection releaseBranch={releaseBranch} />
          </Section>
          <Section anchorId="categories" anchorLabel="議題" showAnchor>
            <Background $backgroundColor={moduleBackgounds.category}>
              <CategorySection data={this.props.categories} />
            </Background>
          </Section>
          <Section anchorId="topic" anchorLabel="專題" showAnchor>
            <Background $backgroundColor={moduleBackgounds.topic}>
              <TopicsSection
                data={this.props[fieldNames.sections.topicsSection]}
              />
            </Background>
          </Section>
          <Section anchorId="podcast">
            <PodcastBoxSection releaseBranch={releaseBranch} />
          </Section>
          <Section anchorId="photography" anchorLabel="攝影" showAnchor>
            <Background $backgroundColor={moduleBackgounds.photography}>
              <PhotographySection
                data={this.props[fieldNames.sections.photosSection]}
                moreURI="photography"
              />
            </Background>
          </Section>
          <Section anchorId="infographic" anchorLabel="多媒體" showAnchor>
            <Background $backgroundColor={moduleBackgounds.infographic}>
              <InforgraphicSection
                data={this.props[fieldNames.sections.infographicsSection]}
                moreURI={`tag/${INFOGRAM_ID}`}
              />
            </Background>
          </Section>
        </SideBar>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(JSON.stringify(webSiteJSONLD)),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(JSON.stringify(siteNavigationJSONLD)),
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
  return cloneEntities(ids, entities, shallowCloneMetaOfPost)
}

/**
 *  @param {ReduxState['index_page']} indexPageState
 *  @param {string} section
 *  @param {Object} entities
 *  @return {MetaOfTopic[]}
 */
function restoreSectionWithTopics(indexPageState, section, entities) {
  const ids = _.get(indexPageState, section, [])
  return cloneEntities(ids, entities, shallowCloneMetaOfTopic)
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
  _.forEach(categories, categoryKey => {
    const label = CATEGORY_LABEL[categoryKey]
    const ids = _.get(indexPageState, categoryKey, [])
    const clonedPosts = cloneEntities(ids, entities, shallowCloneMetaOfPost)
    rtn = rtn.concat(
      _.map(clonedPosts, post => {
        post['listName'] = label
        post['moreURI'] = `categories/${categoryKey}`
        return post
      })
    )
  })
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
    shallowCloneMetaOfPost
  )
  const clonedTopic = shallowCloneMetaOfTopic(topicEntities[topicId])
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
      isContentReady: _.get(indexPageState, 'isReady', false),
    }
  )
}

export { Homepage }
export default connect(
  mapStateToProps,
  { fetchIndexPageContent, fetchFeatureTopic }
)(Homepage)
