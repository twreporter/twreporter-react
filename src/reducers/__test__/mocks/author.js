import * as types from '../../../../src/constants/action-types'
const CURRENT_DATE = Date.now()
const ERROR_MSG = new Error('mock fetch collection failure')
export const MOCKID1 = 'mock requested author Id 1'
export const MOCKID2 = 'mock requested author Id 2'
export const SEC_AUTHOR = {
  collectIndexList: [ 'articleId1', 'articleId2', 'articleId3' ],
  currentPage: 0,
  isFinish: false,
  totalResults: 30,
  receivedAt: CURRENT_DATE,
  totalPages: 13
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
    totalResults: 10,
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
    error: ERROR_MSG,
    failedAt: CURRENT_DATE
  }
}

export const mockStates = {
  InitialState: {
    isFetching: false
  },

  ExpStateSucwithInit: {
    isFetching: false,
    [MOCKID1]: {
      collectIndexList: [ 'articleId1', 'articleId2', 'articleId3' ],
      currentPage: 0,
      isFinish: false,
      totalResults: 10,
      receivedAt: CURRENT_DATE,
      totalPages: 15
    }
  },

  ExpStateSucwithPreSame: {
    isFetching: false,
    [MOCKID1]: {
      collectIndexList: [ 'articleId1', 'articleId2', 'articleId3', 'articleId1', 'articleId2', 'articleId3' ],
      currentPage: 0,
      isFinish: false,
      totalResults: 10,
      receivedAt: CURRENT_DATE,
      totalPages: 15
    }
  },

  ExpStateSucwithPreDiff: {
    isFetching: false,
    [MOCKID1]: {
      collectIndexList: [ 'articleId1', 'articleId2', 'articleId3' ],
      currentPage: 0,
      isFinish: false,
      totalResults: 10,
      receivedAt: CURRENT_DATE,
      totalPages: 15
    },
    [MOCKID2]: SEC_AUTHOR
  },

  ExpStateFailwithInit: {
    isFetching: false,
    error: ERROR_MSG,
    failedAt: CURRENT_DATE
  },

  ExpStateFailwithPre: {
    isFetching: false,
    error: ERROR_MSG,
    failedAt: CURRENT_DATE,
    [MOCKID1]: {
      collectIndexList: [ 'articleId1', 'articleId2', 'articleId3' ],
      currentPage: 0,
      isFinish: false,
      totalResults: 10,
      receivedAt: CURRENT_DATE,
      totalPages: 15
    }
  }
}
