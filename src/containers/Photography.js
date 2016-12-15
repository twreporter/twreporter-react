/* eslint no-console: 0, no-unused-vars: [0, { "args": "all" }]*/

import { CATEGORY, DARK, PHOTOGRAPHY_PAGE, colors } from '../constants/index'
import { connect } from 'react-redux'
import { denormalizeArticles, getCatId } from '../utils/index'
import { fetchFeatureArticles, fetchArticlesByUuidIfNeeded } from '../actions/articles'
import { setHeaderInfo } from '../actions/header'
import async from 'async'
import Footer from '../components/Footer'
import React, { Component } from 'react'
import ArticleList from '../components/ArticleList'
import TopNews from '../components/TopNews'

// lodash
import get from 'lodash/get'

const MAXRESULT = 10
const PAGE = 1
const PHOTOGRAPHY_CH_STR = '影像'

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

    return (
      <div style={style}>
        <TopNews topnews={topNewsItems} />
        <ArticleList
          articles={articles}
          bgStyle="dark"
          hasMore={ get(articlesByUuids, [ catId, 'hasMore' ])}
          loadMore={this.loadMoreArticles}
        />
        {this.props.children}
        <Footer theme="dark"/>
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
