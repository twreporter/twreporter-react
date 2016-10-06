/*eslint no-unused-vars:0*/
'use strict'
import { LINK_PREFIX } from '../../constants/index'
import Link from '../Link'
import React, { Component } from 'react'
import styles from './BottomTags.scss'

// lodash
import map from 'lodash/map'
import uniq from 'lodash/uniq'

export class BottomTags extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { data } = this.props
    // select distinct tags
    const tags = uniq(data, 'id')
    const tagList = map(tags, tag =>
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
