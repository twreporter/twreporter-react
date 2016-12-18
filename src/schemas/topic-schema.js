'use strict'
import { Schema, arrayOf } from 'normalizr'

const article = new Schema('articles')
const topic = new Schema('topics')

topic.define({
  relateds: arrayOf(article)
})

export { topic }
