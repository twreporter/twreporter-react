
'use strict'
import { camelizeKeys } from 'humps'
import { formatUrl } from '../utils/index'
import { arrayOf, normalize } from 'normalizr'
import { tag as tagSchema, category as categorySchema } from '../schemas/index'
import * as CONSTANTS from '../constants/index'
import fetch from 'isomorphic-fetch'
import qs from 'qs'

const groupEnum = CONSTANTS.groupEnum
const pathEnum = CONSTANTS.apiPathEnum

function requestGroups(groupType, groupNames) {
  let type = groupType === groupEnum.CATEGORY ? CONSTANTS.FETCH_CATEGORIES_REQUEST : CONSTANTS.FETCH_TAGS_REQUEST
  return {
    type: type,
    groups: groupNames
  }
}

function failToReceiveGroups(groupType, groupNames, error) {
  let type = groupType === groupEnum.CATEGORY ? CONSTANTS.FETCH_CATEGORIES_FAILURE : CONSTANTS.FETCH_TAGS_FAILURE
  return {
    type: type,
    groups: groupNames,
    error,
    failedAt: Date.now()
  }
}

function receiveGroups(groupType, response) {
  let type = groupType === groupEnum.CATEGORY ? CONSTANTS.FETCH_CATEGORIES_SUCCESS : CONSTANTS.FETCH_TAGS_SUCCESS
  return {
    type: type,
    response,
    receivedAt: Date.now()
  }
}

function fetchGroups(groupType, groupNames) {
  return dispatch => {
    dispatch(requestGroups(groupType, groupNames))

    let query = qs.stringify({ where: JSON.stringify( { name: { '$in': groupNames } }) })
    let path
    let schema

    if ( groupType === groupEnum.CATEGORY ) {
      path = pathEnum.CATEGORY
      schema = categorySchema
    } else if ( groupType === groupEnum.TAG ) {
      path = pathEnum.TAG
      schema = tagSchema
    } else {
      return dispatch(failToReceiveGroups(groupType, groupNames, new Error('group type should be one of category or tag') ))
    }

    return fetch(formatUrl(`${path}?${query}`))
    .then((response) => {
      if (response.status >= 400) {
        throw new Error('Bad response from API, response:' + JSON.stringify(response))
      }
      return response.json()
    })
    .then((response) => {
      const camelizedJson = camelizeKeys(response)
      dispatch(receiveGroups(groupType, normalize(camelizedJson.items, arrayOf(schema))))
    }, (error) => {
      dispatch(failToReceiveGroups(groupType, groupNames, error))
    })
  }
}

function dedupGroups(state = {}, groupType, groupNames = []) {
  groupNames = Array.isArray(groupNames) ? groupNames : [ groupNames ]
  let existedGroups = ( groupType === groupEnum.CATEGORY ? state.categories : state.tags ) || {}
  let rtn = []
  groupNames.forEach((groupName) => {
    if (!existedGroups.hasOwnProperty(groupName) || existedGroups[groupName].error ) {
      rtn.push(groupName)
    }
  })
  return rtn
}

export function fetchTagsIfNeeded(tags) {
  return (dispatch, getState) => {
    let deduppedTags = dedupGroups(getState(), groupEnum.TAG, tags)

    if (deduppedTags.length !== 0) {
      return dispatch(fetchGroups(groupEnum.TAG, deduppedTags))
    }
    return Promise.resolve()
  }
}

export function fetchCategoriesIfNeeded(categories) {
  return (dispatch, getState) => {
    let deduppedCategories = dedupGroups(getState(), groupEnum.CATEGORY, categories)

    if (deduppedCategories.length !== 0) {
      return dispatch(fetchGroups(groupEnum.CATEGORY, deduppedCategories))
    }
    return Promise.resolve()
  }
}


