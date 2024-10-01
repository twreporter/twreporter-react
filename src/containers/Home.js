import { useDispatch, useSelector } from 'react-redux'
import CSSTransition from 'react-transition-group/CSSTransition'
import { Helmet } from 'react-helmet-async'
import PropTypes from 'prop-types'
import React, { useEffect, useRef, useContext } from 'react'
import qs from 'qs'
import styled, { css } from 'styled-components'
import TagManager from 'react-gtm-module'
import DOMPurify from 'isomorphic-dompurify'
// constants
import colors from '../constants/colors'
import siteMeta from '../constants/site-meta'
// context
import { CoreContext } from '../contexts'
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

const moduleBackgrounds = {
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

const Homepage = ({ location }) => {
  const dispatch = useDispatch()
  const sidebarRef = useRef(null)

  const entities = useSelector(state => _.get(state, fieldNames.entities, {}))
  const postEntities = _.get(entities, [fieldNames.postsInEntities, 'byId'], {})
  const topicEntities = _.get(
    entities,
    [fieldNames.topicsInEntities, 'byId'],
    {}
  )

  const indexPageState = useSelector(state =>
    _.get(state, fieldNames.indexPage, {})
  )
  const featureTopicState = useSelector(state =>
    _.get(state, fieldNames.featureTopic, {})
  )
  const fieldSections = restoreSections(
    indexPageState,
    postEntities,
    topicEntities
  )
  const categories = restoreCategories(indexPageState, postEntities)
  const isSpinnerDisplayed = !_.get(indexPageState, 'isReady', false)
  const isContentReady = _.get(indexPageState, 'isReady', false)
  const latestTopicData = restoreFeatureTopic(
    featureTopicState,
    postEntities,
    topicEntities
  )
  const { releaseBranch } = useContext(CoreContext)

  useEffect(() => {
    fetchIndexPageContentWithCatch()
    fetchFeatureTopicWithCatch().then(() => {
      // EX: if the url path is /?section=categories
      // after this component mounted and rendered,
      // the browser will smoothly scroll to categories section
      const search = _.get(location, 'search', '')
      const query = qs.parse(search, { ignoreQueryPrefix: true })
      const section = _.get(query, 'section', '')
      if (sidebarRef.current && section) {
        sidebarRef.current.handleClickAnchor(section)
      }
    })
  }, [])

  useEffect(() => {
    if (isContentReady) {
      // For client-side rendering, we notify GTM that the new component is ready
      TagManager.dataLayer({
        dataLayer: {
          event: 'gtm.load',
        },
      })
    }
  }, [isContentReady])

  const fetchIndexPageContentWithCatch = () => {
    return dispatch(fetchIndexPageContent()).catch(failAction => {
      logger.errorReport({
        report: _.get(failAction, 'payload.error'),
        message:
          'Error to fetch posts in sections except for categories section on index page.',
      })
    })
  }

  const fetchFeatureTopicWithCatch = () => {
    return dispatch(fetchFeatureTopic()).catch(failAction => {
      logger.errorReport({
        report: _.get(failAction, 'payload.error'),
        message: 'Error to fetch feature topic on index page.',
      })
    })
  }

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
      <SideBar ref={sidebarRef}>
        <Section anchorId="latest">
          <LatestSection
            data={fieldSections[fieldNames.sections.latestSection]}
          />
        </Section>
        <Section anchorId="editorPick" anchorLabel="編輯精選" showAnchor>
          <EditorPicks
            data={fieldSections[fieldNames.sections.editorPicksSection]}
          />
        </Section>
        {latestTopicJSX}
        <Section anchorId="donation-box">
          <DonationBoxSection />
        </Section>
        <Section anchorId="review" anchorLabel="評論" showAnchor>
          <ReviewsSection
            data={fieldSections[fieldNames.sections.reviewsSection]}
            moreURI={`categories/${CATEGORY_PATH.opinion}`}
          />
        </Section>
        <Section anchorId="junior">
          <JuniorBoxSection releaseBranch={releaseBranch} />
        </Section>
        <Section anchorId="categories" anchorLabel="議題" showAnchor>
          <Background $backgroundColor={moduleBackgrounds.category}>
            <CategorySection data={categories} />
          </Background>
        </Section>
        <Section anchorId="topic" anchorLabel="專題" showAnchor>
          <Background $backgroundColor={moduleBackgrounds.topic}>
            <TopicsSection
              data={fieldSections[fieldNames.sections.topicsSection]}
            />
          </Background>
        </Section>
        <Section anchorId="podcast">
          <PodcastBoxSection releaseBranch={releaseBranch} />
        </Section>
        <Section anchorId="photography" anchorLabel="攝影" showAnchor>
          <Background $backgroundColor={moduleBackgrounds.photography}>
            <PhotographySection
              data={fieldSections[fieldNames.sections.photosSection]}
              moreURI="photography"
            />
          </Background>
        </Section>
        <Section anchorId="infographic" anchorLabel="多媒體" showAnchor>
          <Background $backgroundColor={moduleBackgrounds.infographic}>
            <InforgraphicSection
              data={fieldSections[fieldNames.sections.infographicsSection]}
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

Homepage.propTypes = {
  location: PropTypes.object.isRequired,
}

export { Homepage }
export default Homepage
