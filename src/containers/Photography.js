/* eslint no-console: 0, no-unused-vars: [0, { "args": "all" }]*/

import ArticleList from '../components/ArticleList'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import TopNews from '../components/TopNews'
import categoryListID from '../conf/category-list-id'
import twreporterRedux from '@twreporter/redux'
import withLayout, { photoTheme as theme } from '../helpers/with-layout'
import { CATEGORY, DARK, PHOTOGRAPH_CH_STR, PHOTOGRAPHY_PAGE, SITE_META, SITE_NAME, categoryPath, colors } from '../constants/index'
import { camelizeKeys } from 'humps'
import { connect } from 'react-redux'
import { denormalizeArticles } from '../utils/denormalize-articles'

// lodash
import filter from 'lodash/filter'
import get from 'lodash/get'

const _ = {
  filter,
  get
}

const { fetchListedPosts, fetchPhotographyPostsOnIndexPage } =  twreporterRedux.actions
const { denormalizePosts, denormalizeTopics } = twreporterRedux.utils
const reduxStateFields = twreporterRedux.reduxStateFields

const MAXRESULT = 10
const categories = 'categories'
const listID = _.get(categoryListID, 'photography', '')

class Photography extends Component {
  static async fetchData({ store }) {
    try {
      await Promise.all([
        store.dispatch(fetchPhotographyPostsOnIndexPage()),
        store.dispatch(fetchListedPosts(listID, categories, MAXRESULT))
      ])
    } catch (err) {
      console.warn('Fetch posts of photography page occurs server side error:', err)
    }
  }

  constructor(props, context) {
    super(props, context)
    this.loadMoreArticles = this._loadMoreArticles.bind(this)
  }

  componentWillMount() {
    const { fetchListedPosts, fetchPhotographyPostsOnIndexPage } = this.props
    fetchPhotographyPostsOnIndexPage()
    fetchListedPosts(listID, categories, MAXRESULT)
  }

  _loadMoreArticles() {
    const { fetchListedPosts } = this.props
    fetchListedPosts(listID, categories, MAXRESULT)
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
    const slugs = _.filter(_.get(lists, [ listID, 'items' ], []), (slug) => {
      if (featuredPosts.indexOf(slug) > -1) {
        return false
      }
      return true
    })
    const posts = camelizeKeys(denormalizePosts(slugs, postEntities))

    const canonical = SITE_META.URL_NO_SLASH + categoryPath.photographyPath
    const title = PHOTOGRAPH_CH_STR + SITE_NAME.SEPARATOR + SITE_NAME.FULL
    return (
      <div style={style}>
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
        <TopNews topnews={topNewsItems} />
        <ArticleList
          articles={posts}
          bgStyle={DARK}
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
    featuredPosts: _.get(state, [ reduxStateFields.indexPage, reduxStateFields.sections.photosSection ]),

    // theme is used by `withLayout` function
    theme
  }
}

export { Photography }
export default connect(mapStateToProps, { fetchListedPosts, fetchPhotographyPostsOnIndexPage })(withLayout(Photography))
