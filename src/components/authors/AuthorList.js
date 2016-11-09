'use strict'
import React, { PropTypes } from 'react'
import map from 'lodash/map'
// import styles from './AuthorList.scss'

const _ = {
  map
}

// filteredAuthors -> 是一個有著 { id, authorName, authorImg, authorUrl } 形狀的 authorItem 項目的陣列

const AuthorList = ( { filteredAuthors } ) => (
  <div>
    {_.map(filteredAuthors, author =>
      <AuthorItem
        key = {author.id}
        {...author}
      />
    )}
  </div>
)

AuthorList.propTypes = {
  filteredAuthors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    authorName: PropTypes.string.isRequired,
    authorImg: PropTypes.string,
    authorUrl: PropTypes.string.isRequired
  }).isRequired).isRequired
}

export default AuthorList
