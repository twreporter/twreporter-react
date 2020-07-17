import posts from './posts.json'
import topics from './topics.json'
import cloneUtils from '../../utils/clone-entity'
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

function cloneDecorator(cloneFunc) {
  return (full) => {
    return (entity) => {
      const e = cloneFunc(entity)
      e.full = full
      return e
    }
  }
}

/**
 *  This function mocks the response of go-api `/v2/index-page` endpoint.
 *  @return {Object} mocked api response
 */
export default function mockGoApiResponse() {
  const full = false

  const data = {
    [reduxStateFields.sections.latestSection]: posts.slice(0, 6).map(cloneDecorator(cloneUtils.cloneMetaOfPost)(full)),
    [reduxStateFields.sections.editorPicksSection]: posts.filter(post => post.is_featured).slice(0, 6).map(cloneDecorator(cloneUtils.cloneMetaOfPost)(full)),
    [reduxStateFields.sections.latestTopicSection]: topics.slice(0, 1).map(cloneDecorator(cloneUtils.cloneMetaOfTopic)(full)),
    [reduxStateFields.sections.reviewsSection]: posts.filter(post => {
      return _.get(post, 'categories.0.id') === categoryConsts.ids.reviews
    }).slice(0, 4).map(cloneDecorator(cloneUtils.cloneMetaOfPost)(full)),
    [reduxStateFields.sections.topicsSection]: topics.slice(1, 5).map(cloneDecorator(cloneUtils.cloneMetaOfTopic)(full)),
    [reduxStateFields.sections.photosSection]: posts.filter(post => {
      return _.get(post, 'categories.0.id') === categoryConsts.ids.photography
    }).slice(0, 4).map(cloneDecorator(cloneUtils.cloneMetaOfPost)(full)),
    [reduxStateFields.sections.infographicsSection]: posts.filter(post => {
      return _.get(post, 'categories.0.id') === categoryConsts.ids.infographic
    }).slice(0, 6).map(cloneDecorator(cloneUtils.cloneMetaOfPost)(full)),
  }

  _.values(reduxStateFields.categories).forEach(cat => {
    data[cat] = posts.filter(post => {
      return _.get(post, 'categories.0.id') === categoryConsts.ids[cat]
    }).slice(0, 1).map(cloneDecorator(cloneUtils.cloneMetaOfPost)(full))
  })

  return {
    status: 'success',
    data,
  }
}
