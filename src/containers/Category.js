import Helmet from 'react-helmet'
import Footer from '../components/Footer'
import React, { Component } from 'react'
import SystemError from '../components/SystemError'
import ArticleList from '../components/ArticleList'
import twreporterRedux from 'twreporter-redux'

import { BRIGHT, CATEGORY, CULTURE_CH_STR, INTL_CH_STR, MEDIA_CH_STR, REVIEW_CH_STR, SITE_META, SITE_NAME, TAIWAN_CH_STR } from '../constants/index'
import { camelizeKeys } from 'humps'
import { connect } from 'react-redux'
import { getCatId } from '../utils/index'
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

// english to chinese of category
const catENtoCH = {
  culture: CULTURE_CH_STR,
  intl: INTL_CH_STR,
  media: MEDIA_CH_STR,
  review: REVIEW_CH_STR,
  taiwan: TAIWAN_CH_STR
}

class Category extends Component {
  static fetchData({ params, store }) {
    return store.dispatch(fetchListedPosts(getCatId(catENtoCH[params.category]), categories, MAXRESULT))
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
    let catId = getCatId(catENtoCH[_.get(params, 'category')])

    // if fetched before, do nothing
    if (_.get(lists, [ catId, 'items', 'length' ], 0) > 0) {
      return
    }

    fetchListedPosts(catId, categories, MAXRESULT)
  }

  _loadMore() {
    const { fetchListedPosts, params } = this.props
    let catId = getCatId(catENtoCH[_.get(params, 'category')])
    fetchListedPosts(catId, categories, MAXRESULT)
  }

  render() {
    const { device } = this.context
    const { lists, entities, params } = this.props
    const postEntities = _.get(entities, reduxStateFields.posts, {})
    const catId = getCatId(catENtoCH[_.get(params, 'category')])
    const error = _.get(lists, [ catId, 'error' ], null)
    const total = _.get(lists, [ catId, 'total' ], 0)
    const posts = camelizeKeys(utils.denormalizePosts(_.get(lists, [ catId, 'items' ], []), postEntities))

    // Error handling
    if (error !== null && _.get(posts, 'length', 0) === 0) {
      return (
        <div>
          <SystemError error={error} />
          <Footer />
        </div>
      )
    }

    const category = _.get(params, 'category', null)
    const catName = catENtoCH[category]
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
        <Footer/>
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
