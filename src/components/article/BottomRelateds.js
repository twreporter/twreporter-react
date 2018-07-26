/*eslint no-unused-vars:0*/
'use strict'
import { CHARACTERS_LIMIT, LINK_PREFIX, INTERACTIVE_ARTICLE_STYLE, RELATED_ARTICLES, LOAD_MORE_ARTICLES, ITEMS_LIMIT } from '../../constants/index'
import { replaceStorageUrlPrefix } from '../../utils/url'
import { shortenString } from '../../utils/string'
import classNames from 'classnames'
import commonStyles from '../article/Common.scss'
import Link from 'react-router/lib/Link'
import React, { Component } from 'react'
import styles from './BottomRelateds.scss'
import LogoIcon from '../../../static/asset/icon-placeholder.svg'

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
      let imageUrl = replaceStorageUrlPrefix(get(related, 'heroImage.resizedTargets.tiny.url', '/asset/review.png'))
      const description = get(related, 'ogDescription', '')
      let itemDisplayClass = (index >= ITEMS_LIMIT.ARTICLE_RELATED && !isCollapse)? commonStyles['hide'] : null
      const style = get(related, 'style')

      return (
        <li className={classNames(styles.relatedItem, itemDisplayClass)} key={'related-' + (index++)}>
          <div>
            <Link className={styles.relatedAnchor} to={style === INTERACTIVE_ARTICLE_STYLE ? LINK_PREFIX.INTERACTIVE_ARTICLE + related.slug : LINK_PREFIX.ARTICLE + related.slug} target={style === INTERACTIVE_ARTICLE_STYLE ? '_blank' : undefined}>
              <div className={styles.relatedImgWrapper}>
                <div className={styles.relatedImg}>
                  <div className={styles['logo-icon']}>
                    <LogoIcon />
                    <img className={styles['crop']} src={imageUrl} />
                  </div>
                </div>
              </div>
              <div className={styles.relatedContent}>
                <p className={styles.relatedTitle} dangerouslySetInnerHTML={ this._setHtml(related.title) }></p>
                <p className={styles.relatedDescription}>{shortenString(description, CHARACTERS_LIMIT.BOTTOM_RELATED_DESC)}</p>
              </div>
            </Link>
          </div>
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
