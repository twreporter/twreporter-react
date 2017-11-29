'use strict'
import { schema } from 'normalizr'

const { Array, Entity } = schema

const author = new Entity('authors')
const category = new Entity('categories')
const tag = new Entity('tags')
const topic = new Entity('topics')
const article = new Entity('articles')

article.define({
  categories: new Array(category),
  designers: new Array(author),
  engineers: new Array(author),
  photographers: new Array(author),
  writters: new Array(author),
  tags: new Array(tag),
  topics: topic
})

export { article, author }
