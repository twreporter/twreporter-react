import { HOME_CH_STR, SITE_META, SITE_NAME, TAG } from '../constants/index'
import { connect } from 'react-redux'
import { denormalizeArticles } from '../utils/index'
import { fetchArticlesByUuidIfNeeded } from '../actions/articles'
import { setPageType } from '../actions/header'
import DocumentMeta from 'react-document-meta'
import Footer from '../components/Footer'
import React, { Component } from 'react'
import Tags from '../components/Tags'

// lodash
import get from 'lodash/get'

const MAXRESULT = 10
const PAGE = 1

class Tag extends Component {
  static fetchData({ params, store }) {
    return store.dispatch(fetchArticlesByUuidIfNeeded(params.tagId, TAG, {
      page: PAGE,
      max_results: MAXRESULT
    }))
  }

  constructor(props) {
    super(props)
    this.loadMore = this._loadMore.bind(this)
  }

  componentWillMount() {
    const { articlesByUuids, fetchArticlesByUuidIfNeeded, params } = this.props
    let tagId = get(params, 'tagId')

    // if fetched before, do nothing
    if (get(articlesByUuids, [ tagId, 'items', 'length' ], 0) > 0) {
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
    let tagId = get(params, 'tagId')

    // if fetched before, do nothing
    if (get(articlesByUuids, [ tagId, 'items', 'length' ], 0) > 0) {
      return
    }

    fetchArticlesByUuidIfNeeded(tagId, TAG, {
      page: PAGE,
      max_results: MAXRESULT
    })
  }

  _loadMore() {
    const { articlesByUuids, fetchArticlesByUuidIfNeeded, params } = this.props
    const tagId = get(params, 'tagId')
    let articlesByTag = get(articlesByUuids, [ tagId ], {})
    if (get(articlesByTag, 'hasMore') === false) {
      return
    }

    let itemSize = get(articlesByTag, 'items.length', 0)
    let page = Math.floor(itemSize / MAXRESULT) + 1

    fetchArticlesByUuidIfNeeded(tagId, TAG, {
      page: page,
      max_results: MAXRESULT
    })
  }

  render() {
    const { device } = this.context
    const { articlesByUuids, entities, params } = this.props
    const tagId = get(params, 'tagId')
    let articles = denormalizeArticles(get(articlesByUuids, [ tagId, 'items' ], []), entities)
    let tagName = get(entities, [ 'tags', tagId, 'name' ], '')
    const meta = {
      title: tagName ? tagName + SITE_NAME.SEPARATOR + SITE_NAME.FULL : SITE_NAME.FULL,
      description: SITE_META.DESC,
      canonical: `${SITE_META.URL}tag/${tagId}`,
      meta: { property: {} },
      auto: { ograph: true }
    }

    return (
      <DocumentMeta {...meta}>
        <div itemScope itemType="http://schema.org/BreadcrumList" className="container text-center">
          <div itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
            <div itemProp="item">
              <meta itemProp="name" content={HOME_CH_STR} />
              <meta itemProp="url" content={SITE_META.URL} />
            </div>
            <meta itemProp="position" content="1" />
          </div>
          <div itemProp="itemListElement" itemScope itemType="http://schema.org/ListItem">
            {tagName ? <div itemProp="item" className="top-title-outer"><h1 itemProp="name" className="top-title"> {tagName} </h1><meta itemProp="url" content={meta.canonical} /></div> : null
            }
            <meta itemProp="position" content="2"/>
          </div>
        </div>
        <div>
          <Tags
            articles={articles}
            device={device}
            hasMore={ get(articlesByUuids, [ tagId, 'hasMore' ])}
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
