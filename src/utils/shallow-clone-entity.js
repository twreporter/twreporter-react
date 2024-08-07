import get from 'lodash/get'

const _ = {
  get,
}

/**
 *  @param {string[]} fields
 *  @param {Object} entity
 *  @return {Object} cloned object with certain fields
 */
function cloneWithFields(fields, entity) {
  const cloned = {}

  fields.forEach(field => {
    cloned[field] = _.get(entity, field)
  })

  return cloned
}

/**
 *  MetaOfPost type definition
 *  @typedef {import('@twreporter/redux/lib/typedef').MetaOfPost} MetaOfPost
 */

/**
 *  FullPost type definition
 *  @typedef {import('@twreporter/redux/lib/typedef').FullPost} FullPost
 */

/**
 *  @function shallowCloneMetaOfPost
 *  @param {Object} post
 *  @return {MetaOfPost}
 */
export function shallowCloneMetaOfPost(post) {
  const fields = [
    'category_set',
    'full',
    'hero_image',
    'id',
    'is_external',
    'leading_image_portrait',
    'og_description',
    'og_image',
    'published_date',
    'slug',
    'style',
    'subtitle',
    'tags',
    'title',
    'bookmarkId',
  ]

  return cloneWithFields(fields, post)
}

/**
 *  @function shallowCloneFullPost
 *  @param {Object} post
 *  @return {FullPost}
 */
export function shallowCloneFullPost(post) {
  const fields = [
    'designers',
    'engineers',
    'photographers',
    'writers',
    'topic',
    'brief',
    'content',
    'relateds',
    'copyright',
    'extend_byline',
    'hero_image_size',
    'leading_image_description',
    'og_title',
    'updated_at',
    'followups',
    'leading_embedded',
  ]

  const metaPost = shallowCloneMetaOfPost(post)
  return Object.assign(metaPost, cloneWithFields(fields, post))
}

/**
 *  MetaOfTopic type definition
 *  @typedef {import('@twreporter/redux/lib/typedef').MetaOfTopic} MetaOfTopic
 */

/**
 *  FullTopic type definition
 *  @typedef {import('@twreporter/redux/lib/typedef').FullTopic} FullTopic
 */

/**
 *  @function shallowCloneMetaOfTopic
 *  @param {Object} topic
 *  @return {MetaOfTopic}
 */
export function shallowCloneMetaOfTopic(topic) {
  const fields = [
    'full',
    'id',
    'leading_image',
    'leading_image_portrait',
    'og_description',
    'og_image',
    'published_date',
    'short_title',
    'slug',
    'title',
    'relateds',
  ]

  return cloneWithFields(fields, topic)
}

/**
 *  @function shallowCloneFullTopic
 *  @param {Object} topic
 *  @return {FullTopic}
 */
export function shallowCloneFullTopic(topic) {
  const fields = [
    'relateds_format',
    'relateds_background',
    'title_position',
    'leading_video',
    'headline',
    'subtitle',
    'description',
    'team_description',
    'og_title',
  ]

  const metaTopic = shallowCloneMetaOfTopic(topic)
  return Object.assign(metaTopic, cloneWithFields(fields, topic))
}

export default {
  shallowCloneFullPost,
  shallowCloneMetaOfPost,
  shallowCloneMetaOfTopic,
  shallowCloneFullTopic,
}
