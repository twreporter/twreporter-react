'use strict'
function denormalizeEntity(entityIds = [], entityObj = {}) {
  let rtn = []
  ( Array.isArray(entityIds) ? entityIds : [] ).forEach((id) => {
    if (entityObj.hasOwnProperty(id)) {
      rtn.push(entityObj[id])
    }
  })

  return rtn
}

export function denormalizeArticles(articleIds = [], entities = {}) {
  let denormalizedArticles = []
  // extract entities articles need
  const { articles, tags, authors } = entities

  articleIds = Array.isArray(articleIds) ? articleIds : [ articleIds ]
  articleIds.forEach((articleId) => {
    if (articles.hasOwnProperty(articleId)) {
      let article = articles[articleId]
      article.tags = denormalizeEntity(article.tags, tags)
      article.authors = denormalizeEntity(article.authors, authors)
      denormalizedArticles.push(article)
    }
  })
  return denormalizedArticles
}
