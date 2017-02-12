import * as types from '../../../../src/constants/action-types'
const CURRENT_DATE = Date.now()
const ERROR_MSG = new Error('mock fetch collection failure')
export const MOCKID1 = 'mock requested author Id 1'
export const MOCKID2 = 'mock requested author Id 2'
export const SEC_AUTHOR = {
  collectIndexList: [ 'article_Id1', 'article_Id2', 'article_Id3' ],
  currentPage: 0,
  isFinish: false,
  totalResults: 30,
  receivedAt: CURRENT_DATE
}

export const mockActions = {
  [types.FETCH_AUTHOR_COLLECTION_REQUEST]: {
    type: types.FETCH_AUTHOR_COLLECTION_REQUEST,
    authorId: MOCKID1
  },

  [types.FETCH_AUTHOR_COLLECTION_SUCCESS]: {
    type: types.FETCH_AUTHOR_COLLECTION_SUCCESS,
    [MOCKID1]: {
      collectIndexList: [ 'article_Id1', 'article_Id2', 'article_Id3' ],
      currentPage: 0,
      isFinish: false,
      totalResults: 10,
      receivedAt: CURRENT_DATE
    },
    authorId: MOCKID1,
    response: {
      entities: {
        articles: { 'article_Id1': {}, 'article_Id2': {}, 'article_Id3': {} },
        authors: { 'author_Id1': {}, 'author_Id2': {}, 'author_Id3': {} }
      },
      result: [ 'article_Id1', 'article_Id2', 'article_Id3' ]
    }
  },

  [types.FETCH_AUTHOR_COLLECTION_FAILURE]: {
    type: types.FETCH_AUTHOR_COLLECTION_FAILURE,
    error: ERROR_MSG,
    failedAt: CURRENT_DATE
  }
}

export const mockStates = {
  Initial_State: {
    isFetching: false
  },

  Exp_State_Suc_withInit: {
    isFetching: false,
    [MOCKID1]: {
      collectIndexList: [ 'article_Id1', 'article_Id2', 'article_Id3' ],
      currentPage: 0,
      isFinish: false,
      totalResults: 10,
      receivedAt: CURRENT_DATE
    },
    response: {
      entities: {
        articles: { 'article_Id1': {}, 'article_Id2': {}, 'article_Id3': {} },
        authors: { 'author_Id1': {}, 'author_Id2': {}, 'author_Id3': {} }
      },
      result: [ 'article_Id1', 'article_Id2', 'article_Id3' ]
    }
  },

  Exp_State_Suc_withPre_Same: {
    isFetching: false,
    [MOCKID1]: {
      collectIndexList: [ 'article_Id1', 'article_Id2', 'article_Id3', 'article_Id1', 'article_Id2', 'article_Id3' ],
      currentPage: 0,
      isFinish: false,
      totalResults: 10,
      receivedAt: CURRENT_DATE
    },
    response: {
      entities: {
        articles: { 'article_Id1': {}, 'article_Id2': {}, 'article_Id3': {} },
        authors: { 'author_Id1': {}, 'author_Id2': {}, 'author_Id3': {} }
      },
      result: [ 'article_Id1', 'article_Id2', 'article_Id3' ]
    }
  },

  Exp_State_Suc_withPre_Diff: {
    isFetching: false,
    [MOCKID1]: {
      collectIndexList: [ 'article_Id1', 'article_Id2', 'article_Id3' ],
      currentPage: 0,
      isFinish: false,
      totalResults: 10,
      receivedAt: CURRENT_DATE
    },
    [MOCKID2]: SEC_AUTHOR,
    response: {
      entities: {
        articles: { 'article_Id1': {}, 'article_Id2': {}, 'article_Id3': {} },
        authors: { 'author_Id1': {}, 'author_Id2': {}, 'author_Id3': {} }
      },
      result: [ 'article_Id1', 'article_Id2', 'article_Id3' ]
    }
  },

  Exp_State_Fail_withInit: {
    isFetching: false,
    error: ERROR_MSG,
    failedAt: CURRENT_DATE
  },

  Exp_State_Fail_withPre: {
    isFetching: false,
    error: ERROR_MSG,
    failedAt: CURRENT_DATE,
    [MOCKID1]: {
      collectIndexList: [ 'article_Id1', 'article_Id2', 'article_Id3' ],
      currentPage: 0,
      isFinish: false,
      totalResults: 10,
      receivedAt: CURRENT_DATE
    },
    response: {
      entities: {
        articles: { 'article_Id1': {}, 'article_Id2': {}, 'article_Id3': {} },
        authors: { 'author_Id1': {}, 'author_Id2': {}, 'author_Id3': {} }
      },
      result: [ 'article_Id1', 'article_Id2', 'article_Id3' ]
    }
  }
}
