import topics from './topics.json'
import cloneUtils from '../../utils/shallow-clone-entity'

// lodash
import find from 'lodash/find'

const _ = {
  find,
}

const mocks = {
  topics,
}

/**
 *  This function mocks the response of go-api `/v2/topics/:slug?full=(true|false)` endpoint
 *
 *  @param {string} slug - topic slug
 *  @param {boolean} full - full property of topic object
 *
 *  @return {Object} mocked response
 */
export function mockATopicResponse(slug, full) {
  let topic = _.find(topics, topic => topic.slug === slug)
  topic = full
    ? cloneUtils.shallowCloneFullTopic(topic)
    : cloneUtils.shallowCloneMetaOfTopic(topic)
  topic.full = full

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
export function mockTopicsResponse(limit = 10, offset = 0) {
  return {
    status: 'success',
    data: {
      meta: {
        limit,
        offset,
        total: mocks.topics.length,
      },
      records: mocks.topics.slice(offset, offset + limit).map(_topic => {
        const topic = cloneUtils.shallowCloneMetaOfTopic(_topic)
        topic.full = false
        return topic
      }),
    },
  }
}

export default {
  mockATopicResponse,
  mockTopicsResponse,
}
