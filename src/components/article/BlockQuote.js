'use strict'
import classNames from 'classnames'
import commonStyles from './Common.scss'
import styles from './BlockQuote.scss'
import BlockAlignmentWrapper from './BlockAlignmentWrapper'
import React from 'react' // eslint-disable-next-line

// lodash
import get from 'lodash/get'

export const QuoteBy = ({ content, device }) => { // eslint-disable-line
  let quote = get(content, [ 0, 'quote' ])
  let quoteBy = get(content, [ 0, 'quoteBy' ])
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

const BlockQuote = ({ content, device }) => { // eslint-disable-line
  return <blockquote className={classNames(commonStyles['inner-block'], styles['blockquote'], 'text-justify')} dangerouslySetInnerHTML={{ __html: get(content, [ 0 ], '') }}></blockquote>
}

export default BlockAlignmentWrapper(QuoteBy)
