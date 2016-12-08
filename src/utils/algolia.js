'use strict'

import keyBy from 'lodash/keyBy'
import map from 'lodash/map'
import get from 'lodash/get'

const _ = {
  keyBy, map, get
}

export function hitsToEntities(hits, entitiesName) {
  let entities = {}
  entities[entitiesName] = _.keyBy(hits, (hit)=>_.get(hit, 'objectID', ''))
  let result = _.map(hits, (hit)=>_.get(hit, 'objectID', ''))
  let response = {
    entities,
    result
  }
  return response
}
