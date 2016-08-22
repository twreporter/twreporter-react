'use strict'
import classNames from 'classnames'
import commonStyles from './Common.scss'
import styles from './OrderedList.scss'
import React from 'react' // eslint-disable-next-line

export const OrderedList = ({ content }) => {
  const cList = (content && content[0].length>0) ? content[0] : null
  let bArr = []

  if(!cList) {
    return null
  }

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
