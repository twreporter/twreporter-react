/*eslint no-unused-vars:0*/
'use strict'
import React, { Component } from 'react'
import _ from 'lodash'
import styles from './BottomRelateds.scss'

export class BottomRelateds extends Component {
  constructor(props) {
    super(props)
  }

  setHtml(html) {
    return { __html: html }
  }

  render() {
    const { relateds } = this.props

    if (!_.get(relateds, '0')) {
      return null;
    }

    const relatedRows = _.map(relateds, related => {
      let imageUrl = _.get(related, 'heroImage.image.resizedTargets.mobile.url', '')
      return (  
        <li className={styles.relatedItem} key={related._id}>
          <a className={'row ' + styles.relatedAnchor} href={'/a/' + related.slug}>
            {imageUrl ? (
                <div className={styles.relatedImg}>
                  <img src={imageUrl} width="180" height="120" />
                </div>
              ) : null
            }
            <div className={styles.relatedContent}>
              <p className='relatedSubtitle'>{related.subtitle}</p>
              <p className='relatedTitle'>{related.title}</p>
            </div>
          </a>
        </li>
      )
    })

    return (
      <div className={styles.bottomRelateds}>
        <ul>
            { relatedRows }
        </ul>
      </div>
    )
  }
}
