import get from 'lodash/get'

const _ = {
  get,
}

/**
 *  @param {string[]} fields
 *  @param {Object} entities
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
 *  @typedef {import('@rwreporter/redux/lib/typedef').FullPost} FullPost
 */

/**
 *  @function cloneMetaOfPost
 *  @param {Object} post
 *  @return {MetaOfPost}
 */
function cloneMetaOfPost(post) {
  const fields = [
    'categories',
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
  ]

  return cloneWithFields(fields, post)
}

/**
 *  @function cloneFullPost
 *  @param {Object} post
 *  @return {FullPost}
 */
function cloneFullPost(post) {
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
  ]

  const metaPost = cloneMetaOfPost(post)
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
 *  @function cloneMetaOfTopic
 *  @param {Object} topic
 *  @return {MetaOfTopic}
 */
function cloneMetaOfTopic(topic) {
  const fields = [
    'full',
    'id',
    'leading_image',
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
 *  @function cloneFullTopic
 *  @param {Object} topic
 *  @return {FullTopic}
 */
function cloneFullTopic(topic) {
  const fields = [
    'relateds_format',
    'title_position',
    'leading_video',
    'headline',
    'subtitle',
    'description',
    'team_description',
    'og_title',
  ]

  const metaTopic = cloneMetaOfTopic(topic)
  return Object.assign(metaTopic, cloneWithFields(fields, topic))
}


export default {
  cloneFullPost,
  cloneMetaOfPost,
  cloneMetaOfTopic,
  cloneFullTopic,
}
