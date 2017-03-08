/* global describe, it, before */
'use strict'
import { expect } from 'chai'
import proxyquire from 'proxyquire'

describe('Search Authors Testing: set up config', function () {

  // coder define the query in src/actions/authors.js
  let mockQuery, mockReq, mockResponse, error, mockSearchAuthors, mockClient

  before(function () {
    mockQuery = {
      keywords: '',
      filters: 'articlesCount>0',
      hitsPerPage: '10',
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
      query: '',
      params: 'query=&filters=articlesCount%3E0&hitsPerPage=24&page=0'
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

    mockSearchAuthors = (thePromise) => {
      return proxyquire('../search-authors', { 'algoliasearch': () => mockClient(thePromise) })
    }

  })

  describe('Search Authors Testing: start', function () {
    it('should return content which is same as the expected one. Resolved case', function () {
      return mockSearchAuthors('resolved').searchAuthors(mockReq)
              .then((response) => {
                expect(response).to.deep.equal(mockResponse)
              })
    })

    it('should return content which is same as the expected one. Rejected case', function () {
      return mockSearchAuthors('rejected').searchAuthors(mockReq)
              .catch((response) => {
                expect(response).to.deep.equal(error)
              })
    })
  })
})
