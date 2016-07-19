/*eslint no-unused-vars: [2, { "args": "none" }]*/
'use strict'
import _ from 'lodash'
import classNames from 'classnames'
import commonStyles from './Common.scss'
import styles from './BlockQuote.scss'
import BlockAlignmentWrapper from './BlockAlignmentWrapper'
import React from 'react' // eslint-disable-next-line

export const BlockQuote = ({ content, device }) => {
  let quote = _.get(content, [ 0, 'quote' ])
  let quoteBy = _.get(content, [ 0, 'quoteBy' ])
  if (!quote) {
    return null
  }

  return (
    <div className={classNames(styles['block-quotation-container'])}>
      <div className={classNames(styles['block-quotation'], 'text-justify', commonStyles['text-color'])}>
        {quote}
      </div>
      { quoteBy ?
        <div className={classNames(styles['block-quotation-by'], 'text-center', commonStyles['description-color'])}>
          {quoteBy}
        </div>
        : null
      }
    </div>
  )
}

export const AlignedBlockQuote = BlockAlignmentWrapper(BlockQuote)
