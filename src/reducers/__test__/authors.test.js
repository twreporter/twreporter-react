/*global describe, it*/
'use strict'
import { expect } from 'chai'
import { authorsList as reducer } from '../../../src/reducers/authors'
// import * as types from '../../../src/constants/action-types'
import { mockStates, mockActions, MOCK_KEYWORDS } from './mocks/authors'

describe('Authors Reducer Testing', function () {
  describe('The Action: undefinied || Initialize App', function () {
    it('should return the initial state when previous state is undefined', function () {
      const initialState = mockStates.InitialState
      expect(
        reducer(undefined, {})
      ).to.deep.equal(initialState)
    })
    it('should return the previous state when previous state exist', function () {
      const expectedState = mockStates.ExpStateSucwithInit
      expect(
        reducer(mockStates.ExpStateSucwithInit, {})
      ).to.deep.equal(expectedState)
    })
  })

  describe('The Action: SEARCH_AUTHORS_REQUEST', function () {
    it('should return expected state when previous state is initial state', function () {
      const initialState = mockStates.InitialState
      const expectedState = { ...mockStates.InitialState, isFetching: true }
      expect(
        reducer(initialState, mockActions.SEARCH_AUTHORS_REQUEST)
      ).to.deep.equal(expectedState)
    })
    it('should return the expected state when previous state exist', function () {
      const preState = mockStates.ExpStateSucwithInit
      const expectedState = { ...mockStates.ExpStateSucwithInit, isFetching: true }
      expect(
        reducer(preState, mockActions.SEARCH_AUTHORS_REQUEST)
      ).to.deep.equal(expectedState)
    })
  })

  describe('The Action: SEARCH_AUTHORS_SUCCESS', function () {
    describe('Previous State: Initial State. One Case: replaceAll is false', function () {
      it('should return expected state when previous state is initialState and replaceAll is false', function () {
        const initialState = { ...mockStates.InitialState, isFetching: true }
        const expectedState = mockStates.ExpStateSucwithInit
        expect(
          reducer(initialState, mockActions.SEARCH_AUTHORS_SUCCESS)
        ).to.deep.equal(expectedState)
      })
    })
    describe('Previous State: Exist. Two Cases: replaceAll is true || false', function () {
      it('should return expected state when previous state exist and replaceAll is false', function () {
        const preState = { ...mockStates.ExpStateSucwithInit, isFetching: true }
        const expectedState = mockStates.ExpStateSucwithPrefalse
        expect(
          reducer(preState, { ...mockActions.SEARCH_AUTHORS_SUCCESS, keywords: MOCK_KEYWORDS })
        ).to.deep.equal(expectedState)
      })
      it('should return expected state when previous state exist and replaceAll is true', function () {
        const preState = { ...mockStates.ExpStateSucwithInit, isFetching: true }
        const expectedState = mockStates.ExpStateSucwithPretrue
        expect(
          reducer(preState, { ...mockActions.SEARCH_AUTHORS_SUCCESS, replaceAll: true, keywords: MOCK_KEYWORDS })
        ).to.deep.equal(expectedState)
      })
    })
  })
  describe('The Action: SEARCH_AUTHORS_FAILURE', function () {
    it('should return expected state when previous state is initial state', function () {
      const initialState = { ...mockStates.InitialState, isFetching: true }
      const expectedState = mockStates.ExpStateFailwithInit
      expect(
        reducer(initialState, mockActions.SEARCH_AUTHORS_FAILURE)
      ).to.deep.equal(expectedState)
    })
    it('should return expected state when previous state exist', function () {
      const preState = { ...mockStates.ExpStateSucwithInit, isFetching: true }
      const expectedState = mockStates.ExpStateFailwithPre
      expect(
        reducer(preState, mockActions.SEARCH_AUTHORS_FAILURE)
      ).to.deep.equal(expectedState)
    })
  })

})
