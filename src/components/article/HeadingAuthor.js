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

  // Handle text starting with `文 `, such as `文 陳貞樺` in the extendByLine,
  // which is a free text field.
  // Move it to the front and bolden `文 ` text.
  const escapeWord = '文 '
  if (typeof extendByline === 'string' && extendByline.startsWith(escapeWord)) {
    const _byline = extendByline.replace(escapeWord, '')
    authorRows.unshift(
      <div key="byline" className={classNames(styles['author-item'])}>
        <span>文</span>
        <span itemProp="author">{_byline}</span>
      </div>
    )
  } else {
    authorRows.push(<span key="extend_by_line" itemProp="author" style={{ paddingRight: '8px' }}>{extendByline}</span>)
  }

  return (
    <div className={styles['author-container']}>
      { authorRows }
      { children }
    </div>
  )
}
