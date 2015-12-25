import React, { Component } from 'react'

import { connect } from 'react-redux'
import { loadMultiTaggedArticles, loadArticles } from '../actions/articles'
import Tags from '../components/Tags'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import SystemError from '../components/SystemError'
import TopNews from '../components/TopNews'
if (process.env.BROWSER) {
  require('./Home.css')
}

export default class Home extends Component {
  static fetchData({ store }) {
    let params = [ 'hp-projects', 'feature' ]
    return store.dispatch(loadMultiTaggedArticles(params))
  }
  constructor(props, context) {
    super(props, context)
    this.loadMoreFeatureArticles = this.loadMoreFeatureArticles.bind(this)
  }

  loadMoreFeatureArticles() {
    const maxResults = 10
    const features = this.props.articles['hp-projects'] || {
      items: [],
      hasMore: true
    }
    if (features.hasMore) {
      let page = Math.floor(features.items.length / maxResults)  + 1
      this.props.loadArticles('hp-projects', maxResults, page)
    }
  }

  render() {
    const { articles, device } = this.props
    const topnews_num = 5
    let topnewsItems = articles.feature && articles.feature.items || []
    let feature = articles['hp-projects'] || {
      hasMore: true
    }
    let featureItems = feature.items || []
    const style = {
      backgroundColor: '#2C323E',
      color: '#FFFFEB'
    }
    if (Array.isArray(topnewsItems)) {
      if (topnewsItems.length < topnews_num) {
        let less = topnews_num - topnewsItems.length
        topnewsItems = topnewsItems.concat(featureItems.slice(0, less))
        featureItems = featureItems.slice(less)
      } else {
        topnewsItems = topnewsItems.slice(0,topnews_num)
      }
    }
    if (topnewsItems || featureItems) {
      return (
        <div style={style}>
          <NavBar bgStyle="dark"/>
          <TopNews topnews={topnewsItems} />
          <Tags
            articles={featureItems || []}
            device={device}
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

export { Home }
export default connect(mapStateToProps, { loadMultiTaggedArticles, loadArticles })(Home)
