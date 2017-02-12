/*global describe, it*/
'use strict'
import { expect } from 'chai'
import { authorsList as reducer } from '../../../src/reducers/authors'
// import * as types from '../../../src/constants/action-types'
import { mockStates, mockActions, MOCK_KEYWORDS } from './mocks/authors'

describe('Authors Reducer Testing', function () {
  describe('The Action: undefinied || Initialize App', function () {
    it('should return the initial state when previous state is undefined', function () {
      const initialState = mockStates.Initial_State
      expect(
        reducer(undefined, {})
      ).to.deep.equal(initialState)
    })
    it('should return the previous state when previous state exist', function () {
      const expectedState = mockStates.Exp_State_Suc_withInit
      expect(
        reducer(mockStates.Exp_State_Suc_withInit, {})
      ).to.deep.equal(expectedState)
    })
  })

  describe('The Action: SEARCH_AUTHORS_REQUEST', function () {
    it('should return expected state when previous state is initial state', function () {
      const initialState = mockStates.Initial_State
      const expectedState = { ...mockStates.Initial_State, isFetching: true }
      expect(
        reducer(initialState, mockActions.SEARCH_AUTHORS_REQUEST)
      ).to.deep.equal(expectedState)
    })
    it('should return the expected state when previous state exist', function () {
      const preState = mockStates.Exp_State_Suc_withInit
      const expectedState = { ...mockStates.Exp_State_Suc_withInit, isFetching: true }
      expect(
        reducer(preState, mockActions.SEARCH_AUTHORS_REQUEST)
      ).to.deep.equal(expectedState)
    })
  })

  describe('The Action: SEARCH_AUTHORS_SUCCESS', function () {
    describe('Previous State: Initial State. One Case: replaceAll is false', function () {
      it('should return expected state when previous state is initialState and replaceAll is false', function () {
        const initialState = { ...mockStates.Initial_State, isFetching: true }
        const expectedState = mockStates.Exp_State_Suc_withInit
        expect(
          reducer(initialState, mockActions.SEARCH_AUTHORS_SUCCESS)
        ).to.deep.equal(expectedState)
      })
    })
    describe('Previous State: Exist. Two Cases: replaceAll is true || false', function () {
      it('should return expected state when previous state exist and replaceAll is false', function () {
        const preState = { ...mockStates.Exp_State_Suc_withInit, isFetching: true }
        const expectedState = mockStates.Exp_State_Suc_withPre_false
        expect(
          reducer(preState, { ...mockActions.SEARCH_AUTHORS_SUCCESS, keywords: MOCK_KEYWORDS })
        ).to.deep.equal(expectedState)
      })
      it('should return expected state when previous state exist and replaceAll is true', function () {
        const preState = { ...mockStates.Exp_State_Suc_withInit, isFetching: true }
        const expectedState = mockStates.Exp_State_Suc_withPre_true
        expect(
          reducer(preState, { ...mockActions.SEARCH_AUTHORS_SUCCESS, replaceAll: true, keywords: MOCK_KEYWORDS })
        ).to.deep.equal(expectedState)
      })
    })
  })
  describe('The Action: SEARCH_AUTHORS_FAILURE', function () {
    it('should return expected state when previous state is initial state', function () {
      const initialState = { ...mockStates.Initial_State, isFetching: true }
      const expectedState = mockStates.Exp_State_Fail_withInit
      expect(
        reducer(initialState, mockActions.SEARCH_AUTHORS_FAILURE)
      ).to.deep.equal(expectedState)
    })
    it('should return expected state when previous state exist', function () {
      const preState = { ...mockStates.Exp_State_Suc_withInit, isFetching: true }
      const expectedState = mockStates.Exp_State_Fail_withPre
      expect(
        reducer(preState, mockActions.SEARCH_AUTHORS_FAILURE)
      ).to.deep.equal(expectedState)
    })
  })

})
