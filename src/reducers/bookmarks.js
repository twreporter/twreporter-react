import * as types from '../constants/action-types'
import get from 'lodash/get'
import assign from 'lodash/assign'
import findIndex from 'lodash/findIndex'

const _ = {
  assign,
  findIndex,
  get
}

const defaultLimit = 10

const initState = {
  isRequesting: false,
  bookmarkIDList: [],
  entities: new Map(),
  errorMessage: null,
  offset: 0,
  total: 0,
  limit: defaultLimit
}

export default function bookmarks(state = initState, action) {
  switch (action.type) {
    case types.multipleBookMarks.read.request:
    case types.singleBookmark.delete.request: {
      return _.assign({}, state, {
        actionType: action.type,
        isRequesting: true,
        errorMessage: null
      })
    }
    case types.multipleBookMarks.read.success: {
      const fetchedRecords = _.get(action, 'payload.records', [])
      const meta = _.get(action, 'payload.meta')
      const { offset, total, limit } = meta
      const bookmarkIDList = [ ...state.bookmarkIDList ]
      const entities = new Map(state.entities)
      // Push new fetched records to stored ones and push ids to id list
      fetchedRecords.forEach((record) => {
        const id = _.get(record, 'id')
        if (id) {
          bookmarkIDList.push(id)
          entities.set(id, record)
        }
      })
      return _.assign({}, state, {
        actionType: action.type,
        isRequesting: false,
        bookmarkIDList,
        entities,
        errorMessage: null,
        offset,
        total,
        limit
      })
    }
    case types.singleBookmark.delete.success: {
      // Remove the id from id list
      const prevBookmarkIDList = _.get(state, 'bookmarkIDList')
      const bookmarkIDToBeDeleted = _.get(action, 'payload.bookmarkID')
      const bookmarkIndexToBeDeleted = _.findIndex(prevBookmarkIDList, idInList => idInList === bookmarkIDToBeDeleted)
      const nextBookmarkIDList = bookmarkIndexToBeDeleted === -1 ? prevBookmarkIDList :
        prevBookmarkIDList.slice(0, bookmarkIndexToBeDeleted).concat(prevBookmarkIDList.slice(bookmarkIndexToBeDeleted))
      return _.assign({}, state, {
        actionType: action.type,
        isRequesting: false,
        bookmarkIDList: nextBookmarkIDList,
        errorMessage: null
      })
    }
    case types.multipleBookMarks.read.failure:
    case types.singleBookmark.delete.failure: {
      return _.assign({}, state, {
        actionType: action.type,
        isRequesting: false,
        errorMessage: _.get(action, 'payload.message')
      })
    }
    default:
      return state
  }
}
