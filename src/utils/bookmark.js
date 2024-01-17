import get from 'lodash/get'
const _ = {
  get,
}

/**
 * map bookmark from post
 * @param {object} post
 * @param {string} bookmark.slug
 * @param {boolean} bookmark.is_external
 * @param {string} bookmark.title
 * @param {string} bookmark.desc
 * @param {string} bookmark.thumbnail
 * @param {string} bookmark.published_date
 */
export const getBookmarkFromPost = post => {
  return {
    slug: _.get(post, 'slug'),
    title: _.get(post, 'title'),
    desc: _.get(post, 'og_description'),
    is_external: _.get(post, 'is_external'),
    published_date: _.get(post, 'published_date'),
    thumbnail: _.get(post, 'hero_image.resized_targets.mobile.url'),
    category: _.get(post, 'category_set[0].category.name'),
  }
}
