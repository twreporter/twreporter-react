/* eslint no-unused-vars: [0, { "args": "all" }]*/

import ArticleList from '../components/photography/article-list'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import TopNews from '../components/photography/top-news'
import categoryConst from '../constants/category'
import colors from '../constants/colors'
import loggerFactory from '../logger'
import siteMeta from '../constants/site-meta'
import twreporterRedux from '@twreporter/redux'
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

const logger = loggerFactory.getLogger()

const { fetchListedPosts, fetchPhotographyPostsOnIndexPage } =  twreporterRedux.actions
const { denormalizePosts, denormalizeTopics } = twreporterRedux.utils
const reduxStateFields = twreporterRedux.reduxStateFields

const listID = _.get(categoryConst, 'ids.photography', '')

class Photography extends Component {
  constructor(props, context) {
    super(props, context)
    this.loadMoreArticles = this._loadMoreArticles.bind(this)
  }

  componentDidMount() {
    this.fetchPhotographyPostsOnIndexPageWithCatch()
    this.fetchPostsWithCatch()
  }

  fetchPhotographyPostsOnIndexPageWithCatch = () => {
    const { fetchPhotographyPostsOnIndexPage } = this.props
    return fetchPhotographyPostsOnIndexPage()
      .catch((failAction) => {
        // TODO render alter message
        logger.errorReport({
          report: _.get(failAction, 'payload.error'),
          message: 'Error to fetch posts with photography style and is_feature: true.'
        })
      })
  }

  fetchPostsWithCatch = () => {
    const maxResult = 10
    const listType = 'categories'
    const { fetchListedPosts } = this.props
    return fetchListedPosts(listID, listType, maxResult)
      .catch((failAction) => {
        // TODO render alter message
        logger.errorReport({
          report: _.get(failAction, 'payload.error'),
          message: `Error to fetch posts (category id: ${listID}).`
        })
      })
  }

  _loadMoreArticles() {
    this.fetchPostsWithCatch()
  }

  render() {
    const { lists, featuredPosts, entities } = this.props
    const postEntities = _.get(entities, reduxStateFields.postsInEntities, {})
    const total = _.get(lists, [ listID, 'total' ], 0)

    const style = {
      backgroundColor: colors.photographyColor,
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
            { property: 'twitter:image', content: siteMeta.ogImage.url },
            { property: 'og:title', content: title },
            { property: 'og:description', content: siteMeta.desc },
            { property: 'og:image', content: siteMeta.ogImage.url },
            { property: 'og:image:width', content: siteMeta.ogImage.width },
            { property: 'og:image:height', content: siteMeta.ogImage.height },
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
