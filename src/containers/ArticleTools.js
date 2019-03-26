/* eslint no-console: 0 */
import DesktopArticleTools from '../components/article/tools/DesktopArticleTools'
import MobileArticleTools from '../components/article/tools/MobileArticleTools'
import PropTypes from 'prop-types'
import React from 'react'
import deviceConst from '../constants/device'
import get from 'lodash/get'
import twreporterRedux from '@twreporter/redux'
import { connect } from 'react-redux'

const { reduxStateFields } = twreporterRedux

const _ = {
  get
}

class ArticleTools extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      // condition to decide whether show(visible) the tools or not
      toShow: false,

      // screenType decides which tools to render on the page
      // if screenType === desktop, use DesktopArticleTools.
      // Otherwise, use MobileArticleTools
      screenType: props.screenType || deviceConst.type.mobile
    }
    this.toggleTools = this._toggleTools.bind(this)
    this.setScreenType = this._setScreenType.bind(this)
    this.getScreenType = this._getScreenType.bind(this)
  }

  _setScreenType(type) {
    if (type !== this.state.screenType) {
      this.setState({
        screenType: type
      })
    }
  }

  _getScreenType() {
    return this.state.screenType
  }

  _toggleTools(toShow) {
    this.setState({
      toShow
    })
  }

  render() {
    const {
      desc,
      is_external,
      published_date,
      slug,
      thumbnail,
      title,
      topicSlug,
      topicTitle
    } = this.props
    const {
      toShow,
      screenType
    } = this.state
    const articleMetaForBookmark = {
      desc,
      is_external,
      published_date,
      slug,
      thumbnail,
      title
    }
    const Tools = screenType === deviceConst.type.desktop ? DesktopArticleTools : MobileArticleTools

    return (
      <div>
        <Tools
          topicSlug={topicSlug}
          topicTitle={topicTitle}
          toShow={toShow}
          slug={slug}
          articleMetaForBookmark={articleMetaForBookmark}
        />
      </div>
    )
  }
}

ArticleTools.propTypes = {
  slug: PropTypes.string,
  title: PropTypes.string,
  desc: PropTypes.string,
  thumbnail: PropTypes.string,
  topicSlug: PropTypes.string,
  topicTitle: PropTypes.string
}

ArticleTools.defaultProps = {
  slug: '',
  title: '',
  desc: '',
  thumbnail: '',
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
    title: _.get(post, 'title', ''),
    desc: _.get(post, 'og_description', ''),
    thumbnail: _.get(post, 'hero_image.resized_targets.mobile.url') || _.get(post, 'og_image.resized_targets.mobile.url', ''),
    is_external: _.get(post, 'is_external', false),
    published_date: _.get(post, 'published_date', ''),
    topicSlug: _.get(topic, 'slug', ''),
    topicTitle: _.get(topic, 'title', '')
  }
}

// forwardRef:true is the way to add the ref on the React component which is connected to Redux store
export default connect(mapStateToProps, null, null ,{ forwardRef: true })(ArticleTools)
