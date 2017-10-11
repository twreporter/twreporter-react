import Helmet from 'react-helmet'
import More from '../components/More'
import React, { Component } from 'react'
import SystemError from '../components/SystemError'
import get from 'lodash/get'
import twreporterRedux from '@twreporter/redux'
import withLayout from '../helpers/with-layout'
import { SITE_META, SITE_NAME } from '../constants/index'
import { List } from '@twreporter/react-components'
import { connect } from 'react-redux'

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
    const { fetchListedPosts, lists, params } = this.props

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
    const { lists, entities, params } = this.props
    const postEntities = _.get(entities, reduxStateFields.postsInEntities, {})
    const tagId = _.get(params, 'tagId')
    const error = _.get(lists, [ tagId, 'error' ], null)
    const total = _.get(lists, [ tagId, 'total' ], 0)
    const posts = utils.denormalizePosts(_.get(lists, [ tagId, 'items' ], []), postEntities)
    const postsLen = _.get(posts, 'length', 0)
    let isFetching = false

    // Error handling
    if (error !== null && postsLen === 0) {
      return (
        <SystemError error={error} />
      )
    } else if (postsLen === 0) {
      isFetching = true
    }

    const tagName = this._findTagName(_.get(posts, [ 0, 'tags' ]), tagId)
    const canonical = `${SITE_META.URL}tag/${tagId}`
    const title = tagName + SITE_NAME.SEPARATOR + SITE_NAME.FULL

    const MoreJSX = total > postsLen ? (
      <More loadMore={this.loadMore}>
        <span style={{ color: error ? 'red' : 'white' }}>{error ? '更多文章（請重試）' : '更多文章'}</span>
      </More>
    ) : null

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
            { name: 'twitter:image', content: SITE_META.OG_IMAGE },
            { property: 'og:title', content: title },
            { property: 'og:description', content: SITE_META.DESC },
            { property: 'og:image', content: SITE_META.OG_IMAGE },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: canonical }
          ]}
        />
        <List
          data={posts}
          tagName={tagName}
          isFetching={isFetching}
        />
        {MoreJSX}
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

Tag.defaultProps = {
  lists: {},
  entities: {}
}

Tag.propTypes = {
  lists: React.PropTypes.object,
  entities: React.PropTypes.object
}

export { Tag }
export default connect(mapStateToProps, { fetchListedPosts: actions.fetchListedPosts })(withLayout(Tag))
