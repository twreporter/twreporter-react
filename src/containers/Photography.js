/*eslint no-unused-vars: 1*/
import React, { Component } from 'react'

import { connect } from 'react-redux'
import { loadMultiTaggedArticles, loadArticles } from '../actions/articles'
import Tags from '../components/Tags'
import Footer from '../components/Footer'
import DesktopNavBar from '../components/DesktopNavBar'
import MobileNavBar from '../components/MobileNavBar'
import SystemError from '../components/SystemError'
import TopNews from '../components/TopNews'
if (process.env.BROWSER) {
  require('./Home.css')
}

export default class Photography extends Component {
  static fetchData({ store }) {
    let params = [ 'photo-reviews', 'photo-features' ]
    return store.dispatch(loadMultiTaggedArticles(params))
  }
  constructor(props, context) {
    super(props, context)
    this.loadMoreFeatureArticles = this.loadMoreFeatureArticles.bind(this)
  }

  loadMoreFeatureArticles() {
    const maxResults = 10
    const features = this.props.articles['photo-reviews'] || {
      items: [],
      hasMore: true
    }
    if (features.hasMore) {
      let page = Math.floor(features.items.length / maxResults)  + 1
      this.props.loadArticles('photo-reviews', maxResults, page)
    }
  }

  render() {
    const { articles } = this.props
    const { device } = this.context
    const topnews_num = 5
    let topnewsItems = articles.feature && articles.feature.items || []
    let feature = articles['photo-reviews'] || {
      hasMore: true
    }
    let featureItems = feature.items || []
    const style = {
      backgroundColor: '#2C323E',
      color: '#FFFFEB'
    }
    if (topnewsItems || featureItems) {
      return (
        <div style={style}>
          <NavBar bgStyle="dark"/>
          <TopNews topnews={topnewsItems} />
          <Tags
            articles={featureItems || []}
            bgStyle="dark"
            hasMore={featureItems.hasMore}
            loadMore={this.loadMore}
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
  return { articles: state.articles }
}

Photography.contextTypes = {
  device: React.PropTypes.string
}

export { Photography }
export default connect(mapStateToProps, { loadMultiTaggedArticles, loadArticles })(Photography)
