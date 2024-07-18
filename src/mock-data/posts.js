import posts from './posts.json'

// feature-toggle
import {
  shallowCloneMetaOfPost,
  shallowCloneFullPost,
} from '../utils/shallow-clone-entity'

// lodash
import find from 'lodash/find'
import forEach from 'lodash/forEach'
import filter from 'lodash/filter'
import some from 'lodash/some'
import map from 'lodash/map'

const _ = {
  find,
  forEach,
  filter,
  some,
  map,
}

const mocks = {
  posts,
}

/**
 *  This function seeks the posts with certain ids
 *
 *  @param {Object[]} mockPosts - array of mocked posts
 *  @param {string[]} ids - array of ids
 *  @return {Object[]} - matched posts
 */
function seekPostsByIds(mockPosts, ids) {
  const rtn = []

  _.forEach(ids, id => {
    _.forEach(mockPosts, post => {
      if (post.id === id) {
        rtn.push(post)
      }
    })
  })

  return rtn
}

/**
 *  This function seeks the posts with certain tags or categories.
 *
 *  @param {Object[]} mockPosts - array of mocked posts
 *  @param {string[]} ids - array of ids
 *  @param {string} listType - categories or tags
 *  @return {Object[]} - matched posts
 */
export function seekPostsByListIds(mockPosts, ids, listType) {
  const rtn = []

  _.forEach(ids, id => {
    _.forEach(mockPosts, post => {
      _.forEach(post[listType], list => {
        if (list.id === id) {
          rtn.push(post)
        }
      })
    })
  })

  return rtn
}

/**
 *  This function seeks the posts with certain category set.
 *
 *  @param {Object[]} mockPosts - array of mocked posts
 *  @param {string[]} categorySet - category set object
 *  @return {Object[]} - matched posts
 */
export function seekPostsByCategorySet(mockPosts, categorySet) {
  return _.filter(mockPosts, post => {
    const postCategorySet = _.map(post['category_set'], set => {
      return {
        category: set.category && set.category.id,
        subcategory: set.subcategory && set.subcategory.id,
      }
    })
    return _.some(postCategorySet, categorySet)
  })
}

/**
 *  This function mocks the response of go-api `/v2/posts/:slug?full=(true|false)` endpoint
 *
 *  @param {string} slug - post slug
 *  @param {boolean} full - full property of post object
 *
 *  @return {Object} mocked response
 */
export function mockAPostResponse(slug, full) {
  let post = _.find(posts, post => post.slug === slug)
  post = full ? shallowCloneFullPost(post) : shallowCloneMetaOfPost(post)
  post.full = full

  if (post) {
    return {
      status: 'success',
      data: post,
    }
  }

  return {
    status: 'fail',
    data: {
      slug: `there is no post with slug '${slug}'`,
    },
  }
}

/**
 *  This function mocks the response of go-api `/v2/posts` endpoint.
 *
 *  @param {number} limit - how many posts in the response
 *  @param {number} offset - how many posts to skip
 *  @param {string|string[]} id - post id
 *  @param {string|string[]} categoryId - category id
 *  @param {string|string[]} tagId - tag id
 *  @return {Object} mocked api response
 */
export function mockPostsResponse(
  limit = 10,
  offset = 0,
  id,
  categoryId,
  tagId,
  subcategoryId,
  sort = '-published_date'
) {
  let posts = []

  if (!id && !categoryId && !tagId && !subcategoryId) {
    posts = mocks.posts
  }

  if (id) {
    let ids = id
    if (typeof id === 'string') {
      ids = [id]
    }
    posts = posts.concat(seekPostsByIds(mocks.posts, ids))
  }

  if (categoryId) {
    const categorySet = { category: categoryId }
    if (subcategoryId) {
      categorySet.subcategory = subcategoryId
    }
    posts = posts.concat(seekPostsByCategorySet(mocks.posts, categorySet))
  }

  if (tagId) {
    let ids = tagId
    if (typeof tagId === 'string') {
      ids = [tagId]
    }

    posts = posts.concat(seekPostsByListIds(mocks.posts, ids, 'tags'))
  }

  return {
    status: 'success',
    data: {
      meta: {
        limit,
        offset,
        total: posts.length,
      },
      records: posts.slice(offset, offset + limit).map(_post => {
        const post = shallowCloneMetaOfPost(_post)
        post.full = false
        return post
      }),
    },
  }
}

export default {
  mockAPostResponse,
  mockPostsResponse,
}
