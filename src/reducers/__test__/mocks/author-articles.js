import * as types from '../../../../src/constants/action-types'
import { NUMBER_OF_FIRST_RESPONSE_PAGE } from '../../../constants/author-page'

const CURRENT_DATE = Date.now()
const ERROR_MSG = new Error('mock fetch collection failure')
export const MOCKID1 = 'mock requested author Id 1'
export const MOCKID2 = 'mock requested author Id 2'
export const FETCH_SEC_AUTHOR_COLLECTION_SUCCESS = {
  authorId: MOCKID2,
  collectIndexList: [ 'articleId1', 'articleId2', 'articleId3' ],
  currentPage: 0,
  totalResults: 65,
  lastUpdated: CURRENT_DATE,
  totalPages: 13,
  response: {
    entities: {
      articles: { 'articleId1': {}, 'articleId2': {}, 'articleId3': {} },
      authors: { 'authorId1': {}, 'authorId2': {}, 'authorId3': {} }
    },
    result: [ 'articleId1', 'articleId2', 'articleId3' ]
  }
}
export const FETCH_FIRST_AUTHOR_SEC_TIMES = {
  currentPage:1,
  collectIndexList: [ 'articleId4', 'articleId5', 'articleId6' ],
  response: {
    entities: {
      articles: { 'articleId4': {}, 'articleId5': {}, 'articleId6': {} },
      authors: { 'authorId1': {}, 'authorId2': {}, 'authorId3': {} }
    },
    result: [ 'articleId4', 'articleId5', 'articleId6' ]
  }
}

export const mockActions = {
  [types.FETCH_AUTHOR_COLLECTION_REQUEST]: {
    type: types.FETCH_AUTHOR_COLLECTION_REQUEST,
    authorId: MOCKID1
  },

  [types.FETCH_AUTHOR_COLLECTION_SUCCESS]: {
    type: types.FETCH_AUTHOR_COLLECTION_SUCCESS,
    authorId: MOCKID1,
    collectIndexList: [ 'articleId1', 'articleId2', 'articleId3' ],
    currentPage: 0,
    totalResults: 75,
    receivedAt: CURRENT_DATE,
    totalPages: 15,
    response: {
      entities: {
        articles: { 'articleId1': {}, 'articleId2': {}, 'articleId3': {} },
        authors: { 'authorId1': {}, 'authorId2': {}, 'authorId3': {} }
      },
      result: [ 'articleId1', 'articleId2', 'articleId3' ]
    }
  },

  [types.FETCH_AUTHOR_COLLECTION_FAILURE]: {
    type: types.FETCH_AUTHOR_COLLECTION_FAILURE,
    authorId: MOCKID1,
    error: ERROR_MSG,
    failedAt: CURRENT_DATE
  }
}

export const mockStates = {

  InitialState: {
  },

  ExpStateReqwithInit: {
    [MOCKID1]: {
      isFetching: true,
      error: null,
      collectIndexList: [],
      currentPage: NUMBER_OF_FIRST_RESPONSE_PAGE - 1,  // Means no data has been fetched. Ex.: Initial currentPage equals -1 because the response of Algolia start from page 0.
      totalResults: 0,
      hasMore: false,
      lastUpdated: 0
    }
  },

  ExpStateReqwithPre: {
    [MOCKID1]: {
      isFetching: true,
      error: null,
      collectIndexList: [ 'articleId1', 'articleId2', 'articleId3' ],
      currentPage: 0,
      totalResults: 75,
      hasMore: true,
      lastUpdated: CURRENT_DATE
    }
  },

  ExpStateSucwithInit: {
    [MOCKID1]: {
      isFetching: false,
      error: null,
      collectIndexList: [ 'articleId1', 'articleId2', 'articleId3' ],
      currentPage: 0,
      totalResults: 75,
      hasMore: true,
      lastUpdated: CURRENT_DATE
    }
  },

  ExpStateSucwithPreSame: {
    [MOCKID1]: {
      isFetching: false,
      error: null,
      collectIndexList: [ 'articleId1', 'articleId2', 'articleId3', 'articleId4', 'articleId5', 'articleId6' ],
      currentPage: 1,
      totalResults: 75,
      hasMore: true,
      lastUpdated: CURRENT_DATE
    }
  },

  ExpStateSucwithPreDiff: {
    [MOCKID1]: {
      isFetching: false,
      error: null,
      collectIndexList: [ 'articleId1', 'articleId2', 'articleId3' ],
      currentPage: 0,
      totalResults: 75,
      hasMore: true,
      lastUpdated: CURRENT_DATE
    },
    [MOCKID2]: {
      isFetching: false,
      error: null,
      collectIndexList: [ 'articleId1', 'articleId2', 'articleId3' ],
      currentPage: 0,
      totalResults: 65,
      hasMore: true,
      lastUpdated: CURRENT_DATE
    }
  },

  ExpStateFailwithInit: {
    [MOCKID1]: {
      isFetching: false,
      error: ERROR_MSG,
      collectIndexList: [],
      currentPage: NUMBER_OF_FIRST_RESPONSE_PAGE - 1,  // Means no data has been fetched. Ex.: Initial currentPage equals -1 because the response of Algolia start from page 0.
      totalResults: 0,
      hasMore: false,
      lastUpdated: CURRENT_DATE
    }
  },

  ExpStateFailwithPre: {
    [MOCKID1]: {
      isFetching: false,
      error: ERROR_MSG,
      collectIndexList: [],
      currentPage: NUMBER_OF_FIRST_RESPONSE_PAGE - 1,
      totalResults: 0,
      hasMore: false,
      lastUpdated: CURRENT_DATE
    }
  }
}
