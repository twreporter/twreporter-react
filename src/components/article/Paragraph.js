'use strict'
import _ from 'lodash'
import commonStyles from './Common.scss'
import classNames from 'classnames'
import styles from './Paragraph.scss'
import React from 'react' // eslint-disable-next-line

export const Paragraph = ({ content }) => {
  return <div className={classNames(styles.paragraph, commonStyles['inner-block'], 
          'text-justify')} 
          dangerouslySetInnerHTML={{ __html: _.get(content, [ 0 ], '') }} />
}
