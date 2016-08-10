/* eslint  no-unused-vars:1 */
import { TAG } from '../constants/index'
import { connect } from 'react-redux'
import { denormalizeArticles } from '../utils/index'
import { fetchArticlesByUuidIfNeeded } from '../actions/articles'
import { setPageType } from '../actions/header'
import _ from 'lodash'
import Footer from '../components/Footer'
import React, { Component } from 'react'
import Tags from '../components/Tags'

const MAXRESULT = 10
const PAGE = 1

export default class Tag extends Component {
  static fetchData({ params, store }) {
    return store.dispatch(fetchArticlesByUuidIfNeeded(params.tagId), TAG, {
      page: PAGE,
      max_results: MAXRESULT
    })
  }

  constructor(props) {
    super(props)
    let tagId = this.props.params.tagId
    this.state = {
      tagId: tagId
    }
    this.loadMore = this._loadMore.bind(this)
  }

  componentWillMount() {
    const { articlesByUuids, fetchArticlesByUuidIfNeeded, params } = this.props
    let tagId = this.state.tagId

    // if fetched before, do nothing
    if (_.get(articlesByUuids, [ tagId, 'items', 'length' ], 0) > 0) {
      return
    }

    fetchArticlesByUuidIfNeeded(tagId, TAG, {
      page: PAGE,
      max_results: MAXRESULT
    })

  }

  componentDidMount() {
    this.props.setPageType(TAG)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      tagId: nextProps.params.tagId
    })
  }

  _loadMore() {
    const { articlesByUuids, fetchArticlesByUuidIfNeeded, params } = this.props
    let { tagId } = this.state
    let articlesByCat = _.get(articlesByUuids, [ tagId ], {})
    if (_.get(articlesByCat, 'hasMore') === false) {
      return
    }

    let itemSize = _.get(articlesByCat, 'items.length', 0)
    let page = Math.floor(itemSize / MAXRESULT) + 1

    fetchArticlesByUuidIfNeeded(tagId, TAG, {
      page: page,
      max_results: MAXRESULT
    })
  }

  render() {
    const { device } = this.context
    const { tagId } = this.state
    const { articlesByUuids, entities } = this.props
    let articles = denormalizeArticles(_.get(articlesByUuids, [ tagId, 'items' ], []), entities)

    return (
      <div>
        <Tags
          articles={articles}
          device={device}
          hasMore={ _.get(articlesByUuids, [ tagId, 'hasMore' ])}
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
    articlesByUuids: state.articlesByUuids || {},
    entities: state.entities || {}
  }
}

Tag.contextTypes = {
  device: React.PropTypes.string
}

export { Tag }
export default connect(mapStateToProps, { fetchArticlesByUuidIfNeeded, setPageType })(Tag)
