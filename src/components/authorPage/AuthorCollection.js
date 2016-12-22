'use strict'

import { AUTHOR_COLLECTION, LOADING_MORE_ARTICLES, LOAD_MORE_ARTICLES, REQUEST_PAGE_START_FROM } from '../../constants/author-page'
import { CHARACTERS_LIMIT, INTERACTIVE_ARTICLE_STYLE } from '../../constants/index'

import Link from '../Link'
import React, { PropTypes } from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import classNames from 'classnames'
import commonStyles from '../article/Common.scss'
import get from 'lodash/get'
import map from 'lodash/map'
import { replaceStorageUrlPrefix } from '../../utils/index'
import { shortenString } from '../../lib/string-processor'
import styles from './AuthorCollection.scss'

const AuthorCollection = (props) => {
  const { relateds, isFinish, isFetching, currentPage, handleLoadmore, totalResults } = props

  const titleText = AUTHOR_COLLECTION +`（${totalResults}）`
  let listItems = relateds

  if (!get(relateds, '0')) {
    return null
  }

  // Page bottom display options

  let loadmoreBtnDisplay = (currentPage <= REQUEST_PAGE_START_FROM && !isFinish) ? true : false
  let sensorDisplay = (currentPage > REQUEST_PAGE_START_FROM && !isFinish) ? true : false
  let loaderDisply = isFetching ? true : false

  // const loadmoreBtn = isFinish || isFetching || currentPage<-1 ? null : <div className={classNames(styles['load-more'], 'text-center')} onClick={handleLoadmore}>{LOAD_MORE_ARTICLES}</div>

  // Callback for sensor is triggered to seen
  let handleSeen = (isVisible) => {
    if (currentPage>REQUEST_PAGE_START_FROM && isVisible === true) {
      return handleLoadmore()
    }
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
        {!loaderDisply ? null : <div className={styles['loader-container']}><div className={styles['loader']}>{LOADING_MORE_ARTICLES}</div></div>}
        {!loadmoreBtnDisplay ? null : <div className={classNames(styles['load-more'], 'text-center')} onClick={handleLoadmore}>{LOAD_MORE_ARTICLES}</div>}
        {!sensorDisplay ? null :
          <VisibilitySensor onChange={handleSeen} partialVisibility={true}>
            <div className={styles['sensor']}></div>
          </VisibilitySensor>
        }
      </div>
    </div>
  )
}

AuthorCollection.propTypes = {
  currentId: PropTypes.string,
  currentPage: PropTypes.number,
  handleLoadmore: PropTypes.func,
  isFetching: PropTypes.bool,
  isFinish: PropTypes.bool,
  related: PropTypes.arrayOf(PropTypes.shape({
    categories: PropTypes.array,
    designers: PropTypes.array,
    engineers: PropTypes.array,
    extendByline: PropTypes.string,
    heroImage: PropTypes.object,
    hilightResult: PropTypes.object,
    id: PropTypes.string,
    isFeatured: PropTypes.bool,
    objectID: PropTypes.string,
    ogDescription: PropTypes.string,
    ogTitle: PropTypes.string,
    photographers: PropTypes.array,
    publishDate: PropTypes.string,
    related: PropTypes.array,
    slug: PropTypes.string,
    state: PropTypes.string,
    style: PropTypes.string,
    subtitle: PropTypes.string,
    tags: PropTypes.array,
    topics: PropTypes.array,
    writters: PropTypes.array
  })),
  totalResults: PropTypes.number
}

export default AuthorCollection
