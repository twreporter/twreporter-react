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
    const { topicSlug, topicTitle } = this.props
    const { slug, style, title, desc, thumbnail, category, published_date } = this.props
    const { toShow, screenType } = this.state
    const bookmarkData = {
      slug,
      style,
      title,
      desc,
      thumbnail,
      category,
      published_date
    }
    const Tools = screenType === deviceConst.type.desktop ? DesktopArticleTools : MobileArticleTools

    return (
      <div>
        <Tools
          topicSlug={topicSlug}
          topicTitle={topicTitle}
          toShow={toShow}
          slug={slug}
          bookmarkData={bookmarkData}
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
  topicTitle: PropTypes.string
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
    category: _.get(post, 'categories[0].name', ''),
    published_date: _.get(post, 'published_date', ''),
    topicSlug: _.get(topic, 'slug', ''),
    topicTitle: _.get(topic, 'title', '')
  }
}

// withRef:true is the way to add the ref on the React component which is connected to Redux store
export default connect(mapStateToProps, null, null ,{ withRef: true })(ArticleTools)
