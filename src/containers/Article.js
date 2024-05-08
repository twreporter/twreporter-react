import { Helmet, HelmetProvider } from 'react-helmet-async'
import TagManager from 'react-gtm-module'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import localForage from 'localforage'
import memoizeOne from 'memoize-one'
import { connect } from 'react-redux'
import loggerFactory from '../logger'
import uiManager from '../managers/ui-manager'
// constants
import bsConst from '../constants/browser-storage'
import siteMeta from '../constants/site-meta'
// utils
import cloneUtils from '../utils/shallow-clone-entity'
// components
import ArticlePlaceholder from '../components/article/placeholder'
import SystemError from '../components/SystemError'
import ArticleBanner from '../components/membership-promo/article-banner'
// @twreporter
import twreporterRedux from '@twreporter/redux'
import ArticleComponent from '@twreporter/react-article-components'
import { date2yyyymmdd } from '@twreporter/core/lib/utils/date'
import { replaceGCSUrlOrigin } from '@twreporter/core/lib/utils/storage-url-processor'
import predefinedPropTypes from '@twreporter/core/lib/constants/prop-types'
import releaseBranchConsts from '@twreporter/core/lib/constants/release-branch'
// dependencies of article component v2
import { Link, withRouter } from 'react-router-dom'
// lodash
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'

const _ = {
  forEach,
  get,
  debounce,
  throttle,
}
// global var
const { actions, actionTypes, reduxStateFields } = twreporterRedux
const {
  fetchAFullPost,
  fetchRelatedPostsOfAnEntity,
  setUserAnalyticsData,
  setUserFootprint,
} = actions
const _fontLevel = {
  small: 'small',
}
const logger = loggerFactory.getLogger()
const emptySlug = ''
const articleReadCountConditionConfig = {
  reading_height: 0.75,
  reading_time: 10000, // 10 second
}
const articleReadTimeConditionConfig = {
  inactive_time: 900000, // 900 second
  min_active_time: 5000, // 5 second
}

class Article extends PureComponent {
  constructor(props) {
    super(props)

    this.handleFontLevelChange = this._handleFontLevelChange.bind(this)
    this.onToggleTabExpanded = this._onToggleTabExpanded.bind(this)
    this._articleBody = React.createRef()
    this.readingCountTimerId = React.createRef()
    this.inactiveTimerId = React.createRef()
    this.startReadingTime = Date.now()
    this.isActive = true
    this.activeTime = 0
    this.state = {
      isExpanded: false,
      isReachedArticleReadTargetHeight: false,
      isReachedArticleReadTargetTime: false,
      isBeenRead: false,
    }
    this.handleScroll = _.debounce(this._handleScroll.bind(this), 500)
    this.handleVisibilityChange = _.throttle(
      this._handleVisibilityChange.bind(this),
      1000
    )
    this.handleUserActivity = _.debounce(
      this._handleUserActivity.bind(this),
      500
    )
    this.handlePagehide = this._handlePagehide.bind(this)
  }

  startReadingCountTimer() {
    if (this.readingCountTimerId.current) {
      window.clearTimeout(this.readingCountTimerId.current)
    }
    this.readingCountTimerId.current = window.setTimeout(() => {
      this.setState({ isReachedArticleReadTargetTime: true })
    }, articleReadCountConditionConfig.reading_time)
  }

  calculateActiveTime() {
    const elapsedTime = Math.floor(Date.now() - this.startReadingTime)
    this.activeTime = this.activeTime + elapsedTime
    this.startReadingTime = Date.now()
  }

  startInactiveTimer() {
    if (this.inactiveTimerId.current) {
      window.clearTimeout(this.inactiveTimerId.current)
    }
    this.inactiveTimerId.current = window.setTimeout(() => {
      this.calculateActiveTime()
      if (this.activeTime >= articleReadTimeConditionConfig.min_active_time) {
        this.sendActiveTime()
      }
      this.isActive = false
    }, articleReadTimeConditionConfig.inactive_time)
  }

  sendReadCount() {
    const { isAuthed, jwt, userID, postID, setUserAnalyticsData } = this.props
    if (isAuthed) {
      setUserAnalyticsData(jwt, userID, postID, { readPostCount: true })
    }
  }

  sendActiveTime() {
    const { isAuthed, jwt, userID, postID, setUserAnalyticsData } = this.props
    const activeSec = Math.round(this.activeTime / 1000)
    if (isAuthed) {
      setUserAnalyticsData(jwt, userID, postID, { readPostSec: activeSec })
      this.activeTime = 0
    }
  }

  sendUserFootprint() {
    const { isAuthed, jwt, userID, postID, setUserFootprint } = this.props
    if (isAuthed) {
      setUserFootprint(jwt, userID, postID)
    }
  }

  _handleVisibilityChange() {
    if (document.visibilityState === 'hidden') {
      if (this.isActive) {
        if (this.inactiveTimerId.current) {
          window.clearTimeout(this.inactiveTimerId.current)
        }
        this.calculateActiveTime()
        if (this.activeTime >= articleReadTimeConditionConfig.min_active_time) {
          this.sendActiveTime()
        }
        this.isActive = false
      }
    } else {
      if (!this.isActive) {
        this.isActive = true
        this.startReadingTime = Date.now()
      }
      this.startInactiveTimer()
    }
  }

  _handleUserActivity() {
    if (!this.isActive) {
      this.isActive = true
      this.startReadingTime = Date.now()
    }
    this.startInactiveTimer()
  }

  _handlePagehide() {
    this.calculateActiveTime()
    if (this.activeTime >= articleReadTimeConditionConfig.min_active_time) {
      this.sendActiveTime()
    }
  }

  componentDidMount() {
    const { fontLevel, changeFontLevel, slugToFetch } = this.props

    // Fetch the full post
    this.fetchAFullPostWithCatch(slugToFetch)
    document.addEventListener('scroll', this.handleScroll)
    // Start timer if post is fetched from SSR
    this.startReadingCountTimer()
    // Start reading time if post is fetched from SSR
    this.startReadingTime = Date.now()
    document.addEventListener('visibilitychange', this.handleVisibilityChange)
    document.addEventListener('mousemove', this.handleUserActivity)
    document.addEventListener('scroll', this.handleUserActivity)
    document.addEventListener('click', this.handleUserActivity)
    window.addEventListener('pagehide', this.handlePagehide)
    // check visibility to prevent tab been hidden before componentDidMount execute
    this.handleVisibilityChange()

    // Change fontLevel according to browser storage
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

    this.sendUserFootprint()
  }

  componentDidUpdate(prevProps) {
    this.props.history.block(() => {
      // reset readingCount state
      this.setState({
        isBeenRead: false,
        isReachedArticleReadTargetHeight: false,
        isReachedArticleReadTargetTime: false,
      })
      this.calculateActiveTime()
      if (this.activeTime >= articleReadTimeConditionConfig.min_active_time) {
        this.sendActiveTime()
      }
      return true
    })
    if (prevProps.slugToFetch !== this.props.slugToFetch) {
      this.fetchAFullPostWithCatch(this.props.slugToFetch)
    }
    if (prevProps.isFetchingPost && !this.props.isFetchingPost) {
      // For client-side rendering, we notify GTM that the new component is ready when the fetching is done.
      TagManager.dataLayer({
        dataLayer: {
          event: 'gtm.load',
        },
      })
      this.startReadingCountTimer()
      this.startReadingTime = Date.now()
      this.startInactiveTimer()
    }

    const {
      isBeenRead,
      isReachedArticleReadTargetHeight,
      isReachedArticleReadTargetTime,
    } = this.state

    if (
      !isBeenRead &&
      isReachedArticleReadTargetHeight &&
      isReachedArticleReadTargetTime
    ) {
      this.sendReadCount()
      this.setState({ isBeenRead: true })
    }
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll)
    document.removeEventListener(
      'visibilitychange',
      this.handleVisibilityChange
    )
    document.removeEventListener('mousemove', this.handleUserActivity)
    document.removeEventListener('scroll', this.handleUserActivity)
    document.removeEventListener('click', this.handleUserActivity)
    window.removeEventListener('pagehide', this.handlePagehide)
  }

  _handleScroll() {
    const scrollHeight = window.scrollY || document.documentElement.scrollTop
    const totalHeight = document.documentElement.scrollHeight
    const targetHeight =
      totalHeight * articleReadCountConditionConfig.reading_height
    if (scrollHeight >= targetHeight) {
      this.setState({
        isReachedArticleReadTargetHeight: true,
      })
    }
  }

  fetchAFullPostWithCatch = slug => {
    if (slug === emptySlug) {
      return
    }

    const { fetchAFullPost, fetchRelatedPostsOfAnEntity } = this.props

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

  loadMoreRelateds = () => {
    const { fetchRelatedPostsOfAnEntity, post, hasMoreRelateds } = this.props

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

  _handleFontLevelChange(fontLevel) {
    const { changeFontLevel } = this.props
    changeFontLevel(fontLevel)
    localForage.setItem(bsConst.keys.fontLevel, fontLevel).catch(err => {
      console.warn('Can not set item into browser storage: ', err)
    })
  }

  _onToggleTabExpanded(isExpanded) {
    this.setState({
      isExpanded,
    })
  }

  render() {
    const {
      errorOfPost,
      // errorOfRelateds,
      isFetchingPost,
      // isFetchingRelateds,
      fontLevel,
      post,
      relateds,
      hasMoreRelateds,
      releaseBranch,
      isAuthed,
      userRole,
    } = this.props
    const { isExpanded } = this.state

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

    const slug = _.get(post, 'slug', '')

    post.style = uiManager.getArticleV2Style(post.style)

    // for head tag
    const canonical = siteMeta.urlOrigin + '/a/' + slug
    const ogTitle =
      (_.get(post, 'og_title', '') || _.get(post, 'title', '')) +
      siteMeta.name.separator +
      siteMeta.name.full
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
    return (
      <HelmetProvider>
        <div>
          <Helmet
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
            <div id="article-body" ref={this._articleBody}>
              <ArticleComponent
                post={post}
                relatedTopic={post.topic}
                relatedPosts={relateds}
                hasMoreRelateds={hasMoreRelateds}
                loadMoreRelateds={this.loadMoreRelateds}
                fontLevel={fontLevel}
                onFontLevelChange={this.handleFontLevelChange}
                LinkComponent={Link}
                releaseBranch={releaseBranch}
                onToggleTabExpanded={this.onToggleTabExpanded}
                // TODO: pass isFetchingRelateds to show loadin spinner
                // TODO: pass errorOfRelateds to show error message to end users
              />
            </div>
          </div>
          <ArticleBanner
            isExpanded={isExpanded}
            isAuthed={isAuthed}
            userRole={userRole}
          />
        </div>
      </HelmetProvider>
    )
  }
}

Article.propTypes = {
  changeFontLevel: PropTypes.func,
  errorOfPost: PropTypes.object,
  errorOfRelateds: PropTypes.object,
  fetchAFullPost: PropTypes.func,
  fetchRelatedPostsOfAnEntity: PropTypes.func,
  fontLevel: PropTypes.string,
  isFetchingPost: PropTypes.bool,
  isFetchingRelateds: PropTypes.bool,
  post: PropTypes.object,
  // TODO: relateds: PropTypes.arrayOf(propTypeConst.post)
  relateds: PropTypes.array,
  hasMoreRelateds: PropTypes.bool,
  slugToFetch: PropTypes.string,
  releaseBranch: predefinedPropTypes.releaseBranch,
  isAuthed: PropTypes.bool,
  userRole: PropTypes.array.isRequired,
  setUserAnalyticsData: PropTypes.func,
  jwt: PropTypes.string,
  userID: PropTypes.string,
  postID: PropTypes.string,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  setUserFootprint: PropTypes.func,
}

Article.defaultProps = {
  errorOfPost: null,
  errorOfRelateds: null,
  fontLevel: _fontLevel.small,
  isFetchingPost: false,
  isFetchingRelateds: false,
  relateds: [],
  hasMoreRelateds: false,
  slugToFetch: emptySlug,
  releaseBranch: releaseBranchConsts.master,
  isAuthed: false,
}

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
  const currentPostSlug = _.get(props, 'match.params.slug', emptySlug)

  const defaultRtn = {
    errorOfPost: null,
    errorOfRelateds: null,
    fontLevel: _fontLevel.small,
    isFetchingPost: false,
    isFetchingRelateds: false,
    post: null,
    relateds: [],
    hasMoreRelateds: false,
    slugToFetch: emptySlug,
  }

  if (currentPostSlug === emptySlug) {
    return Object.assign(defaultRtn, {
      errorOfPost: { statusCode: 404 },
    })
  }

  // user clicks another post
  const slug = _.get(state, [selectedPost, 'slug'], emptySlug)
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
    fontLevel: _.get(
      state,
      [reduxStateFields.settings, 'fontLevel'],
      _fontLevel.small
    ),
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
    slugToFetch: emptySlug,
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
