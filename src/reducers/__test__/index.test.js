/* global describe, it */

/*
  Includes
    1. TESTING of `entities` reducer
    2. TESTING of `articleSlugToId` reducer 
    3. TESTING of `topicSlugToId` reducer
*/

'use strict'

import { expect } from 'chai'
import * as reducers from '../index'
import * as types from '../../constants/action-types'
import merge from 'lodash/merge'
import forEach from 'lodash/forEach'

const _ = {
  merge,
  forEach
}

/* -------- MOCK DATA -------- */

const initialState = {}

const mockDataToBeMerged = {
  numberValueChanged: {
    previous: 10,
    action: 30,
    expected: 30
  },
  stringValueChanged: {
    previous: 'previous string',
    action: 'action string',
    expected: 'action string'
  },
  booleanValueChanged: {
    previous: false,
    action: true,
    expected: true
  },
  arrayChildrenArePrimitives: {
    previous: [ 'pre_articleId_01', 10, false, 'pre_else' ],
    action: [ 'act_articleId_01', 30, true ],
    expected: [ 'act_articleId_01', 30, true, 'pre_else' ]
  },
  arrayChildrenAreArrays: {
    previous: [ [ 'pre_string_1-1' ], [ 'pre_string_2-1' ] ],
    action: [ [ 'act_string_1-1', 'act_string_1-2' ], [] ],
    expected: [ [ 'act_string_1-1', 'act_string_1-2' ], [ 'pre_string_2-1' ] ]
  },
  arrayChildrenAreObjects: {
    previous: [ { id: 'pre_id_01' }, { id: 'pre_id_02' } ],
    action: [ { id: 'act_id_01', title: 'act_title_01' } ],
    expected: [ { id: 'act_id_01', title: 'act_title_01' }, { id: 'pre_id_02' } ]
  },
  objectChildrenArePrimitive: {
    previous: {
      title: 'pre_title',
      likes: 10,
      isPublished: false,
      else: 'pre_else'
    },
    action: {
      title: 'act_title',
      likes: 30,
      isPublished: true
    },
    expected: {
      title: 'act_title',
      likes: 30,
      isPublished: true,
      else: 'pre_else'
    }
  },
  objectChildrenAreObjects: {
    previous: {
      article01: { title: 'pre_title_01', id: 'pre_id_01' },
      article02: { title: 'pre_title_01' }
    },
    action: {
      article01: { title: 'act_title_01' }
    },
    expected: {
      article01: { title: 'act_title_01', id: 'pre_id_01' },
      article02: { title: 'pre_title_01' }
    }
  },
  objectChildrenAreArrays: {
    previous: {
      articles01: [ 'pre_string_1-1' ],
      articles02: [ 'pre_string_2-1' ]
    },
    action: {
      articles01: [ 'act_string_1-1', 'act_string_1-2' ],
      articles02: []
    },
    expected: {
      article01: [ 'act_string_1-1', 'act_string_1-2' ],
      article02: [ 'pre_string_2-1' ]
    }
  }
}

const mockPreviousState_entities = { // Whole store
  mockAuthorData: {
    authorId001: {
      name: 'Mock Author Name',
      objectID: 'f774310e41200a0dc01',
      numberValue: mockDataToBeMerged.numberValueChanged.previous,
      stringValue: mockDataToBeMerged.stringValueChanged.previous,
      booleanValue: mockDataToBeMerged.booleanValueChanged.previous,
      arrayWithPrimitives: mockDataToBeMerged.arrayChildrenArePrimitives.previous,
      arrayWithArrays: mockDataToBeMerged.arrayChildrenAreArrays.previous,
      arrayWithObjects: mockDataToBeMerged.arrayChildrenAreObjects.previous,
      articlesObjectList01: mockDataToBeMerged.objectChildrenArePrimitive.previous,
      articlesObjectList02: mockDataToBeMerged.objectChildrenAreObjects.previous
    }
  }
}

const mockExpectedState_entities = {
  mockAuthorData: {
    authorId001: {
      name: 'Mock Author Name',
      objectID: 'f774310e41200a0dc01',
      numberValue: mockDataToBeMerged.numberValueChanged.expected,
      stringValue: mockDataToBeMerged.stringValueChanged.expected,
      booleanValue: mockDataToBeMerged.booleanValueChanged.expected,
      arrayWithPrimitives: mockDataToBeMerged.arrayChildrenArePrimitives.expected,
      arrayWithArrays: mockDataToBeMerged.arrayChildrenAreArrays.expected,
      arrayWithObjects: mockDataToBeMerged.arrayChildrenAreObjects.expected,
      articlesObjectList01: mockDataToBeMerged.objectChildrenArePrimitive.expected,
      articlesObjectList02: mockDataToBeMerged.objectChildrenAreObjects.expected
    }
  }
}

const mockActionWithEntities = {
  type: 'This action is not be recognized by the reducer',
  response: {
    entities: {
      mockAuthorData: {
        authorId001: {
          name: 'Mock Author Name',
          objectID: 'f774310e41200a0dc01',
          numberValue: mockDataToBeMerged.numberValueChanged.action,
          stringValue: mockDataToBeMerged.stringValueChanged.action,
          booleanValue: mockDataToBeMerged.booleanValueChanged.action,
          arrayWithPrimitives: mockDataToBeMerged.arrayChildrenArePrimitives.action,
          arrayWithArrays: mockDataToBeMerged.arrayChildrenAreArrays.action,
          arrayWithObjects: mockDataToBeMerged.arrayChildrenAreObjects.action,
          articlesObjectList01: mockDataToBeMerged.objectChildrenArePrimitive.action,
          articlesObjectList02: mockDataToBeMerged.objectChildrenAreObjects.action
        }
      }
    }
  }
}

const mockPreviousState_topicSlugToId = {
  'pre-topic-slug-01': 'pre_topic_id_01',
  'pre-topic-slug-02': 'pre_topic_id_02',
  'test-overwritten-topic-slug': 'pre_topic_id' // to test will it be overwritten
}

const mockExpectedState_topicSlugToId = {
  'pre-topic-slug-01': 'pre_topic_id_01',
  'pre-topic-slug-02': 'pre_topic_id_02',
  'test-overwritten-topic-slug': 'act_topic_id'
}

const mockPreviousState_articleSlugToId = {
  'pre-article-slug-01': 'pre_article_id_01',
  'pre-article-slug-02': 'pre_article_id_02',
  'test-overwritten-article-slug': 'pre_article_id' // to test will it be overwritten
}

const mockExpectedState_articleSlugToId = {
  'pre-article-slug-01': 'pre_article_id_01',
  'pre-article-slug-02': 'pre_article_id_02',
  'test-overwritten-article-slug': 'act_article_id'
}

const mockActionResponse = {
  response: {
    entities: {
      articles: {
        'act_article_id': {
          id: 'act_article_id',
          slug: 'test-overwritten-article-slug'
        }
      }
    }
  }
}

const mockActionFetchArticleResult = {
  response: {
    result: 'act_article_id'
  },
  slug: 'test-overwritten-article-slug'
}

const mockActions = {
  notReconized: {
    type: 'This action is not be recognized by the reducer'
  },
  [types.FETCH_ARTICLE_SUCCESS]: {
    type: types.FETCH_ARTICLE_SUCCESS,
    ...mockActionFetchArticleResult
  },
  [types.FETCH_TOPIC_SUCCESS]: {
    type: types.FETCH_TOPIC_SUCCESS,
    slug: 'test-overwritten-topic-slug',
    response: _.merge({}, { result: 'act_topic_id' }, ...mockActionResponse),
    receivedAt: Date.now()
  },
  [types.FETCH_ARTICLES_BY_GROUP_UUID_SUCCESS]: {
    type: types.FETCH_ARTICLES_BY_GROUP_UUID_SUCCESS,
    ...mockActionResponse
  },
  [types.FETCH_FEATURE_ARTICLES_SUCCESS]: {
    type: types.FETCH_FEATURE_ARTICLES_SUCCESS,
    ...mockActionResponse
  },
  [types.FETCH_RELATED_ARTICLES_SUCCESS]: {
    type: types.FETCH_RELATED_ARTICLES_SUCCESS,
    ...mockActionResponse
  }
}

/* -------- TESTING of `entities` reducer -------- */

describe('Testing entities reducer:', () => {
  describe('IF action.response.entities does not exist', () => {
    describe('AND IF previous state does not exist', () => {
      it('SHOULD return the initial state', () => {
        expect(
          reducers.entities(undefined, mockActions.notReconized)
        ).to.deep.equal(initialState)
      })
    })
    describe('AND IF previous state exist', () => {
      it('SHOULD return the previous state', () => {
        expect(
          reducers.entities(mockPreviousState_entities, mockActions.notReconized)
        ).to.deep.equal(mockPreviousState_entities)
      })
    })
  })
  describe('IF action.response.entities exist', () => {
    describe('AND IF previous state does not exist, the reducer', () => {
      it('SHOULD return state with action.response.entities', () => {
        expect(
          reducers.entities(undefined, mockActionWithEntities)
        ).to.deep.equal(
          mockActionWithEntities.response.entities
          )
      })
    })
    describe('AND IF previous state exist, the merging function in reducer', () => {
      it('SHOULD replace the value with new one IF target value is primitive', () => {
        // Check if target value is a number
        expect(
          reducers.entities(mockPreviousState_entities, mockActionWithEntities)
            .mockAuthorData
            .authorId001
            .numberValue
        ).to.equal(
          mockExpectedState_entities
            .mockAuthorData
            .authorId001
            .numberValue
          )
        // Check if target value is a string
        expect(
          reducers.entities(mockPreviousState_entities, mockActionWithEntities)
            .mockAuthorData
            .authorId001
            .stringValue
        ).to.equal(
          mockExpectedState_entities
            .mockAuthorData
            .authorId001
            .stringValue
          )
        // Check if target value is a boolean
        expect(
          reducers.entities(mockPreviousState_entities, mockActionWithEntities)
            .mockAuthorData
            .authorId001
            .booleanValue
        ).to.equal(
          mockExpectedState_entities
            .mockAuthorData
            .authorId001
            .booleanValue
          )
      })
      it('SHOULD replace the array items with new ones WHEN the target values are primitives', () => {
        expect(
          reducers.entities(mockPreviousState_entities, mockActionWithEntities)
            .mockAuthorData
            .authorId001
            .arrayWithPrimitives
        ).to.deep.equal(
          mockExpectedState_entities
            .mockAuthorData
            .authorId001
            .arrayWithPrimitives
          )
      })
      it('SHOULD merge the values WHEN target array items are plain objects or arrays', () => {
        expect(
          reducers.entities(mockPreviousState_entities, mockActionWithEntities)
            .mockAuthorData
            .authorId001
            .arrayWithArrays
        ).to.deep.equal(
          mockExpectedState_entities
            .mockAuthorData
            .authorId001
            .arrayWithArrays
          )
        expect(
          reducers.entities(mockPreviousState_entities, mockActionWithEntities)
            .mockAuthorData
            .authorId001
            .arrayWithObjects
        ).to.deep.equal(
          mockExpectedState_entities
            .mockAuthorData
            .authorId001
            .arrayWithObjects
          )
      })
      it('SHOULD replace the object items with new ones WHEN the target values are primitives', () => {
        expect(
          reducers.entities(mockPreviousState_entities, mockActionWithEntities)
            .mockAuthorData
            .authorId001
            .articlesObjectList01
        ).to.deep.equal(
          mockExpectedState_entities
            .mockAuthorData
            .authorId001
            .articlesObjectList01
          )
      })
      it('SHOULD merge the values WHEN target object items are plain objects or arrays', () => {
        expect(
          reducers.entities(mockPreviousState_entities, mockActionWithEntities)
            .mockAuthorData
            .authorId001
            .articlesObjectList02
        ).to.deep.equal(
          mockExpectedState_entities
            .mockAuthorData
            .authorId001
            .articlesObjectList02
          )
      })
    })
  })
})

/* -------- TESTING of `articleSlugToId` reducer -------- */

describe('Testing articleSlugToId reducer:', () => {
  describe(`If action type is ${types.FETCH_ARTICLE_SUCCESS}`, () => {
    const action = mockActions[types.FETCH_ARTICLE_SUCCESS]
    it('SHOULD return expected state(on initial state) WHEN previous state is undefined', () => {
      expect(
        reducers.articleSlugToId(undefined, action)
      ).to.deep.equal({
        [action.slug]: action.response.result
      })
    })
    it('SHOULD return expected state(on previous state) WHEN previous state exist', () => {
      expect(
        reducers.articleSlugToId(mockPreviousState_articleSlugToId, action)
      ).to.deep.equal(mockExpectedState_articleSlugToId)
    })
  })

  describe(`If action type is ${types.FETCH_ARTICLES_BY_GROUP_UUID_SUCCESS}`, () => {
    const action = mockActions[types.FETCH_ARTICLES_BY_GROUP_UUID_SUCCESS]
    it('SHOULD return expected state(on initial state) WHEN previous state is undefined', () => {
      let expectedState = {}
      _.forEach(action.response.entities.articles, (article) => {
        expectedState[article.slug] = article.id
      })
      expect(
        reducers.articleSlugToId(undefined, action)
      ).to.deep.equal(
        expectedState
      )
    })
    it('SHOULD return expected state(on previous state) WHEN previous state exist', () => {
      expect(
        reducers.articleSlugToId(mockPreviousState_articleSlugToId, action)
      ).to.deep.equal(mockExpectedState_articleSlugToId)
    })
  })

  describe(`If action type is ${types.FETCH_FEATURE_ARTICLES_SUCCESS}`, () => {
    const action = mockActions[types.FETCH_FEATURE_ARTICLES_SUCCESS]
    it('SHOULD return expected state(on initial state) WHEN previous state is undefined', () => {
      let expectedState = {}
      _.forEach(action.response.entities.articles, (article) => {
        expectedState[article.slug] = article.id
      })
      expect(
        reducers.articleSlugToId(undefined, action)
      ).to.deep.equal(
        expectedState
      )
    })
    it('SHOULD return expected state(on previous state) WHEN previous state exist', () => {
      expect(
        reducers.articleSlugToId(mockPreviousState_articleSlugToId, action)
      ).to.deep.equal(mockExpectedState_articleSlugToId)
    })
  })

  describe(`If action type is ${types.FETCH_RELATED_ARTICLES_SUCCESS}`, () => {
    const action = mockActions[types.FETCH_RELATED_ARTICLES_SUCCESS]
    it('SHOULD return expected state(on initial state) WHEN previous state is undefined', () => {
      let expectedState = {}
      _.forEach(action.response.entities.articles, (article) => {
        expectedState[article.slug] = article.id
      })
      expect(
        reducers.articleSlugToId(undefined, action)
      ).to.deep.equal(
        expectedState
      )
    })
    it('SHOULD return expected state(on previous state) WHEN previous state exist', () => {
      expect(
        reducers.articleSlugToId(mockPreviousState_articleSlugToId, action)
      ).to.deep.equal(mockExpectedState_articleSlugToId)
    })
  })
})

/* -------- TESTING of `topicSlugToId` reducer -------- */

describe('Testing topicSlugToId reducer:', () => {
  describe('IF action cannot be recognized, ', () => {
    it('SHOULD return initial state WHEN previous state is undefined', () => {
      expect(
        reducers.topicSlugToId(undefined, mockActions.notReconized)
      ).to.deep.equal(initialState)
    })

    it('SHOULD return previous state WHEN previous state exsist', () => {
      expect(
        reducers.topicSlugToId(mockPreviousState_topicSlugToId, mockActions.notReconized)
      ).to.deep.equal(mockPreviousState_topicSlugToId)
    })
  })
  describe(`If action type is ${types.FETCH_TOPIC_SUCCESS}`, () => {
    const action = mockActions[types.FETCH_TOPIC_SUCCESS]
    it('SHOULD return expected state(on initial state) WHEN previous state is undefined', () => {
      expect(
        reducers.topicSlugToId(undefined, action)
      ).to.deep.equal({
        [action.slug]: action.response.result
      })
    })

    it('SHOULD return expected state(on previous state) WHEN previous state exist', () => {
      expect(
        reducers.topicSlugToId(mockPreviousState_topicSlugToId, action)
      ).to.deep.equal(mockExpectedState_topicSlugToId)
    })
  })
})


