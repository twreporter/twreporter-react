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
    entity: 'authors'
  }, {
    field: 'engineers',
    entity: 'authors'
  }, {
    field: 'photographers',
    entity: 'authors'
  }, {
    field: 'writters',
    entity: 'authors'
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
