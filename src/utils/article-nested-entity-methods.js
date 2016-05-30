'use strict'
const list = [ 'designers', 'engineers', 'photographers', 'tags', 'writters', 'authorImages', 'heroImage', 'og_image' ]

export function getArticleEmbeddedQuery() {
  let query = {}
  list.forEach((ele) => {
    query[ele] = 1
  })
  return query
}

export function getArticleFieldToEntity() {
  let fieldToEntity = []
  list.forEach((ele) => {
    if (ele === 'heroImage') {
      fieldToEntity.push({
        field: ele,
        entity: 'images'
      })
    } else if (ele === 'og_image') {
      fieldToEntity.push({
        field: 'ogImage',
        entity: 'images'
      })
    } else {
      fieldToEntity.push({
        field: ele,
        entity: ele
      })
    }
  })
  return fieldToEntity
}
