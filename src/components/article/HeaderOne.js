'use strict'
import _ from 'lodash'
import commonStyles from './Common.scss'
import styles from './HeaderOne.scss'
import classNames from 'classnames'
import React from 'react' // eslint-disable-next-line

export const HeaderOne = ({ content }) => {
  return <h1 className={classNames(commonStyles['inner-block'],
           styles['title'], 'text-justify')} dangerouslySetInnerHTML={{ __html: _.get(content, [ 0 ], '') }}></h1>
}
