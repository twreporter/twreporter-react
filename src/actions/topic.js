'use strict'
import { topic as topicSchema } from '../schemas/index'
import { camelizeKeys } from 'humps'
import { formatUrl } from '../utils/index'
import { normalize } from 'normalizr'
import { InternalServerError, NotFoundError } from '../lib/custom-error'
import * as types from '../constants/action-types'
import fetch from 'isomorphic-fetch'

// lodash
import get from 'lodash/get'

const _ = {
  get
}

function requestTopic(slug, url) {
  return {
    type: types.FETCH_TOPIC_REQUEST,
    slug,
    url
  }
}

function failToReceiveTopic(slug, error) {
  return {
    type: types.FETCH_TOPIC_FAILURE,
    slug,
    error,
    failedAt: Date.now()
  }
}

function receiveTopic(response, slug) {
  return {
    type: types.FETCH_TOPIC_SUCCESS,
    slug,
    response,
    receivedAt: Date.now()
  }
}

function fetchTopic(slug) {
  return dispatch => {
    let url = formatUrl(`topics/${slug}`)
    dispatch(requestTopic(slug, url))
    return fetch(url)
    .then((response) => {
      let status = response.status
      if (status === 404) {
        throw new NotFoundError('Topic ' +  slug + ' is not found')
      } else if (status >= 400) {
        throw new InternalServerError('Bad response from API, response: ' + JSON.stringify(response))
      }
      return response.json()
    })
    .then((response) => {
      const camelizedJson = camelizeKeys(response)
      return dispatch(receiveTopic(normalize(camelizedJson, topicSchema), slug))
    }, (error) => {
      return dispatch(failToReceiveTopic(slug, error))
    })
  }
}

export function fetchTopicIfNeeded(slug) {
  return (dispatch, getState) => {
    const state = getState()
    const id = _.get(state, [ 'topicSlugToId', slug ])
    if (!id) {
      return dispatch(fetchTopic(slug))
    }
    const response = {
      result: id
    }
    return dispatch(receiveTopic(response, slug))
  }
}
