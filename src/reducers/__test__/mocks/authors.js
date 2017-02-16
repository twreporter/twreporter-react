import * as types from '../../../../src/constants/action-types'
import { REQUEST_PAGE_START_FROM } from '../../../constants/authors-list'

const CURRENT_DATE = Date.now()
const ERROR_MSG = new Error('mock search authors failure')
export const MOCK_KEYWORDS = 'mock keywords'

export const mockActions = {

  [types.SEARCH_AUTHORS_REQUEST]: {
    type: types.SEARCH_AUTHORS_REQUEST,
    keywords: 'mock keyords which is the name of author'
  },

  [types.SEARCH_AUTHORS_SUCCESS]: {
    type: types.SEARCH_AUTHORS_SUCCESS,
    keywords:'',
    replaceAll: false,
    response: {
      entities: {
        authors: { 'authorId1': {}, 'authorId2': {} }
      },
      result: [ 'authorId1', 'authorId2' ]
    },
    authorsInList: [
      'authorId1',
      'authorId2'
    ],
    currentPage: 0,
    isFinish: false,
    receivedAt: CURRENT_DATE
  },

  [types.SEARCH_AUTHORS_FAILURE]: {
    type: types.SEARCH_AUTHORS_FAILURE,
    error: ERROR_MSG,
    failedAt: CURRENT_DATE
  }
}

export const mockStates = {
  InitialState: {
    isFetching: false,
    currentPage: REQUEST_PAGE_START_FROM - 1,
    isFinish: false,
    authorsInList: []
  },

  ExpStateSucwithInit: {
    keywords:'',
    replaceAll: false,
    authorsInList: [
      'authorId1',
      'authorId2'
    ],
    currentPage: 0,
    isFetching: false,
    isFinish: false
  },

  ExpStateSucwithPrefalse: {
    keywords: MOCK_KEYWORDS,
    replaceAll: false,
    authorsInList: [
      'authorId1',
      'authorId2',
      'authorId1',
      'authorId2'
    ],
    currentPage: 0,
    isFetching: false,
    isFinish: false
  },

  ExpStateSucwithPretrue: {
    keywords: MOCK_KEYWORDS,
    replaceAll: true,
    authorsInList: [
      'authorId1',
      'authorId2'
    ],
    currentPage: 0,
    isFetching: false,
    isFinish: false
  },

  ExpStateFailwithInit: {
    currentPage: REQUEST_PAGE_START_FROM - 1,
    isFinish: false,
    authorsInList: [],
    isFetching: false,
    error: ERROR_MSG,
    failedAt: CURRENT_DATE
  },

  ExpStateFailwithPre: {
    keywords:'',
    replaceAll: false,
    authorsInList: [
      'authorId1',
      'authorId2'
    ],
    currentPage: 0,
    isFetching: false,
    isFinish: false,
    error: ERROR_MSG,
    failedAt: CURRENT_DATE
  }
}
