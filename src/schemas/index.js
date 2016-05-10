'use strict'
import { Schema, arrayOf } from 'normalizr'

const category = new Schema('categories')
const designer = new Schema('designers')
const engineer = new Schema('engineers')
const photographer = new Schema('photographers')
const writter = new Schema('writters')
const tag = new Schema('tags')

const article = new Schema('articles', { idAttribute: 'slug' })

article.define({
  categories: arrayOf(category),
  designers: arrayOf(designer),
  engineers: arrayOf(engineer),
  photographers: arrayOf(photographer),
  writters: arrayOf(writter),
  tags: arrayOf(tag)
})

export { article }
export { tag }
