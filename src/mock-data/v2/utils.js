import get from 'lodash/get'

const _ = {
  get,
}

function cloneWithFields(fields, entities) {
  const cloned = {}

  fields.forEach(field => {
    cloned[field] = _.get(entities, field)
  })

  return cloned
}

export function cloneMetaOfPost(post) {
  const fields = [
    'categories',
    'full',
    'hero_image',
    'id',
    'is_external',
    'leading_image_portrait',
    'og_description',
    'og_image',
    'slug',
    'style',
    'published_date',
    'title',
  ]

  return cloneWithFields(fields, post)
}

export function cloneMetaOfTopic(topic) {
  const fields = [
    'full',
    'id',
    'leading_image',
    'leading_image_portrait',
    'og_description',
    'og_image',
    'published_date',
    'relateds',
    'topic_name',
    'slug',
    'title',
  ]

  return cloneWithFields(fields, topic)
}
