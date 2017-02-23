/* global describe, context, it, afterEach */

/*
  Testing functions:
    fetchRelatedArticlesIfNeeded
    fetchArticlesByUuidIfNeeded
    fetchFeatureArticles
*/

'use strict'

import chai from 'chai'
import thunk from 'redux-thunk'
import nock from 'nock'
import chaiAsPromised from 'chai-as-promised'
import qs from 'qs'
import * as actions from '../articles'
import * as types from '../../constants/action-types'
import configureMockStore from 'redux-mock-store'
import { formatUrl } from '../../utils/index'
import { CATEGORY, TAG, TOPIC } from '../../constants/index'

global.__SERVER__ = true
chai.use(chaiAsPromised)
const expect = chai.expect
const assert = chai.assert
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

/* Fetch related articles' meta of one certain article
 * properties of meta: subtitle, name, heroImage, title, topics, publishedDate, slug, links, created and id
 * @param {string} articleId
 * @param {string[]} relatedIds - related article ids
 * @param {object} params - params for composing query param of api
 * @param {string} [params.sort=-publishedDate] -the way returned articles are sorted by
 * @param {object} params.where - where query param
 * @param {object} params.embedded - embedded query param
 * @param {boolean} isOnlyMeta - if true, only get metadata of articles. Otherwise, get full articles.
 */

/* 
========= Testing fetchRelatedArticlesIfNeeded =========
*/
describe('Testing fetchRelatedArticlesIfNeeded:', function () {
  context('If argument articleId === false', function () {
    it('Should dispatch no actions and return Promise.resolve()', function () {
      const mockArgs = [
        '',  // articleId
        [ '' ],  // relatedIds
        {},  // params
        true // isOnlyMeta
      ]
      const store = mockStore({})
      store.dispatch(actions.fetchRelatedArticlesIfNeeded(...mockArgs))
      expect(store.getActions().length).to.equal(0) // no action is dispatched
      return expect(store.dispatch(actions.fetchRelatedArticlesIfNeeded(...mockArgs))).eventually.equal(undefined)
    })
  })
  context('If all related aricles are already in state (idsToFetch.length === 0)', function () {
    it('Should dispatch no actions and return Promise.resolve()', function () {
      const mockArgs = [
        'mock_article_id',         // articleId
        [ 'mock_related_article_id_01', 'mock_related_article_id_02' ], // relatedIds
        {},                        // params
        true                       // isOnlyMeta
      ]
      const store = mockStore({
        entities: {
          articles: {
            'mock_related_article_id_01': {},
            'mock_related_article_id_02': {}
          }
        }
      })
      store.dispatch(actions.fetchRelatedArticlesIfNeeded(...mockArgs))
      expect(store.getActions().length).to.equal(0) // no action is dispatched
      return expect(store.dispatch(actions.fetchRelatedArticlesIfNeeded(...mockArgs))).eventually.equal(undefined)
    })
  })
  context('Else: invoke _fetchArticles', function () {
    afterEach(function () {
      nock.cleanAll()
    })
    context('If the api returns an error', function () {
      it('Should dispatch requestRelatedArticles() & failToReceiveRelatedArticles()', function () {
        const mockArgs = [
          'mock_article_id', // articleId
          [ 'mock_related_article_id_01' ], // relatedIds
          {}, // params
          true // isOnlyMeta
        ]
        const mockUrl = formatUrl('meta?' + qs.stringify({ where: '{"_id":{"$in":["mock_related_article_id_01"]}}', sort: '-publishedDate' }))
        const indexOfSlash = mockUrl.indexOf('/', 7)
        const mockHost = mockUrl.slice(0, indexOfSlash) // example: 'http://localhost:3030'
        const mockPath = mockUrl.slice(indexOfSlash) // example: '/mata?where=.....'
        const store = mockStore({
          entities: {
            articles: {}
          }
        })
        const expectedRequestAction = {
          type: types.FETCH_RELATED_ARTICLES_REQUEST,
          id: 'mock_article_id',
          relatedIds: [ 'mock_related_article_id_01' ],
          url: mockUrl
        }
        const expectedFailureAction = {
          type: types.FETCH_RELATED_ARTICLES_FAILURE,
          id: 'mock_article_id',
          relatedIds: [ 'mock_related_article_id_01' ]
        }
        nock(mockHost)
          .get(mockPath)
          .reply(500, {})
        return store.dispatch(actions.fetchRelatedArticlesIfNeeded(...mockArgs))
          .then(function () {
            expect(store.getActions().length).to.equal(2)  // 2 actions: REQUEST && FIALURE
            expect(store.getActions()[0]).to.deep.equal(expectedRequestAction)
            expect(store.getActions()[1].type).to.equal(expectedFailureAction.type)
            expect(store.getActions()[1].id).to.equal(expectedFailureAction.id)
            expect(store.getActions()[1].relatedIds).to.deep.equal(expectedFailureAction.relatedIds)
            expect(store.getActions()[1].error).to.be.an.instanceof(Error)
            assert.isNumber(store.getActions()[1].failedAt, 'Date')
          })
      })
    })
    context('If the api reponse a success', function () {
      it('Should dispatch receiveRelatedArticles()', function () {
        const mockArgs = [
          'mock_article_id', // articleId
          [ 'mock_related_article_id_01' ], // relatedIds
          {}, // params
          true // isOnlyMeta
        ]
        const mockUrl = formatUrl('meta?' + qs.stringify({ where: '{"_id":{"$in":["mock_related_article_id_01"]}}', sort: '-publishedDate' }))
        const indexOfSlash = mockUrl.indexOf('/', 7)
        const mockHost = mockUrl.slice(0, indexOfSlash) // example: 'http://localhost:3030'
        const mockPath = mockUrl.slice(indexOfSlash) // example: '/mata?where=.....'
        const store = mockStore({
          entities: {
            articles: {}
          }
        })
        const mockApiResponse = {
          _items: [
            {
              _id: 'mock_related_article_id_01',
              title: 'mock_related_article_title',
              slug: 'mock-related-article-slug',
              style: 'article',
              og_description: 'mock_related_article_title_og_description'
            }
          ],
          _links: {
            self: {},
            parent: {}
          },
          _meta: {
            'max_results': 10,
            'total': 1,
            'page': 1
          }
        }
        const expectedResponse = {
          entities: {
            articles: {
              'mock_related_article_id_01': {
                id: 'mock_related_article_id_01',
                title: 'mock_related_article_title',
                slug: 'mock-related-article-slug',
                style: 'article',
                ogDescription: 'mock_related_article_title_og_description'
              }
            }
          },
          'result': [ 'mock_related_article_id_01' ]
        }
        const expectedRequestAction = {
          type: types.FETCH_RELATED_ARTICLES_REQUEST,
          id: 'mock_article_id',
          relatedIds: [ 'mock_related_article_id_01' ],
          url: mockUrl
        }
        const expectedSuccessAction = {
          type: types.FETCH_RELATED_ARTICLES_SUCCESS,
          id: 'mock_article_id',
          relatedIds: [ 'mock_related_article_id_01' ],
          response: expectedResponse
        }
        nock(mockHost)
          .get(mockPath)
          .reply(200, mockApiResponse)
        return store.dispatch(actions.fetchRelatedArticlesIfNeeded(...mockArgs))
          .then(function () {
            expect(store.getActions().length).to.equal(2)  // 2 actions: REQUEST && SUCCESS
            expect(store.getActions()[0]).to.deep.equal(expectedRequestAction)
            expect(store.getActions()[1].type).to.equal(expectedSuccessAction.type)
            expect(store.getActions()[1].id).to.equal(expectedSuccessAction.id)
            expect(store.getActions()[1].response).to.deep.equal(expectedSuccessAction.response)
            expect(store.getActions()[1].relatedIds).to.deep.equal(expectedSuccessAction.relatedIds)
            assert.isNumber(store.getActions()[1].receivedAt, 'Date')
          })
      })
    })
  })
})


/* 
========= Testing fetchArticlesByUuidIfNeeded ==========
*/
describe('Testing fetchArticlesByUuidIfNeeded:', function () {
  context('If argument uuid === false', () => {
    it('Should dispatch no actions and return Promise.resolve()', function () {
      const mockArgs = [
        '',  // uuid
        CATEGORY,  // type
        {},  // params
        true // isOnlyMeta
      ]
      const store = mockStore({})
      store.dispatch(actions.fetchArticlesByUuidIfNeeded(...mockArgs))
      expect(store.getActions().length).to.equal(0) // no action is dispatched
      return expect(store.dispatch(actions.fetchArticlesByUuidIfNeeded(...mockArgs))).eventually.equal(undefined)
    })
  })
  context('If state.articlesByUuids[uuid].hasMore === false', () => {
    it('Should dispatch no actions and return Promise.resolve()', function () {
      const mockArgs = [
        'mock_target_uuid',  // uuid
        CATEGORY,  // type
        {},  // params
        true // isOnlyMeta
      ]
      const store = mockStore({
        articlesByUuids: {
          'mock_target_uuid': {
            error: null,
            hasMore: false,
            isFetching: false,
            items: []
          }
        }
      })
      store.dispatch(actions.fetchArticlesByUuidIfNeeded(...mockArgs))
      expect(store.getActions().length).to.equal(0) // no action is dispatched
      return expect(store.dispatch(actions.fetchArticlesByUuidIfNeeded(...mockArgs))).eventually.equal(undefined)
    })
  })
  context('Else:', () => {
    context('If type is not CATEGORY, TAG, or TOPIC', () => {
      it('Should dispatch no actions and return Promise.resolve()', () => {
        const mockArgs = [
          'mock_target_uuid',  // uuid
          '',  // type
          {},  // params
          true // isOnlyMeta
        ]
        const store = mockStore({
          articlesByUuids: {
            'mock_target_uuid': {
              error: null,
              hasMore: false,
              isFetching: false,
              items: []
            }
          }
        })
        store.dispatch(actions.fetchArticlesByUuidIfNeeded(...mockArgs))
        expect(store.getActions().length).to.equal(0) // no action is dispatched
        return expect(store.dispatch(actions.fetchArticlesByUuidIfNeeded(...mockArgs))).eventually.equal(undefined)
      })
    })
    afterEach(function () {
      nock.cleanAll()
    })
    context('If type is CATEGORY', () => {
      context('If the api returns a success', () => {
        it('Should dispatch requestArticlesByUuid() & receiveArticlesByUuid()', () => {
          const mockArgs = [
            'mock_target_uuid',  // uuid
            CATEGORY,  // type
            {},  // params
            true // isOnlyMeta
          ]
          const store = mockStore({
            articlesByUuids: {
              'mock_target_uuid': {
                error: null,
                hasMore: true,
                isFetching: false,
                items: []
              }
            }
          })
          const mockUrl = formatUrl('meta?' + qs.stringify({ where: '{"categories":{"$in":["mock_target_uuid"]}}', sort: '-publishedDate' }))
          const indexOfSlash = mockUrl.indexOf('/', 7)
          const mockHost = mockUrl.slice(0, indexOfSlash) // example: 'http://localhost:3030'
          const mockPath = mockUrl.slice(indexOfSlash) // example: '/mata?where=.....'
          const mockApiResponse = {
            _items: [
              {
                _id: 'mock_category_article_id_01',
                title: 'mock_category_article_title',
                slug: 'mock-category-article-slug',
                style: 'article',
                og_description: 'mock_category_article_title_og_description'
              }
            ],
            _links: {
              self: {},
              parent: {}
            },
            _meta: {
              'max_results': 10,
              'total': 1,
              'page': 1
            }
          }
          const expectedResponse = {
            entities: {
              articles: {
                'mock_category_article_id_01': {
                  id: 'mock_category_article_id_01',
                  title: 'mock_category_article_title',
                  slug: 'mock-category-article-slug',
                  style: 'article',
                  ogDescription: 'mock_category_article_title_og_description'
                }
              }
            },
            'result': [ 'mock_category_article_id_01' ],
            links: {
              self: {},
              parent: {}
            },
            meta: {
              'maxResults': 10,
              'total': 1,
              'page': 1
            }
          }
          const expectedRequestAction = {
            type: types.FETCH_ARTICLES_BY_GROUP_UUID_REQUEST,
            id: 'mock_target_uuid',
            url: mockUrl
          }
          const expectedSuccessAction = {
            type: types.FETCH_ARTICLES_BY_GROUP_UUID_SUCCESS,
            id: 'mock_target_uuid',
            response: expectedResponse
          }
          nock(mockHost)
            .get(mockPath)
            .reply(200, mockApiResponse)
          return store.dispatch(actions.fetchArticlesByUuidIfNeeded(...mockArgs))
            .then(function () {
              expect(store.getActions().length).to.equal(2)  // 2 actions: REQUEST && SUCCESS
              expect(store.getActions()[0]).to.deep.equal(expectedRequestAction)
              expect(store.getActions()[1].type).to.equal(expectedSuccessAction.type)
              expect(store.getActions()[1].id).to.equal(expectedSuccessAction.id)
              expect(store.getActions()[1].response).to.deep.equal(expectedSuccessAction.response)
              assert.isNumber(store.getActions()[1].receivedAt, 'Date')
            })
        })
      })
      context('If the api returns a failure', () => {
        it('Should dispatch requestArticlesByUuid() & failToReceiveArticlesByUuid()', () => {
          const mockArgs = [
            'mock_target_uuid',  // uuid
            CATEGORY,  // type
              {},  // params
            true // isOnlyMeta
          ]
          const store = mockStore({
            articlesByUuids: {
              'mock_target_uuid': {
                error: null,
                hasMore: true,
                isFetching: false,
                items: []
              }
            }
          })
          const mockUrl = formatUrl('meta?' + qs.stringify({ where: '{"categories":{"$in":["mock_target_uuid"]}}', sort: '-publishedDate' }))
          const indexOfSlash = mockUrl.indexOf('/', 7)
          const mockHost = mockUrl.slice(0, indexOfSlash) // example: 'http://localhost:3030'
          const mockPath = mockUrl.slice(indexOfSlash) // example: '/mata?where=.....'
          const expectedRequestAction = {
            type: types.FETCH_ARTICLES_BY_GROUP_UUID_REQUEST,
            id: 'mock_target_uuid',
            url: mockUrl
          }
          const expectedFailedAction = {
            type: types.FETCH_ARTICLES_BY_GROUP_UUID_FAILURE,
            id: 'mock_target_uuid'
          }
          nock(mockHost)
            .get(mockPath)
            .reply(404, {})
          return store.dispatch(actions.fetchArticlesByUuidIfNeeded(...mockArgs))
            .then(function () {
              expect(store.getActions().length).to.equal(2)  // 2 actions: REQUEST && SUCCESS
              expect(store.getActions()[0]).to.deep.equal(expectedRequestAction)
              expect(store.getActions()[1].type).to.equal(expectedFailedAction.type)
              expect(store.getActions()[1].id).to.equal(expectedFailedAction.id)
              expect(store.getActions()[1].error).to.be.an.instanceof(Error)
              assert.isNumber(store.getActions()[1].failedAt, 'Date')
            })
        })
      })
    })
    context('If type is TAG', () => {
      context('If the api returns a success', () => {
        it('Should dispatch requestArticlesByUuid() & receiveArticlesByUuid()', () => {
          const mockArgs = [
            'mock_target_uuid',  // uuid
            TAG,  // type
            {},  // params
            true // isOnlyMeta
          ]
          const store = mockStore({
            articlesByUuids: {
              'mock_target_uuid': {
                error: null,
                hasMore: true,
                isFetching: false,
                items: []
              }
            }
          })
          const mockUrl = formatUrl('meta?' + qs.stringify({ where: '{"tags":{"$in":["mock_target_uuid"]}}', sort: '-publishedDate' }))
          const indexOfSlash = mockUrl.indexOf('/', 7)
          const mockHost = mockUrl.slice(0, indexOfSlash) // example: 'http://localhost:3030'
          const mockPath = mockUrl.slice(indexOfSlash) // example: '/mata?where=.....'
          const mockApiResponse = {
            _items: [
              {
                _id: 'mock_tag_article_id_01',
                title: 'mock_tag_article_title',
                slug: 'mock-tag-article-slug',
                style: 'article',
                og_description: 'mock_tag_article_title_og_description'
              }
            ],
            _links: {
              self: {},
              parent: {}
            },
            _meta: {
              'max_results': 10,
              'total': 1,
              'page': 1
            }
          }
          const expectedResponse = {
            entities: {
              articles: {
                'mock_tag_article_id_01': {
                  id: 'mock_tag_article_id_01',
                  title: 'mock_tag_article_title',
                  slug: 'mock-tag-article-slug',
                  style: 'article',
                  ogDescription: 'mock_tag_article_title_og_description'
                }
              }
            },
            'result': [ 'mock_tag_article_id_01' ],
            links: {
              self: {},
              parent: {}
            },
            meta: {
              'maxResults': 10,
              'total': 1,
              'page': 1
            }
          }
          const expectedRequestAction = {
            type: types.FETCH_ARTICLES_BY_GROUP_UUID_REQUEST,
            id: 'mock_target_uuid',
            url: mockUrl
          }
          const expectedSuccessAction = {
            type: types.FETCH_ARTICLES_BY_GROUP_UUID_SUCCESS,
            id: 'mock_target_uuid',
            response: expectedResponse
          }
          nock(mockHost)
            .get(mockPath)
            .reply(200, mockApiResponse)
          return store.dispatch(actions.fetchArticlesByUuidIfNeeded(...mockArgs))
            .then(function () {
              expect(store.getActions().length).to.equal(2)  // 2 actions: REQUEST && SUCCESS
              expect(store.getActions()[0]).to.deep.equal(expectedRequestAction)
              expect(store.getActions()[1].type).to.equal(expectedSuccessAction.type)
              expect(store.getActions()[1].id).to.equal(expectedSuccessAction.id)
              expect(store.getActions()[1].response).to.deep.equal(expectedSuccessAction.response)
              assert.isNumber(store.getActions()[1].receivedAt, 'Date')
            })
        })
      })
      context('If the api returns a failure', () => {
        it('Should dispatch requestArticlesByUuid() & failToReceiveArticlesByUuid()', () => {
          const mockArgs = [
            'mock_target_uuid',  // uuid
            TAG,  // type
              {},  // params
            true // isOnlyMeta
          ]
          const store = mockStore({
            articlesByUuids: {
              'mock_target_uuid': {
                error: null,
                hasMore: true,
                isFetching: false,
                items: []
              }
            }
          })
          const mockUrl = formatUrl('meta?' + qs.stringify({ where: '{"tags":{"$in":["mock_target_uuid"]}}', sort: '-publishedDate' }))
          const indexOfSlash = mockUrl.indexOf('/', 7)
          const mockHost = mockUrl.slice(0, indexOfSlash) // example: 'http://localhost:3030'
          const mockPath = mockUrl.slice(indexOfSlash) // example: '/mata?where=.....'
          const expectedRequestAction = {
            type: types.FETCH_ARTICLES_BY_GROUP_UUID_REQUEST,
            id: 'mock_target_uuid',
            url: mockUrl
          }
          const expectedFailedAction = {
            type: types.FETCH_ARTICLES_BY_GROUP_UUID_FAILURE,
            id: 'mock_target_uuid'
          }
          nock(mockHost)
            .get(mockPath)
            .reply(404, {})
          return store.dispatch(actions.fetchArticlesByUuidIfNeeded(...mockArgs))
            .then(function () {
              expect(store.getActions().length).to.equal(2)  // 2 actions: REQUEST && SUCCESS
              expect(store.getActions()[0]).to.deep.equal(expectedRequestAction)
              expect(store.getActions()[1].type).to.equal(expectedFailedAction.type)
              expect(store.getActions()[1].id).to.equal(expectedFailedAction.id)
              expect(store.getActions()[1].error).to.be.an.instanceof(Error)
              assert.isNumber(store.getActions()[1].failedAt, 'Date')
            })
        })
      })
    })
    context('If type is TOPIC', () => {
      context('If the api returns a success', () => {
        it('Should dispatch requestArticlesByUuid() & receiveArticlesByUuid()', () => {
          const mockArgs = [
            'mock_target_uuid',  // uuid
            TOPIC,  // type
            {},  // params
            true // isOnlyMeta
          ]
          const store = mockStore({
            articlesByUuids: {
              'mock_target_uuid': {
                error: null,
                hasMore: true,
                isFetching: false,
                items: []
              }
            }
          })
          const mockUrl = formatUrl('meta?' + qs.stringify({ where: '{"topics":{"$in":["mock_target_uuid"]}}', sort: '-publishedDate' }))
          const indexOfSlash = mockUrl.indexOf('/', 7)
          const mockHost = mockUrl.slice(0, indexOfSlash) // example: 'http://localhost:3030'
          const mockPath = mockUrl.slice(indexOfSlash) // example: '/mata?where=.....'
          const mockApiResponse = {
            _items: [
              {
                _id: 'mock_topic_article_id_01',
                title: 'mock_topic_article_title',
                slug: 'mock-topic-article-slug',
                style: 'article',
                og_description: 'mock_topic_article_title_og_description'
              }
            ],
            _links: {
              self: {},
              parent: {}
            },
            _meta: {
              'max_results': 10,
              'total': 1,
              'page': 1
            }
          }
          const expectedResponse = {
            entities: {
              articles: {
                'mock_topic_article_id_01': {
                  id: 'mock_topic_article_id_01',
                  title: 'mock_topic_article_title',
                  slug: 'mock-topic-article-slug',
                  style: 'article',
                  ogDescription: 'mock_topic_article_title_og_description'
                }
              }
            },
            'result': [ 'mock_topic_article_id_01' ],
            links: {
              self: {},
              parent: {}
            },
            meta: {
              'maxResults': 10,
              'total': 1,
              'page': 1
            }
          }
          const expectedRequestAction = {
            type: types.FETCH_ARTICLES_BY_GROUP_UUID_REQUEST,
            id: 'mock_target_uuid',
            url: mockUrl
          }
          const expectedSuccessAction = {
            type: types.FETCH_ARTICLES_BY_GROUP_UUID_SUCCESS,
            id: 'mock_target_uuid',
            response: expectedResponse
          }
          nock(mockHost)
            .get(mockPath)
            .reply(200, mockApiResponse)
          return store.dispatch(actions.fetchArticlesByUuidIfNeeded(...mockArgs))
            .then(function () {
              expect(store.getActions().length).to.equal(2)  // 2 actions: REQUEST && SUCCESS
              expect(store.getActions()[0]).to.deep.equal(expectedRequestAction)
              expect(store.getActions()[1].type).to.equal(expectedSuccessAction.type)
              expect(store.getActions()[1].id).to.equal(expectedSuccessAction.id)
              expect(store.getActions()[1].response).to.deep.equal(expectedSuccessAction.response)
              assert.isNumber(store.getActions()[1].receivedAt, 'Date')
            })
        })
      })
      context('If the api returns a failure', () => {
        it('Should dispatch requestArticlesByUuid() & failToReceiveArticlesByUuid()', () => {
          const mockArgs = [
            'mock_target_uuid',  // uuid
            TOPIC,  // type
              {},  // params
            true // isOnlyMeta
          ]
          const store = mockStore({
            articlesByUuids: {
              'mock_target_uuid': {
                error: null,
                hasMore: true,
                isFetching: false,
                items: []
              }
            }
          })
          const mockUrl = formatUrl('meta?' + qs.stringify({ where: '{"topics":{"$in":["mock_target_uuid"]}}', sort: '-publishedDate' }))
          const indexOfSlash = mockUrl.indexOf('/', 7)
          const mockHost = mockUrl.slice(0, indexOfSlash) // example: 'http://localhost:3030'
          const mockPath = mockUrl.slice(indexOfSlash) // example: '/mata?where=.....'
          const expectedRequestAction = {
            type: types.FETCH_ARTICLES_BY_GROUP_UUID_REQUEST,
            id: 'mock_target_uuid',
            url: mockUrl
          }
          const expectedFailedAction = {
            type: types.FETCH_ARTICLES_BY_GROUP_UUID_FAILURE,
            id: 'mock_target_uuid'
          }
          nock(mockHost)
            .get(mockPath)
            .reply(404, {})
          return store.dispatch(actions.fetchArticlesByUuidIfNeeded(...mockArgs))
            .then(function () {
              expect(store.getActions().length).to.equal(2)  // 2 actions: REQUEST && SUCCESS
              expect(store.getActions()[0]).to.deep.equal(expectedRequestAction)
              expect(store.getActions()[1].type).to.equal(expectedFailedAction.type)
              expect(store.getActions()[1].id).to.equal(expectedFailedAction.id)
              expect(store.getActions()[1].error).to.be.an.instanceof(Error)
              assert.isNumber(store.getActions()[1].failedAt, 'Date')
            })
        })
      })
    })
  })
})


/* 
========= Testing fetchFeatureArticles =================
*/
describe('Testing fetchFeatureArticles:', function () {
  afterEach(function () {
    nock.cleanAll()
  })
  context('If the api returns a failure', () => {
    it('Should dispatch requestFeatureArticles() & failToReceiveFeatureArticles()', () => {
      const mockArgs = [
        {},  // params
        true // isOnlyMeta
      ]
      const store = mockStore({})
      const mockUrl = formatUrl('meta?' + qs.stringify({ where: '{"isFeatured":true}', max_results: 6, page: 1, sort: '-publishedDate' }))
      const indexOfSlash = mockUrl.indexOf('/', 7)
      const mockHost = mockUrl.slice(0, indexOfSlash) // example: 'http://localhost:3030'
      const mockPath = mockUrl.slice(indexOfSlash) // example: '/mata?where=.....'
      const expectedRequestAction = {
        type: types.FETCH_FEATURE_ARTICLES_REQUEST,
        url: mockUrl
      }
      const expectedFailedAction = {
        type: types.FETCH_FEATURE_ARTICLES_FAILURE
      }
      nock(mockHost)
        .get(mockPath)
        .reply(404, {})
      return store.dispatch(actions.fetchFeatureArticles(...mockArgs))
        .then(function () {
          expect(store.getActions().length).to.equal(2)  // 2 actions: REQUEST && FAILURE
          expect(store.getActions()[0]).to.deep.equal(expectedRequestAction)
          expect(store.getActions()[1].type).to.equal(expectedFailedAction.type)
          expect(store.getActions()[1].id).to.equal(expectedFailedAction.id)
          expect(store.getActions()[1].error).to.be.an.instanceof(Error)
          assert.isNumber(store.getActions()[1].failedAt, 'Date')
        })
    })
  })
  context('If the api returns a success', () => {
    it('Should dispatch requestFeatureArticles() & receiveFeaturedArticles()', () => {
      const mockArgs = [
        {},  // params
        true // isOnlyMeta
      ]
      const store = mockStore({})
      const mockUrl = formatUrl('meta?' + qs.stringify({ where: '{"isFeatured":true}', max_results: 6, page: 1, sort: '-publishedDate' }))
      const indexOfSlash = mockUrl.indexOf('/', 7)
      const mockHost = mockUrl.slice(0, indexOfSlash) // example: 'http://localhost:3030'
      const mockPath = mockUrl.slice(indexOfSlash) // example: '/mata?where=.....'
      const mockApiResponse = {
        _items: [
          {
            _id: 'mock_featured_article_id_01',
            title: 'mock_featured_article_title',
            slug: 'mock-featured-article-slug',
            style: 'article',
            og_description: 'mock_featured_article_title_og_description'
          }
        ],
        _links: {
          self: {},
          last: {},
          parent: {},
          next: {}
        },
        _meta: {
          'max_results': 6,
          'total': 1,
          'page': 1
        }
      }
      const expectedResponse = {
        entities: {
          articles: {
            'mock_featured_article_id_01': {
              id: 'mock_featured_article_id_01',
              title: 'mock_featured_article_title',
              slug: 'mock-featured-article-slug',
              style: 'article',
              ogDescription: 'mock_featured_article_title_og_description'
            }
          }
        },
        'result': [ 'mock_featured_article_id_01' ]
      }
      const expectedRequestAction = {
        type: types.FETCH_FEATURE_ARTICLES_REQUEST,
        url: mockUrl
      }
      const expectedSuccessAction = {
        type: types.FETCH_FEATURE_ARTICLES_SUCCESS,
        response: expectedResponse
      }
      nock(mockHost)
        .get(mockPath)
        .reply(200, mockApiResponse)
      return store.dispatch(actions.fetchFeatureArticles(...mockArgs))
        .then(function () {
          expect(store.getActions().length).to.equal(2)  // 2 actions: REQUEST && SUCCESS
          expect(store.getActions()[0]).to.deep.equal(expectedRequestAction)
          expect(store.getActions()[1].type).to.equal(expectedSuccessAction.type)
          expect(store.getActions()[1].response).to.deep.equal(expectedSuccessAction.response)
          assert.isNumber(store.getActions()[1].receivedAt, 'Date')
        })
    })
  })
})
