/*eslint no-unused-vars:0*/
'use strict'
import { LINK_PREFIX } from '../../constants/index'
import { Link } from 'react-router'
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
      <Link key={tag.id} to={`${LINK_PREFIX.TAG}${tag.id}`}>
        <li>
          {tag.name}
        </li>
      </Link>
    )

    return (
      <ul className={styles.keywordList}>
        {tagList}
      </ul>
    )
  }
}
