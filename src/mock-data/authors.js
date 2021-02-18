import author1 from './author1.json'
import author2 from './author2.json'
import author3 from './author3.json'
import author4 from './author4.json'
import authors from './authors.json'

// lodash
import find from 'lodash/find'

const _ = {
  find,
}

const mocks = {
  authors: authors.data,
  author1: author1.data,
  author2: author2.data,
  author3: author3.data,
  author4: author4.data,
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
    case '591ac386507c6a0d00ab0490':
      return mocks.author1
    case '571de7bbdae62379576d7f42':
      return mocks.author2
    case '5757f8498e4c2b171bcaf7dc':
      return mocks.author3
    case '57b13f774310e41200a0dc01':
      return mocks.author4
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
