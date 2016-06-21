'use strict'
import _ from 'lodash'
import classNames from 'classnames'
import boxSvg from '../../../static/asset/box.svg'
import styles from './InfoBox.scss'
import BlockAlignmentWrapper from './BlockAlignmentWrapper'
import React from 'react' // eslint-disable-next-line

export const InfoBox = ({ content }) => {
  let infoBox = _.get(content, [ 0 ], {})

  return (
    <div className={classNames('inner-max', 'center-block', styles.infoBoxContainer)}>
      <h4>
        <img src={boxSvg} />
        {infoBox.title}
      </h4>
      <div dangerouslySetInnerHTML={{ __html: infoBox.body }} />
    </div>
  )
}

export const AlignedInfoBox = BlockAlignmentWrapper(InfoBox)
