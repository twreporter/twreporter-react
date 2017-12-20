/*eslint no-unused-vars:0*/
'use strict'

import { LINK_PREFIX, authorTypes } from '../../constants/index'
import React, { Component } from 'react'

import Link from 'react-router/lib/Link'
import classNames from 'classnames'
import commonStyles from './Common.scss'
// lodash
import forIn from 'lodash/forIn'
import groupBy from 'lodash/groupBy'
import map from 'lodash/map'
import styles from './HeadingAuthor.scss'

export const HeadingAuthor = ({ authors, children, extendByline }) => {

  function _groupAuthor(authors) {
    return groupBy(authors, 'type')
  }

  function _renderAuthor(author, key) {
    const title = author.jobTitle ? `（${author.jobTitle}）` : ''
    return (
      <span itemProp="author" key={key} className={styles['author-name-link']}>
        <Link to={`${LINK_PREFIX.AUTHOR}${author.id}`}>
          {author.name+title}
        </Link>
      </span>
      )
  }

  function _renderAuthors(authors) {
    return map(authors, (author, index) => _renderAuthor(author, index))
  }

  const groupedAuthors = _groupAuthor(authors)
  let count = 0
  const authorRows = []
  forIn(groupedAuthors, (authors, type) => {
    let _authors = _renderAuthors(authors)
    authorRows.push(
      <div key={count++} className={classNames(styles['author-item'])}>
        <span>{authorTypes[type]}</span>
        {_authors}
      </div>
    )
  })

  return (
    <div className={styles['author-container']}>
      { authorRows }
      <span itemProp="author" style={{ paddingRight: '8px' }}>{extendByline}</span>
      { children }
    </div>
  )
}
