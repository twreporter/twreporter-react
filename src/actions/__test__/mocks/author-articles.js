import { arrayOf, normalize } from 'normalizr'
import { article as articleSchema } from '../../../schemas/index'
import { camelizeKeys } from 'humps'

const authorId = 'theAurhtorId'
const parametersquery = 'query=theAurhtorId&hitsPerPage=5&page=0'
const writers = [ '1','2','3' ].map((v) => {
  return {
    _id: 'theWriterId' + v,
    bio: { },
    email: 'writer' + v + '@twreporter.org',
    name: 'name of writer ' + v
  }
})

// the simluated situation is that the requested author is a photographer
const author = {
  _id: authorId,
  bio: { },
  email: 'photographer@twreporter.org',
  name: 'name of photographer'
}

const hits = [
  {
    designers: [],
    engineers: [],
    writters: [ writers[0] ],
    photographers: [ author ],
    title: 'article title 1',
    style: 'review',
    slug:'slug 1',
    id: 'article id 1'
  },
  {
    designers: [],
    engineers: [],
    writters: [ writers[1] ],
    photographers: [ author ],
    title: 'article title 2',
    style: 'article',
    slug:'slug 2',
    id: 'article id 2'
  },
  {
    designers: [],
    engineers: [],
    writters: [ writers[2] ],
    photographers: [ author ],
    title: 'article title 3',
    style: 'review',
    slug:'slug 3',
    id: 'article id 3'
  },
  {
    designers: [],
    engineers: [],
    writters: [ writers[2] ],
    photographers: [ author ],
    title: 'article title 4',
    style: 'article',
    slug:'slug 4',
    id: 'article id 4'
  },
  {
    designers: [],
    engineers: [],
    writters: [ writers[2] ],
    photographers: [ author ],
    title: 'article title 5',
    style: 'photography',
    slug:'slug 5',
    id: 'article id 5'
  }
]

// this is just a simple mock response from Argolia
// I only choose few necessary properties/nested properties from the origianl response
// so it is good and easy for code review
/**
  * hits: first five top articles for the author
  * page: current page (in Algolia server) for the author-page
  * nbHist: total number of articles of the author
  * nbPages: total pages of articles of the aurhtor (start from 0)
  * each page contains 5 articles (set in stringfy query)
*/
export const mockResponse = {
  hits,
  page: 0,
  nbHits:145,
  nbPages:28,
  parametersquery
}

// mock properties of action after normalize
const camelizedJson = camelizeKeys(mockResponse.hits)
export const items = normalize(camelizedJson, arrayOf(articleSchema))
