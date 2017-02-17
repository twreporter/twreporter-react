/* global describe, it, before, after */
'use strict'

import sinon from 'sinon'
import superAgent from 'superagent'
import { InternalServerError } from '../../../src/lib/custom-error'
import { expect } from 'chai'
import { posts, meta } from '../index'

describe('Test loadArticles(posts endpoint) and loadMetaOfArticles(meta endpoint)', () => {
  const mockErrorObj = new Error()
  let mockQuery
  let mockReq
  let mockParams
  let mockArticle
  let mockResponse

  before(() => {
    // create mock data
    mockQuery = {
      embedded: true
    }
    mockReq = {
      query: mockQuery
    }
    mockParams = [ 'mockSlug' ]
    mockArticle = {
      title: 'mockTitle'
    }
    mockResponse = {
      body: {
        _items: [ mockArticle ]
      }
    }
  })

  describe('Test loadArticles(posts endpoint)', () => {
    let getStub
    let queryStub
    before(() => {
      // stub get
      getStub = sinon.stub(superAgent, 'get')
      // create stub
      queryStub = sinon.stub()

      getStub.returns({
        timeout: () => {
          return {
            query: queryStub
          }
        }
      })
    })
    after(() => {
      // restore get function
      superAgent.get.restore()
    })
    it('Situation 1: article slug is not provied', () => {
      const mockReq = {}
      return posts(mockReq)
        .catch((error) => {
          expect(error).to.be.instanceof(InternalServerError)
        })
    })
    it('Situation 2: article slug is provided', () => {

      // stub returns
      queryStub.returns({
        end: (callback) => {
          callback(null, { ok: true,  ...mockResponse })
        }
      })

      return posts(mockReq, mockParams).then((article) => {
        expect(article).to.deep.equal(mockArticle)
      })
    })
    it('Situation 3: Get API occurs error', () => {
      // stub returns
      queryStub.returns({
        end: (callback) => {
          callback(mockErrorObj, null)
        }
      })

      return posts(mockReq, mockParams).catch((error) => {
        expect(error).to.deep.equal(mockErrorObj)
      })
    })
  })

  describe('Test loadMetaOfArticles(meta endpoint)', () => {
    let getStub
    let queryStub
    const mockReq2 = {}
    before(() => {
      // stub get
      getStub = sinon.stub(superAgent, 'get')
      // create stub
      queryStub = sinon.stub()

      getStub.returns({
        timeout: () => {
          return {
            query: queryStub
          }
        }
      })

      queryStub.withArgs(mockReq.query).returns({
        end: (callback) => {
          callback(null, { ok: true, ...mockResponse })
        }
      })

      queryStub.withArgs(mockReq2).returns({
        end: (callback) => {
          callback(mockErrorObj)
        }
      })
    })
    after(() => {
      // restore get function
      superAgent.get.restore()
    })

    it('Situation 1: load without error', () => {
      return meta(mockReq, mockParams).then((res) => {
        expect(res).to.deep.equal(mockResponse.body)
      })
    })

    it('Situation 2: load with error', () => {
      return meta(mockReq2, mockParams).catch((error) => {
        expect(error).to.deep.equal(mockErrorObj)
      })
    })
  })
})
