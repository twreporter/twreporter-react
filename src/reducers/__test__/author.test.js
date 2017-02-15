/*global describe, it*/
'use strict'
import { expect } from 'chai'
import { author as reducer } from '../../../src/reducers/author'
import { mockActions, mockStates, MOCKID1, MOCKID2, SEC_AUTHOR } from './mocks/author'
import omit from 'lodash/omit'
const _ = { omit }

describe('Author Reducer Testing', function () {
  describe('The Action: undefinied || Initialize App', function () {
    it('should return the initial state when previous state is undefined', function () {
      const initialState = mockStates.InitialState
      expect(
        reducer(undefined, {})
      ).to.deep.equal(initialState)
    })
    it('should return the previous state when previous state exist', function () {
      const preStaet = mockStates.ExpStateSucwithInit
      const expectedState = mockStates.ExpStateSucwithInit
      expect(
        reducer(preStaet, {})
      ).to.deep.equal(expectedState)
    })
  })

  describe('The Action: FETCH_AUTHOR_COLLECTION_REQUEST', function () {
    it('should return expected state when previous state is initial state', function () {
      const initialState = mockStates.InitialState
      const expectedState = { ...mockStates.InitialState, isFetching: true }
      expect(
        reducer(initialState, mockActions.FETCH_AUTHOR_COLLECTION_REQUEST)
      ).to.deep.equal(expectedState)
    })
    it('should return the expected state when previous state exist', function () {
      const preState = mockStates.ExpStateSucwithInit
      const expectedState = { ...mockStates.ExpStateSucwithInit, isFetching: true }
      expect(
        reducer(preState, mockActions.FETCH_AUTHOR_COLLECTION_REQUEST)
      ).to.deep.equal(expectedState)
    })
  })

  describe('The Action: FETCH_AUTHOR_COLLECTION_SUCCESS', function () {
    describe('Previous State: Initial State. One Case', function () {
      it('should return expected state when previous state is initial state', function () {
        const initialState = mockStates.InitialState
        const expectedState = mockStates.ExpStateSucwithInit
        expect(
          reducer(initialState, mockActions.FETCH_AUTHOR_COLLECTION_SUCCESS)
        ).to.deep.equal(expectedState)
      })
    })
    describe('Previous State: Exist. Two Cases: Same Author || Different Authors', function () {
      it('should return expected state when previous state exist and on condition SAME', function () {
        const preState = mockStates.ExpStateSucwithInit
        const expectedState = mockStates.ExpStateSucwithPreSame
        expect(
          reducer(preState, mockActions.FETCH_AUTHOR_COLLECTION_SUCCESS)
        ).to.deep.equal(expectedState)
      })
      it('should return expected state when previous state exist and on condition Diff', function () {
        const preState = mockStates.ExpStateSucwithInit
        const expectedState = mockStates.ExpStateSucwithPreDiff
        const theMockAction = _.omit(mockActions.FETCH_AUTHOR_COLLECTION_SUCCESS, MOCKID1)
        theMockAction[MOCKID2] = SEC_AUTHOR
        expect(
          reducer(preState, theMockAction)
        ).to.deep.equal(expectedState)
      })
    })
  })

  describe('The Action: FETCH_AUTHOR_COLLECTION_FAILURE', function () {
    it('should return expected state when previous state is initial state', function () {
      const initialState = { ...mockStates.InitialState, isFetching: true }
      const expectedState = mockStates.ExpStateFailwithInit
      expect(
        reducer(initialState, mockActions.FETCH_AUTHOR_COLLECTION_FAILURE)
      ).to.deep.equal(expectedState)
    })
    it('should return expected state when previous state exist', function () {
      const preState = { ...mockStates.ExpStateSucwithInit, isFetching: true }
      const expectedState = mockStates.ExpStateFailwithPre
      expect(
        reducer(preState, mockActions.FETCH_AUTHOR_COLLECTION_FAILURE)
      ).to.deep.equal(expectedState)
    })
  })
})
