'use strict'
import commonStyles from './Common.scss'
import classNames from 'classnames'
import React from 'react' // eslint-disable-next-line

export const HeaderOne = ({ content }) => {
  return <h1 className={classNames(commonStyles['inner-block'],
          commonStyles['text-color'], 'text-justify')}> {content} </h1>
}
