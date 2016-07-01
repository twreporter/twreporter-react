'use strict'
import _ from 'lodash'
import classNames from 'classnames'
import boxSvg from '../../../static/asset/infobox-logo.svg'
import styles from './InfoBox.scss'
import BlockAlignmentWrapper from './BlockAlignmentWrapper'
import React from 'react' // eslint-disable-next-line

export const InfoBox = ({ content }) => {
  let infoBox = _.get(content, [ 0 ], {})

  return (
    <div className="row">
      <div className={classNames('inner-max', 'center-block', styles.infoBoxContainer)}>
        <img src={boxSvg} />
        <div className={styles.infoBoxText}>
          <h4>
            {infoBox.title}
          </h4>
          <div dangerouslySetInnerHTML={{ __html: infoBox.body }} />
        </div>
      </div>
    </div>
  )
}

export const AlignedInfoBox = BlockAlignmentWrapper(InfoBox)
