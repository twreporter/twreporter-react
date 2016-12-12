'use strict'

import { AUTHOR_COLLECTION, LOADING_MORE_ARTICLES, LOAD_MORE_ARTICLES, REQUEST_PAGE_START_FROM } from '../constants/author-page'
import { CHARACTERS_LIMIT, INTERACTIVE_ARTICLE_STYLE } from '../constants/index'

import Link from './Link'
import React from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import classNames from 'classnames'
import commonStyles from './article/Common.scss'
import get from 'lodash/get'
import map from 'lodash/map'
import { replaceStorageUrlPrefix } from '../utils/index'
import { shortenString } from '../lib/string-processor'
import styles from './AuthorCollection.scss'

export class AuthorCollection extends React.Component {

  _setHtml(html) {
    return { __html: html }
  }

  render() {
    const { relateds, isFinish, isFetching, currentPage, handleClick, totalResults } = this.props

    const titleText = AUTHOR_COLLECTION +`（${totalResults}）`
    let listItems = relateds

    if (!get(relateds, '0')) {
      return null
    }

    // Page bottom display options

    let loadmoreBtnDisplay = false
    let sensorDisplay = false
    let loaderDisply = false

    loadmoreBtnDisplay = (currentPage <= (REQUEST_PAGE_START_FROM)) ? true : false
    sensorDisplay = (currentPage > (REQUEST_PAGE_START_FROM) && !isFinish) ? true : false
    loaderDisply = isFetching ? true : false

    // const loadmoreBtn = isFinish || isFetching || currentPage<-1 ? null : <div className={classNames(styles['load-more'], 'text-center')} onClick={handleClick}>{LOAD_MORE_ARTICLES}</div>

    // Callback for sensor is triggered to seen
    let handleSeen = (isVisible) => {
      if (currentPage>REQUEST_PAGE_START_FROM && isVisible === true) {
        handleClick()
      }
      return
    }

    const relatedRows = map(listItems, (related, index) => {
      const imageUrl = replaceStorageUrlPrefix(get(related, 'heroImage.image.resizedTargets.mobile.url', '/asset/review.png'))
      const slug = get(related, 'slug', '')
      const title = get(related, 'title', '')
      let description = get(related, 'ogDescription', '')
      description = shortenString(description, CHARACTERS_LIMIT.BOTTOM_RELATED_DESC)
      const disableReactRouter = (get(related, 'style') === INTERACTIVE_ARTICLE_STYLE)
      return (
        <li className={classNames(styles['related-item'])} key={'related-' + (index++)}>
          <Link className={styles['related-anchor']} to={'/a/' + slug} disableReactRouter={disableReactRouter}>
            <div className={styles['related-img-wrapper']}>
              <div className={styles['related-img']}>
                <img className={styles['crop']} src={imageUrl} />
              </div>
            </div>
            <div className={styles['related-content']}>
              <p className={styles['related-title']}>{title}</p>
              <p className={styles['related-description']}>{description}</p>
            </div>
          </Link>
        </li>
      )
    })

    return (
      <div className={classNames(commonStyles['component'], 'center-block')}>
        <div className={classNames(styles['bottom-relateds-wrapper'], commonStyles['inner-block'])}>
          <div className={classNames(styles['topic-wrapper'], 'text-center')}>
            <h3 className={commonStyles['topic-box']}> {titleText} </h3>
          </div>
          <ul>
            {relatedRows}
          </ul>
          {!loaderDisply ? null : <div className={styles['loader']}>{LOADING_MORE_ARTICLES}</div>}
          {!loadmoreBtnDisplay ? null : <div className={classNames(styles['load-more'], 'text-center')} onClick={handleClick}>{LOAD_MORE_ARTICLES}</div>}
          {!sensorDisplay ? null :
          <VisibilitySensor onChange={handleSeen} partialVisibility={true}>
            <div className={styles['sensor']}></div>
          </VisibilitySensor>}
        </div>
      </div>
    )
  }
}
