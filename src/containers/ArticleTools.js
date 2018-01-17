/* eslint no-console: 0 */
import DesktopArticleTools from '../components/article/tools/DesktopArticleTools'
import MobileArticleTools from '../components/article/tools/MobileArticleTools'
import PropTypes from 'prop-types'
import React from 'react'
import deviceConst from '../constants/device'
import get from 'lodash/get'
import twreporterRedux from '@twreporter/redux'
import { connect } from 'react-redux'

const MOBILE = deviceConst.type.mobile
const { reduxStateFields } = twreporterRedux

const _ = {
  get
}

class ArticleTools extends React.PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      toShowMAT: false,
      toShowDAT: false
    }
    this.toggleTools = this._toggleTools.bind(this)
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
    const { slug, style, title, desc, thumbnail, category, published_date } = this.props
    const { toShowDAT, toShowMAT } = this.state
    const bookmarkData = {
      slug,
      style,
      title,
      desc,
      thumbnail,
      category,
      published_date
    }
    return (
      <div>
        <MobileArticleTools
          topicSlug={topicSlug}
          topicTitle={topicTitle}
          toShow={toShowMAT}
          slug={slug}
          bookmarkData={bookmarkData}
        />
        <DesktopArticleTools
          topicSlug={topicSlug}
          topicTitle={topicTitle}
          toShow={toShowDAT}
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
    category: _.get(post, `categories[0].name`, ''),
    published_date: _.get(post, 'published_date', ''),
    topicSlug: _.get(topic, 'slug', ''),
    topicTitle: _.get(topic, 'title', '')
  }
}

// withRef:true is the way to add the ref on the React component which is connected to Redux store
export default connect(mapStateToProps, null, null ,{ withRef: true })(ArticleTools)
