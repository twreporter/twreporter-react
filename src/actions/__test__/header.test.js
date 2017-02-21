/* global describe, it */

/*
  Testing functions:
    setReadProgress
    setPageType
    setPageTheme
    setPageTitle
    setArticleTopicList
    setBookmarksOfLongformArticle
    setHeaderInfo
*/

'use strict'

import { expect } from 'chai'
import * as actions from '../header'
import * as types from '../../constants/action-types'

describe('Testing header actions:', () => {
  describe('Testing `setReadProgress` action creator:', () => {
    it('Should return percen ranges from 0 to 100', () => {
      const percntSmallThan0 = -40
      const expectedState_0 = {
        type: types.SET_PROGRESS_PRECENTAGE,
        percent: 0
      }
      expect(actions.setReadProgress(percntSmallThan0)).to.deep.equal(expectedState_0)
      const percent = 20
      const expectedState_percent = {
        type: types.SET_PROGRESS_PRECENTAGE,
        percent: 20
      }
      expect(actions.setReadProgress(percent)).to.deep.equal(expectedState_percent)
      const percntGreaterThan100 = 300
      const expectedState_100 = {
        type: types.SET_PROGRESS_PRECENTAGE,
        percent: 100
      }
      expect(actions.setReadProgress(percntGreaterThan100)).to.deep.equal(expectedState_100)
    })
  })
  describe('Testing `setPageType` action creator:', () => {
    it('Should return pageType and percent=0', () => {
      const pageType = 'mockPageType'
      const expectedState = {
        type: types.SET_PAGE_TYPE,
        pageType: 'mockPageType',
        percent: 0
      }
      expect(actions.setPageType(pageType)).to.deep.equal(expectedState)
    })
  })
  describe('Testing `setPageTheme` action creator:', () => {
    it('Should return pageTheme', () => {
      const pageTheme = 'mockPageTheme'
      const expectedState = {
        type: types.SET_PAGE_THEME,
        pageTheme: 'mockPageTheme'
      }
      expect(actions.setPageTheme(pageTheme)).to.deep.equal(expectedState)
    })
  })
  describe('Testing `setPageTitle` action creator:', () => {
    it('Should return articleId, pageTitle, and pageTopic', () => {
      const articleId = 'mockArticleId',
        pageTitle = 'mockPageTitle',
        pageTopic = 'mockPageTopic'
      const expectedState = {
        type: types.SET_PAGE_TITLE,
        articleId: 'mockArticleId',
        pageTitle: 'mockPageTitle',
        pageTopic: 'mockPageTopic'
      }
      const expectedState_noTopic = {
        type: types.SET_PAGE_TITLE,
        articleId: 'mockArticleId',
        pageTitle: 'mockPageTitle',
        pageTopic: null
      }
      expect(actions.setPageTitle(articleId, pageTitle, pageTopic)).to.deep.equal(expectedState)
      expect(actions.setPageTitle(articleId, pageTitle)).to.deep.equal(expectedState_noTopic)
    })
  })
  describe('Testing `setArticleTopicList` action creator:', () => {
    it('Should return topicArr', () => {
      const topicArr = [ 'mockTopic1', 'mockTopic2' ]
      const expectedState = {
        type: types.SET_ARTICLE_TOPIC_LIST,
        topicArr: [ 'mockTopic1', 'mockTopic2' ]
      }
      expect(actions.setArticleTopicList(topicArr)).to.deep.equal(expectedState)
    })
  })
  describe('Testing `setBookmarksOfLongformArticle` action creator:', () => {
    it('Should return bookmarks', () => {
      const bookmarks = [ 'mockBookmark1', 'mockBookmark2' ]
      const expectedState = {
        type: types.SET_BOOKMARKS_OF_LONGFORM_ARTICLE,
        bookmarks: [ 'mockBookmark1', 'mockBookmark2' ]
      }
      expect(actions.setBookmarksOfLongformArticle(bookmarks)).to.deep.equal(expectedState)
    })
  })
  describe('Testing `setHeaderInfo` action creator:', () => {
    it('Should return info', () => {
      const info = {
        articleId: 'mockArticleId',
        bookmarks: [ 'mockBookmark1', 'mockBookmark2' ],
        readPercent: 10,
        pageTitle: 'mockPageTitle',
        pageTheme: 'mockPageTheme',
        pagetTopic: 'mockPagetTopic',
        pageType: 'mockPageType',
        topicArr: [ 'mockTopic1', 'mockTopic2' ]
      }
      const expectedState = {
        type: types.SET_HEADER_INFO,
        info: {
          articleId: 'mockArticleId',
          bookmarks: [ 'mockBookmark1', 'mockBookmark2' ],
          readPercent: 10,
          pageTitle: 'mockPageTitle',
          pageTheme: 'mockPageTheme',
          pagetTopic: 'mockPagetTopic',
          pageType: 'mockPageType',
          topicArr: [ 'mockTopic1', 'mockTopic2' ]
        }
      }
      expect(actions.setHeaderInfo(info)).to.deep.equal(expectedState)
    })
  })
})
