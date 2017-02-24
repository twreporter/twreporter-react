/* global describe, it, before, after */
'use strict'
import { InternalServerError } from '../../../src/lib/custom-error'
import sinon from 'sinon'
import superAgent from 'superagent'
import { topics } from '../index'
import { expect } from 'chai'

describe('Test load topics and load topic function from load-topics.js', function () {
  const mockErrorObj = new Error('MockError')
  let mockQuery, mockReq, mockParams, mockTopic, mockResponse, stubbedGet, mockEnd
  before(() => {
    mockQuery = {
      embedded: true
    }
    mockReq = {
      query: mockQuery
    }
    mockParams = [ 'mockSlug' ]
    mockTopic = {
      topic_name: 'mockTopic'
    }
    mockResponse = {
      body: {
        _items: [ mockTopic ]
      }
    }
    stubbedGet = sinon.stub(superAgent, 'get')
    const mockQueryFun = () => { return { end: mockEnd }  }
    const mockTimeout = () => { return { query: mockQueryFun } }
    stubbedGet.returns({
      timeout: mockTimeout
    })
  })

  after(() => {
    superAgent.get.restore()
  })

  it('Situation 1: topic slug is not provied', () => {
    const mockReq = {}
    return topics(mockReq)
      .catch((error) => {
        expect(error).to.be.instanceof(InternalServerError)
      })
  })

  it('Situation 2: topic slug is provided', () => {
    mockEnd = (callback) => {
      callback(null, { ok: true,  ...mockResponse })
    }

    return topics(mockReq, mockParams).then((topic) => {
      expect(topic).to.deep.equal(mockTopic)
    })
  })

  it('Situation 3: Get API occurs error', () => {
    mockEnd = (callback) => {
      callback(mockErrorObj, null)
    }

    return topics(mockReq, mockParams).catch((error) => {
      expect(error).to.deep.equal(mockErrorObj)
    })
  })

})
