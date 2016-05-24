/* eslint  no-unused-vars:1 */
import React, { Component } from 'react'

import { connect } from 'react-redux'
import { denormalizeArticles } from '../utils/index'
import { fetchCategorizedArticlesIfNeeded } from '../actions/articles'
import _ from 'lodash'
import catToTag from '../conf/category-tag-mapping-table'
import Footer from '../components/Footer'
import Tags from '../components/Tags'

if (process.env.BROWSER) {
  require('./Category.css')
}

const maxResults = 10

export default class Category extends Component {
  static fetchData({ params, store }) {
    return store.dispatch(fetchCategorizedArticlesIfNeeded(catToTag[params.category], maxResults, 1))
  }
  constructor(props) {
    super(props)
    let category = this.props.params.category
    this.state = {
      category: catToTag[category]
    }
    this.loadMore = this.loadMore.bind(this)
  }

  componentWillMount() {
    const category = catToTag[this.props.params.category]
    fetchCategorizedArticlesIfNeeded(category, maxResults, 1)
  }

  componentWillReceiveProps(nextProps) {
    const category = catToTag[nextProps.params.category]
    nextProps.fetchCategorizedArticlesIfNeeded(category, maxResults, 1)
  }

  loadMore() {
    const { category } = this.state
    const categoryObj = this.props.articles[category] || {
      items: [],
      hasMore: true
    }
    if (categoryObj.hasMore) {
      let page = Math.floor(categoryObj.items.length / maxResults)  + 1
      this.props.fetchCategorizedArticlesIfNeeded(category, maxResults, page)
    }
  }

  render() {
    const { device } = this.context
    const { category } = this.state
    const { articlesByCats, entities } = this.props
    let fullArticles = denormalizeArticles(_.get(articlesByCats, [ category, 'items' ], []), entities)

    return (
      <div>
        <Tags
          fullArticles={fullArticles || []}
          device={device}
          hasMore={ _.get(articlesByCats, [ category, 'nextUrl' ]) !== null }
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
    articlesByCats: state.articlesByCats || {},
    entities: state.entities || {}
  }
}

Category.contextTypes = {
  device: React.PropTypes.string
}

export { Category }
export default connect(mapStateToProps, { fetchCategorizedArticlesIfNeeded })(Category)
