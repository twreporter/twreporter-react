/* eslint no-console: 0, no-unused-vars: [0, { "args": "all" }]*/

import ArticleList from '../components/photography/article-list'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import TopNews from '../components/photography/top-news'
import categoryConst from '../constants/category'
import siteMeta from '../constants/site-meta'
import twreporterRedux from '@twreporter/redux'
import { colors } from '../constants/index'
import { camelizeKeys } from 'humps'
import { connect } from 'react-redux'
import { denormalizeArticles } from '../utils/denormalize-articles'

// lodash
import filter from 'lodash/filter'
import get from 'lodash/get'
import uniq from 'lodash/uniq'

const _ = {
  filter,
  get,
  uniq
}

const { fetchListedPosts, fetchPhotographyPostsOnIndexPage } =  twreporterRedux.actions
const { denormalizePosts, denormalizeTopics } = twreporterRedux.utils
const reduxStateFields = twreporterRedux.reduxStateFields

const maxResult = 10
const categories = 'categories'
const listID = _.get(categoryConst, 'ids.photography', '')

class Photography extends Component {
  constructor(props, context) {
    super(props, context)
    this.loadMoreArticles = this._loadMoreArticles.bind(this)
  }

  componentDidMount() {
    const { fetchListedPosts, fetchPhotographyPostsOnIndexPage } = this.props
    fetchPhotographyPostsOnIndexPage()
    fetchListedPosts(listID, categories, maxResult)
  }

  _loadMoreArticles() {
    const { fetchListedPosts } = this.props
    fetchListedPosts(listID, categories, maxResult)
  }

  render() {
    const { lists, featuredPosts, entities } = this.props
    const postEntities = _.get(entities, reduxStateFields.postsInEntities, {})
    const total = _.get(lists, [ listID, 'total' ], 0)

    const style = {
      backgroundColor: colors.darkBg,
      color: '#FFFFEB'
    }

    const topNewsItems = camelizeKeys(denormalizePosts(featuredPosts, postEntities))
    const slugs = _.filter(_.uniq(_.get(lists, [ listID, 'items' ], [])), (slug) => {
      if (featuredPosts.indexOf(slug) > -1) {
        return false
      }
      return true
    })
    const posts = camelizeKeys(denormalizePosts(slugs, postEntities))

    const canonical = siteMeta.urlOrigin + '/photography'
    const title = '影像' + siteMeta.name.separator + siteMeta.name.full
    return (
      <div style={style}>
        <Helmet
          title={title}
          link={[
            { rel: 'canonical', href: canonical }
          ]}
          meta={[
            { name: 'description', content: siteMeta.desc },
            { name: 'twitter:title', content: title },
            { name: 'twitter:description', content: siteMeta.desc },
            { property: 'twitter:image', content: siteMeta.ogImage },
            { property: 'og:title', content: title },
            { property: 'og:description', content: siteMeta.desc },
            { property: 'og:image', content: siteMeta.ogImage },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: canonical }
          ]}
        />
        <TopNews posts={topNewsItems} />
        <ArticleList
          articles={posts}
          hasMore={total > _.get(lists, [ listID, 'items', 'length' ], 0)}
          loadMore={this.loadMoreArticles}
        />
        {this.props.children}
      </div>
    )
  }
}

Photography.defaultProps = {
  entities: {},
  featuredPosts: [],
  lists: {}
}

Photography.propTypes = {
  entities: PropTypes.object,
  featuredPosts: PropTypes.array,
  lists: PropTypes.object
}

function mapStateToProps(state) {
  return {
    lists: state[reduxStateFields.lists],
    entities: state[reduxStateFields.entities],
    featuredPosts: _.get(state, [ reduxStateFields.indexPage, reduxStateFields.sections.photosSection ])
  }
}

export { Photography }
export default connect(mapStateToProps, { fetchListedPosts, fetchPhotographyPostsOnIndexPage })(Photography)
