'use strict'
import { getArticleFieldToEntity } from './article-nested-entity-methods'
import _ from 'lodash'

function denormalizeEntity(entityIds = [], entityObj = {}) {
  let rtn
  entityObj = entityObj || {}
  if (Array.isArray(entityIds)) {
    rtn = []
    _.forEach(entityIds, (id) => {
      if (entityObj.hasOwnProperty(id)) {
        rtn.push(entityObj[id])
      }
    })
  } else {
    rtn = entityObj[entityIds]
  }
  return rtn
}

export function denormalizeArticles(articleSlugs = [], entities = {}) {
  let denormalizedArticles = []
  // extract entities articles need
  const { articles } = entities
  const fieldToEntity = getArticleFieldToEntity()

  articleSlugs = Array.isArray(articleSlugs) ? articleSlugs : [ articleSlugs ]
  articleSlugs.forEach((articleSlug) => {
    if (articles.hasOwnProperty(articleSlug)) {
      let article = _.merge({} ,articles[articleSlug])
      _.forEach(fieldToEntity, (ele) => {
        article[ele.field] = denormalizeEntity(article[ele.field], entities[ele.entity])
      })
      denormalizedArticles.push(article)
    }
  })
  return denormalizedArticles
}
