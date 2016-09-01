'use strict'
import _ from 'lodash'
import classNames from 'classnames'
import commonStyles from './Common.scss'
import styles from './OrderedList.scss'
import React from 'react' // eslint-disable-next-line

export const OrderedList = ({ content }) => {
  const cList = _.get(content, 0, null)

  if(!Array.isArray(cList)) {
    return null
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
