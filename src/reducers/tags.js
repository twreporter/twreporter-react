import * as types from '../constants/action-types'

function tags(state = {}, action) {
  let _tags = {}
  switch (action.type) {
    case types.FETCH_TAGS_REQUEST:
      action.tags.map((tag) => {
        _tags[tag] = {
          error: null,
          isFetching: true
        }
      })
      return Object.assign({}, state, _tags)
    case types.FETCH_TAGS_FAILURE:
      action.tags.map((tag) => {
        _tags[tag] = {
          error: action.error,
          isFetching: false,
          lastUpdated: action.failedAt
        }
      })
      return Object.assign({}, state, _tags)
    case types.FETCH_TAGS_SUCCESS:
      let tagEntities = action.response.entities.tags
      Object.keys(tagEntities).map((tagEntityId) => {
        _tags[tagEntities[tagEntityId].name] = {
          id: tagEntityId,
          error: null,
          isFetching: false,
          lastUpdated: action.receivedAt
        }
      })
      return Object.assign({}, state, _tags)
    default:
      return state
  }
}

export default function (state = {}, action) {
  switch(action.type) {
    case types.FETCH_TAGS_SUCCESS:
    case types.FETCH_TAGS_REQUEST:
    case types.FETCH_TAGS_FAILURE:
      return tags(state, action)
    default:
      return state
  }
}
