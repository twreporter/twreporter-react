'use strict'
import commonStyles from './Common.scss'
import classNames from 'classnames'
import React from 'react' // eslint-disable-next-line

export const HeaderTwo = ({ content }) => {
  return <h2 className={classNames(commonStyles['inner-block'],
          commonStyles['text-color'], 'text-justify')}> {content} </h2>
}
