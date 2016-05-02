'use strict'
import { Schema, arrayOf } from 'normalizr'

const author = new Schema('authors')
const category = new Schema('categories')
const tag = new Schema('tags', { idAttribute: 'name' })

const article = new Schema('articles', { idAttribute: 'slug' })

article.define({
  authors: arrayOf(author),
  categories: arrayOf(category),
  tags: arrayOf(tag)
})

export { article }
export { tag }
