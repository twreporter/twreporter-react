/* global describe, it */

/*
  Includes
    1. TESTING of `relatedArticles` reducer 
    2. TESTING of `articlesByUuids` reducer
    3. TESTING of `featureArticles` reducer
*/

'use strict'

import { expect } from 'chai'
import * as reducers from '../articles'
import * as types from '../../constants/action-types'

/* -------- MOCK DATA -------- */
const initialState = {}

const mockActions = {
  notReconized: {
    type: 'This action is not be recognized by the reducer'
  },
  [types.FETCH_RELATED_ARTICLES_REQUEST]: {
    type: types.FETCH_RELATED_ARTICLES_REQUEST,
    id: 'act_article_id_01',
    relatedIds: [ 'act_related_id_01' ],
    url: 'act_api_url_01'
  },
  [types.FETCH_RELATED_ARTICLES_FAILURE]: {
    type: types.FETCH_RELATED_ARTICLES_FAILURE,
    id: 'act_article_id_01',
    relatedIds: [ 'act_related_article_id_01' ],
    error: 'act_error',
    failedAt: 'act_date_now'
  },
  [types.FETCH_RELATED_ARTICLES_SUCCESS]: {
    type: types.FETCH_RELATED_ARTICLES_SUCCESS,
    id: 'act_article_id_01',
    relatedIds: [ 'act_related_article_id_01' ],
    response: {
      entities: { articles: {}, tags: {}, categories: {} },
      result: [ 'act_article_id_01' ]
    },
    receivedAt: 'act_date_now'
  },
  [types.FETCH_ARTICLES_BY_GROUP_UUID_REQUEST]: {
    type: types.FETCH_ARTICLES_BY_GROUP_UUID_REQUEST,
    id: 'act_article_id_01',
    url: 'act_api_url_01'
  },
  [types.FETCH_ARTICLES_BY_GROUP_UUID_FAILURE]: {
    type: types.FETCH_ARTICLES_BY_GROUP_UUID_FAILURE,
    id: 'act_article_id_01',
    error: 'act_error',
    failedAt: 'act_date_now'
  },
  [types.FETCH_ARTICLES_BY_GROUP_UUID_SUCCESS]: {
    type: types.FETCH_ARTICLES_BY_GROUP_UUID_SUCCESS,
    id: 'act_article_id_01',
    response: {
      entities: { articles: {}, categories: {}, tags: {}, topics: {} },
      links: {
        parent: {
          href: '',
          title: ''
        },
        self: {
          href: '',
          title: ''
        }
      },
      meta: {
        maxResult: 10,
        page: 1,
        total: 74
      },
      result: [ 'act_group_article_id_01' ]
    },
    receivedAt: 'act_date_now'
  },
  [types.FETCH_FEATURE_ARTICLES_REQUEST]: {
    type: types.FETCH_FEATURE_ARTICLES_REQUEST,
    url: 'act_url'
  },
  [types.FETCH_FEATURE_ARTICLES_FAILURE]: {
    type: types.FETCH_FEATURE_ARTICLES_FAILURE,
    error: 'act_error',
    failedAt: 'act_date_now'
  },
  [types.FETCH_FEATURE_ARTICLES_SUCCESS]: {
    type: types.FETCH_FEATURE_ARTICLES_SUCCESS,
    response: {
      entities: {
        act_feature_article_id_01: { id: 'act_feature_article_id_01', name: 'act_article_name_01' }
      },
      result: [ 'act_feature_article_id_01' ]
    },
    receivedAt: 'act_date_now'
  }
}

const mockPreviousState_relatedArticles = {
  'pre_article_id_01': {
    isFetching: false,
    hasMore: false,
    error: null,
    items: [ 'pre_related_article_id_01' ],
    total: 1,
    lastUpdated: 'pre_date'
  },
  'act_article_id_01': { // Named 'act' To test whether its values will be updated with action
    isFetching: false,
    error: 'pre_error_01',
    lastUpdated: 'pre_date'
  }
}

const mockExpectedStateOnPre_relatedArticles = {
  request: {
    'pre_article_id_01': mockPreviousState_relatedArticles.pre_article_id_01,
    'act_article_id_01': {
      isFetching: true,
      error: mockPreviousState_relatedArticles.act_article_id_01.error,
      lastUpdated: mockPreviousState_relatedArticles.act_article_id_01.lastUpdated
    }
  },
  failure: {
    'pre_article_id_01': mockPreviousState_relatedArticles.pre_article_id_01,
    'act_article_id_01': {
      isFetching: false,
      error: mockActions[types.FETCH_RELATED_ARTICLES_FAILURE].error,
      lastUpdated: mockActions[types.FETCH_RELATED_ARTICLES_FAILURE].failedAt
    }
  },
  success: {
    'pre_article_id_01': mockPreviousState_relatedArticles.pre_article_id_01,
    'act_article_id_01': {
      isFetching: false,
      hasMore: false,
      error: null,
      items: mockActions[types.FETCH_RELATED_ARTICLES_SUCCESS].relatedIds,
      total: mockActions[types.FETCH_RELATED_ARTICLES_SUCCESS].relatedIds.length,
      lastUpdated: mockActions[types.FETCH_RELATED_ARTICLES_SUCCESS].receivedAt
    }
  }
}

const mockPreviousState_featureArticles = {
  isFetching: false,
  error: null,
  lastUpdated: 'pre_date',
  items: [ 'pre_feature_article_id_01', 'pre_feature_article_id_02' ]
}

const mockExpectedStateOnPre_featureArticles = {
  request: {
    isFetching: true,
    error: null,
    lastUpdated: mockPreviousState_featureArticles.lastUpdated,
    items: mockPreviousState_featureArticles.items
  },
  failure: {
    isFetching: false,
    error: mockActions[types.FETCH_FEATURE_ARTICLES_FAILURE].error,
    lastUpdated: mockActions[types.FETCH_FEATURE_ARTICLES_FAILURE].failedAt,
    items: mockPreviousState_featureArticles.items
  },
  success: {
    isFetching: false,
    error: null,
    lastUpdated: mockActions[types.FETCH_FEATURE_ARTICLES_SUCCESS].receivedAt,
    items: mockActions[types.FETCH_FEATURE_ARTICLES_SUCCESS].response.result
  }
}

const mockPreviousState_articlesByUuids = {
  'pre_article_id_01': {
    isFetching: false,
    error: 'pre_error_01',
    lastUpdated: 'pre_date'
  },
  'act_article_id_01': { // Named 'act' To test whether its values will be updated with action
    error: null,
    hasMore: false,
    isFetching: false,
    items: [ 'pre_group_article_id_01' ],
    lastUpdated: 'pre_date',
    total: 1
  }
}

const mockExpectedStateOnPre_articlesByUuids = {
  request: {
    'pre_article_id_01': mockPreviousState_articlesByUuids.pre_article_id_01,
    'act_article_id_01': {
      isFetching: true,
      error: mockPreviousState_articlesByUuids.act_article_id_01.error,
      hasMore: mockPreviousState_articlesByUuids.act_article_id_01.hasMore,
      items: mockPreviousState_articlesByUuids.act_article_id_01.items,
      total: mockPreviousState_articlesByUuids.act_article_id_01.total,
      lastUpdated: mockPreviousState_articlesByUuids.act_article_id_01.lastUpdated
    }
  },
  failure: {
    'pre_article_id_01': mockPreviousState_articlesByUuids.pre_article_id_01,
    'act_article_id_01': {
      isFetching: false,
      error: mockActions[types.FETCH_ARTICLES_BY_GROUP_UUID_FAILURE].error,
      hasMore: mockPreviousState_articlesByUuids.act_article_id_01.hasMore,
      items: mockPreviousState_articlesByUuids.act_article_id_01.items,
      total: mockPreviousState_articlesByUuids.act_article_id_01.total,
      lastUpdated: mockActions[types.FETCH_ARTICLES_BY_GROUP_UUID_FAILURE].failedAt
    }
  },
  success: {
    'pre_article_id_01': mockPreviousState_articlesByUuids.pre_article_id_01,
    'act_article_id_01': {
      isFetching: false,
      error: null,
      hasMore: mockPreviousState_articlesByUuids.act_article_id_01.items.concat(
          mockActions[types.FETCH_ARTICLES_BY_GROUP_UUID_SUCCESS].response.result
        ).length < mockPreviousState_articlesByUuids.act_article_id_01.total,
      items: mockPreviousState_articlesByUuids.act_article_id_01.items.concat(
        mockActions[types.FETCH_ARTICLES_BY_GROUP_UUID_SUCCESS].response.result
      ),
      total: mockPreviousState_articlesByUuids.act_article_id_01.total,
      lastUpdated: mockActions[types.FETCH_ARTICLES_BY_GROUP_UUID_SUCCESS].receivedAt
    }
  }
}

/* -------- TESTING of `relatedArticles` reducer -------- */

describe('Testing relatedArticles reducer:', () => {
  describe('IF action cannot be recognized, ', () => {
    it('SHOULD return initial state WHEN previous state is undefined', () => {
      expect(
        reducers.relatedArticles(undefined, mockActions.notReconized)
      ).to.deep.equal(initialState)
    })
    it('SHOULD return previous state WHEN previous state exsist', () => {
      expect(
        reducers.relatedArticles(mockPreviousState_relatedArticles, mockActions.notReconized)
      ).to.deep.equal(mockPreviousState_relatedArticles)
    })
  })

  describe(`If action type is ${types.FETCH_RELATED_ARTICLES_REQUEST}`, () => {
    const action = mockActions[types.FETCH_RELATED_ARTICLES_REQUEST]
    it('SHOULD return expected state(on initial state) WHEN previous state is undefined', () => {
      expect(
        reducers.relatedArticles(undefined, action)
      ).to.deep.equal({
        [action.id]: {
          isFetching: true,
          error: null,
          hasMore: false,
          items: []
        }
      })
    })
    it('SHOULD return expected state(on previous state) WHEN previous state exist', () => {
      expect(
        reducers.relatedArticles(mockPreviousState_relatedArticles, action)
      ).to.deep.equal(mockExpectedStateOnPre_relatedArticles.request)
    })
  })

  describe(`If action type is ${types.FETCH_RELATED_ARTICLES_FAILURE}`, () => {
    const action = mockActions[types.FETCH_RELATED_ARTICLES_FAILURE]
    it('SHOULD return expected state(on initial state) WHEN previous state is undefined', () => {
      expect(
        reducers.relatedArticles(undefined, action)
      ).to.deep.equal({
        [action.id]: {
          isFetching: false,
          error: action.error,
          lastUpdated: action.failedAt
        }
      })
    })
    it('SHOULD return expected state(on previous state) WHEN previous state exist', () => {
      expect(
        reducers.relatedArticles(mockPreviousState_relatedArticles, action)
      ).to.deep.equal(mockExpectedStateOnPre_relatedArticles.failure)
    })
  })

  describe(`If action type is ${types.FETCH_RELATED_ARTICLES_SUCCESS}`, () => {
    const action = mockActions[types.FETCH_RELATED_ARTICLES_SUCCESS]
    it('SHOULD return expected state(on initial state) WHEN previous state is undefined', () => {
      expect(
        reducers.relatedArticles(undefined, action)
      ).to.deep.equal({
        [action.id]: {
          isFetching: false,
          hasMore: false,
          error: null,
          items: action.relatedIds,
          total: action.relatedIds.length,
          lastUpdated: action.receivedAt
        }
      })
    })
    it('SHOULD return expected state(on previous state) WHEN previous state exist', () => {
      expect(
        reducers.relatedArticles(mockPreviousState_relatedArticles, action)
      ).to.deep.equal(mockExpectedStateOnPre_relatedArticles.success)
    })
  })
})

/* -------- TESTING of `articlesByUuids` reducer -------- */

describe('Testing articlesByUuids reducer:', () => {
  describe('IF action cannot be recognized, ', () => {
    it('SHOULD return initial state WHEN previous state is undefined', () => {
      expect(
        reducers.articlesByUuids(undefined, mockActions.notReconized)
      ).to.deep.equal(initialState)
    })
    it('SHOULD return previous state WHEN previous state exsist', () => {
      expect(
        reducers.articlesByUuids(mockPreviousState_articlesByUuids, mockActions.notReconized)
      ).to.deep.equal(mockPreviousState_articlesByUuids)
    })
  })

  describe(`If action type is ${types.FETCH_ARTICLES_BY_GROUP_UUID_REQUEST}`, () => {
    const action = mockActions[types.FETCH_ARTICLES_BY_GROUP_UUID_REQUEST]
    it('SHOULD return expected state(on initial state) WHEN previous state is undefined', () => {
      expect(
        reducers.articlesByUuids(undefined, action)
      ).to.deep.equal({
        [action.id]: {
          isFetching: true,
          error: null,
          hasMore: false,
          items: []
        }
      })
    })
    it('SHOULD return expected state(on previous state) WHEN previous state exist', () => {
      expect(
        reducers.articlesByUuids(mockPreviousState_articlesByUuids, action)
      ).to.deep.equal(mockExpectedStateOnPre_articlesByUuids.request)
    })
  })

  describe(`If action type is ${types.FETCH_ARTICLES_BY_GROUP_UUID_FAILURE}`, () => {
    const action = mockActions[types.FETCH_ARTICLES_BY_GROUP_UUID_FAILURE]
    it('SHOULD return expected state(on initial state) WHEN previous state is undefined', () => {
      expect(
        reducers.articlesByUuids(undefined, action)
      ).to.deep.equal({
        [action.id]: {
          isFetching: false,
          error: action.error,
          lastUpdated: action.failedAt
        }
      })
    })
    it('SHOULD return expected state(on previous state) WHEN previous state exist', () => {
      expect(
        reducers.articlesByUuids(mockPreviousState_articlesByUuids, action)
      ).to.deep.equal(mockExpectedStateOnPre_articlesByUuids.failure)
    })
  })

  describe(`If action type is ${types.FETCH_ARTICLES_BY_GROUP_UUID_SUCCESS}`, () => {
    const action = mockActions[types.FETCH_ARTICLES_BY_GROUP_UUID_SUCCESS]
    it('SHOULD return expected state(on initial state) WHEN previous state is undefined', () => {
      expect(
        reducers.articlesByUuids(undefined, action)
      ).to.deep.equal({
        [action.id]: {
          isFetching: false,
          error: null,
          total: action.response.meta.total,
          hasMore: action.response.result.length < action.response.meta.total,
          items: action.response.result,
          lastUpdated: action.receivedAt
        }
      })
    })
    it('SHOULD return expected state(on previous state) WHEN previous state exist', () => {
      expect(
        reducers.articlesByUuids(mockPreviousState_articlesByUuids, action)
      ).to.deep.equal(mockExpectedStateOnPre_articlesByUuids.success)
    })
  })
})

/* -------- TESTING of `featureArticles` reducer -------- */

describe('Testing featureArticles reducer:', () => {
  describe('IF action cannot be recognized, ', () => {
    it('SHOULD return initial state WHEN previous state is undefined', () => {
      expect(
        reducers.featureArticles(undefined, mockActions.notReconized)
      ).to.deep.equal(initialState)
    })
    it('SHOULD return previous state WHEN previous state exsist', () => {
      expect(
        reducers.featureArticles(mockPreviousState_featureArticles, mockActions.notReconized)
      ).to.deep.equal(mockPreviousState_featureArticles)
    })
  })

  describe(`If action type is ${types.FETCH_FEATURE_ARTICLES_REQUEST}`, () => {
    const action = mockActions[types.FETCH_FEATURE_ARTICLES_REQUEST]
    it('SHOULD return expected state(on initial state) WHEN previous state is undefined', () => {
      expect(
        reducers.featureArticles(undefined, action)
      ).to.deep.equal({
        isFetching: true,
        error: null
      })
    })
    it('SHOULD return expected state(on previous state) WHEN previous state exist', () => {
      expect(
        reducers.featureArticles(mockPreviousState_featureArticles, action)
      ).to.deep.equal(mockExpectedStateOnPre_featureArticles.request)
    })
  })

  describe(`If action type is ${types.FETCH_FEATURE_ARTICLES_FAILURE}`, () => {
    const action = mockActions[types.FETCH_FEATURE_ARTICLES_FAILURE]
    it('SHOULD return expected state(on initial state) WHEN previous state is undefined', () => {
      expect(
        reducers.featureArticles(undefined, action)
      ).to.deep.equal({
        isFetching: false,
        error: action.error,
        lastUpdated: action.failedAt
      })
    })
    it('SHOULD return expected state(on previous state) WHEN previous state exist', () => {
      expect(
        reducers.featureArticles(mockPreviousState_featureArticles, action)
      ).to.deep.equal(mockExpectedStateOnPre_featureArticles.failure)
    })
  })

  describe(`If action type is ${types.FETCH_FEATURE_ARTICLES_SUCCESS}`, () => {
    const action = mockActions[types.FETCH_FEATURE_ARTICLES_SUCCESS]
    it('SHOULD return expected state(on initial state) WHEN previous state is undefined', () => {
      expect(
        reducers.featureArticles(undefined, action)
      ).to.deep.equal(mockExpectedStateOnPre_featureArticles.success)
    })
    it('SHOULD return expected state(on previous state) WHEN previous state exist', () => {
      expect(
        reducers.featureArticles(mockPreviousState_featureArticles, action)
      ).to.deep.equal(mockExpectedStateOnPre_featureArticles.success)
    })
  })
})

