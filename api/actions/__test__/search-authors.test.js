/* global describe, it, before, after */
'use strict'
import sinon from 'sinon'
import { expect } from 'chai'
import { searchAuthors } from '../index'
import  Index from '../../../node_modules/algoliasearch/src/Index'
import sinonStubPromise from 'sinon-stub-promise'
sinonStubPromise(sinon)

describe('Search Authors Testing: set up config', function () {

  // coder define the query in src/actions/authors.js
  let mockQuery, mockReq, stubbedIndex, mockResponse, error

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
    error = new Error('This testing error')
    stubbedIndex = sinon.stub(Index.prototype, 'search')
  })

  after(function () {
    Index.prototype.search.restore()
  })

  describe('Search Authors Testing: start', function () {
    it('should return content which is same as the expected one. Resolved case', function () {
      stubbedIndex.returnsPromise().resolves(mockResponse)
      return searchAuthors(mockReq)
              .then((response) => {
                expect(response).to.deep.equal(mockResponse)
              })
    })

    it('should return content which is same as the expected one. Rejected case', function () {
      stubbedIndex.returnsPromise().rejects(error)
      return searchAuthors(mockReq)
              .catch((response) => {
                expect(response).to.deep.equal(error)
              })
    })
  })
})
