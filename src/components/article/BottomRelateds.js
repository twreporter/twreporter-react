/*eslint no-unused-vars:0*/
'use strict'
import { CHARACTERS_LIMIT, INTERACTIVE_ARTICLE_STYLE, RELATED_ARTICLES, LOAD_MORE_ARTICLES, ITEMS_LIMIT } from '../../constants/index'
import { shortenString } from '../../lib/string-processor'
import { replaceStorageUrlPrefix } from '../../utils/index'
import { Link } from 'react-router'
import classNames from 'classnames'
import commonStyles from '../article/Common.scss'
import LazyLoad from 'react-lazyload'
import React, { Component } from 'react'
import styles from './BottomRelateds.scss'

// lodash
import get from 'lodash/get'
import filter from 'lodash/filter'
import map from 'lodash/map'
import uniq from 'lodash/uniq'

export class BottomRelateds extends Component {
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
    const { relateds, topicName, topicArr, currentId } = this.props
    const { isCollapse } = this.state

    const titleText = (topicArr && topicName) ? topicName : RELATED_ARTICLES
    let listItems = (topicArr && topicName) ? topicArr : relateds

    if (!get(relateds, '0') && (!topicArr || topicArr.length===0)) {
      return null
    }

    // find unique items and filter out the current article in display
    listItems = uniq(listItems)
    listItems = filter(listItems, (related) => { return related.id!==currentId })

    const relatedRows = map(listItems, (related, index) => {
      let imageUrl = replaceStorageUrlPrefix(get(related, 'heroImage.image.resizedTargets.mobile.url', '/asset/review.png'))
      const description = get(related, 'ogDescription', '')
      let itemDisplayClass = (index >= ITEMS_LIMIT.ARTICLE_RELATED && !isCollapse)? commonStyles['hide'] : null

      return (
        <li className={classNames(styles.relatedItem, itemDisplayClass)} key={'related-' + (index++)}>
          <Link className={styles.relatedAnchor} to={'/a/' + related.slug} target={get(related, 'style') === INTERACTIVE_ARTICLE_STYLE ? '_self' : undefined}>
            <div className={styles.relatedImgWrapper}>
              <div className={styles.relatedImg}>
                <LazyLoad once={true}>
                  <img className={styles['crop']} src={imageUrl} />
                </LazyLoad>
              </div>
            </div>
            <div className={styles.relatedContent}>
              <p className={styles.relatedTitle} dangerouslySetInnerHTML={ this._setHtml(related.title) }></p>
              <p className={styles.relatedDescription}>{shortenString(description, CHARACTERS_LIMIT.BOTTOM_RELATED_DESC)}</p>
            </div>
          </Link>
        </li>
      )
    })

    const loadMoreBtn = isCollapse || listItems.length <= ITEMS_LIMIT.ARTICLE_RELATED ? null : <div className={classNames(styles.loadMore, 'text-center')} onClick={()=>{this.setState({ isCollapse: true })}}>
            {LOAD_MORE_ARTICLES}
          </div>

    return (
      <div className={classNames(commonStyles['component'], 'center-block')}>
        <div className={classNames(styles.bottomRelatedsWrapper, commonStyles['inner-block'])}>
          <div className={classNames(styles['topicWrapper'], 'text-center')}>
            <h3 className={commonStyles['topic-box']}> {titleText} </h3>
          </div>
          <ul>
            { relatedRows }
          </ul>
          {loadMoreBtn}
        </div>
      </div>
    )
  }
}
