'use strict'
import { schema } from 'normalizr'

const { Array, Entity } = schema

const article = new Entity('articles')
const topic = new Entity('topics')

topic.define({
  relateds: new Array(article)
})

export { topic }
