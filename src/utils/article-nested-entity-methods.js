'use strict'

export function getArticleEmbeddedQuery() {
  const list = [ 'authorImages', 'og_image', 'tags', 'categories' ]
  let query = {}
  list.forEach((ele) => {
    query[ele] = 1
  })
  return query
}

export function getArticleFieldToEntity() {
  return  [ {
    field: 'designers',
    entity: 'designers'
  }, {
    field: 'engineers',
    entity: 'engineers'
  }, {
    field: 'photographers',
    entity: 'photographers'
  }, {
    field: 'writters',
    entity: 'writters'
  }, {
    field: 'relateds',
    entity: 'articles'
  }, {
    field: 'tags',
    entity: 'tags'
  }, {
    field: 'categories',
    entity: 'categories'
  } ]
}
