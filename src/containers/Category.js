import React, { Component, PropTypes } from 'react'

import { connect } from 'react-redux'
import { loadArticles } from '../actions/articles'
import NotFound from './NotFound'
import Header from '../components/Header'
import NavBar from '../components/NavBar'
import Tags from '../components/Tags'
import Footer from '../components/Footer'

if (process.env.BROWSER) {
  require('./Category.css');
}

const maxResults = 10

export default class Category extends Component {
  static fetchData({ query, params, store, history }) {
    return store.dispatch(loadArticles(params.category, maxResults, 1))
  }
  constructor(props) {
    super(props)
    this.tag = this.props.params.category
    this.loadMore = this.loadMore.bind(this)
  }

  loadMore() {
    const categoryObj = this.props.articles[this.tag] || {
      items: [],
      hasMore: true
    }
    if (categoryObj.hasMore) {
      let page = Math.floor(categoryObj.items.length / maxResults)  + 1
      this.props.loadArticles(this.tag, maxResults, page)
    }
  }

  render() {
    const { articles, device } = this.props
    let categoryObj = articles[this.tag]
    let load
    if (articles) {
      return (
        <div>
          <Header/>
          <NavBar/>
          <Tags
            articles={categoryObj.items || []}
            device={device}
            hasMore={categoryObj.hasMore}
            loadMore={this.loadMore}
          />
          {this.props.children}
          <Footer/>
        </div>
      )
    } else {
      return (<NotFound/>)
    }
  }
}

function mapStateToProps(state) {
  return {
    articles: state.articles,
    device: state.device
  }
}

export { Category }
export default connect(mapStateToProps, { loadArticles })(Category)
