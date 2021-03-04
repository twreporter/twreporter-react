import author from './author.json'
import authorPost from './author-post.json'

// lodash
import assign from 'lodash/assign'
import find from 'lodash/find'
import map from 'lodash/map'

const _ = {
  assign,
  map,
  find,
}

const posts = Array(50).fill(authorPost)

const mocks = {
  authors: Array(100).fill(author),
  authorPosts: _.map(posts, (post, index) => {
    return _.assign({}, post, {
      id: index,
      slug: `mock-slug-${index}`,
    })
  }),
}

/**
 *  This function mocks the response of go-api `/v2/authors` endpoint.
 *
 *  @param {number} limit - how many authors in the response
 *  @param {number} offset - how many authors to skip
 *  @param {Object} mocked api response
 */
export function mockAuthorsResponse({ limit = 10, offset = 0 }) {
  return {
    status: 'success',
    data: {
      meta: {
        limit,
        offset,
        total: mocks.authors.length,
      },
      records: mocks.authors.slice(offset, offset + limit),
    },
  }
}

/**
 *  This function mocks the response of go-api `/v2/authors/:authorId` endpoint
 *
 *  @param {string} authorId - author id
 *
 *  @return {Object} mocked response
 */
export function mockAuthorDetailResponse(authorId) {
  const author = _.find(mocks.authors, author => author.id === authorId)

  if (author) {
    return {
      status: 'success',
      data: author,
    }
  }

  return {
    status: 'fail',
    data: {
      author_id: `Cannot find the author from the ${authorId}`,
    },
  }
}

/**
 * Get author's id and return the full mock data collections of the author
 * @param {String} authorId
 * @returns {Object}
 */
const _selectAuthor = authorId => {
  switch (authorId) {
    case 'xxxxoooo':
      return mocks.authorPosts
  }
}

/**
 *  This function mocks the response of go-api `/v2/authors/:authorId/posts` endpoint
 *
 *  @param {string} authorId - author id
 *
 *  @return {Object} mocked response
 */
export function mockAuthorCollectionsResponse({
  limit = 10,
  offset = 0,
  authorId,
}) {
  const collections = _selectAuthor(authorId)
  if (collections) {
    return {
      status: 'success',
      data: {
        meta: {
          limit,
          offset,
          total: collections.length,
        },
        records: collections.slice(offset, offset + limit),
      },
    }
  }
  return {
    status: 'fail',
    data: {
      author_id: `Cannot find the author from the ${authorId}`,
    },
  }
}

export default {
  mockAuthorsResponse,
  mockAuthorDetailResponse,
  mockAuthorCollectionsResponse,
}
