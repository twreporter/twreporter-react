/* eslint no-console: 0 */
import DesktopArticleTools from '../components/article/tools/DesktopArticleTools'
import MobileArticleTools from '../components/article/tools/MobileArticleTools'
import PropTypes from 'prop-types'
import React from 'react'
import browserHistory from 'react-router/lib/browserHistory'
import deviceConst from '../constants/device'
import get from 'lodash/get'
import twreporterRedux from '@twreporter/redux'
import { connect } from 'react-redux'

const DEFAULT_BOOKMARK_HOST = 'https://www.twreporter.org'
const MOBILE = deviceConst.type.mobile
const { actions, reduxStateFields } = twreporterRedux
const { createBookmark, deleteBookmark, getCurrentBookmark } = actions

const _ = {
  get
}

class ArticleTools extends React.PureComponent {

  /* TODO server side to prepare the bookmark value
  static fetchData({ params, store }) {
    const slug = params.slug
    const reduxState = store.getState()
    const authenticated = _.get(reduxState, 'auth.authenticated', false)
    if (authenticated) {
      const userID = _.get(reduxState, 'auth.id', '')
      // user userID, slug and host to get the current bookmark
    }
  }
  */

  constructor(props) {
    super(props)
    this.state = {
      isBookmarked: false,
      toShowMAT: false,
      toShowDAT: false
    }
    this.checkIsBookmarked = this._checkIsBookmarked.bind(this)
    this.toCreateBookmark = this._toCreateBookmark.bind(this)
    this.toDeleteBookmark = this._toDeleteBookmark.bind(this)
    this.handleOnClickBookmark = this._handleOnClickBookmark.bind(this)
    this.toggleTools = this._toggleTools.bind(this)
  }

  componentDidMount() {
    const { slug } = this.props
    this.checkIsBookmarked(slug)
  }

  componentWillReceiveProps(nextProps) {
    this.checkIsBookmarked(_.get(nextProps, 'slug'))
  }

  /**
   * Check if the user already bookmarked this article,
   * if do, mark the bookmark icon
   *
   * @param {string} slug slug of article
   * @param {string} host=DEFAULT_BOOKMARK_HOST hostname
   */
  async _checkIsBookmarked(slug, host = DEFAULT_BOOKMARK_HOST) {
    if (slug) {
      try {
        const id = await this.props.getCurrentBookmark(slug, host)
        if (id) {
          this.setState({
            isBookmarked: true
          })
        } else {
          throw new Error('bookmark id is not set')
        }
      } catch (error) {
        if (this.state.isBookmarked) {
          this.setState({
            isBookmarked: false
          })
        }
      }
    }
  }

  /**
   * Delete user/bookmark record in the database, and empty the bookmark icon.
   */
  async _toDeleteBookmark() {
    const { slug } = this.props
    try {
      const id = await this.props.getCurrentBookmark(slug, DEFAULT_BOOKMARK_HOST)
      await this.props.deleteBookmark(id)
      this.setState({
        isBookmarked: false
      })
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Create user/bookmark record in the database, and mark the bookmark icon.
   * If user is not authenticated, it will lead user to sign in page
   */
  async _toCreateBookmark() {
    const { slug, style, title, desc, thumbnail, category, published_date } = this.props
    if (!slug) {
      return
    }

    try {
      const bookmarkId = await this.props.createBookmark({
        slug,
        is_external: style === 'interactive',
        title,
        desc,
        thumbnail,
        category,
        published_date,
        host: DEFAULT_BOOKMARK_HOST
      })

      if(bookmarkId) {
        this.setState({
          isBookmarked: true
        })
      }
    } catch(error) {
      const type = style === 'interactive' ? 'i' : 'a'
      const webStatus = _.get(error, 'response.status')
      if (webStatus === 401) {
        browserHistory.push(`/signin/?path=${type}/${slug}`)
      }
    }
  }

  _handleOnClickBookmark() {
    if (this.state.isBookmarked) {
      return this.toDeleteBookmark()
    }
    this.toCreateBookmark()
  }

  /**
   * Show tools according to clients' screen.
   * Render MobileArticleTools if screen is smaller than tablet, otherwise, render DesktopArticleTools
   *
   * @param {string} device mobile, tablet or desktop
   * @param {bool} toShow use this to decide if show tools or not
   */
  _toggleTools(device, toShow) {
    if (device === MOBILE) {
      if (toShow) {
        return this.setState({
          toShowMAT: true,
          toShowDAT: false
        })
      }
    } else {
      if (toShow) {
        return this.setState({
          toShowMAT: false,
          toShowDAT: true
        })
      }
    }
    this.setState({
      toShowMAT: false,
      toShowDAT: false
    })
  }

  render() {
    const { topicSlug, topicTitle } = this.props
    const { toShowDAT, toShowMAT, isBookmarked } = this.state
    return (
      <div>
        <MobileArticleTools
          topicSlug={topicSlug}
          topicTitle={topicTitle}
          toShow={toShowMAT}
          isBookmarked={isBookmarked}
          handleOnClickBookmark={this.handleOnClickBookmark}
        />
        <DesktopArticleTools
          topicSlug={topicSlug}
          topicTitle={topicTitle}
          toShow={toShowDAT}
          isBookmarked={isBookmarked}
          handleOnClickBookmark={this.handleOnClickBookmark}
        />
      </div>
    )
  }
}

ArticleTools.propTypes = {
  slug: PropTypes.string,
  style: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string,
  thumbnail: PropTypes.string,
  category: PropTypes.string,
  published_date: PropTypes.string,
  topicSlug: PropTypes.string,
  topicTitle: PropTypes.string,

  createBookmark: PropTypes.func.isRequired,
  deleteBookmark: PropTypes.func.isRequired,
  getCurrentBookmark: PropTypes.func.isRequired
}

ArticleTools.defaultProps = {
  slug: '',
  style: '',
  title: '',
  desc: '',
  thumbnail: '',
  category: '',
  published_date: '',
  topicSlug: '',
  topicTitle: ''
}

/**
 * Map redux state into React Component as props
 *
 * @param {object} state state in redux store
 * @returns {object} return all fields required by ArticleTools
 */
function mapStateToProps(state) {
  const entities = state[reduxStateFields.entities]
  const selectedPost = state[reduxStateFields.selectedPost]
  const post = _.get(entities, [ reduxStateFields.postsInEntities, selectedPost.slug ], {})
  const topicID = _.get(post, 'topics')
  const topic = _.get(entities, [ reduxStateFields.topicsInEntities, topicID ], {})

  return {
    slug: _.get(post, 'slug', ''),
    style: _.get(post, 'style', ''),
    title: _.get(post, 'title', ''),
    desc: _.get(post, 'og_description', ''),
    thumbnail: _.get(post, 'hero_image.resized_targets.mobile.url') || _.get(post, 'og_image.resized_targets.mobile.url', ''),
    category: _.get(post, `categories[0].name`, ''),
    published_date: _.get(post, 'published_date', ''),
    topicSlug: _.get(topic, 'slug', ''),
    topicTitle: _.get(topic, 'title', '')
  }
}

// withRef:true is the way to add the ref on the React component which is connected to Redux store
export default connect(mapStateToProps, { createBookmark, deleteBookmark, getCurrentBookmark }, null ,{ withRef: true })(ArticleTools)
