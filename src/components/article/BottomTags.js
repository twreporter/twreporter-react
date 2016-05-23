/*eslint no-unused-vars:0*/
'use strict'
import _ from 'lodash'
import React, { Component } from 'react'
import styles from './BottomTags.scss'

export class BottomTags extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { data } = this.props
    // select distinct tags
    const tags = _.uniq(data, 'id')
    const tagList = _.map(tags, tag =>
      <a key={tag.id} href="#">
        <li>
          {tag.name}
        </li>
      </a>
    )

    return (
      <ul className={styles.keywordList}>
        {tagList}
      </ul>
    )
  }
}
