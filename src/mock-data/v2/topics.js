import topics from './topics.json'
import { cloneMetaOfTopic } from './utils'

const mocks = {
  topics,
}

export function mockATopicResponse(slug) {
}

/**
 *  This function mocks the response of go-api `/v2/topics` endpoint.
 *
 *  @param {number} limit - how many topics in the response
 *  @param {number} offset - how many topics to skip
 *  @param {Object} mocked api response
 */
export function mockTopicsResponse(limit=10, offset=0) {
  return {
    status: 'success',
    data: {
      meta: {
        limit,
        offset,
        total: mocks.topics.length,
      },
      records: mocks.topics.slice(offset, offset + limit).map(cloneMetaOfTopic)
    },
  }
}

export default {
  mockATopicResponse,
  mockTopicsResponse,
}
