'use strict'
import { Schema, arrayOf } from 'normalizr'

const author = new Schema('authors')
const category = new Schema('categories')
const tag = new Schema('tags')

const article = new Schema('articles')

article.define({
  categories: arrayOf(category),
  designers: arrayOf(author),
  engineers: arrayOf(author),
  photographers: arrayOf(author),
  writters: arrayOf(author),
  tags: arrayOf(tag)
})

export { article }
export { tag }
export { category }
