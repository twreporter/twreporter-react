import { schema, normalize } from 'normalizr'
import { author as authorSchema } from '../../../schemas/index'
import { camelizeKeys } from 'humps'
import { NUMBER_OF_FIRST_RESPONSE_PAGE, MAX_RESULTS_PER_FETCH, MAX_RESULTS_PER_SEARCH } from '../../../constants/authors-list'

export const currentDate = Date.now()
export const constKeywords = 'testKeywords'

function theNormalize(hits) {
  const camelizedJson = camelizeKeys(hits)
  return normalize(camelizedJson, new schema.Array(authorSchema))
}

const mockResponseHits = [ '1', '2', '3', '4', '5' ].map(function (v) {
  return {
    _id: 'id_' + v,
    name: 'name_' + v,
    articlesCount: 156,
    type: 1,
    objectID: 'objId_' + v,
    _highlightResult: []
  }
})


// this is for fetch request
export const responseObjSet = {
  keyNullResponse: {
    hits: mockResponseHits,
    page: 0,
    nbPages:8,
    nbHits: 189
  },

  keyWithVlaueResponse: {
    hits: {
      _id: 'id_single',
      name: 'name_single',
      articlesCount: 50,
      type: 1,
      objectID: 'objId_single',
      _highlightResult: []
    },
    hitsPerPage: MAX_RESULTS_PER_SEARCH,
    page: 0,
    nbPages:1,
    nbHits: 1
  }
}

// this is for property of action which is response
export const mockResponseSet = {
  keyNullResponse: {
    ...theNormalize(mockResponseHits),
    totalPages: 8,
    currentPage: 0
  },

  keyWithValueResponse: {
    ...theNormalize(responseObjSet.keyWithVlaueResponse.hits),
    totalPages: 1,
    currentPage: 0
  }
}


export const mockDefaultStates = {
  initialState: {
    authorsList: {
      isFetching: false,
      currentPage: NUMBER_OF_FIRST_RESPONSE_PAGE - 1,
      hasMore: false,
      items: [],
      error: null,
      lastUpdated: 0
    }
  },

  afterFirstPageState: {
    authorsList: {
      isFetching: false,
      currentPage: 0,
      hasMore: true,
      items: [],
      error: null,
      lastUpdated: currentDate
    }
  },

  gotNothing: {
    authorsList: {
      isFetching: false,
      currentPage: 10,
      hasMore: false,
      items: [],
      error: null,
      lastUpdated: currentDate
    }
  },

  hasNoPreviousKeywords: {
    searchedAuthorsList: {
      keywords: '',
      isFetching: false,
      currentPage: NUMBER_OF_FIRST_RESPONSE_PAGE - 1,
      items: [],
      error: null,
      lastUpdated: 0
    }
  },

  hasPreviousKeywords: {
    searchedAuthorsList: {
      keywords: constKeywords,
      isFetching: false,
      currentPage: 0,
      items: [],
      error: null,
      lastUpdated: currentDate
    }
  }
}

export const mockSearchParasSet = {
  keyNullSearchParas: {
    keywords: '',
    filters: 'articlesCount>0',
    hitsPerPage: MAX_RESULTS_PER_FETCH,
    page: 'this is variable'
  },

  keyWithValueParas: {
    keywords: constKeywords,
    filters: 'articlesCount>0',
    hitsPerPage: MAX_RESULTS_PER_SEARCH,
    page: 'this is variable'
  }

}
