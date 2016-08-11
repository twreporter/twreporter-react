/* eslint  no-unused-vars:1 */
import { CATEGORY, CULTURE_CH_STR, INTL_CH_STR, MEDIA_CH_STR, REVIEW_CH_STR, TAIWAN_CH_STR } from '../constants/index'
import { connect } from 'react-redux'
import { denormalizeArticles, getCatId } from '../utils/index'
import nameMap from '../conf/category-tag-mapping-table'
import { fetchArticlesByUuidIfNeeded } from '../actions/articles'
import { setPageType } from '../actions/header'
import _ from 'lodash'
import Footer from '../components/Footer'
import React, { Component } from 'react'
import Tags from '../components/Tags'

if (process.env.BROWSER) {
  require('./Category.css')
}

const MAXRESULT = 10
const PAGE = 1

// english to chinese of category
const catENtoCH = {
  culture: CULTURE_CH_STR,
  intl: INTL_CH_STR,
  media: MEDIA_CH_STR,
  review: REVIEW_CH_STR,
  taiwan: TAIWAN_CH_STR
}

export default class Category extends Component {
  static fetchData({ params, store }) {
    return store.dispatch(fetchArticlesByUuidIfNeeded(getCatId(catENtoCH[params.category]), {
      page: PAGE,
      max_results: MAXRESULT
    }))
  }

  constructor(props) {
    super(props)
    let category = this.props.params.category
    this.state = {
      catId: getCatId(catENtoCH[category])
    }
    this.loadMore = this._loadMore.bind(this)
  }

  componentWillMount() {
    const { articlesByUuids, fetchArticlesByUuidIfNeeded } = this.props
    let catId = this.state.catId

    // if fetched before, do nothing
    if (_.get(articlesByUuids, [ catId, 'items', 'length' ], 0) > 0) {
      return
    }

    fetchArticlesByUuidIfNeeded(catId, CATEGORY, {
      page: PAGE,
      max_results: MAXRESULT
    })

  }

  componentDidMount() {
    this.props.setPageType(CATEGORY)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      catId: getCatId(catENtoCH[nextProps.params.category])
    })
  }

  _loadMore() {
    const { articlesByUuids, fetchArticlesByUuidIfNeeded, params } = this.props
    let { catId } = this.state
    let articlesByCat = _.get(articlesByUuids, [ catId ], {})
    if (_.get(articlesByCat, 'hasMore') === false) {
      return
    }

    let itemSize = _.get(articlesByCat, 'items.length', 0)
    let page = Math.floor(itemSize / MAXRESULT) + 1

    fetchArticlesByUuidIfNeeded(catId, CATEGORY, {
      page: page,
      max_results: MAXRESULT
    })
  }

  render() {
    const { device } = this.context
    const { catId } = this.state
    const { articlesByUuids, entities, params } = this.props
    let articles = denormalizeArticles(_.get(articlesByUuids, [ catId, 'items' ], []), entities)
    const category = _.get(params, 'category', null)
    const catName = category ? _.get(nameMap, category, null): null
    const catBox = catName ? <div className="top-title-outer"><div className="top-title"> {catName} </div></div> : null

    return (
      <div>
        <div className="container text-center">
          {catBox}
        </div>
        <Tags
          articles={articles}
          device={device}
          hasMore={ _.get(articlesByUuids, [ catId, 'hasMore' ])}
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

Category.contextTypes = {
  device: React.PropTypes.string
}

export { Category }
export default connect(mapStateToProps, { fetchArticlesByUuidIfNeeded, setPageType })(Category)
