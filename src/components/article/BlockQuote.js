'use strict'
import _ from 'lodash'
import classNames from 'classnames'
import styles from './Blockquote.scss'
import BlockAlignmentWrapper from './BlockAlignmentWrapper'
import React from 'react' // eslint-disable-next-line

export const BlockQuote = ({ content }) => {
  let blockQuote = _.get(content, [ 0 ], {})

  return (
    <blockquote className={classNames('inner-max', 'center-block', styles.BlockQuoteContainer)}>{blockQuote}</blockquote>
  )
}

export const AlignedBlockQuote = BlockAlignmentWrapper(BlockQuote)
