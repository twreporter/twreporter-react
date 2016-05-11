/* eslint  no-unused-vars:1 */
import React, { Component } from 'react'

import { connect } from 'react-redux'
import { denormalizeArticles } from '../utils/index'
import { fetchArticlesIfNeeded } from '../actions/articles'
import _ from 'lodash'
import Tags from '../components/Tags'
import catToTag from '../conf/category-tag-mapping-table'

if (process.env.BROWSER) {
  require('./Category.css')
}

const maxResults = 10

export default class Category extends Component {
  static fetchData({ params, store }) {
    return store.dispatch(fetchArticlesIfNeeded(params.category, maxResults, 1))
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
    const { fetchArticlesIfNeeded, taggedArticles } = this.props
    if (!taggedArticles[tag]) {
      fetchArticlesIfNeeded(tag, maxResults, 1)
    }
  }

  componentWillReceiveProps(nextProps) {
    const tag = catToTag[nextProps.params.category]
    const { fetchArticlesIfNeeded, articles } = nextProps
    if (articles[tag]) {
      this.setState({
        tag: tag
      })
    } else {
      fetchArticlesIfNeeded(tag, maxResults, 1)
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
      this.props.fetchArticlesIfNeeded(tag, maxResults, page)
    }
  }

  render() {
    const { device } = this.context
    const { tag } = this.state
    const { taggedArticles, entities } = this.props
    let fullArticles = denormalizeArticles(_.get(taggedArticles, [ tag ], []), entities)
    let categoryObj = fullArticles[tag] || {}

    return (
      <div>
        <Tags
          fullArticles={categoryObj.items || []}
          device={device}
          hasMore={categoryObj.hasMore}
          loadMore={this.loadMore}
        />
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    taggedArticles: state.taggedArticles,
    entities: state.entities || {}
  }
}

Category.contextTypes = {
  device: React.PropTypes.string
}

export { Category }
export default connect(mapStateToProps, { fetchArticlesIfNeeded })(Category)
