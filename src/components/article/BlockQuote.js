'use strict'
import _ from 'lodash'
import classNames from 'classnames'
import commonStyles from './Common.scss'
import styles from './BlockQuote.scss'
import BlockAlignmentWrapper from './BlockAlignmentWrapper'
import React from 'react' // eslint-disable-next-line

export const QuoteBy = ({ content, device }) => { // eslint-disable-line
  let quote = _.get(content, [ 0, 'quote' ])
  let quoteBy = _.get(content, [ 0, 'quoteBy' ])
  if (!quote) {
    return null
  }

  return (
    <div className={classNames(styles['block-quotation-container'])}>
      <div className={classNames(styles['block-quotation'], 'text-justify')}>
        {quote}
      </div>
      { quoteBy ?
        <div className={classNames(styles['block-quotation-by'], 'text-center', commonStyles['desc-text-block'])}>
          {quoteBy}
        </div>
        : null
      }
    </div>
  )
}

export const BlockQuote = ({ content, device }) => { // eslint-disable-line
  return <blockquote className={classNames(commonStyles['inner-block'], styles['blockquote'], 'text-justify')} dangerouslySetInnerHTML={{ __html: _.get(content, [ 0 ], '') }}></blockquote>
}

export const AlignedQuoteBy = BlockAlignmentWrapper(QuoteBy)
