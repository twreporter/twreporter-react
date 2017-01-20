import { BRIGHT, CATEGORY, CULTURE_CH_STR, INTL_CH_STR, MEDIA_CH_STR, REVIEW_CH_STR, SITE_META, SITE_NAME, TAIWAN_CH_STR } from '../constants/index'
import { connect } from 'react-redux'
import { denormalizeArticles, getCatId } from '../utils/index'
import { fetchArticlesByUuidIfNeeded } from '../actions/articles'
import { setHeaderInfo } from '../actions/header'
import Helmet from 'react-helmet'
import Footer from '../components/Footer'
import React, { Component } from 'react'
import SystemError from '../components/SystemError'
import ArticleList from '../components/ArticleList'

// lodash
import get from 'lodash/get'

const _  = {
  get
}

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
    return store.dispatch(fetchArticlesByUuidIfNeeded(getCatId(catENtoCH[params.category]), CATEGORY, {
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
    const { articlesByUuids, fetchArticlesByUuidIfNeeded, setHeaderInfo } = this.props
    setHeaderInfo({
      pageTheme: BRIGHT,
      pageType: CATEGORY
    })

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
    const error = _.get(articlesByUuids, [ catId, 'error' ], null)
    let articles = denormalizeArticles(_.get(articlesByUuids, [ catId, 'items' ], []), entities)

    // Error handling
    if (error !== null && _.get(articles, 'length', 0) === 0) {
      return (
        <div>
          <SystemError error={error} />
          <Footer />
        </div>
      )
    }

    const category = _.get(params, 'category', null)
    const catName = catENtoCH[category]
    const catBox = catName ? <div className="top-title-outer"><h1 className="top-title"> {catName} </h1></div> : null
    const title = catName + SITE_NAME.SEPARATOR + SITE_NAME.FULL
    const canonical = `${SITE_META.URL}category/${category}`

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
          {catBox}
        </div>
        <ArticleList
          articles={articles}
          device={device}
          hasMore={ _.get(articlesByUuids, [ catId, 'hasMore' ])}
          loadMore={this.loadMore}
          loadMoreError={error}
        />
        {this.props.children}
        <Footer/>
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

Category.contextTypes = {
  device: React.PropTypes.string
}

export { Category }
export default connect(mapStateToProps, { fetchArticlesByUuidIfNeeded, setHeaderInfo })(Category)
