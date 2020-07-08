import posts from './posts.json'
import cloneUtils from '../../utils/clone-entity'

// lodash
import forEach from 'lodash/forEach'

const _ = {
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
 *  @param {string} listType - category_id or tag_id
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

export function mockAPostResponse(slug) {
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
      records: posts.slice(offset, offset + limit).map(cloneUtils.cloneMetaOfPost)
    },
  }
}

export default {
  mockAPostResponse,
  mockPostsResponse,
}
