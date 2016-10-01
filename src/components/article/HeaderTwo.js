'use strict'
import commonStyles from './Common.scss'
import classNames from 'classnames'
import React from 'react' // eslint-disable-next-line

// lodash
import get from 'lodash/get'

export const HeaderTwo = ({ content }) => {
  return <h2 className={classNames(commonStyles['inner-block'],
          'text-justify')} dangerouslySetInnerHTML={{ __html: get(content, [ 0 ], '') }}></h2>
}
