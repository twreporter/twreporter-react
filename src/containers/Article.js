import Helmet from 'react-helmet'
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
import { Link } from 'react-router-dom'
// lodash
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import throttle from 'lodash/throttle'
const _ = {
  forEach,
  get,
  throttle,
}
// global var
const { actions, actionTypes, reduxStateFields } = twreporterRedux
const { fetchAFullPost, fetchRelatedPostsOfAnEntity } = actions
const _fontLevel = {
  small: 'small',
}
const logger = loggerFactory.getLogger()
const emptySlug = ''
const articleReadCountConditionConfig = {
  reading_height: 0.75,
  reading_time: 10000,
}

class Article extends PureComponent {
  constructor(props) {
    super(props)

    this.handleFontLevelChange = this._handleFontLevelChange.bind(this)
    this.onToggleTabExpanded = this._onToggleTabExpanded.bind(this)
    this._articleBody = React.createRef()
    this.timerId = React.createRef()
    this.state = {
      isExpanded: false,
      isReachedArticleReadTargetHeight: false,
      isReachedArticleReadTargetTime: false,
    }
    this.handleScroll = this._handleScroll.bind(this)
  }

  startTimer() {
    if (this.timerId.current) {
      window.clearTimeout(this.timerId.current)
    }
    this.timerId.current = window.setTimeout(() => {
      this.setState({ isReachedArticleReadTargetTime: true })
    }, articleReadCountConditionConfig.reading_time)
  }

  componentDidMount() {
    const { fontLevel, changeFontLevel, slugToFetch } = this.props
    window.addEventListener('scroll', this.handleScroll)

    // Fetch the full post
    this.fetchAFullPostWithCatch(slugToFetch)
    // Start timer if post is fetched from SSR
    this.startTimer()

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
  }

  componentDidUpdate(prevProps) {
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
      this.startTimer()
    }
    if (
      this.state.isReachedArticleReadTargetHeight &&
      this.state.isReachedArticleReadTargetTime
    ) {
      // TODO: waiting for api
      // eslint-disable-next-line no-undef
      alert(`你閱讀了 post_slug: ${_.get(this.props.post, 'slug')} 喔喔喔`)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
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
      window.removeEventListener('scroll', this.handleScroll)
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

export default connect(
  mapStateToProps,
  { fetchAFullPost, fetchRelatedPostsOfAnEntity, changeFontLevel }
)(Article)
