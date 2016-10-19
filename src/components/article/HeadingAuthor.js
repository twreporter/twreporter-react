/*eslint no-unused-vars:0*/
'use strict'
import { authorTypes } from '../../constants/index'
import React, { Component } from 'react'
import classNames from 'classnames'
import commonStyles from './Common.scss'
import styles from './HeadingAuthor.scss'

// lodash
import forIn from 'lodash/forIn'
import groupBy from 'lodash/groupBy'
import map from 'lodash/map'

export const HeadingAuthor = ({ authors, children, extendByline }) => {

  function _groupAuthor(authors) {
    return groupBy(authors, 'type')
  }

  function _renderAuthor(author, key) {
    // TBD After we have author page,
    // we can add link onto each author
    /*
    return (
      <a href="">
        <span className={commonStyles['text-link']}>
          {author.name}
        </span>
      </a>
      )
      */
    return (
      <span itemProp="author" key={key}>{author.name}</span>
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
      <span style={{ paddingRight: '8px' }}>{extendByline}</span>
      { children }
    </div>
  )
}
