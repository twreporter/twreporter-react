import React, { useState, useEffect, useRef } from 'react'
import { connect, useStore } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet-async'
import TagManager from 'react-gtm-module'
import localForage from 'localforage'
import memoizeOne from 'memoize-one'
// logger
import loggerFactory from '../logger'
// uiManager
import uiManager from '../managers/ui-manager'
// constants
import bsConst from '../constants/browser-storage'
import siteMeta from '../constants/site-meta'
// utils
import cloneUtils from '../utils/shallow-clone-entity'
// components
import ArticlePlaceholder from '../components/article/placeholder'
import SystemError from '../components/SystemError'
import ArticleBanner from '../components/notify-and-promo/article-banner'
// @twreporter
import twreporterRedux from '@twreporter/redux'
import ArticleComponent from '@twreporter/react-article-components'
import { date2yyyymmdd } from '@twreporter/core/lib/utils/date'
import { replaceGCSUrlOrigin } from '@twreporter/core/lib/utils/storage-url-processor'
import predefinedPropTypes from '@twreporter/core/lib/constants/prop-types'
import releaseBranchConsts from '@twreporter/core/lib/constants/release-branch'
import smoothScroll from '@twreporter/core/lib/utils/smooth-scroll'
// hooks
import { usePrevious } from '../hooks'
// lodash
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'
import map from 'lodash/map'

const _ = {
  forEach,
  get,
  debounce,
  throttle,
  map,
}

// global var
const logger = loggerFactory.getLogger()
const articleReadCountConditionConfig = {
  reading_height: 0.75,
  reading_time: 10000, // 10 second
}
const articleReadTimeConditionConfig = {
  inactive_time: 900000, // 900 second
  min_active_time: 5000, // 5 second
}

const Article = ({
  // props from redux state
  errorOfPost,
  // errorOfRelateds,
  fontLevel,
  isFetchingPost,
  // isFetchingRelateds,
  post,
  relateds,
  hasMoreRelateds,
  slugToFetch,
  isAuthed,
  userRole,
  jwt,
  userID,
  postID,
  // props from redux actions
  fetchAFullPost,
  fetchRelatedPostsOfAnEntity,
  changeFontLevel,
  setUserAnalyticsData,
  setUserFootprint,
  // props from react-router-dom
  history,
  // props from parents
  releaseBranch,
}) => {
  const store = useStore()
  const prevIsFetchingPost = usePrevious(isFetchingPost)
  const [isExpanded, setIsExpaned] = useState(false)
  const [
    isReachedArticleReadTargetHeight,
    setIsReachedArticleReadTargetHeight,
  ] = useState(false)
  const [
    isReachedArticleReadTargetTime,
    setIsReachedArticleReadTargetTime,
  ] = useState(false)
  const [isBeenRead, setIsBeenRead] = useState(false)

  const articleBodyRef = useRef(null)
  const readingCountTimerId = useRef(null)
  const inactiveTimerId = useRef(null)

  let startReadingTime = Date.now()
  let isActive = false
  let activeTime = 0

  const fetchAFullPostWithCatch = slug => {
    if (slug === '') {
      return
    }

    fetchAFullPost(slug)
      .catch(failAction => {
        logger.errorReport({
          report: _.get(failAction, 'payload.error'),
          message: `Error to fetch a full post, post slug: '${slug}'.`,
        })
      })
      .then(successAction => {
        const postId = _.get(successAction, 'payload.post.id', '')
        if (postId) {
          return fetchRelatedPostsOfAnEntity(postId)
        }
      })
      .catch(failAction => {
        logger.errorReport({
          report: _.get(failAction, 'payload.error'),
          message: `Error to fetch a post's related posts, post slug: '${slug}'. `,
        })
      })
  }

  const loadMoreRelateds = () => {
    const id = _.get(post, 'id', '')
    const slug = _.get(post, 'slug', '')

    if (id && hasMoreRelateds) {
      return fetchRelatedPostsOfAnEntity(id).catch(failAction => {
        logger.errorReport({
          report: _.get(failAction, 'payload.error'),
          message: `Error to fetch post's related posts, post slug: '${slug}'. `,
        })
      })
    }
  }

  const handleFontLevelChange = fontLevel => {
    changeFontLevel(fontLevel)
    localForage.setItem(bsConst.keys.fontLevel, fontLevel).catch(err => {
      console.warn('Can not set item into browser storage: ', err)
    })
  }

  const onToggleTabExpanded = isExpanded => {
    setIsExpaned(isExpanded)
  }

  const sendReadCount = () => {
    if (isAuthed) {
      setUserAnalyticsData(jwt, userID, postID, { readPostCount: true })
    }
  }

  const sendActiveTime = () => {
    const activeSec = Math.round(activeTime / 1000)
    if (activeSec > 7200) {
      logger.errorReport({
        report: 'read time error',
        message: `StartReadingTime: ${startReadingTime}, ActiveTime: ${activeTime}`,
      })
    }
    if (isAuthed) {
      setUserAnalyticsData(jwt, userID, postID, { readPostSec: activeSec })
      activeTime = 0
    }
  }

  const sendUserFootprint = () => {
    if (isAuthed) {
      setUserFootprint(jwt, userID, postID)
    }
  }

  const startReadingCountTimer = () => {
    if (readingCountTimerId.current) {
      window.clearTimeout(readingCountTimerId.current)
    }
    readingCountTimerId.current = window.setTimeout(() => {
      setIsReachedArticleReadTargetTime(true)
    }, articleReadCountConditionConfig.reading_time)
  }

  const calculateActiveTime = () => {
    const elapsedTime = Math.floor(Date.now() - startReadingTime)
    activeTime = activeTime + elapsedTime
    startReadingTime = Date.now()
  }

  const startInactiveTimer = () => {
    if (inactiveTimerId.current) {
      window.clearTimeout(inactiveTimerId.current)
    }
    inactiveTimerId.current = window.setTimeout(() => {
      calculateActiveTime()
      if (activeTime >= articleReadTimeConditionConfig.min_active_time) {
        sendActiveTime()
      }
      isActive = false
    }, articleReadTimeConditionConfig.inactive_time)
  }

  const handleScroll = _.debounce(() => {
    const scrollHeight = window.scrollY || document.documentElement.scrollTop
    const totalHeight = document.documentElement.scrollHeight
    const targetHeight =
      totalHeight * articleReadCountConditionConfig.reading_height
    if (scrollHeight >= targetHeight) {
      setIsReachedArticleReadTargetHeight(true)
    }
  }, 500)

  const handleVisibilityChange = _.throttle(() => {
    if (document.visibilityState === 'hidden') {
      if (isActive) {
        if (inactiveTimerId.current) {
          window.clearTimeout(inactiveTimerId.current)
        }
        calculateActiveTime()
        if (activeTime >= articleReadTimeConditionConfig.min_active_time) {
          sendActiveTime()
        }
        isActive = false
      }
    } else {
      if (!isActive) {
        isActive = true
        startReadingTime = Date.now()
      }
      startInactiveTimer()
    }
  }, 1000)

  const handleUserActivity = _.debounce(() => {
    if (!isActive) {
      isActive = true
      startReadingTime = Date.now()
    }
    startInactiveTimer()
  }, 500)

  const handlePagehide = () => {
    calculateActiveTime()
    if (activeTime >= articleReadTimeConditionConfig.min_active_time) {
      sendActiveTime()
    }
  }

  useEffect(() => {
    // reset readingCount state
    history.block(() => {
      setIsBeenRead(false)
      setIsReachedArticleReadTargetHeight(false)
      setIsReachedArticleReadTargetTime(false)
      calculateActiveTime()
      if (activeTime >= articleReadTimeConditionConfig.min_active_time) {
        sendActiveTime()
      }
      return true
    })
  }, [history])

  useEffect(() => {
    fetchAFullPostWithCatch(slugToFetch)
    sendUserFootprint()
    startReadingCountTimer()
    startReadingTime = Date.now()
    document.addEventListener('scroll', handleScroll)
    document.addEventListener('visibilitychange', handleVisibilityChange)
    document.addEventListener('mousemove', handleUserActivity)
    document.addEventListener('click', handleUserActivity)
    window.addEventListener('pagehide', handlePagehide)

    handleVisibilityChange()

    localForage
      .getItem(bsConst.keys.fontLevel)
      .then(value => {
        if (value !== fontLevel) {
          changeFontLevel(value)
        }
      })
      .catch(err => {
        console.warn('Can not get item from browser storage: ', err)
      })

    return () => {
      document.removeEventListener('scroll', handleScroll)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      document.removeEventListener('mousemove', handleUserActivity)
      document.removeEventListener('click', handleUserActivity)
      window.removeEventListener('pagehide', handlePagehide)
    }
  }, [slugToFetch])

  useEffect(() => {
    if (prevIsFetchingPost && !isFetchingPost) {
      TagManager.dataLayer({
        dataLayer: {
          event: 'gtm.load',
        },
      })
      startReadingCountTimer()
      startReadingTime = Date.now()
      startInactiveTimer()
    }
  }, [isFetchingPost])

  useEffect(() => {
    if (
      !isBeenRead &&
      isReachedArticleReadTargetHeight &&
      isReachedArticleReadTargetTime
    ) {
      sendReadCount()
      setIsBeenRead(true)
    }
  }, [
    isBeenRead,
    isReachedArticleReadTargetHeight,
    isReachedArticleReadTargetTime,
  ])

  useEffect(() => {
    const scrollToHashElement = () => {
      const { hash } = window.location
      if (!hash) return
      const decodedHash = decodeURIComponent(hash)
      const elementToScroll = document.getElementById(
        decodedHash.replace('#', '')
      )
      if (!elementToScroll) return
      const start = window.scrollY
      const end = elementToScroll.getBoundingClientRect().top
      smoothScroll(start + end)
    }

    // wait till component render
    setTimeout(() => scrollToHashElement(), 1000)
    window.addEventListener('hashchange', scrollToHashElement)
    return () => {
      window.removeEventListener('hashchange', scrollToHashElement)
    }
  }, [])

  if (errorOfPost) {
    return (
      <div>
        <SystemError error={errorOfPost} />
      </div>
    )
  }

  if (isFetchingPost) {
    return <ArticlePlaceholder />
  }

  // if post is invalid
  if (!post) {
    return (
      <div>
        <SystemError error={{ statusCode: 500 }} />
      </div>
    )
  }

  post.style = uiManager.getArticleV2Style(post.style)
  // for head tag
  const canonical = `${siteMeta.urlOrigin}/a/${_.get(post, 'slug', '')}`
  const ogTitle = `${_.get(post, 'og_title', '') || _.get(post, 'title', '')}${
    siteMeta.name.separator
  }${siteMeta.name.full}`
  const ogDesc = _.get(post, 'og_description', siteMeta.desc)
  const ogImage = _.get(post, 'og_image.resized_targets.tablet.url')
    ? post.og_image.resized_targets.tablet
    : siteMeta.ogImage
  const metaOgImage = [
    { property: 'og:image', content: replaceGCSUrlOrigin(ogImage.url) },
  ]
  if (ogImage.height) {
    metaOgImage.push({ property: 'og:image:height', content: ogImage.height })
  }
  if (ogImage.width) {
    metaOgImage.push({ property: 'og:image:width', content: ogImage.width })
  }

  const followups = _.get(post, 'followups', [])
  const trackingSection = []
  if (followups.length > 0) {
    _.forEach(followups, followup => {
      const { title, date, content } = followup
      if (content.api_data && content.api_data.length > 0) {
        trackingSection.push({
          type: 'tracking-section',
          title,
          publishDate: date,
          content: content.api_data,
        })
      }
    })
  }

  return (
    <div>
      <Helmet
        prioritizeSeoTags
        title={ogTitle}
        link={[{ rel: 'canonical', href: canonical }]}
        meta={[
          { name: 'description', content: ogDesc },
          { name: 'twitter:title', content: ogTitle },
          {
            name: 'twitter:image',
            content: replaceGCSUrlOrigin(ogImage.url),
          },
          { name: 'twitter:description', content: ogDesc },
          { name: 'twitter:card', content: 'summary_large_image' },
          { property: 'og:title', content: ogTitle },
          { property: 'og:description', content: ogDesc },
          { property: 'og:type', content: 'article' },
          { property: 'og:url', content: canonical },
          { property: 'og:rich_attachment', content: 'true' },
          ...metaOgImage,
        ]}
      />
      <div itemScope itemType="http://schema.org/Article">
        <div
          itemProp="publisher"
          itemScope
          itemType="http://schema.org/Organization"
        >
          <meta itemProp="name" content="報導者" />
          <meta itemProp="email" content="contact@twreporter.org" />
          <link
            itemProp="logo"
            href="https://www.twreporter.org/asset/logo-large.png"
          />
          <link itemProp="url" href="https://www.twreporter.org/" />
        </div>
        <link itemProp="mainEntityOfPage" href={canonical} />
        <meta
          itemProp="dateModified"
          content={date2yyyymmdd(_.get(post, 'updated_at'))}
        />
        <div id="article-body" ref={articleBodyRef}>
          <ArticleComponent
            post={post}
            relatedTopic={post.topic}
            relatedPosts={relateds}
            hasMoreRelateds={hasMoreRelateds}
            loadMoreRelateds={loadMoreRelateds}
            fontLevel={fontLevel}
            onFontLevelChange={handleFontLevelChange}
            LinkComponent={Link}
            releaseBranch={releaseBranch}
            onToggleTabExpanded={onToggleTabExpanded}
            store={store}
            // TODO: pass isFetchingRelateds to show loadin spinner
            // TODO: pass errorOfRelateds to show error message to end users
            trackingSection={trackingSection}
          />
        </div>
      </div>
      <ArticleBanner
        isExpanded={isExpanded}
        isAuthed={isAuthed}
        userRole={userRole}
      />
    </div>
  )
}

Article.propTypes = {
  errorOfPost: PropTypes.object,
  errorOfRelateds: PropTypes.object,
  fontLevel: PropTypes.string,
  isFetchingPost: PropTypes.bool,
  isFetchingRelateds: PropTypes.bool,
  post: PropTypes.object,
  // TODO: relateds: PropTypes.arrayOf(propTypeConst.post)
  relateds: PropTypes.array,
  hasMoreRelateds: PropTypes.bool,
  slugToFetch: PropTypes.string,
  isAuthed: PropTypes.bool,
  userRole: PropTypes.array.isRequired,
  jwt: PropTypes.string,
  userID: PropTypes.string,
  postID: PropTypes.string,
  fetchAFullPost: PropTypes.func,
  fetchRelatedPostsOfAnEntity: PropTypes.func,
  changeFontLevel: PropTypes.func,
  setUserAnalyticsData: PropTypes.func,
  setUserFootprint: PropTypes.func,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  releaseBranch: predefinedPropTypes.releaseBranch,
}

Article.defaultProps = {
  errorOfPost: null,
  errorOfRelateds: null,
  fontLevel: 'small',
  isFetchingPost: false,
  isFetchingRelateds: false,
  relateds: [],
  hasMoreRelateds: false,
  slugToFetch: '',
  releaseBranch: releaseBranchConsts.master,
  isAuthed: false,
}

const { actions, actionTypes, reduxStateFields } = twreporterRedux
const {
  fetchAFullPost,
  fetchRelatedPostsOfAnEntity,
  setUserAnalyticsData,
  setUserFootprint,
} = actions
const {
  entities,
  relatedPostsOf,
  selectedPost,
  postsInEntities,
} = reduxStateFields

/**
 *  @typedef {import('@twreporter/redux/lib/typedef').ReduxState} ReduxState
 */

/**
 *  @typedef {import('../utils/shallow-clone-entity').FullPost} FullPost
 */

/**
 *  @typedef {import('../utils/shallow-clone-entity').MetaOfPost} MetaOfPost
 */

const memoizeShallowCloneFullPost = memoizeOne(cloneUtils.shallowCloneFullPost)

/**
 *  This function returns a post which is cloned from entities state.
 *  @param {ReduxState} state
 *  @param {string} id - id of post
 *  @return {FullPost}
 */
function postProp(state, id) {
  const post = _.get(state, [entities, postsInEntities, 'byId', id], null)
  return memoizeShallowCloneFullPost(post)
}

/**
 *  This function returns cloned related posts of the post.
 *  @param {ReduxState} state
 *  @param {string} id - id of post
 *  @return {MetaOfPost[]}
 */
function relatedsProp(state, id) {
  const relatedPostIds = _.get(state, [relatedPostsOf, 'byId', id, 'items'], [])
  const relateds = []
  _.forEach(relatedPostIds, postId => {
    // skip because of duplicate
    if (postId === id) {
      return
    }

    const post = _.get(state, [entities, postsInEntities, 'byId', postId], null)
    if (post !== null) {
      relateds.push(cloneUtils.shallowCloneMetaOfPost(post))
    }
  })
  return relateds
}

export function mapStateToProps(state, props) {
  const currentPostSlug = _.get(props, 'match.params.slug', '')

  const defaultRtn = {
    errorOfPost: null,
    errorOfRelateds: null,
    fontLevel: 'small',
    isFetchingPost: false,
    isFetchingRelateds: false,
    post: null,
    relateds: [],
    hasMoreRelateds: false,
    slugToFetch: '',
  }

  if (currentPostSlug === '') {
    return Object.assign(defaultRtn, {
      errorOfPost: { statusCode: 404 },
    })
  }

  // user clicks another post
  const slug = _.get(state, [selectedPost, 'slug'], '')
  if (currentPostSlug !== slug) {
    return Object.assign(defaultRtn, {
      isFetchingPost: true,
      // set slugToFetch to current post slug to
      // make requests to api server to fetch that post
      slugToFetch: currentPostSlug,
    })
  }

  // the results of a full post or corresponding related posts are changed
  const postId = _.get(state, [entities, postsInEntities, 'slugToId', slug], '')
  return {
    errorOfPost: _.get(state, [selectedPost, 'error'], null),
    errorOfRelateds: _.get(
      state,
      [relatedPostsOf, 'byId', postId, 'error'],
      null
    ),
    fontLevel: _.get(state, [reduxStateFields.settings, 'fontLevel'], 'small'),
    isFetchingPost: _.get(state, [selectedPost, 'isFetching'], false),
    isFetchingRelateds: _.get(
      state,
      [relatedPostsOf, 'byId', postId, 'isFetching'],
      false
    ),
    post: postProp(state, postId),
    relateds: relatedsProp(state, postId),
    hasMoreRelateds:
      _.get(state, [relatedPostsOf, 'byId', postId, 'more', 'length'], 0) > 0,
    // set slugToFetch to empty string to
    // avoid from re-fetching the post already in redux state
    slugToFetch: '',
    isAuthed: _.get(state, [reduxStateFields.auth, 'isAuthed'], false),
    userRole: _.get(state, [reduxStateFields.auth, 'userInfo', 'roles'], []),
    jwt: _.get(state, [reduxStateFields.auth, 'accessToken'], ''),
    userID: _.get(state, [reduxStateFields.auth, 'userInfo', 'user_id']),
    postID: postId,
  }
}

function changeFontLevel(fontLevel) {
  return function(dispatch) {
    dispatch({
      type: actionTypes.settings.changeFontLevel,
      payload: fontLevel,
    })
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    {
      fetchAFullPost,
      fetchRelatedPostsOfAnEntity,
      changeFontLevel,
      setUserAnalyticsData,
      setUserFootprint,
    }
  )(Article)
)
