'use strict'
import classNames from 'classnames'
import commonStyles from './Common.scss'
import styles from './UnorderedList.scss'
import React from 'react' // eslint-disable-next-line

export const UnorderedList = ({ content }) => {
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

  return <ul className={classNames(styles.list, commonStyles['inner-block'],
           'text-justify')}>
          { bArr }
          </ul>
}
