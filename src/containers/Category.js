import Helmet from 'react-helmet'
import Pagination from '../components/Pagination'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import SystemError from '../components/SystemError'
import categoryListID from '../conf/category-list-id'
import categoryString from '../constants/category-strings'
import get from 'lodash/get'
import twreporterRedux from '@twreporter/redux'
import withLayout from '../helpers/with-layout'
import { SITE_META, SITE_NAME } from '../constants/index'
import { List } from '@twreporter/react-components/lib/listing-page'
import { camelize } from 'humps'
import { connect } from 'react-redux'

const _  = {
  get
}

const { actions, reduxStateFields, utils } = twreporterRedux
const { fetchListedPosts } = actions

const MAXRESULT = 10
const categories = 'categories'

function getListID(paramCategory) {
  const field = camelize(paramCategory)
  return categoryListID[field]
}

class Category extends Component {
  // params are passed from Route component of react-router
  static fetchData({ params, store, query }) {
    /* fetch page 1 if page is invalid */
    let page = parseInt(_.get(query, 'page', 1), 10)
    if (isNaN(page) || page < 0) {
      page = 1
    }
    return store.dispatch(fetchListedPosts(getListID(params.category), categories, MAXRESULT, page))
  }

  componentWillMount() {
    const { fetchListedPosts, catId } = this.props
    const page = _.get(this.props, 'page', 1)

    fetchListedPosts(catId, categories, MAXRESULT, page)
  }

  componentWillReceiveProps(nextProps) {
    const { fetchListedPosts, catId } = nextProps
    const page = _.get(nextProps, 'page', 1)

    fetchListedPosts(catId, categories, MAXRESULT, page)
  }

  render() {
    const { lists, entities, catId, category, page, pathname } = this.props
    const postEntities = _.get(entities, reduxStateFields.postsInEntities, {})
    const error = _.get(lists, [ catId, 'error' ], null)

    // total items will be in that catId
    const total = _.get(lists, [ catId, 'total' ], 0)

    // pages will be like
    // {
    //   1: [0, 9],
    //   3: [10, 19],
    // }
    //
    // which means the items of page 1 are in items[0] to items[9],
    // the items of page 3 are in items[10] to item [19]
    const pages = _.get(lists, [ catId, 'pages' ], {})
    const startPos = _.get(pages, [ page, 0 ], 0)
    const endPos = _.get(pages, [ page, 1 ], 0)
    // denormalize the items of current page
    const posts = utils.denormalizePosts(_.get(lists, [ catId, 'items' ], []).slice(startPos, endPos + 1), postEntities)

    const totalPages = Math.ceil(total / MAXRESULT)
    const postsLen = _.get(posts, 'length', 0)
    let isFetching = false

    // Error handling
    if (error !== null && postsLen === 0) {
      return (
        <SystemError error={error} />
      )
    } else if (postsLen === 0) {
      isFetching = true
    }

    const catName = categoryString[camelize(category)]
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
            { name: 'twitter:image', content: SITE_META.OG_IMAGE },
            { property: 'og:title', content: title },
            { property: 'og:description', content: SITE_META.DESC },
            { property: 'og:image', content: SITE_META.OG_IMAGE },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: canonical }
          ]}
        />
        <List
          data={posts}
          catName={catName}
          isFetching={isFetching}
        />
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          pathname={pathname}
        />
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  const location = _.get(props, 'location')
  const params = _.get(props, 'params')
  const page = parseInt(_.get(location, 'query.page', 1), 10)
  const category = _.get(params, 'category')
  const catId = getListID(category)
  const pathname = _.get(location, 'pathname', `/categories/${category}`)
  return {
    lists: state[reduxStateFields.lists],
    entities: state[reduxStateFields.entities],
    catId,
    category,
    page,
    pathname
  }
}

Category.defaultProps = {
  entities: {},
  lists: {},
  catId: ''
}

Category.propTypes = {
  entities: PropTypes.object,
  lists: PropTypes.object,
  catId: PropTypes.string,
  category: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  pathname: PropTypes.string.isRequired
}

export { Category }
export default connect(mapStateToProps, { fetchListedPosts: actions.fetchListedPosts })(withLayout(Category))
