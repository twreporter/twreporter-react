'use strict'
import _ from 'lodash'
import commonStyles from './Common.scss'
import classNames from 'classnames'
import React from 'react' // eslint-disable-next-line

export const HeaderTwo = ({ content }) => {
  return <h2 className={classNames(commonStyles['inner-block'],
          'text-justify')} dangerouslySetInnerHTML={{ __html: _.get(content, [ 0 ], '') }}></h2>
}
