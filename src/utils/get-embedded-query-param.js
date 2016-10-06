'use strict'

export function getArticleEmbeddedQuery() {
  const list = [ 'authorImages', 'og_image', 'tags', 'categories' ]
  let query = {}
  list.forEach((ele) => {
    query[ele] = 1
  })
  return query
}
