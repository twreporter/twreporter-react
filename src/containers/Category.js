import Helmet from 'react-helmet'
import React, { Component } from 'react'
import SystemError from '../components/SystemError'
import ArticleList from '../components/ArticleList'
import categoryListID from '../conf/category-list-id'
import categoryString from '../constants/category-strings'
import twreporterRedux from 'twreporter-redux'

import { BRIGHT, CATEGORY, SITE_META, SITE_NAME } from '../constants/index'
import { camelize, camelizeKeys } from 'humps'
import { connect } from 'react-redux'
import { setHeaderInfo } from '../actions/header'

// lodash
import get from 'lodash/get'

const _  = {
  get
}

const { actions, reduxStateFields, utils } = twreporterRedux
const { fetchListedPosts } = actions

if (process.env.BROWSER) {
  require('./Category.css')
}

const MAXRESULT = 10
const categories = 'categories'

function getListID(paramCategory) {
  const field = camelize(paramCategory)
  return categoryListID[field]
}

class Category extends Component {
  static fetchData({ params, store }) {
    return store.dispatch(fetchListedPosts(getListID(params.category), categories, MAXRESULT))
  }

  constructor(props) {
    super(props)
    const category = this.props.params.category
    this.state = {
      catId: getListID(category)
    }
    this.loadMore = this._loadMore.bind(this)
  }

  componentWillMount() {
    const { lists, fetchListedPosts, setHeaderInfo } = this.props
    setHeaderInfo({
      pageTheme: BRIGHT,
      pageType: CATEGORY
    })

    let catId = this.state.catId

    // if fetched before, do nothing
    if (_.get(lists, [ catId, 'items', 'length' ], 0) > 0) {
      return
    }

    fetchListedPosts(catId, categories, MAXRESULT)

  }

  componentWillReceiveProps(nextProps) {
    const { lists, fetchListedPosts, params } = nextProps
    let catId = getListID(params.category)

    // if fetched before, do nothing
    if (_.get(lists, [ catId, 'items', 'length' ], 0) > 0) {
      return
    }

    fetchListedPosts(catId, categories, MAXRESULT)
  }

  _loadMore() {
    const { fetchListedPosts, params } = this.props
    let catId = getListID(params.category)
    fetchListedPosts(catId, categories, MAXRESULT)
  }

  render() {
    const { device } = this.context
    const { lists, entities, params } = this.props
    const category = _.get(params, 'category', '')
    const postEntities = _.get(entities, reduxStateFields.postsInEntities, {})
    const catId = getListID(category)
    const error = _.get(lists, [ catId, 'error' ], null)
    const total = _.get(lists, [ catId, 'total' ], 0)
    const posts = camelizeKeys(utils.denormalizePosts(_.get(lists, [ catId, 'items' ], []), postEntities))

    // Error handling
    if (error !== null && _.get(posts, 'length', 0) === 0) {
      return (
        <div>
          <SystemError error={error} />
        </div>
      )
    }

    const catName = categoryString[camelize(category)]
    const catBox = catName ? <div className="top-title-outer"><h1 className="top-title"> {catName} </h1></div> : null
    const title = catName + SITE_NAME.SEPARATOR + SITE_NAME.FULL
    const canonical = `${SITE_META.URL}category/${category}`

    return (
      <div>
        <Helmet
          title={title}
          link={[
            { rel: 'canonical', href: canonical }
          ]}
          meta={[
            { name: 'description', content: SITE_META.DESC },
            { name: 'twitter:title', content: title },
            { name: 'twitter:description', content: SITE_META.DESC },
            { property: 'og:title', content: title },
            { property: 'og:description', content: SITE_META.DESC },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: canonical }
          ]}
        />
        <div className="container text-center">
          {catBox}
        </div>
        <ArticleList
          articles={posts}
          device={device}
          hasMore={total > posts.length}
          loadMore={this.loadMore}
          loadMoreError={error}
        />
        {this.props.children}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    lists: state[reduxStateFields.lists],
    entities: state[reduxStateFields.entities]
  }
}

Category.contextTypes = {
  device: React.PropTypes.string
}

Category.defaultProps = {
  lists: {},
  entities: {}
}

Category.propTypes = {
  lists: React.PropTypes.object,
  entities: React.PropTypes.object
}

export { Category }
export default connect(mapStateToProps, { fetchListedPosts: actions.fetchListedPosts, setHeaderInfo })(Category)
