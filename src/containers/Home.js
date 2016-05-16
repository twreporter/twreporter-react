/*eslint no-unused-vars:0, no-console:0 */
'use strict'
import { connect } from 'react-redux'
import { denormalizeArticles } from '../utils/index'
import { fetchTaggedArticlesIfNeeded } from '../actions/articles'
import _ from 'lodash'
import async from 'async'
import Daily from '../components/Daily'
import Features from '../components/Features'
import Footer from '../components/Footer'
import React, { Component } from 'react'
import SystemError from '../components/SystemError'
import TopNews from '../components/TopNews'

const MAXRESULT = 1
const PAGE = 1

if (process.env.BROWSER) {
  require('./Home.css')
}

function loadData(fetchTaggedArticlesIfNeeded) {
  fetchTaggedArticlesIfNeeded('hp-projects', MAXRESULT, PAGE)
  fetchTaggedArticlesIfNeeded('review', MAXRESULT, PAGE)
  fetchTaggedArticlesIfNeeded('feature', MAXRESULT, PAGE)
}


export default class Home extends Component {
  static fetchData({ store }) {
    return new Promise((resolve, reject) => {
      // load tagged articles in parallel
      async.parallel([
        function (callback) {
          store.dispatch(fetchTaggedArticlesIfNeeded('hp-projects', MAXRESULT, PAGE))
          .then(() => {
            callback(null)
          })
        },
        function (callback) {
          store.dispatch(fetchTaggedArticlesIfNeeded('review', MAXRESULT, PAGE))
          .then(() => {
            callback(null)
          })
        },
        function (callback) {
          store.dispatch(fetchTaggedArticlesIfNeeded('feature', MAXRESULT, PAGE))
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
    this.loadMoreArticles = this.loadMoreArticles.bind(this, 'hp-projects')
  }

  componentWillMount() {
    loadData(this.props.fetchTaggedArticlesIfNeeded)
  }

  componentWillReceiveProps(nextProps) {
    loadData(nextProps.fetchTaggedArticlesIfNeeded)
  }

  loadMoreArticles(tag) {
    const { articlesByTags, fetchTaggedArticlesIfNeeded } = this.props
    const features = articlesByTags[tag] || {
      items: []
    }
    let page = Math.floor(features.items.length / MAXRESULT)  + 1
    fetchTaggedArticlesIfNeeded(tag, MAXRESULT, page)
  }

  render() {
    const { articlesByTags, entities } = this.props
    const topnews_num = 5
    let topnewsItems = denormalizeArticles(_.get(articlesByTags, [ 'feature','items' ] , []), entities)

    let featureItems = denormalizeArticles(_.get(articlesByTags, [ 'hp-projects' , 'items' ], []), entities)

    let dailyItems = denormalizeArticles(_.get(articlesByTags, [ 'review', 'items' ], []), entities)

    if (topnewsItems.length < topnews_num) {
      let less = topnews_num - topnewsItems.length
      topnewsItems = topnewsItems.concat(featureItems.slice(0, less))
      featureItems = featureItems.slice(less)
    } else {
      topnewsItems = topnewsItems.slice(0,topnews_num)
    }

    if (topnewsItems || featureItems) {
      return (
        <div>
          <TopNews topnews={topnewsItems} />
          <Daily daily={dailyItems} />
          <Features
            features={featureItems}
            hasMore={ _.get(articlesByTags, [ 'hp-projects', 'nextUrl' ]) !== null}
            loadMore={this.loadMoreArticles}
          />
          {this.props.children}
          <Footer/>
        </div>
      )
    } else {
      return ( <SystemError/> )
    }
  }
}

function mapStateToProps(state) {
  return {
    articlesByTags: state.articlesByTags || {},
    entities: state.entities || {}
  }
}

export { Home }
export default connect(mapStateToProps, { fetchTaggedArticlesIfNeeded })(Home)
