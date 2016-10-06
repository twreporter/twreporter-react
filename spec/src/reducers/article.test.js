/*global describe, it*/
'use strict'
import { expect } from 'chai'
import reducer from '../../../src/reducers/article'
import * as types from '../../../src/constants/action-types'

describe('article reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).to.deep.equal({})
  })

  it('should handle FETCH_ARTICLE_REQUEST', () => {
    expect(
      reducer([], {
        type: types.FETCH_ARTICLE_REQUEST,
        slug: 'run-the-tests'
      })
    ).to.deep.equal({
      slug: 'run-the-tests',
      isFetching: true,
      error: null
    })
  })

  it('should handle FETCH_ARTICLE_FAILURE', () => {
    expect(
      reducer([], {
        type: types.FETCH_ARTICLE_FAILURE,
        slug: 'run-the-tests',
        error: new Error('Test Error'),
        failedAt: 1234567890
      })
    ).to.deep.equal({
      slug: 'run-the-tests',
      isFetching: false,
      error: new Error('Test Error'),
      lastUpdated: 1234567890
    })
  })

  it('should handle FETCH_ARTICLE_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.FETCH_ARTICLE_SUCCESS,
        slug: 'post-slug-1',
        response: {
          entities: {},
          result: 'post-id-1'
        },
        receivedAt: 1234567890
      })
    ).to.deep.equal({
      slug: 'post-slug-1',
      id: 'post-id-1',
      isFetching: false,
      error: null,
      lastUpdated: 1234567890
    })
  })
})
