'use strict'
import { APP_ID, SEARCH_API_KEY, CONTACTS_INDEX } from '../constants'
import algoliasearch from 'algoliasearch'
import omit from 'lodash/omit'

const _ = {
  omit
}

export function searchAuthors(req, path) { // eslint-disable-line no-unused-vars
  let client = algoliasearch(APP_ID, SEARCH_API_KEY)
  let index = client.initIndex(CONTACTS_INDEX)
  return new Promise((resolve, reject) => {
    const query = req.query
    const keywords = query.keywords
    // If searchOptions contain unknown parameter, algolia will return an error
    const searchOptions = _.omit(query, 'keywords')
    index.search(keywords, searchOptions)
      .then(function searchSuccess(content) {
        resolve(content)
      })
      .catch(function searchFailure(error) {
        reject(error)
      })
  })
}
