import { CATEGORY, CULTURE_CH_STR, INTL_CH_STR, MEDIA_CH_STR, REVIEW_CH_STR, SITE_META, SITE_NAME, TAIWAN_CH_STR } from '../constants/index'
import { connect } from 'react-redux'
import { denormalizeArticles, getCatId } from '../utils/index'
import { fetchArticlesByUuidIfNeeded } from '../actions/articles'
import { setPageType } from '../actions/header'
import _ from 'lodash'
import DocumentMeta from 'react-document-meta'
import Footer from '../components/Footer'
import React, { Component } from 'react'
import Tags from '../components/Tags'

if (process.env.BROWSER) {
  require('./Category.css')
}

const MAXRESULT = 10
const PAGE = 1

// english to chinese of category
const catENtoCH = {
  culture: CULTURE_CH_STR,
  intl: INTL_CH_STR,
  media: MEDIA_CH_STR,
  review: REVIEW_CH_STR,
  taiwan: TAIWAN_CH_STR
}

class Category extends Component {
  static fetchData({ params, store }) {
    return store.dispatch(fetchArticlesByUuidIfNeeded(getCatId(catENtoCH[params.category]), {
      page: PAGE,
      max_results: MAXRESULT
    }))
  }

  constructor(props) {
    super(props)
    let category = this.props.params.category
    this.state = {
      catId: getCatId(catENtoCH[category])
    }
    this.loadMore = this._loadMore.bind(this)
  }

  componentWillMount() {
    const { articlesByUuids, fetchArticlesByUuidIfNeeded } = this.props
    let catId = this.state.catId

    // if fetched before, do nothing
    if (_.get(articlesByUuids, [ catId, 'items', 'length' ], 0) > 0) {
      return
    }

    fetchArticlesByUuidIfNeeded(catId, CATEGORY, {
      page: PAGE,
      max_results: MAXRESULT
    })

  }

  componentDidMount() {
    this.props.setPageType(CATEGORY)
  }

  componentWillReceiveProps(nextProps) {
    const { articlesByUuids, fetchArticlesByUuidIfNeeded, params } = nextProps
    let catId = getCatId(catENtoCH[_.get(params, 'category')])

    // if fetched before, do nothing
    if (_.get(articlesByUuids, [ catId, 'items', 'length' ], 0) > 0) {
      return
    }

    fetchArticlesByUuidIfNeeded(catId, CATEGORY, {
      page: PAGE,
      max_results: MAXRESULT
    })
  }

  _loadMore() {
    const { articlesByUuids, fetchArticlesByUuidIfNeeded, params } = this.props
    let catId = getCatId(catENtoCH[_.get(params, 'category')])

    let articlesByCat = _.get(articlesByUuids, [ catId ], {})
    if (_.get(articlesByCat, 'hasMore') === false) {
      return
    }

    let itemSize = _.get(articlesByCat, 'items.length', 0)
    let page = Math.floor(itemSize / MAXRESULT) + 1

    fetchArticlesByUuidIfNeeded(catId, CATEGORY, {
      page: page,
      max_results: MAXRESULT
    })
  }

  render() {
    const { device } = this.context
    const { articlesByUuids, entities, params } = this.props
    const catId = getCatId(catENtoCH[_.get(params, 'category')])
    let articles = denormalizeArticles(_.get(articlesByUuids, [ catId, 'items' ], []), entities)
    const category = _.get(params, 'category', null)
    const catName = catENtoCH[category]
    const catBox = catName ? <div className="top-title-outer"><h1 className="top-title"> {catName} </h1></div> : null
    const meta = {
      title: catName ? catName + SITE_NAME.SEPARATOR + SITE_NAME.FULL : SITE_NAME.FULL,
      description: SITE_META.DESC,
      canonical: `${SITE_META.URL}category/${category}`,
      meta: { property: {} },
      auto: { ograph: true }
    }

    return (
      <DocumentMeta {...meta}>
        <div className="container text-center">
          {catBox}
        </div>
        <Tags
          articles={articles}
          device={device}
          hasMore={ _.get(articlesByUuids, [ catId, 'hasMore' ])}
          loadMore={this.loadMore}
        />
        {this.props.children}
        <Footer/>
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

Category.contextTypes = {
  device: React.PropTypes.string
}

export { Category }
export default connect(mapStateToProps, { fetchArticlesByUuidIfNeeded, setPageType })(Category)
