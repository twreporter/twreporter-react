'use strict'
import _ from 'lodash'
import classNames from 'classnames'
import commonStyles from './Common.scss'
import styles from './UnorderedList.scss'
import React from 'react' // eslint-disable-next-line

export const UnorderedList = ({ content }) => {
  if(!Array.isArray(content)) {
    return null
  }

  // TODO cList = content directly.
  // Right now it's a workaround here
  let cList = _.get(content, 0)
  if (!Array.isArray(cList)) {
    cList = content
  }

  let bArr = []
  for(let i=0; i<cList.length; i++) {
    bArr.push(<li key={i} className={styles.item}>
                <span dangerouslySetInnerHTML={{ __html: cList[i] }} />
              </li>)
  }

  return <ul className={classNames(styles.list, commonStyles['inner-block'],
           'text-justify')}>
          { bArr }
          </ul>
}
