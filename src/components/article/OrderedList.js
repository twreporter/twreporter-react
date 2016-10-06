'use strict'
import classNames from 'classnames'
import commonStyles from './Common.scss'
import styles from './OrderedList.scss'
import React from 'react' // eslint-disable-next-line

// lodash
import get from 'lodash/get'

export const OrderedList = ({ content }) => {
  if(!Array.isArray(content)) {
    return null
  }

  // TODO cList = content directly.
  // Right now it's a workaround here
  let cList = get(content, 0)
  if (!Array.isArray(cList)) {
    cList = content
  }

  let bArr = []
  for(let i=0; i<cList.length; i++) {
    bArr.push(<li key={i} className={styles.item}>
                <span dangerouslySetInnerHTML={{ __html: cList[i] }} />
              </li>)
  }

  return <ol className={classNames(styles.list, commonStyles['inner-block'],
          'text-justify')}>
          { bArr }
          </ol>
}
