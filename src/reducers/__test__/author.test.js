/*global describe, it*/
'use strict'
import { expect } from 'chai'
import { author as reducer } from '../../../src/reducers/author'
import * as types from '../../../src/constants/action-types'

const initialStates = {
  isFetching: false
}

describe('authoer reducer', function () {
  it('should return the initial state that we declared as const', function () {
    expect(
      reducer(undefined, {})
    ).to.deep.equal(initialStates)
  })

  it('should handle FETCH_AUTHOR_COLLECTION_REQUEST', function () {
    expect(
      reducer({}, {
        type: types.FETCH_AUTHOR_COLLECTION_REQUEST
      })
    ).to.deep.equal({
      isFetching: true
    })
  })

  // it('should handle FETCH_AUTHOR_COLLECTION_SUCCESS', function () {
  //   expect(
  //     reducer({}, {
  //
  //     })
  //   ).to.depp.equal({
  //
  //   })
  // })
})
