/*global describe, it*/
'use strict'
import { expect } from 'chai'
import reducer from '../../../src/reducers/groups'
import * as types from '../../../src/constants/action-types'

const mockTagsName = [ 'mock-tag-1', 'mock-tag-2' ]
const mockCatsName = [ 'mock-cat-1', 'mock-cat-2' ]

describe('groups reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).to.deep.equal({})
  })

  it('should handle FETCH_TAGS_REQUEST and FETCH_CATEGORIES_REQUEST', () => {
    expect(
      reducer([], {
        type: types.FETCH_TAGS_REQUEST,
        groups: mockTagsName
      })
    ).to.deep.equal({
      [mockTagsName[0]]: {
        isFetching: true,
        error: null
      },
      [mockTagsName[1]]: {
        isFetching: true,
        error: null
      }
    })

    expect(
      reducer([], {
        type: types.FETCH_CATEGORIES_REQUEST,
        groups: mockCatsName
      })
    ).to.deep.equal({
      [mockCatsName[0]]: {
        isFetching: true,
        error: null
      },
      [mockCatsName[1]]: {
        isFetching: true,
        error: null
      }
    })
  })

  it('should handle FETCH_TAGS_FAILURE and FETCH_CATEGORIES_FAILURE', () => {
    expect(
      reducer([], {
        type: types.FETCH_TAGS_FAILURE,
        groups: mockTagsName,
        error: new Error('Test Error'),
        failedAt: 1234567890
      })
    ).to.deep.equal({
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
    })

    expect(
      reducer([], {
        type: types.FETCH_CATEGORIES_FAILURE,
        groups: mockCatsName,
        error: new Error('Test Error'),
        failedAt: 1234567890
      })
    ).to.deep.equal({
      [mockCatsName[0]]: {
        isFetching: false,
        error: new Error('Test Error'),
        lastUpdated: 1234567890
      },
      [mockCatsName[1]]: {
        isFetching: false,
        error: new Error('Test Error'),
        lastUpdated: 1234567890
      }
    })
  })

  it('should handle FETCH_TAGS_SUCCESS and FETCH_CATEGORIES_SUCCESS', () => {
    expect(
      reducer([], {
        type: types.FETCH_TAGS_SUCCESS,
        response: {
          entities: {
            tags: {
              'mock-tag-id-1': {
                name: mockTagsName[0]
              },
              'mock-tag-id-2': {
                name: mockTagsName[1]
              }
            }
          },
          result: [ 'mock-tag-id-1', 'mock-tag-id-2' ]
        },
        receivedAt: 1234567890
      })
    ).to.deep.equal({
      [mockTagsName[0]]: {
        id: 'mock-tag-id-1',
        isFetching: false,
        error: null,
        lastUpdated: 1234567890
      },
      [mockTagsName[1]]: {
        id: 'mock-tag-id-2',
        isFetching: false,
        error: null,
        lastUpdated: 1234567890
      }
    })

    expect(
      reducer([], {
        type: types.FETCH_CATEGORIES_SUCCESS,
        response: {
          entities: {
            categories: {
              'mock-cat-id-1': {
                name: mockCatsName[0]
              },
              'mock-cat-id-2': {
                name: mockCatsName[1]
              }
            }
          },
          result: [ 'mock-cat-id-1', 'mock-cat-id-2' ]
        },
        receivedAt: 1234567890
      })
    ).to.deep.equal({
      [mockCatsName[0]]: {
        id: 'mock-cat-id-1',
        isFetching: false,
        error: null,
        lastUpdated: 1234567890
      },
      [mockCatsName[1]]: {
        id: 'mock-cat-id-2',
        isFetching: false,
        error: null,
        lastUpdated: 1234567890
      }
    })
  })
})
