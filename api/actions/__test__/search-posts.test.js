/* global describe, it, before */
'use strict'
import { expect } from 'chai'
import proxyquire from 'proxyquire'

describe('Search Posts Testing: set up config', function () {

  // coder define the query in src/actions/authors.js
  let mockQuery, mockReq, mockResponse, error, mockSearchPosts, mockClient

  before(function () {
    // hitsPerPage should be a constant in real case
    // page: target page for algolia
    mockQuery = {
      keywords: 'authorId',
      hitsPerPage: 5,
      page: 0
    }
    mockReq = {
      query: mockQuery
    }
    mockResponse = {
      hits:[],
      nbHits: 100,
      page: 0,
      nbPages: 8,
      hitsPerPage: 24,
      processingTimeMS: 1,
      exhaustiveNbHits: true,
      query: 'authorId',
      params: 'query=authorId&hitsPerPage=5&page=0'
    }
    error = new Error('The testing error')
    mockClient = (thePromise) => {
      return {
        initIndex: () => {
          return {
            search: ()=> {
              return thePromise === 'resolved' ? Promise.resolve(mockResponse) : Promise.reject(error)
            }
          }
        }
      }
    }

    mockSearchPosts = (thePromise) => {
      return proxyquire('../search-posts', { 'algoliasearch': () => mockClient(thePromise) })
    }

  })

  describe('Search Posts Testing: start', function () {
    it('should return content which is same as the expected one. Resolved case', function () {
      return mockSearchPosts('resolved').searchPosts(mockReq)
              .then((response) => {
                expect(response).to.deep.equal(mockResponse)
              })
    })

    it('should return content which is same as the expected one. Rejected case', function () {
      return mockSearchPosts('rejected').searchPosts(mockReq)
              .catch((response) => {
                expect(response).to.deep.equal(error)
              })
    })
  })
})
