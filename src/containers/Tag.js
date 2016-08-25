import { SITE_META, SITE_NAME, TAG } from '../constants/index'
import { connect } from 'react-redux'
import { denormalizeArticles } from '../utils/index'
import { fetchArticlesByUuidIfNeeded } from '../actions/articles'
import { setPageType } from '../actions/header'
import _ from 'lodash'
import DocumentMeta from 'react-document-meta'
import Footer from '../components/Footer'
import React, { Component } from 'react'
import Tags from '../components/Tags'

const MAXRESULT = 10
const PAGE = 1

class Tag extends Component {
  static fetchData({ params, store }) {
    return store.dispatch(fetchArticlesByUuidIfNeeded(params.tagId), TAG, {
      page: PAGE,
      max_results: MAXRESULT
    })
  }

  constructor(props) {
    super(props)
    this.loadMore = this._loadMore.bind(this)
  }

  componentWillMount() {
    const { articlesByUuids, fetchArticlesByUuidIfNeeded, params } = this.props
    let tagId = _.get(params, 'tagId')

    // if fetched before, do nothing
    if (_.get(articlesByUuids, [ tagId, 'items', 'length' ], 0) > 0) {
      return
    }

    fetchArticlesByUuidIfNeeded(tagId, TAG, {
      page: PAGE,
      max_results: MAXRESULT
    })
  }

  componentDidMount() {
    this.props.setPageType(TAG)
  }

  componentWillReceiveProps(nextProps) {
    const { articlesByUuids, fetchArticlesByUuidIfNeeded, params } = nextProps
    let tagId = _.get(params, 'tagId')

    // if fetched before, do nothing
    if (_.get(articlesByUuids, [ tagId, 'items', 'length' ], 0) > 0) {
      return
    }

    fetchArticlesByUuidIfNeeded(tagId, TAG, {
      page: PAGE,
      max_results: MAXRESULT
    })
  }

  _loadMore() {
    const { articlesByUuids, fetchArticlesByUuidIfNeeded, params } = this.props
    const tagId = _.get(params, 'tagId')
    let articlesByTag = _.get(articlesByUuids, [ tagId ], {})
    if (_.get(articlesByTag, 'hasMore') === false) {
      return
    }

    let itemSize = _.get(articlesByTag, 'items.length', 0)
    let page = Math.floor(itemSize / MAXRESULT) + 1

    fetchArticlesByUuidIfNeeded(tagId, TAG, {
      page: page,
      max_results: MAXRESULT
    })
  }

  render() {
    const { device } = this.context
    const { articlesByUuids, entities, params } = this.props
    const tagId = _.get(params, 'tagId')
    let articles = denormalizeArticles(_.get(articlesByUuids, [ tagId, 'items' ], []), entities)
    let tagName = _.get(entities, [ 'tags', tagId, 'name' ], '')
    const tagBox = tagName ? <div className="top-title-outer"><h1 className="top-title"> {tagName} </h1></div> : null
    const meta = {
      title: tagName ? tagName + SITE_NAME.SEPARATOR + SITE_NAME.FULL : SITE_NAME.FULL,
      description: SITE_META.DESC,
      canonical: `${SITE_META.URL}tag/${tagId}`,
      meta: { property: {} },
      auto: { ograph: true }
    }

    return (
      <DocumentMeta {...meta}>
        <div className="container text-center">
          {tagBox}
        </div>
        <div>
          <Tags
            articles={articles}
            device={device}
            hasMore={ _.get(articlesByUuids, [ tagId, 'hasMore' ])}
            loadMore={this.loadMore}
          />
          {this.props.children}
          <Footer/>
        </div>
      </DocumentMeta>
    )
  }
}

function mapStateToProps(state) {
  return {
    articlesByUuids: state.articlesByUuids || {},
    entities: state.entities || {}
  }
}

Tag.contextTypes = {
  device: React.PropTypes.string
}

export { Tag }
export default connect(mapStateToProps, { fetchArticlesByUuidIfNeeded, setPageType })(Tag)
