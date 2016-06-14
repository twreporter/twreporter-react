/*eslint no-unused-vars:0*/
'use strict'
import _ from 'lodash'
import classNames from 'classnames'
import styles from './Embedded.scss'
import BlockAlignmentWrapper from './BlockAlignmentWrapper'
import React from 'react' // eslint-disable-next-line

export const EmbeddedCode = ({ content }) => {
  
  let embeddedCode = _.get(content, [ 0 ], {})

  return (
    <div className={classNames('inner-max', 'center-block')}>
      <span dangerouslySetInnerHTML={{ __html: embeddedCode.embeddedCode }}/> 
    </div>
  )
}

export const AlignedEmbedded = BlockAlignmentWrapper(EmbeddedCode)
