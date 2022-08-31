import posts from './posts.json'
import topics from './topics.json'
import twreporterRedux from '@twreporter/redux'
import categoryConsts from '../constants/category'

// feature-toggle
import cloneUtilsNew from '../utils/shallow-clone-entity'
import cloneUtilsOld from '../utils/shallow-clone-entity-old'
import { ENABLE_NEW_INFO_ARCH } from '@twreporter/core/lib/constants/feature-flag'

// lodash
import get from 'lodash/get'
import values from 'lodash/values'
const cloneUtils = ENABLE_NEW_INFO_ARCH ? cloneUtilsNew : cloneUtilsOld

const _ = {
  get,
  values,
}

const { reduxStateFields } = twreporterRedux

function cloneDecorator(cloneFunc) {
  return full => {
    return entity => {
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
    [reduxStateFields.sections.latestSection]: posts
      .slice(0, 6)
      .map(cloneDecorator(cloneUtils.shallowCloneMetaOfPost)(full)),
    [reduxStateFields.sections.editorPicksSection]: posts
      .filter(post => post.is_featured)
      .slice(0, 6)
      .map(cloneDecorator(cloneUtils.shallowCloneMetaOfPost)(full)),
    [reduxStateFields.sections.latestTopicSection]: topics
      .slice(0, 1)
      .map(cloneDecorator(cloneUtils.shallowCloneMetaOfTopic)(full)),
    [reduxStateFields.sections.reviewsSection]: posts
      .filter(post => {
        return _.get(post, 'categories.0.id') === categoryConsts.ids.reviews
      })
      .slice(0, 4)
      .map(cloneDecorator(cloneUtils.shallowCloneMetaOfPost)(full)),
    [reduxStateFields.sections.topicsSection]: topics
      .slice(1, 5)
      .map(cloneDecorator(cloneUtils.shallowCloneMetaOfTopic)(full)),
    [reduxStateFields.sections.photosSection]: posts
      .filter(post => {
        return _.get(post, 'categories.0.id') === categoryConsts.ids.photography
      })
      .slice(0, 4)
      .map(cloneDecorator(cloneUtils.shallowCloneMetaOfPost)(full)),
    [reduxStateFields.sections.infographicsSection]: posts
      .filter(post => {
        return _.get(post, 'categories.0.id') === categoryConsts.ids.infographic
      })
      .slice(0, 6)
      .map(cloneDecorator(cloneUtils.shallowCloneMetaOfPost)(full)),
  }

  _.values(reduxStateFields.categories).forEach(cat => {
    data[cat] = posts
      .filter(post => {
        return _.get(post, 'categories.0.id') === categoryConsts.ids[cat]
      })
      .slice(0, 1)
      .map(cloneDecorator(cloneUtils.shallowCloneMetaOfPost)(full))
  })

  return {
    status: 'success',
    data,
  }
}
