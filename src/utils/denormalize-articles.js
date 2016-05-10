'use strict'
import { getArticleEmbeddedQuery } from './get-article-embedded-query'
function denormalizeEntity(entityIds = [], entityObj = {}) {
  let rtn = []
  entityObj = entityObj || {}
  if (Array.isArray(entityIds)) {
    entityIds.forEach((id) => {
      if (entityObj.hasOwnProperty(id)) {
        rtn.push(entityObj[id])
      }
    })
  }
  return rtn
}

export function denormalizeArticles(articleSlugs = [], entities = {}) {
  let denormalizedArticles = []
  // extract entities articles need
  const { articles } = entities
  const list = Object.keys(getArticleEmbeddedQuery())

  articleSlugs = Array.isArray(articleSlugs) ? articleSlugs : [ articleSlugs ]
  articleSlugs.forEach((articleSlug) => {
    if (articles.hasOwnProperty(articleSlug)) {
      let article = articles[articleSlug]
      list.forEach((item) => {
        article[item] = denormalizeEntity(article[item], entities[item])
      })
      denormalizedArticles.push(article)
    }
  })
  return denormalizedArticles
}
