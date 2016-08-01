/*eslint no-unused-vars:0, no-console:0 */
'use strict'
import { connect } from 'react-redux'
import { denormalizeArticles } from '../utils/index'
import { fetchArticlesByCatNameIfNeeded } from '../actions/articles'
import _ from 'lodash'
import async from 'async'
import Daily from '../components/Daily'
import Features from '../components/Features'
import Footer from '../components/Footer'
import React, { Component } from 'react'
import SystemError from '../components/SystemError'
import TopNews from '../components/TopNews'

const MAXRESULT = 10
const PAGE = 1

if (process.env.BROWSER) {
  require('./Home.css')
}

function loadData(fetchArticlesByCatNameIfNeeded) {
  let params = {
    page: PAGE,
    max_results: MAXRESULT
  }
  fetchArticlesByCatNameIfNeeded('評論', params)
  fetchArticlesByCatNameIfNeeded('專題', params)
}


export default class Home extends Component {
  static fetchData({ store }) {
    let params = {
      page: PAGE,
      max_results: MAXRESULT
    }
    return new Promise((resolve, reject) => {
      // load tagged articles in parallel
      async.parallel([
        /*
        function (callback) {
          store.dispatch(fetchTaggedArticlesIfNeeded('hp-projects', MAXRESULT, PAGE))
          .then(() => {
            callback(null)
          })
        },
        */
        function (callback) {
          store.dispatch(fetchArticlesByCatNameIfNeeded('評論', params))
          .then(() => {
            callback(null)
          })
        },
        function (callback) {
          store.dispatch(fetchArticlesByCatNameIfNeeded('專題', params))
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
    this.loadMoreArticles = this.loadMoreArticles.bind(this, '專題')
  }

  componentWillMount() {
    loadData(this.props.fetchArticlesByCatNameIfNeeded)
  }

  componentWillReceiveProps(nextProps) {
    // loadData(nextProps.fetchArticlesByCatNameIfNeeded)
  }

  loadMoreArticles(cat) {
    const { articlesByCats, fetchArticlesByCatNameIfNeeded } = this.props
    let itemSize = _.get(articlesByCats, [ cat, 'items', 'length' ], 0)
    let page = Math.floor(itemSize / MAXRESULT)  + 1
    fetchArticlesByCatNameIfNeeded(cat, {
      page: page,
      max_results: MAXRESULT
    })
  }

  render() {
    const { articlesByCats, entities } = this.props
    const topnews_num = 5
    let topnewsItems = denormalizeArticles(_.get(articlesByCats, [ '專題','items' ] , []), entities)

    let dailyItems = denormalizeArticles(_.get(articlesByCats, [ '評論', 'items' ], []), entities)

    if (topnewsItems) {
      return (
        <div>
          <Daily daily={dailyItems} />
          <Features
            features={topnewsItems}
            hasMore={ _.get(articlesByCats, [ '專題', 'nextUrl' ]) !== null}
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
    articlesByCats: state.articlesByCats || {},
    entities: state.entities || {}
  }
}

export { Home }
export default connect(mapStateToProps, { fetchArticlesByCatNameIfNeeded })(Home)
