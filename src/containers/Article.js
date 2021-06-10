import ArticleComponent from '@twreporter/react-article-components'
import ArticlePlaceholder from '../components/article/placeholder'
import Helmet from 'react-helmet'
import TagManager from 'react-gtm-module'
import loggerFactory from '../logger'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import ReadingProgress from '../components/article/reading-progress'
import SystemError from '../components/SystemError'
import bsConst from '../constants/browser-storage'
import localForage from 'localforage'
import memoizeOne from 'memoize-one'
import siteMeta from '../constants/site-meta'
import twreporterRedux from '@twreporter/redux'
import uiManager from '../managers/ui-manager'
import { connect } from 'react-redux'
import { date2yyyymmdd } from '@twreporter/core/lib/utils/date'
import { replaceGCSUrlOrigin } from '@twreporter/core/lib/utils/storage-url-processor'

// dependencies of article component v2
import { Link } from 'react-router-dom'

// utils
import cloneUtils from '../utils/shallow-clone-entity'

// lodash
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import throttle from 'lodash/throttle'

const _ = {
  forEach,
  get,
  throttle,
}

const { actions, actionTypes, reduxStateFields } = twreporterRedux
const { fetchAFullPost, fetchRelatedPostsOfAnEntity } = actions

const _fontLevel = {
  small: 'small',
}

const logger = loggerFactory.getLogger()

const emptySlug = ''

class Article extends PureComponent {
  constructor(props) {
    super(props)

    this.handleScroll = _.throttle(this._handleScroll, 300).bind(this)
    this.handleFontLevelChange = this._handleFontLevelChange.bind(this)

    this._rp = React.createRef()
    this._articleBody = React.createRef()
  }

  componentDidMount() {
    // For client-side rendering, we notify GTM that the new component is ready
    TagManager.dataLayer({
      dataLayer: {
        event: 'gtm.load',
      },
    })
    // detect scroll position
    window.addEventListener('scroll', this.handleScroll)
    const { fontLevel, changeFontLevel, slugToFetch } = this.props

    // Fetch the full post
    this.fetchAFullPostWithCatch(slugToFetch)

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

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.slugToFetch !== this.props.slugToFetch) {
      this.fetchAFullPostWithCatch(this.props.slugToFetch)
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

  /**
   * Calculating the reading progress percentage.
   *
   * @param {number} top - the distance between the top of the element and the viewport top.
   * @param {number} height - the element's height
   */
  _handleReadingPercentage(top, height) {
    if (this._rp.current) {
      let scrollRatio = 0
      // top is less than 0,
      // which means the element is in the viewport now
      if (top < 0) {
        scrollRatio = Math.abs(top) / height
      }
      const curPercent = Math.round(scrollRatio * 100)
      // update the header progress bar
      this._rp.current.updatePercentage(curPercent)
    }
  }

  _handleScroll() {
    if (this._articleBody.current) {
      // top will be the distance between the top of body and the viewport top
      // bottom will be the distance between the bottom of body and the viewport top
      // height is the height of articleBody
      const { top, height } = this._articleBody.current.getBoundingClientRect()
      // render reading progress percentage
      this._handleReadingPercentage(top, height)
    }
  }

  _handleFontLevelChange(fontLevel) {
    const { changeFontLevel } = this.props
    changeFontLevel(fontLevel)
    localForage.setItem(bsConst.keys.fontLevel, fontLevel).catch(err => {
      console.warn('Can not set item into browser storage: ', err)
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
    } = this.props

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
          <ReadingProgress ref={this._rp} />
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
              // TODO: pass isFetchingRelateds to show loadin spinner
              // TODO: pass errorOfRelateds to show error message to end users
            />
          </div>
        </div>
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
