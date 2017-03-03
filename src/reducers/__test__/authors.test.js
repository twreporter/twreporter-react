/*global describe, it, context*/
'use strict'
import { expect } from 'chai'
import { authorsList as reducer, searchedAuthorsList as searchedReducer } from '../../../src/reducers/authors'
// import * as types from '../../../src/constants/action-types'
import { mockStatesSet, mockActionsSet, searchedMockStatesSet, MOCK_KEYWORDS } from './mocks/authorsV2'

describe('Authors Reducer Testing', function () {
  context('authors list page and load more', function () {
    describe('The Action: undefinied || Initialize App', function () {
      it('should return the initial state when previous state is undefined', function () {
        const initialState = mockStatesSet.initialState
        expect(
          reducer(undefined, {})
        ).to.deep.equal(initialState)
      })
      it('should return the previous state when previous state exist', function () {
        const expectedState = mockStatesSet.expStateSucwithInit
        expect(
          reducer(mockStatesSet.expStateSucwithInit, {})
        ).to.deep.equal(expectedState)
      })
    })

    describe('The Action: LIST_ALL_AUTHORS_REQUEST', function () {
      it('should return expected state when previous state is initial state', function () {
        const initialState = mockStatesSet.initialState
        const expectedState = { ...mockStatesSet.initialState, isFetching: true }
        expect(
          reducer(initialState, mockActionsSet.LIST_ALL_AUTHORS_REQUEST)
        ).to.deep.equal(expectedState)
      })
      it('should return the expected state when previous state exist', function () {
        const preState = mockStatesSet.expStateSucwithInit
        const expectedState = { ...mockStatesSet.expStateSucwithInit, isFetching: true }
        expect(
          reducer(preState, mockActionsSet.LIST_ALL_AUTHORS_REQUEST)
        ).to.deep.equal(expectedState)
      })
    })

    describe('The Action: LIST_ALL_AUTHORS_SUCCESS', function () {
      it('should return expected state when previous state is initialState', function () {
        const initialState = { ...mockStatesSet.initialState, isFetching: true }
        const expectedState = mockStatesSet.expStateSucwithInit
        expect(
          reducer(initialState, mockActionsSet.LIST_ALL_AUTHORS_SUCCESS)
        ).to.deep.equal(expectedState)
      })
      it('should return expected state when previous state exist', function () {
        const preState = { ...mockStatesSet.expStateSucwithInit, isFetching: true }
        const expectedState = mockStatesSet.expStateSucwithPre
        expect(
          reducer(preState, { ...mockActionsSet.LIST_ALL_AUTHORS_SUCCESS })
        ).to.deep.equal(expectedState)
      })
    })

    describe('The Action: LIST_ALL_AUTHORS_FAILURE', function () {
      it('should return expected state when previous state is initial state', function () {
        const initialState = { ...mockStatesSet.initialState, isFetching: true }
        const expectedState = mockStatesSet.expStateFailwithInit
        expect(
          reducer(initialState, mockActionsSet.LIST_ALL_AUTHORS_FAILURE)
        ).to.deep.equal(expectedState)
      })
      it('should return expected state when previous state exist', function () {
        const preState = { ...mockStatesSet.expStateSucwithInit, isFetching: true }
        const expectedState = mockStatesSet.expStateFailwithPre
        expect(
          reducer(preState, mockActionsSet.LIST_ALL_AUTHORS_FAILURE)
        ).to.deep.equal(expectedState)
      })
    })
  })

  context('search specific author', function () {
    describe('The Action: undefinied || Initialize App', function () {
      it('should return the initial state when previous state is undefined', function () {
        const initialState = searchedMockStatesSet.initialState
        expect(
          searchedReducer(undefined, {})
        ).to.deep.equal(initialState)
      })
      it('should return the previous state when previous state exist', function () {
        const expectedState = searchedMockStatesSet.expStateSuc
        expect(
          searchedReducer(searchedMockStatesSet.expStateSuc, {})
        ).to.deep.equal(expectedState)
      })
    })

    describe('The Action: SEARCH_AUTHORS_REQUEST', function () {
      it('should return expected state when previous state is initial state', function () {
        const initialState = {}
        const expectedState = { ...searchedMockStatesSet.initialState, isFetching: true, keywords: MOCK_KEYWORDS }
        expect(
          searchedReducer(initialState, mockActionsSet.SEARCH_AUTHORS_REQUEST)
        ).to.deep.equal(expectedState)
      })
      it('should return the expected state when previous state exist', function () {
        const preState = searchedMockStatesSet.expStateSucwithInit
        const expectedState = { ...searchedMockStatesSet.initialState, isFetching: true, keywords: MOCK_KEYWORDS }
        expect(
          searchedReducer(preState, mockActionsSet.SEARCH_AUTHORS_REQUEST)
        ).to.deep.equal(expectedState)
      })
    })

    describe('The Action: SEARCH_AUTHORS_SUCCESS', function () {
      it('should return expected state when previous state is initialState', function () {
        const initialState = { ...searchedMockStatesSet.initialState, isFetching: true, keywords: MOCK_KEYWORDS }
        const expectedState = searchedMockStatesSet.expStateSuc
        expect(
          searchedReducer(initialState, mockActionsSet.SEARCH_AUTHORS_SUCCESS)
        ).to.deep.equal(expectedState)
      })
      it('should return expected state when previous state exist, but pre state will be replaced by init state added with new keywords and isFetching', function () {
        const preState = { ...searchedMockStatesSet.initialState, isFetching: true, keywords: MOCK_KEYWORDS }
        const expectedState = searchedMockStatesSet.expStateSuc
        expect(
          searchedReducer(preState, mockActionsSet.SEARCH_AUTHORS_SUCCESS)
        ).to.deep.equal(expectedState)
      })
    })

    describe('The Action: SEARCH_AUTHORS_FAILURE', function () {
      it('should return expected state when previous state is initial state', function () {
        const initialState = { ...searchedMockStatesSet.initialState, isFetching: true, keywords: MOCK_KEYWORDS }
        const expectedState = searchedMockStatesSet.expStateFail
        expect(
          searchedReducer(initialState, mockActionsSet.SEARCH_AUTHORS_FAILURE)
        ).to.deep.equal(expectedState)
      })
      it('should return expected state when previous state exist, but pre state will be replaced by init state added with new keywords and isFetching', function () {
        const preState = { ...searchedMockStatesSet.initialState, isFetching: true, keywords: MOCK_KEYWORDS }
        const expectedState = searchedMockStatesSet.expStateFail
        expect(
          searchedReducer(preState, mockActionsSet.SEARCH_AUTHORS_FAILURE)
        ).to.deep.equal(expectedState)
      })
    })
  })

})
