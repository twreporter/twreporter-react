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
      <li>
        <a href="#">{tag.name}</a>
      </li>
    )

    return (
      <ul className={styles.keywordList}>
        {tagList}
      </ul>
    )
  }
}
