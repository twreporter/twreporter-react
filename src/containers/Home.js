/*eslint no-unused-vars:0, no-console:0 */
/* global __DEVELOPMENT__ */
'use strict'
import { REVIEW_CH_STR, SPECIAL_TOPIC_CH_STR } from '../constants/index'
import { connect } from 'react-redux'
import { denormalizeArticles, getCatId } from '../utils/index'
import { fetchArticlesByCatIdIfNeeded, fetchFeatureArticlesIfNeeded } from '../actions/articles'
import _ from 'lodash'
import Daily from '../components/Daily'
import Features from '../components/Features'
import Footer from '../components/Footer'
import React, { Component } from 'react'
import SystemError from '../components/SystemError'
import TopNews from '../components/TopNews'
import async from 'async'
import { devCatListId, prodCatListId } from '../conf/list-id'

const MAXRESULT = 10
const PAGE = 1

if (process.env.BROWSER) {
  require('./Home.css')
}

export default class Home extends Component {
  static fetchData({
    store
  }) {
    let params = {
      page: PAGE,
      max_results: MAXRESULT
    }
    return new Promise((resolve, reject) => {
      // load tagged articles in parallel
      async.parallel([
        function (callback) {
          store.dispatch(fetchFeatureArticlesIfNeeded())
            .then(() => {
              callback(null)
            })
        },
        function (callback) {
          store.dispatch(fetchArticlesByCatIdIfNeeded(getCatId(REVIEW_CH_STR), params))
            .then(() => {
              callback(null)
            })
        },
        function (callback) {
          store.dispatch(fetchArticlesByCatIdIfNeeded(getCatId(SPECIAL_TOPIC_CH_STR), params))
            .then(() => {
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
    this.specialTopicListId = getCatId(SPECIAL_TOPIC_CH_STR)
    this.reviewListId = getCatId(REVIEW_CH_STR)
    this.loadMoreArticles = this._loadMoreArticles.bind(this, this.specialTopicListId)
  }

  componentWillMount() {
    const { fetchArticlesByCatIdIfNeeded, fetchFeatureArticlesIfNeeded } = this.props
    let params = {
      page: PAGE,
      max_results: MAXRESULT
    }
    fetchFeatureArticlesIfNeeded()
    fetchArticlesByCatIdIfNeeded(this.reviewListId, params)
    fetchArticlesByCatIdIfNeeded(this.specialTopicListId, params)
  }

  componentWillReceiveProps(nextProps) {
    // loadData(nextProps.fetchArticlesByCatNameIfNeeded)
  }

  _loadMoreArticles(catId) {
    const { articlesByCats, fetchArticlesByCatIdIfNeeded } = this.props

    if (_.get(articlesByCats, [ catId, 'hasMore' ]) === false) {
      return
    }

    let itemSize = _.get(articlesByCats, [ catId, 'items', 'length' ], 0)
    let page = Math.floor(itemSize / MAXRESULT) + 1
    fetchArticlesByCatIdIfNeeded(catId, {
      page: page,
      max_results: MAXRESULT
    })
  }

  render() {
    const { articlesByCats, entities, featureArticles } = this.props
    const topnews_num = 5
    let topnewsItems = denormalizeArticles(_.get(featureArticles, 'items', []), entities)
    let specialTopicItems = denormalizeArticles(_.get(articlesByCats, [ this.specialTopicListId, 'items' ], []), entities)
    let reviewItems = denormalizeArticles(_.get(articlesByCats, [ this.reviewListId, 'items' ], []), entities)

    if (topnewsItems) {
      return (
        <div>
          <TopNews topnews={topnewsItems} />
          <Daily daily={reviewItems}
          />
          <Features
            features={specialTopicItems}
            hasMore={ _.get(articlesByCats, [ this.specialTopicListId, 'hasMore' ])}
            loadMore={this.loadMoreArticles}
          />
          {
            this.props.children
          }
          <Footer />
        </div>
      )
    } else {
      return ( <SystemError /> )
    }
  }
}

function mapStateToProps(state) {
  return {
    articlesByCats: state.articlesByCats || {},
    entities: state.entities || {},
    featureArticles: state.featureArticles || {}
  }
}

export { Home }

export default connect(mapStateToProps, {
  fetchArticlesByCatIdIfNeeded,
  fetchFeatureArticlesIfNeeded
})(Home)
