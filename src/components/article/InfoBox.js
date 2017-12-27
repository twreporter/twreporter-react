'use strict'
import classNames from 'classnames'
import BoxSvg from '../../../static/asset/infobox-logo.svg'
import styles from './InfoBox.scss'
import BlockAlignmentWrapper from './BlockAlignmentWrapper'
import React from 'react' // eslint-disable-next-line

// lodash
import get from 'lodash/get'

export const InfoBox = ({ content, device }) => {
  let infoBox = get(content, [ 0 ], {})

  return (
    <div className={classNames(styles['infobox-container'],
      { [styles['mobile']]: device === 'mobile' ? true : false }
    )}>
      <BoxSvg />
      <div className={styles['infobox-text']}>
        <h4 className={'text-center'}>
          {infoBox.title}
        </h4>
        <div className={'text-justify'} dangerouslySetInnerHTML={{ __html: infoBox.body }} />
      </div>
    </div>
  )
}

export const AlignedInfoBox = BlockAlignmentWrapper(InfoBox)
