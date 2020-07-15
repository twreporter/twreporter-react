import topics from './topics.json'
import cloneUtils from '../../utils/clone-entity'

// lodash
import find from 'lodash/find'

const _ = {
  find,
}

const mocks = {
  topics,
}

export function mockATopicResponse(slug) {
  const topic = _.find(topics, topic => topic.slug === slug)
  if (topic) {
    return {
      status: 'success',
      data: topic,
    }
  }

  return {
    status: 'fail',
    data: {
      slug: `there is no topic with slug '${slug}'`,
    },
  }
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
      records: mocks.topics.slice(offset, offset + limit).map(cloneUtils.cloneMetaOfTopic)
    },
  }
}

export default {
  mockATopicResponse,
  mockTopicsResponse,
}
