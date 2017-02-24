/* global describe, it, before, after */
'use strict'
import sinon from 'sinon'
import { expect } from 'chai'
import { searchPosts } from '../index'
import  Index from '../../../node_modules/algoliasearch/src/Index'
import sinonStubPromise from 'sinon-stub-promise'
sinonStubPromise(sinon)

describe('Search Posts Testing: set up config', function () {

  // coder define the query in src/actions/authors.js
  let mockQuery, mockReq, stubbedIndex, mockResponse, error

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
    error = new Error('This testing error')
    stubbedIndex = sinon.stub(Index.prototype, 'search')
  })

  after(function () {
    Index.prototype.search.restore()
  })

  describe('Search Posts Testing: start', function () {
    it('should return content which is same as the expected one. Resolved case', function () {
      stubbedIndex.returnsPromise().resolves(mockResponse)
      return searchPosts(mockReq)
              .then((response) => {
                expect(response).to.deep.equal(mockResponse)
              })
    })

    it('should return content which is same as the expected one. Rejected case', function () {
      stubbedIndex.returnsPromise().rejects(error)
      return searchPosts(mockReq)
              .catch((response) => {
                expect(response).to.deep.equal(error)
              })
    })
  })
})
