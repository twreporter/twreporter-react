/* eslint  no-unused-vars:1 */
import React from 'react'

import { connect } from 'react-redux'
import { denormalizeArticles } from '../utils/index'
import { fetchCategorizedArticlesIfNeeded } from '../actions/group-articles'
import { Home } from './Home'
import _ from 'lodash'
import async from 'async'
import Footer from '../components/Footer'
import SystemError from '../components/SystemError'
import Tags from '../components/Tags'
import TopNews from '../components/TopNews'
if (process.env.BROWSER) {
  require('./Home.css')
}

const MAXRESULT = 10
const PAGE = 1

function loadData(fetchCategorizedArticlesIfNeeded) {
  fetchCategorizedArticlesIfNeeded('攝影', MAXRESULT, PAGE)
}

export default class Photography extends Home {
  static fetchData({ store }) {
    return new Promise((resolve, reject) => {
      // load tagged articles in parallel
      async.parallel([
        function (callback) {
          store.dispatch(fetchCategorizedArticlesIfNeeded('攝影', MAXRESULT, PAGE))
          .then(() => {
            callback(null)
          })
        }
      ], (err, results) => {
        if (err) {
          // console.warn('fetchData occurs error:', err)
        }
        resolve()
      })
    })
  }

  constructor(props, context) {
    super(props, context)
    this.loadMoreArticles = this.loadMoreArticles.bind(this, '攝影')
  }

  componentWillMount() {
    loadData(this.props.fetchCategorizedArticlesIfNeeded)
  }

  componentWillReceiveProps(nextProps) {
    loadData(nextProps.fetchCategorizedArticlesIfNeeded)
  }

  loadMoreArticles(cat) {
    const { articlesByCats, fetchCategorizedArticlesIfNeeded } = this.props
    const features = articlesByCats[cat] || {
      items: []
    }
    let page = Math.floor(features.items.length / MAXRESULT)  + 1
    fetchCategorizedArticlesIfNeeded(cat, MAXRESULT, page)
  }

  render() {
    const { articlesByCats, entities } = this.props
    const style = {
      backgroundColor: '#2C323E',
      color: '#FFFFEB'
    }

    let fullArticles = denormalizeArticles(_.get(articlesByCats, [ '攝影','items' ] , []), entities)
    let featureItems = fullArticles

    if (fullArticles || featureItems) {
      return (
        <div style={style}>
          <TopNews topnews={featureItems} />
          <Tags
            articles={fullArticles || []}
            bgStyle="dark"
            hasMore={ _.get(articlesByCats, [ '攝影', 'nextUrl' ]) !== null}
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
    entitie: state.entities || {} 
  }
}

export { Photography }
export default connect(mapStateToProps, { fetchCategorizedArticlesIfNeeded })(Photography)
