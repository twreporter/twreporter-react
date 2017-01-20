/* eslint no-console: 0, no-unused-vars: [0, { "args": "all" }]*/

import { CATEGORY, DARK, PHOTOGRAPHY_CH_STR, PHOTOGRAPHY_PAGE, SITE_META, SITE_NAME, categoryPath, colors } from '../constants/index'
import { connect } from 'react-redux'
import { denormalizeArticles, getCatId } from '../utils/index'
import { fetchFeatureArticles, fetchArticlesByUuidIfNeeded } from '../actions/articles'
import { setHeaderInfo } from '../actions/header'
import Footer from '../components/Footer'
import Helmet from 'react-helmet'
import React, { Component } from 'react'
import ArticleList from '../components/ArticleList'
import TopNews from '../components/TopNews'
import async from 'async'

// lodash
import get from 'lodash/get'

const MAXRESULT = 10
const PAGE = 1

class Photography extends Component {
  static fetchData({ store }) {
    return new Promise((resolve, reject) => {
      // load tagged articles in parallel
      async.parallel([
        function (callback) {
          store.dispatch(fetchFeatureArticles({
            where: {
              categories: {
                '$in': [ getCatId(PHOTOGRAPHY_CH_STR) ]
              }
            }
          })).then(() => {
            callback(null)
          })
        },
        function (callback) {
          store.dispatch(fetchArticlesByUuidIfNeeded(getCatId(PHOTOGRAPHY_CH_STR), CATEGORY, {
            page: PAGE,
            max_result: MAXRESULT,
            where: {
              isFeatured: false
            }
          })).then(() => {
            callback(null)
          })
        }
      ], (err, results) => {
        if (err) {
          console.warn('fetchData occurs error:', err)
        }
        resolve()
      })
    })
  }

  constructor(props, context) {
    super(props, context)
    this.loadMoreArticles = this._loadMoreArticles.bind(this)
  }

  componentWillMount() {
    const { fetchArticlesByUuidIfNeeded, fetchFeatureArticles, setHeaderInfo } = this.props
    let catId = getCatId(PHOTOGRAPHY_CH_STR)
    fetchFeatureArticles({
      where: {
        categories: {
          '$in': [ catId ]
        }
      }
    })

    fetchArticlesByUuidIfNeeded(catId, CATEGORY, {
      page: PAGE,
      max_result: MAXRESULT,
      where: {
        isFeatured: false
      }
    })

    setHeaderInfo({
      pageTheme: DARK,
      pageType: PHOTOGRAPHY_PAGE,
      readPercent: 0
    })
  }

  _loadMoreArticles() {
    const { articlesByUuids, fetchArticlesByUuidIfNeeded } = this.props
    let catId = getCatId(PHOTOGRAPHY_CH_STR)
    const articles = articlesByUuids[catId]
    let page = Math.floor(get(articles, 'items.length', 0) / MAXRESULT)  + 1
    fetchArticlesByUuidIfNeeded(catId, CATEGORY, {
      page,
      max_result: MAXRESULT,
      where: {
        isFeatured: false
      }
    })
  }

  render() {
    const { articlesByUuids, featureArticles, entities } = this.props
    const style = {
      backgroundColor: colors.darkBg,
      color: '#FFFFEB'
    }
    let catId = getCatId(PHOTOGRAPHY_CH_STR)

    let topNewsItems = denormalizeArticles(get(featureArticles, 'items', []), entities)
    let articles = denormalizeArticles(get(articlesByUuids, [ catId, 'items' ], []), entities)

    const canonical = SITE_META.URL + categoryPath.photographyPath
    const title = PHOTOGRAPHY_CH_STR + SITE_NAME.SEPARATOR + SITE_NAME.FULL
    return (
      <div style={style}>
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
        <TopNews topnews={topNewsItems} />
        <ArticleList
          articles={articles}
          bgStyle={DARK}
          hasMore={ get(articlesByUuids, [ catId, 'hasMore' ])}
          loadMore={this.loadMoreArticles}
        />
        {this.props.children}
        <Footer theme={DARK} />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    articlesByUuids: state.articlesByUuids || {},
    entities: state.entities || {},
    featureArticles: state.featureArticles || {}
  }
}

export { Photography }
export default connect(mapStateToProps, { fetchArticlesByUuidIfNeeded, fetchFeatureArticles, setHeaderInfo })(Photography)
