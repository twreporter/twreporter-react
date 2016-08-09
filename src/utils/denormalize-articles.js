'use strict'
import _ from 'lodash'

function getArticleFieldToEntity() {
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
  }, {
    field: 'topics',
    entity: 'topics'
  } ]
}

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

export function denormalizeArticles(ids = [], entities = {}) {
  let denormalizedArticles = []
  // extract entities articles need
  const { articles } = entities
  const fieldToEntity = getArticleFieldToEntity()

  ids = Array.isArray(ids) ? ids : [ ids ]
  ids.forEach((id) => {
    if (articles.hasOwnProperty(id)) {
      let article = _.merge({}, articles[id])
      _.forEach(fieldToEntity, (ele) => {
        article[ele.field] = denormalizeEntity(article[ele.field], entities[ele.entity])
      })
      denormalizedArticles.push(article)
    }
  })
  return denormalizedArticles
}

export function shallowDenormalizeArticles(ids = [], entities = {}) {
  let denormalizedArticles = []
  // extract entities articles need
  const { articles } = entities

  ids = Array.isArray(ids) ? ids : [ ids ]
  ids.forEach((id) => {
    if (articles.hasOwnProperty(id)) {
      let article = _.merge({}, articles[id])
      denormalizedArticles.push(article)
    }
  })
  return denormalizedArticles
}
