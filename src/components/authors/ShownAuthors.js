'use strict'
import React, { PropTypes } from 'react'
import map from 'lodash/map'
import AuthorItem from './AuthorItem'
import styles from './AuthorList.scss'

const _ = {
  map
}

// filteredAuthors -> 是一個有著 { id, authorName, authorImg, authorUrl } 形狀的 authorItem 項目的陣列

const ShownAuthors = ( { filteredAuthors } ) => (
  <div className={styles['shown-authors']} >
    {_.map(filteredAuthors, author =>
      <AuthorItem
        key = {author.id}
        {...author}
      />
    )}
  </div>
)

ShownAuthors.propTypes = {
  filteredAuthors: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired,
    authorImg: PropTypes.string.isRequired,
    authorUrl: PropTypes.string.isRequired
  }).isRequired).isRequired
}

export default ShownAuthors
