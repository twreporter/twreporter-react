'use strict'
import { expect } from 'chai'
import reducer from '../../src/reducers/tags'
import * as types from '../../src/constants/action-types'

const mockTagsName = ['mock-tag-1', 'mock-tag-2']

describe('tags reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).to.deep.equal({})
  })

  it('should handle FETCH_TAGS_REQUEST', () => {
    expect(
      reducer([], {
        type: types.FETCH_TAGS_REQUEST,
        tags: mockTagsName
      })
    ).to.deep.equal(
        {
          [mockTagsName[0]]: {
            isFetching: true,
            error: null
          },
          [mockTagsName[1]]: {
            isFetching: true,
            error: null
          }
        }
    )
  })

  it('should handle FETCH_TAGS_FAILURE', () => {
    expect(
      reducer([], {
        type: types.FETCH_TAGS_FAILURE,
        tags: mockTagsName,
        error: new Error('Test Error'),
        failedAt: 1234567890
      })
    ).to.deep.equal(
        {
          [mockTagsName[0]]: {
            isFetching: false,
            error: new Error('Test Error'),
            lastUpdated: 1234567890
          },
          [mockTagsName[1]]: {
            isFetching: false,
            error: new Error('Test Error'),
            lastUpdated: 1234567890
          }
        }
    )
  })

  it('should handle FETCH_TAGS_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.FETCH_TAGS_SUCCESS,
        response: {
          entities: {},
          result: mockTagsName
        },
        receivedAt: 1234567890
      })
    ).to.deep.equal(
        {
          [mockTagsName[0]]: {
            isFetching: false,
            error: null,
            lastUpdated: 1234567890
          },
          [mockTagsName[1]]: {
            isFetching: false,
            error: null,
            lastUpdated: 1234567890
          }
        }
    )
  })
})
