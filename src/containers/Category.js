import React, { Component } from 'react'

import { connect } from 'react-redux'
import { loadArticles } from '../actions/articles'
import DesktopNavBar from '../components/DesktopNavBar'
import MobileNavBar from '../components/MobileNavBar'
import Tags from '../components/Tags'
import Footer from '../components/Footer'
import catToTag from '../conf/category-tag-mapping-table'

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
    let category = this.props.params.category
    this.state = {
      tag: catToTag[category]
    }
    this.loadMore = this.loadMore.bind(this)
  }

  componentWillMount() {
    const tag = catToTag[this.props.params.category]
    const { loadArticles, articles } = this.props
    if (!articles[tag]) {
      loadArticles(tag, maxResults, 1)
    }
  }

  componentWillReceiveProps(nextProps) {
    const tag = catToTag[nextProps.params.category]
    const { loadArticles, articles } = nextProps
    if (articles[tag]) {
      this.setState({
        tag: tag
      })
    } else {
      loadArticles(tag, maxResults, 1)
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
    const { articles } = this.props
    const path = '/category/' + this.props.params.category
    const { device } = this.context
    const { tag } = this.state
    let categoryObj = articles[tag] || {}

    const NavBar = device === 'desktop'  ? DesktopNavBar : MobileNavBar

    return (
      <div>
        <NavBar bgStyle="light" path={path}/>
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
  }
}

function mapStateToProps(state) {
  return {
    articles: state.articles
  }
}

Category.contextTypes = {
  device: React.PropTypes.string
}

export { Category }
export default connect(mapStateToProps, { loadArticles })(Category)
