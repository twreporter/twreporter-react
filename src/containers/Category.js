import React, { Component } from 'react'

import { connect } from 'react-redux'
import { loadArticles } from '../actions/articles'
import Header from '../components/Header'
import NavBar from '../components/NavBar'
import Tags from '../components/Tags'
import Footer from '../components/Footer'

if (process.env.BROWSER) {
  require('./Category.css')
}

const maxResults = 10

export default class Category extends Component {
  static fetchData({ params, store }) {
    return store.dispatch(loadArticles(params.category, maxResults, 1))
  }
  constructor(props) {
    super(props)
    this.state = {
      tag: this.props.params.category
    }
    this.loadMore = this.loadMore.bind(this)
  }

  componentWillMount() {
    this.props.loadArticles(this.state.tag, maxResults, 1)
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.tag !== nextProps.params.category) {
      this.props.loadArticles(this.state.tag, maxResults, 1)
      this.setState({
        tag: nextProps.params.category
      })
    }
  }

  loadMore() {
    const { tag } = this.state
    const categoryObj = this.props.articles[tag] || {
      items: [],
      hasMore: true
    }
    if (categoryObj.hasMore) {
      let page = Math.floor(categoryObj.items.length / maxResults)  + 1
      this.props.loadArticles(tag, maxResults, page)
    }
  }

  render() {
    const { articles, device } = this.props
    const { tag } = this.state
    let categoryObj = articles[tag] || {}

    return (
      <div>
        <Header/>
        <NavBar/>
        <Tags
          articles={categoryObj.items || []}
          device={device}
          catShow="true"
          hasMore={categoryObj.hasMore}
          loadMore={this.loadMore}
        />
        {this.props.children}
        <Footer/>
      </div>
    )
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
