// mock data
import posts from './posts.json'
import topics from './topics.json'
// methods
import { seekPostsByListIds, seekPostsByCategorySet } from './posts'
// utils
import {
  shallowCloneMetaOfPost,
  shallowCloneMetaOfTopic,
} from '../utils/shallow-clone-entity'
// @twreporter
import twreporterRedux from '@twreporter/redux'
import {
  CATEGORY_PATH,
  CATEGORY_ID,
} from '@twreporter/core/lib/constants/category-set'
import { INFOGRAM_ID } from '@twreporter/core/lib/constants/infogram'
// lodash
import get from 'lodash/get'
import values from 'lodash/values'
import filter from 'lodash/filter'
import some from 'lodash/some'
const _ = {
  get,
  values,
  filter,
  some,
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

function getCategoryPost(categoryKey) {
  return seekPostsByCategorySet(posts, { category: CATEGORY_ID[categoryKey] })
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
      .map(cloneDecorator(shallowCloneMetaOfPost)(full)),
    [reduxStateFields.sections.editorPicksSection]: posts
      .filter(post => post.is_featured)
      .slice(0, 6)
      .map(cloneDecorator(shallowCloneMetaOfPost)(full)),
    [reduxStateFields.sections.latestTopicSection]: topics
      .slice(0, 1)
      .map(cloneDecorator(shallowCloneMetaOfTopic)(full)),
    [reduxStateFields.sections.reviewsSection]: getCategoryPost(
      CATEGORY_PATH.opinion
    )
      .slice(0, 4)
      .map(cloneDecorator(shallowCloneMetaOfPost)(full)),
    [reduxStateFields.sections.topicsSection]: topics
      .slice(1, 5)
      .map(cloneDecorator(shallowCloneMetaOfTopic)(full)),
    [reduxStateFields.sections.photosSection]: getCategoryPost(
      CATEGORY_PATH.photography
    )
      .slice(0, 4)
      .map(cloneDecorator(shallowCloneMetaOfPost)(full)),
    [reduxStateFields.sections.infographicsSection]: seekPostsByListIds(
      posts,
      [INFOGRAM_ID],
      'tags'
    )
      .slice(0, 6)
      .map(cloneDecorator(shallowCloneMetaOfPost)(full)),
  }

  _.values(reduxStateFields.categories).forEach(cat => {
    data[cat] = getCategoryPost(cat)
      .slice(0, 1)
      .map(cloneDecorator(shallowCloneMetaOfPost)(full))
  })

  return {
    status: 'success',
    data,
  }
}
