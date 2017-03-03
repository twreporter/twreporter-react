import { arrayOf, normalize } from 'normalizr'
import { camelizeKeys } from 'humps'
import { author as authorSchema } from '../../../schemas/index'
import * as types from '../../../constants/action-types'
import { NUMBER_OF_FIRST_RESPONSE_PAGE } from '../../../constants/authors-list'

export const MOCK_KEYWORDS = 'mock keyworkds'
const CURRENT_DATE = Date.now()
const ERROR_MSG = new Error('mock search authors failure')

function theNormalize(hits) {
  const camelizedJson = camelizeKeys(hits)
  return  normalize(camelizedJson, arrayOf(authorSchema))
}


const mockResponseHits = [ '1', '2', '3', '4', '5' ].map(function (v) {
  return {
    _id: 'id_' + v,
    name: 'name_' + v,
    articlesCount: 156,
    type: 1,
    objectID: 'objId_' + v,
    _highlightResult: []
  }
})

// console.log(theNormalize(mockResponseHits).entities.authors.id_1)

const singleAuthorHits = [
  {
    _id: 'id_single',
    name: 'name_single',
    articlesCount: 50,
    type: 1,
    objectID: 'objId_single',
    _highlightResult: []
  }
]

// console.log(theNormalize(singleAuthorHits).entities.authors.id_single)

// console.log(types.SEARCH_AUTHORS_REQUEST)

export const mockActionsSet = {
  [types.SEARCH_AUTHORS_REQUEST]: {
    type: types.SEARCH_AUTHORS_REQUEST,
    keywords: MOCK_KEYWORDS
  },

  [types.SEARCH_AUTHORS_SUCCESS]: {
    type: types.SEARCH_AUTHORS_SUCCESS,
    keywords: MOCK_KEYWORDS,
    response: {
      ...theNormalize(singleAuthorHits),
      totalPages: 1,
      currentPage: 0
    },
    receivedAt: CURRENT_DATE
  },

  [types.SEARCH_AUTHORS_FAILURE]: {
    type: types.SEARCH_AUTHORS_FAILURE,
    error: ERROR_MSG,
    failedAt: CURRENT_DATE
  },

  [types.LIST_ALL_AUTHORS_REQUEST]: {
    type: types.LIST_ALL_AUTHORS_REQUEST,
    keywords: ''
  },

  [types.LIST_ALL_AUTHORS_SUCCESS]: {
    type: types.LIST_ALL_AUTHORS_SUCCESS,
    keywords: '',
    response: {
      ...theNormalize(mockResponseHits),
      totalPages: 8,
      currentPage: 0
    },
    receivedAt: CURRENT_DATE
  },

  [types.LIST_ALL_AUTHORS_FAILURE]: {
    type: types.LIST_ALL_AUTHORS_FAILURE,
    error: ERROR_MSG,
    failedAt: CURRENT_DATE
  }
}

// whole authors list
export const mockStatesSet = {
  initialState: {
    isFetching: false,
    currentPage: NUMBER_OF_FIRST_RESPONSE_PAGE - 1,
    hasMore: false,
    items: [],
    error: null,
    lastUpdated: 0
  },

  expStateSucwithInit: {
    currentPage: 0,
    error: null,
    hasMore: true,
    isFetching: false,
    items: [ 'id_1', 'id_2', 'id_3', 'id_4', 'id_5' ],
    lastUpdated: CURRENT_DATE
  },

  expStateSucwithPre: {
    currentPage: 0,
    error: null,
    hasMore: true,
    isFetching: false,
    items: [ 'id_1', 'id_2', 'id_3', 'id_4', 'id_5', 'id_1', 'id_2', 'id_3', 'id_4', 'id_5' ],
    lastUpdated: CURRENT_DATE
  },

  expStateFailwithInit: {
    currentPage: NUMBER_OF_FIRST_RESPONSE_PAGE - 1,
    isFetching: false,
    hasMore: false,
    items: [],
    error: ERROR_MSG,
    lastUpdated: CURRENT_DATE
  },

  expStateFailwithPre: {
    currentPage: 0,
    isFetching: false,
    hasMore: true,
    items: [ 'id_1', 'id_2', 'id_3', 'id_4', 'id_5' ],
    error: ERROR_MSG,
    lastUpdated: CURRENT_DATE
  }
}

  // search specific author
export const searchedMockStatesSet = {
  initialState: {
    keywords: '',
    isFetching: false,
    currentPage: NUMBER_OF_FIRST_RESPONSE_PAGE - 1,
    items: [],
    error: null,
    lastUpdated: 0
  },

  expStateSuc: {
    keywords: MOCK_KEYWORDS,
    isFetching: false,
    currentPage: 0,
    error: null,
    items: [ 'id_single' ],
    lastUpdated: CURRENT_DATE
  },

  expStateFail: {
    keywords: '',
    isFetching: false,
    currentPage: NUMBER_OF_FIRST_RESPONSE_PAGE - 1,
    error: ERROR_MSG,
    items: [],
    lastUpdated: CURRENT_DATE
  }
}
