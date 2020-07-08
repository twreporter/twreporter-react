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
 *  ClonedPost type definition
 *  @typedef {Object} ClonedPost
 *  @property {import('@twreporter/redux/lib/typedef').Category[]} categories
 *  @property {bool} full
 *  @property {import('@twreporter/redux/lib/typedef').Image} hero_image
 *  @property {string} id
 *  @property {bool} is_external
 *  @property {import('@twreporter/redux/lib/typedef').Image} leading_image_portrait
 *  @property {string} og_description
 *  @property {import('@twreporter/redux/lib/typedef').Image} og_image
 *  @property {string} slug
 *  @property {string} style
 *  @property {string} subtitle
 *  @property {string} title
 */

/**
 *  @function clonePostWithNeededFields
 *  @param {import('@twreporter/redux/lib/typedef').Post} post
 *  @return {ClonedPost}
 */
function clonePostWithNeededFields(post) {
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
 *  ClonedTopic type definition
 *  @typedef {Object} ClonedTopic
 *  @property {bool} full
 *  @property {string} id
 *  @property {import('@twreporter/redux/lib/typedef').Image} leading_image
 *  @property {string} og_description
 *  @property {import('@twreporter/redux/lib/typedef').Image} og_image
 *  @property {string} short_title
 *  @property {string} slug
 *  @property {string} title
 *  @property {import('@twreporter/redux/lib/typedef').ObjectID[]} relateds
 */

/**
 *  @function cloneTopicWithNeededFields
 *  @param {import('@twreporter/redux/lib/typedef').Topic} topic
 *  @return {ClonedTopic}
 */
function cloneTopicWithNeededFields(topic) {
  const fields = [
    'full',
    'id',
    'leading_image',
    'og_description',
    'og_image',
    'published_date',
    'relateds',
    'short_title',
    'slug',
    'title',
  ]

  return cloneWithFields(fields, topic)
}

export default {
  cloneMetaOfPost: clonePostWithNeededFields,
  cloneMetaOfTopic: cloneTopicWithNeededFields,
}
