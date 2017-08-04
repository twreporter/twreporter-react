/* global describe, it */
'use strict'

import { expect } from 'chai'
import reducer from '../header'
import * as types from '../../constants/action-types'

const initialState = {
  articleTools: {
    isDesktopToolsDisplayed: false,
    isMobileToolsDisplayed: false
  }
}

const mockPreviousState = {
  mockPropertyA: 'mock property A',
  mockPropertyB: [ 'mock property B-1', 'mock property B-2' ],
  info: {
    mockInfoA: 'B',
    mockInfoB: [ 'C-1', 'C-2' ]
  },
  percent: 50,
  pageTheme: 'Mock Theme',
  articleId: 'Mock Article Id',
  pageTitle: 'Mock Page Title',
  pageTopic: null,
  topicArr: [ 'Mock Topic A', 'Mock Topic B' ],
  bookmarks: [ 'Mock Bookmark A', 'Mock Bookmark B' ]
}

const mockActions = {
  notReconized: {
    type: 'This action is not be recognized by the reducer' 
  },
  [types.SET_HEADER_INFO]: {
    type: types.SET_HEADER_INFO,
    info: {
      mockInfoA: 'A',
      mockInfoB: [ 'B-1', 'B-2' ]
    }
  },
  [types.SET_PROGRESS_PRECENTAGE]: {
    type: types.SET_PROGRESS_PRECENTAGE,
    percent: 70
  },
  [types.SET_PAGE_TYPE]: {
    type: types.SET_PAGE_TYPE,
    pageType: 'Mock Action: Type of Page',
    percent: 0
  },
  [types.SET_PAGE_THEME]: {
    type: types.SET_PAGE_THEME,
    pageTheme: 'Mock Action: Theme'
  },
  [types.SET_PAGE_TITLE]: {
    type: types.SET_PAGE_TITLE,
    articleId: 'Mock Action: Article Id',
    pageTitle: 'Mock Action: Page Title',
    pageTopic: null
  },
  [types.SET_ARTICLE_TOPIC_LIST]: {
    type: types.SET_ARTICLE_TOPIC_LIST,
    topicArr: [ 'Mock Action: Topic C', 'Mock Action: Topic D' ]
  },
  [types.SET_BOOKMARKS_OF_LONGFORM_ARTICLE]: {
    type: types.SET_BOOKMARKS_OF_LONGFORM_ARTICLE,
    bookmarks: [ 'Mock Action: Bookmark C', 'Mock Action: Bookmark D' ]
  }
}


describe('Testing header reducer:', () => {

  describe('IF action cannot be recognized, ', () => {
    it ('SHOULD return initial state WHEN previous state is undefined', () => {
      expect(
        reducer(undefined, mockActions.notReconized)
      ).to.deep.equal(initialState)
    })

    it ('SHOULD return previous state WHEN previous state exsist', () => {
      expect(
        reducer(mockPreviousState, mockActions.notReconized)
      ).to.deep.equal(mockPreviousState)
    })
  })

  describe(`If action type is ${types.SET_HEADER_INFO},`, () => {
    it ('SHOULD return expected state(on initial state) WHEN previous state is undefined', () => {
      const expectedStateOnInit = Object.assign({}, initialState, {
        ...mockActions[types.SET_HEADER_INFO].info
      })
      expect(
        reducer(undefined, mockActions[types.SET_HEADER_INFO])
      ).to.deep.equal(expectedStateOnInit)
    })

    it ('SHOULD return expected state(on previous state) WHEN previous state exist', () => {
      const expectedStateOnPrev = Object.assign({}, mockPreviousState, {
        ...mockActions[types.SET_HEADER_INFO].info
      })
      expect(
        reducer(mockPreviousState, mockActions[types.SET_HEADER_INFO])
      ).to.deep.equal(expectedStateOnPrev)
    })
  })

  describe(`If action type is ${types.SET_PROGRESS_PRECENTAGE},`, () => {
    it ('SHOULD return expected state(on initial state) WHEN previous state is undefined', () => {
      const expectedStateOnInit = Object.assign({}, initialState, {
        readPercent: mockActions[types.SET_PROGRESS_PRECENTAGE].percent
      })
      expect(
        reducer(undefined, mockActions[types.SET_PROGRESS_PRECENTAGE])
      ).to.deep.equal(expectedStateOnInit)
    })

    it ('SHOULD return expected state(on previous state) WHEN previous state exist', () => {
      const expectedStateOnPrev = Object.assign({}, mockPreviousState, {
        readPercent: mockActions[types.SET_PROGRESS_PRECENTAGE].percent
      })
      expect(
        reducer(mockPreviousState, mockActions[types.SET_PROGRESS_PRECENTAGE])
      ).to.deep.equal(expectedStateOnPrev)
    })
  })

  describe(`If action type is ${types.SET_PAGE_TYPE},`, () => {
    it ('SHOULD return expected state(on initial state) WHEN previous state is undefined', () => {
      const expectedStateOnInit = Object.assign({}, initialState, {
        pageType: mockActions[types.SET_PAGE_TYPE].pageType,
        readPercent: mockActions[types.SET_PAGE_TYPE].percent
      })
      expect(
        reducer(undefined, mockActions[types.SET_PAGE_TYPE])
      ).to.deep.equal(expectedStateOnInit)
    })

    it ('SHOULD return expected state(on previous state) WHEN previous state exist', () => {
      const expectedStateOnPrev = Object.assign({}, mockPreviousState, {
        pageType: mockActions[types.SET_PAGE_TYPE].pageType,
        readPercent: mockActions[types.SET_PAGE_TYPE].percent
      })
      expect(
        reducer(mockPreviousState, mockActions[types.SET_PAGE_TYPE])
      ).to.deep.equal(expectedStateOnPrev)
    })
  })

  describe(`If action type is ${types.SET_PAGE_THEME},`, () => {
    it ('SHOULD return expected state(on initial state) WHEN previous state is undefined', () => {
      const expectedStateOnInit = Object.assign({}, initialState, {
        pageTheme: mockActions[types.SET_PAGE_THEME].pageTheme
      })
      expect(
        reducer(undefined, mockActions[types.SET_PAGE_THEME])
      ).to.deep.equal(expectedStateOnInit)
    })

    it ('SHOULD return expected state(on previous state) WHEN previous state exist', () => {
      const expectedStateOnPrev = Object.assign({}, mockPreviousState, {
        pageTheme: mockActions[types.SET_PAGE_THEME].pageTheme
      })
      expect(
        reducer(mockPreviousState, mockActions[types.SET_PAGE_THEME])
      ).to.deep.equal(expectedStateOnPrev)
    })
  })

  describe(`If action type is ${types.SET_PAGE_TITLE},`, () => {
    it ('SHOULD return expected state(on initial state) WHEN previous state is undefined', () => {
      const expectedStateOnInit = Object.assign({}, initialState, {
        articleId: mockActions[types.SET_PAGE_TITLE].articleId,
        pageTitle: mockActions[types.SET_PAGE_TITLE].pageTitle,
        pageTopic: mockActions[types.SET_PAGE_TITLE].pageTopic
      })
      expect(
        reducer(undefined, mockActions[types.SET_PAGE_TITLE])
      ).to.deep.equal(expectedStateOnInit)
    })

    it ('SHOULD return expected state(on previous state) WHEN previous state exist', () => {
      const expectedStateOnPrev = Object.assign({}, mockPreviousState, {
        articleId: mockActions[types.SET_PAGE_TITLE].articleId,
        pageTitle: mockActions[types.SET_PAGE_TITLE].pageTitle,
        pageTopic: mockActions[types.SET_PAGE_TITLE].pageTopic
      })
      expect(
        reducer(mockPreviousState, mockActions[types.SET_PAGE_TITLE])
      ).to.deep.equal(expectedStateOnPrev)
    })
  })

  describe(`If action type is ${types.SET_ARTICLE_TOPIC_LIST},`, () => {
    it ('SHOULD return expected state(on initial state) WHEN previous state is undefined', () => {
      const expectedStateOnInit = Object.assign({}, initialState, {
        topicArr: mockActions[types.SET_ARTICLE_TOPIC_LIST].topicArr
      })
      expect(
        reducer(undefined, mockActions[types.SET_ARTICLE_TOPIC_LIST])
      ).to.deep.equal(expectedStateOnInit)
    })

    it ('SHOULD return expected state(on previous state) WHEN previous state exist', () => {
      const expectedStateOnPrev = Object.assign({}, mockPreviousState, {
        topicArr: mockActions[types.SET_ARTICLE_TOPIC_LIST].topicArr
      })
      expect(
        reducer(mockPreviousState, mockActions[types.SET_ARTICLE_TOPIC_LIST])
      ).to.deep.equal(expectedStateOnPrev)
    })
  })

  describe(`If action type is ${types.SET_BOOKMARKS_OF_LONGFORM_ARTICLE},`, () => {
    it ('SHOULD return expected state(on initial state) WHEN previous state is undefined', () => {
      const expectedStateOnInit = Object.assign({}, initialState, {
        bookmarks: mockActions[types.SET_BOOKMARKS_OF_LONGFORM_ARTICLE].bookmarks
      })
      expect(
        reducer(undefined, mockActions[types.SET_BOOKMARKS_OF_LONGFORM_ARTICLE])
      ).to.deep.equal(expectedStateOnInit)
    })

    it ('SHOULD return expected state(on previous state) WHEN previous state exist', () => {
      const expectedStateOnPrev = Object.assign({}, mockPreviousState, {
        bookmarks: mockActions[types.SET_BOOKMARKS_OF_LONGFORM_ARTICLE].bookmarks
      })
      expect(
        reducer(mockPreviousState, mockActions[types.SET_BOOKMARKS_OF_LONGFORM_ARTICLE])
      ).to.deep.equal(expectedStateOnPrev)
    })
  })

})

