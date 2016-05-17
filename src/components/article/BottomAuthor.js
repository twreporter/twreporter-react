/*eslint no-unused-vars:0*/
'use strict'
import React, { Component } from 'react'
import _ from 'lodash'
import styles from './BottomAuthor.scss'

export class BottomAuthor extends Component {
  constructor(props) {
    super(props)
  }

  setHtml(html) {
    return { __html: html }
  }

  render() {
    const { authors } = this.props
    const authorRows = _.map(authors, author =>
      <div className={'row ' + styles.authorRow}>
        <div className="col-sm-2">
          <img src="https://ssl.gstatic.com/accounts/ui/avatar_2x.png" className="img-responsive img-circle center-block"/>
        </div>
        <div className="col-sm-10">
          <p>|<span className={styles.authorName}>{author.name}</span>|</p>
          {author.bio && author.bio.html ?
            <span className={styles.bioText} dangerouslySetInnerHTML={ this.setHtml(author.bio.html) }></span> : null
          }
          {author.email ? <span>({author.email})</span> : null}
        </div>
      </div>
    )

    return (
      <div>
        { authorRows }
      </div>
    )
  }
}
