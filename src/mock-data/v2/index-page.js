import posts from './posts.json'
import topics from './topics.json'
import { cloneMetaOfPost, cloneMetaOfTopic } from './utils'
import twreporterRedux from '@twreporter/redux'
import categoryConsts from '../../constants/category'

// lodash
import get from 'lodash/get'
import values from 'lodash/values'

const _ = {
  get,
  values,
}

const mocks = {
  posts,
  topics,
}

const { reduxStateFields } = twreporterRedux

/**
 *  This function mocks the response of go-api `/v2/index-page` endpoint.
 *  @return {Object} mocked api response
 */
export default function mockGoApiResponse() {
  const data = {
    [reduxStateFields.sections.latestSection]: posts.slice(0, 6).map(cloneMetaOfPost),
    [reduxStateFields.sections.editorPicksSection]: posts.filter(post => post.is_featured).slice(0, 6).map(cloneMetaOfPost),
    [reduxStateFields.sections.latestTopicSection]: topics.slice(0, 1).map(cloneMetaOfTopic),
    [reduxStateFields.sections.reviewsSection]: posts.filter(post => {
      return _.get(post, 'categories.0.id') === categoryConsts.ids.reviews
    }).slice(0, 4).map(cloneMetaOfPost),
    [reduxStateFields.sections.topicsSection]: topics.slice(1, 5).map(cloneMetaOfTopic),
    [reduxStateFields.sections.photosSection]: posts.filter(post => {
      return _.get(post, 'categories.0.id') === categoryConsts.ids.photography
    }).slice(0, 4).map(cloneMetaOfPost),
    [reduxStateFields.sections.infographicsSection]: posts.filter(post => {
      return _.get(post, 'categories.0.id') === categoryConsts.ids.infographic
    }).slice(0, 6).map(cloneMetaOfPost),
  }

  _.values(reduxStateFields.categories).forEach(cat => {
    data[cat] = posts.filter(post => {
      return _.get(post, 'categories.0.id') === categoryConsts.ids[cat]
    }).slice(0, 1).map(cloneMetaOfPost)
  })

  return {
    status: 'success',
    data,
  }
}
