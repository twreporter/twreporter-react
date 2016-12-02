'use strict'
import { Schema, arrayOf } from 'normalizr'

const author = new Schema('authors')
const category = new Schema('categories')
const tag = new Schema('tags')
const topic = new Schema('topics')
// const meta = new Schema('metas')

const article = new Schema('articles')

article.define({
  categories: arrayOf(category),
  designers: arrayOf(author),
  engineers: arrayOf(author),
  photographers: arrayOf(author),
  writters: arrayOf(author),
  // metas: arrayOf(meta),
  tags: arrayOf(tag),
  topics: topic
})

export { article }
export { tag }
export { author }
// export { meta }
export { category }
