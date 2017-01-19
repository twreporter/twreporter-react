import { BRIGHT, SITE_META, SITE_NAME, TAG } from '../constants/index'
import { connect } from 'react-redux'
import { denormalizeArticles } from '../utils/index'
import { fetchArticlesByUuidIfNeeded } from '../actions/articles'
import { setHeaderInfo } from '../actions/header'
import Footer from '../components/Footer'
import Helmet from 'react-helmet'
import React, { Component } from 'react'
import SystemError from '../components/SystemError'
import ArticleList from '../components/ArticleList'

// lodash
import get from 'lodash/get'

const _  = {
  get
}

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
    const { articlesByUuids, fetchArticlesByUuidIfNeeded, params, setHeaderInfo } = this.props
    setHeaderInfo({
      pageTheme: BRIGHT,
      pageType: TAG,
      readPercent: 0
    })

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
    const error = _.get(articlesByUuids, [ tagId, 'error' ], null)
    let articles = denormalizeArticles(_.get(articlesByUuids, [ tagId, 'items' ], []), entities)

    // Error handling
    if (error !== null && _.get(articles, 'length', 0) === 0) {
      return (
        <div>
          <SystemError error={error} />
          <Footer />
        </div>
      )
    }

    let tagName = _.get(entities, [ 'tags', tagId, 'name' ], '')
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
            articles={articles}
            device={device}
            hasMore={ _.get(articlesByUuids, [ tagId, 'hasMore' ])}
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
    articlesByUuids: state.articlesByUuids || {},
    entities: state.entities || {}
  }
}

Tag.contextTypes = {
  device: React.PropTypes.string
}

export { Tag }
export default connect(mapStateToProps, { fetchArticlesByUuidIfNeeded, setHeaderInfo })(Tag)
