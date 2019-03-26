import * as types from '../constants/action-types'
import get from 'lodash/get'
import assign from 'lodash/assign'
import findIndex from 'lodash/findIndex'
import uniq from 'lodash/uniq'

const _ = {
  assign,
  findIndex,
  get,
  uniq
}

const defaultLimit = 10

const initState = {
  isRequesting: false,
  bookmarkIDList: [],
  entities: {},
  errorMessage: null,
  offset: 0,
  total: 0,
  limit: defaultLimit
}

export default function bookmarks(state = initState, action) {
  switch (action.type) {
    case types.multipleBookMarks.read.request:
    case types.singleBookmark.delete.request: {
      return {
        ...state,
        actionType: action.type,
        isRequesting: true,
        errorMessage: null
      }
    }
    case types.multipleBookMarks.read.success: {
      const fetchedRecords = _.get(action, 'payload.data.records', [])
      const meta = _.get(action, 'payload.data.meta')
      const { offset, total, limit } = meta
      const bookmarkIDList = [ ...state.bookmarkIDList ]
      const entities = { ...state.entities }
      // Push new fetched records to stored ones and push ids to id list
      fetchedRecords.forEach((record) => {
        const id = _.get(record, 'id')
        if (id) {
          if (!bookmarkIDList.some(idInList => idInList === id)) { bookmarkIDList.push(id) } // prevent duplicate items in list
          entities[`${id}`] = record
        }
      })
      return {
        ...state,
        actionType: action.type,
        isRequesting: false,
        bookmarkIDList,
        entities,
        errorMessage: null,
        offset,
        total,
        limit
      }
    }
    case types.singleBookmark.delete.success: {
      // Remove the id from id list
      const prevBookmarkIDList = _.get(state, 'bookmarkIDList', [])
      const bookmarkID = _.get(action, 'payload.bookmarkID')
      const bookmarkIndexToBeDeleted = _.findIndex(prevBookmarkIDList, IDInList => IDInList === bookmarkID)
      const nextBookmarkIDList =  [ ...prevBookmarkIDList ]
      if (bookmarkIndexToBeDeleted !== -1) nextBookmarkIDList.splice(bookmarkIndexToBeDeleted, 1)
      return {
        ...state,
        actionType: action.type,
        isRequesting: false,
        bookmarkIDList: nextBookmarkIDList,
        errorMessage: null,
        total: state.total ? state.total - 1 : state.total
      }
    }
    case types.multipleBookMarks.read.failure:
    case types.singleBookmark.delete.failure: {
      return {
        ...state,
        actionType: action.type,
        isRequesting: false,
        errorMessage: _.get(action, 'payload.message')
      }
    }
    default:
      return state
  }
}
