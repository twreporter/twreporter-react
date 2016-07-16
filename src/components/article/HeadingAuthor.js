/*eslint no-unused-vars:0*/
'use strict'
import React, { Component } from 'react'
import _ from 'lodash'
import classNames from 'classnames'
import commonStyles from './Common.scss'
import styles from './HeadingAuthor.scss'

export class HeadingAuthor extends Component {
  constructor(props) {
    super(props)
  }

  _formatAuthor(authors) {
    const authorTypes = {
      'writter': '採訪',
      'photographer': '攝影',
      'designer': '設計',
      'engineer': '工程'
    }
    const authorSeparator = '、'
    let retAuthor = []
    // organize the header author list by types
    for(let type in authorTypes) {
      let curAuthors = []    // store author of the same type
      authors.forEach((author) => {
        if(author.type === type) {
          curAuthors.push(author.name)
        }
      })
      if(curAuthors.length > 0) {
        retAuthor.push({
          type: authorTypes[type],
          list: curAuthors.join(authorSeparator)   // format the author list with '、'
        })
      }
    }
    return retAuthor
  }

  render() {
    const { authors } = this.props
    const formattedAuthor = this._formatAuthor(authors)
    let count = 0
    const authorRows = _.map(formattedAuthor, author =>
      <div key={count++} className={classNames(styles['author-item'], commonStyles['text-color'])}>
        <span>{author.type} </span>
        <span className={commonStyles['text-link']}>
          <a href="">{author.list}</a>
        </span>
      </div>
    )

    return (
      <div>
        { authorRows }
      </div>
    )
  }
}
