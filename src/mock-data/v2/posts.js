import posts from './posts.json'
import cloneUtils from '../../utils/shallow-clone-entity'

// lodash
import find from 'lodash/find'
import forEach from 'lodash/forEach'

const _ = {
  find,
  forEach,
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
function seekPostsByListIds(mockPosts, ids, listType) {
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
 *  This function mocks the response of go-api `/v2/posts/:slug?full=(true|false)` endpoint
 *
 *  @param {string} slug - post slug
 *  @param {boolean} full - full property of post object
 *
 *  @return {Object} mocked response
 */
export function mockAPostResponse(slug, full) {
  let post = _.find(posts, post => post.slug === slug)
  post = full ? cloneUtils.shallowCloneFullPost(post) : cloneUtils.shallowCloneMetaOfPost(post)
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
 *  @param {string} id - post id
 *  @param {string} category_id - category id
 *  @param {string} tag_id - tag id
 *  @param {Object} mocked api response
 */
export function mockPostsResponse(limit=10, offset=0, id, category_id, tag_id) {
  let posts = []

  if (id) {
    let ids = id
    if (typeof id === 'string') {
      ids = [id]
    }
    posts = posts.concat(seekPostsByIds(mocks.posts, ids))
  }

  if (category_id) {
    let ids = category_id
    if (typeof category_id === 'string') {
      ids = [category_id]
    }

    posts = posts.concat(seekPostsByListIds(mocks.posts, ids, 'categories'))
  }

  if (tag_id) {
    let ids = tag_id
    if (typeof tag_id === 'string') {
      ids = [tag_id]
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
      records: posts.slice(offset, offset + limit).map((_post) => {
        const post = cloneUtils.shallowCloneMetaOfPost(_post)
        post.full = false
        return post
      })
    },
  }
}

export default {
  mockAPostResponse,
  mockPostsResponse,
}
