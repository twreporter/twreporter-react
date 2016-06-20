'use strict'
import _ from 'lodash'
import classNames from 'classnames'
// import styles from './Paragraph.scss'
import React from 'react' // eslint-disable-next-line

export const Paragraph = ({ content }) => {
  return <div className={classNames('inner-max', 'center-block')} dangerouslySetInnerHTML={{ __html: _.get(content, [ 0 ], '') }} />
}
