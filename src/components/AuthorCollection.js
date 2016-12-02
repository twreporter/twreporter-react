'use strict'

import { AUTHOR_COLLECTION, CHARACTERS_LIMIT, INTERACTIVE_ARTICLE_STYLE } from '../constants/index'

import { LOAD_MORE_ARTICLES } from '../constants/index'
import Link from './Link'
import React from 'react'
import classNames from 'classnames'
import commonStyles from './article/Common.scss'
import get from 'lodash/get'
import map from 'lodash/map'
import { replaceStorageUrlPrefix } from '../utils/index'
import { shortenString } from '../lib/string-processor'
import styles from './AuthorCollection.scss'

export class AuthorCollection extends Component {
  constructor(props) {
    const itemWidth = 420
    let relateds = get(props, 'relateds', [])
    let count = relateds.length || 0

    super(props)

    this.totalWidth = Math.max(count * itemWidth, 0)
    this.state = {
      width: 'auto',
      isCollapse: false
    }
  }

  _setHtml(html) {
    return { __html: html }
  }

  render() {
    const { relateds, currentId, isFinish, isFetching, currentPage, handleClick } = this.props
    const { isCollapse } = this.state

    const titleText = AUTHOR_COLLECTION
    let listItems = relateds

    if (!get(relateds, '0')) {
      return null
    }

    const relatedRows = map(listItems, (related, index) => {
      let imageUrl = replaceStorageUrlPrefix(get(related, 'heroImage.image.resizedTargets.mobile.url', '/asset/review.png'))
      const description = get(related, 'ogDescription', '')
      return (
        <li className={classNames(styles['related-item'])} key={'related-' + (index++)}>
          <Link className={styles['related-anchor']} to={'/a/' + related.slug} disableReactRouter={get(related, 'style') === INTERACTIVE_ARTICLE_STYLE}>
            <div className={styles['related-img-wrapper']}>
              <div className={styles['related-img']}>
                <img className={styles['crop']} src={imageUrl} />
              </div>
            </div>
            <div className={styles['related-content']}>
              <p className={styles['related-title']} dangerouslySetInnerHTML={ this._setHtml(related.title) }></p>
              <p className={styles['related-description']}>{shortenString(description, CHARACTERS_LIMIT.BOTTOM_RELATED_DESC)}</p>
            </div>
          </Link>
        </li>
      )
    })

    const loadmoreBtn = isFinish || isFetching || !currentPage ? null : <div className={classNames(styles['load-more'], 'text-center')} onClick={handleClick}>{LOAD_MORE_ARTICLES}</div>

    return (
      <div className={classNames(commonStyles['component'], 'center-block')}>
        <div className={classNames(styles['bottom-relateds-wrapper'], commonStyles['inner-block'])}>
          <div className={classNames(styles['topic-wrapper'], 'text-center')}>
            <h3 className={commonStyles['topic-box']}> {titleText} </h3>
          </div>
          <ul>
            {relatedRows}
          </ul>
          {loadmoreBtn}
        </div>
      </div>
    )
  }
}
