'use strict'
import Helmet from 'react-helmet'
import React, { Component } from 'react'
import SystemError from '../components/SystemError'
import ArticleList from '../components/ArticleList'
import twreporterRedux from '@twreporter/redux'

import { SITE_META, SITE_NAME } from '../constants/index'
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
const topics = 'topics'

class Topic extends Component {
  static fetchData({ params, store }) {
    return store.dispatch(fetchListedPosts(params.topicId, topics, MAXRESULT))
  }

  constructor(props) {
    super(props)
    this.loadMore = this._loadMore.bind(this)
  }

  componentWillMount() {
    const { lists, fetchListedPosts, params } = this.props
    const topicId = _.get(params, 'topicId')

    // if fetched before, do nothing
    if (_.get(lists, [ topicId, 'items', 'length' ], 0) > 0) {
      return
    }

    fetchListedPosts(topicId, topics, MAXRESULT)
  }

  componentWillReceiveProps(nextProps) {
    const { lists, fetchListedPosts, params } = nextProps
    const topicId = _.get(params, 'topicId')

    // if fetched before, do nothing
    if (_.get(lists, [ topicId, 'items', 'length' ], 0) > 0) {
      return
    }

    fetchListedPosts(topicId, topics, MAXRESULT)
  }

  _loadMore() {
    const { fetchListedPosts, params } = this.props
    const  topicId = _.get(params, 'topicId')
    fetchListedPosts(topicId, topics, MAXRESULT)
  }

  render() {
    const { device } = this.context
    const { lists, entities, params } = this.props
    const postEntities = _.get(entities, reduxStateFields.postsInEntities, {})
    const topicId = _.get(params, 'topicId')
    const error = _.get(lists, [ topicId, 'error' ], null)
    const total = _.get(lists, [ topicId, 'total' ], 0)
    const posts = camelizeKeys(utils.denormalizePosts(_.get(lists, [ topicId, 'items' ], []), postEntities))

    // Error handling
    if (error !== null && _.get(posts, 'length', 0) === 0) {
      return (
        <div>
          <SystemError error={error} />
        </div>
      )
    }

    const topicName = _.get(posts, [ 0, 'topics', 'name' ], '')
    const topicBox = topicName ? <div className="top-title-outer"><h1 className="top-title"> {topicName} </h1></div> : null
    const title = topicName + SITE_NAME.SEPARATOR + SITE_NAME.FULL
    const canonical = `${SITE_META.URL}topic/${topicId}`

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
          {topicBox}
        </div>
        <ArticleList
          articles={posts}
          device={device}
          hasMore={total > posts.length}
          loadMore={this.loadMore}
          loadMoreError={error}
        />
        {this.props.children}
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

Topic.contextTypes = {
  device: React.PropTypes.string
}

Topic.defaultProps = {
  lists: {},
  entities: {}
}

Topic.propTypes = {
  lists: React.PropTypes.object,
  entities: React.PropTypes.object
}

export { Topic }
export default connect(mapStateToProps, { fetchListedPosts: actions.fetchListedPosts, setHeaderInfo })(Topic)
