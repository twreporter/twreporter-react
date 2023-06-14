import tags from './tags.json'
// lodash
import filter from 'lodash/filter'
const _ = {
  filter,
}

const mocks = {
  tags,
}

/**
 *  This function seeks the tags with `latest_order` > given params
 *
 *  @param {Object[]} mockTags - array of mocked tags
 *  @param {number[]} latestOrder - given latest_orders
 *  @return {Object[]} - matched tagss
 */
function seekPostsByLatestOrder(mockTags, latestOrder) {
  if (!latestOrder) {
    return mockTags
  }
  return _.filter(mockTags, tag => {
    return tag['latest_order'] >= latestOrder
  })
}

/**
 *  This function mocks the response of go-api `/v2/tags:latest_order` endpoint.
 *
 *  @param {number} limit - how many tags in the response
 *  @param {number} offset - how many tags to skip
 *  @param {number} latestOrder - latest_order
 *  @return {Object} mocked api response
 */
export function mockTagsResponse(limit = 10, offset = 0, latestOrder) {
  let tagRes = seekPostsByLatestOrder(mocks.tags, latestOrder)
  return {
    status: 'success',
    data: {
      meta: {
        limit,
        offset,
        total: tagRes.length,
      },
      records: tagRes.slice(offset, offset + limit),
    },
  }
}

export default {
  mockTagsResponse,
}
