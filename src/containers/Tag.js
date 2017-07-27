import Footer from '../components/Footer'
import Helmet from 'react-helmet'
import React, { Component } from 'react'
import SystemError from '../components/SystemError'
import ArticleList from '../components/ArticleList'
import twreporterRedux from 'twreporter-redux'

import { BRIGHT, SITE_META, SITE_NAME, TAG } from '../constants/index'
import { camelizeKeys } from 'humps'
import { connect } from 'react-redux'
import { setHeaderInfo } from '../actions/header'
// lodash
import get from 'lodash/get'

const _  = {
  get
}

const { actions, reduxStateFields, utils } = twreporterRedux
const { fetchListedPosts } = actions

const MAXRESULT = 10
const tags = 'tags'

class Tag extends Component {
  static fetchData({ params, store }) {
    return store.dispatch(fetchListedPosts(params.tagId, tags, MAXRESULT))
  }

  constructor(props) {
    super(props)
    this.loadMore = this._loadMore.bind(this)
  }

  componentWillMount() {
    const { fetchListedPosts, lists, params, setHeaderInfo } = this.props
    setHeaderInfo({
      pageTheme: BRIGHT,
      pageType: TAG,
      readPercent: 0
    })

    let tagId = _.get(params, 'tagId')

    if (_.get(lists, [ tagId, 'items', 'length' ], 0) > 0) {
      return
    }

    fetchListedPosts(tagId, tags, MAXRESULT)
  }

  componentWillReceiveProps(nextProps) {
    const { fetchListedPosts, lists, params } = nextProps
    let tagId = _.get(params, 'tagId')

    if (_.get(lists, [ tagId, 'items', 'length' ], 0) > 0) {
      return
    }

    fetchListedPosts(tagId, tags, MAXRESULT)
  }

  _loadMore() {
    const { fetchListedPosts, params } = this.props
    const tagId = _.get(params, 'tagId')
    fetchListedPosts(tagId, tags, MAXRESULT)
  }

  _findTagName(tags, tagId) {
    if (!Array.isArray(tags)) {
      return ''
    }
    const tag = tags.find((_tag) => {
      if (_.get(_tag, 'id') === tagId) {
        return true
      }
      return false
    })
    return _.get(tag, 'name', '')
  }

  render() {
    const { device } = this.context
    const { lists, entities, params } = this.props
    const postEntities = _.get(entities, reduxStateFields.postsInEntities, {})
    const tagId = _.get(params, 'tagId')
    const error = _.get(lists, [ tagId, 'error' ], null)
    const total = _.get(lists, [ tagId, 'total' ], 0)
    const posts = camelizeKeys(utils.denormalizePosts(_.get(lists, [ tagId, 'items' ], []), postEntities))

    // Error handling
    if (error !== null && _.get(posts, 'length', 0) === 0) {
      return (
        <div>
          <SystemError error={error} />
          <Footer />
        </div>
      )
    }

    let tagName = this._findTagName(_.get(posts, [ 0, 'tags' ]), tagId)
    const tagBox = tagName ? <div className="top-title-outer"><h1 className="top-title"> {tagName} </h1></div> : null
    const canonical = `${SITE_META.URL}tag/${tagId}`
    const title = tagName + SITE_NAME.SEPARATOR + SITE_NAME.FULL
    return (
      <div>
        <Helmet
          title={title}
          link={[
            { rel: 'canonical', href: canonical }
          ]}
          meta={[
            { name: 'description', content: SITE_META.DESC },
            { name: 'twitter:title', content: title },
            { name: 'twitter:description', content: SITE_META.DESC },
            { property: 'og:title', content: title },
            { property: 'og:description', content: SITE_META.DESC },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: canonical }
          ]}
        />
        <div className="container text-center">
          { tagBox }
        </div>
        <div>
          <ArticleList
            articles={posts}
            device={device}
            hasMore={total > posts.length}
            loadMore={this.loadMore}
            loadMoreError={error}
          />
          {this.props.children}
          <Footer/>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    lists: state[reduxStateFields.lists],
    entities: state[reduxStateFields.entities]
  }
}

Tag.contextTypes = {
  device: React.PropTypes.string
}

Tag.defaultProps = {
  lists: {},
  entities: {}
}

Tag.propTypes = {
  lists: React.PropTypes.object,
  entities: React.PropTypes.object
}

export { Tag }
export default connect(mapStateToProps, { fetchListedPosts: actions.fetchListedPosts, setHeaderInfo })(Tag)
