'use strict'

import { AUTHOR_COLLECTION, LOADING_MORE_ARTICLES, LOAD_MORE_ARTICLES, NUMBER_OF_FIRST_RESPONSE_PAGE } from '../../constants/author-page'
import { CHARACTERS_LIMIT } from '../../constants/index'

import { Link } from 'react-router'
import React, { PropTypes } from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import classNames from 'classnames'
import commonStyles from '../article/Common.scss'
import get from 'lodash/get'
import map from 'lodash/map'
import { replaceStorageUrlPrefix } from '../../utils/index'
import { shortenString } from '../../utils/index'
import styles from './AuthorCollection.scss'

const AuthorCollection = (props) => {
  const { relateds, hasMore, isFetching, currentPage, handleLoadmore, totalResults } = props

  const titleText = AUTHOR_COLLECTION +`（${totalResults}）`
  let listItems = relateds

  if (!get(relateds, '0')) {
    return null
  }

  // Page bottom display options

  let loadmoreBtnDisplay = (currentPage <= NUMBER_OF_FIRST_RESPONSE_PAGE && hasMore &&!isFetching) ? true : false
  let sensorDisplay = (currentPage > NUMBER_OF_FIRST_RESPONSE_PAGE && hasMore) ? true : false
  let loaderDisply = isFetching ? true : false

  // Callback for sensor is triggered to seen
  let handleSeen = (isVisible) => {
    if (currentPage>NUMBER_OF_FIRST_RESPONSE_PAGE && isVisible === true) {
      return handleLoadmore()
    }
  }

  const relatedRows = map(listItems, (related, index) => {
    const imageUrl = replaceStorageUrlPrefix(get(related, 'heroImage.image.resizedTargets.mobile.url', '/asset/review.png'))
    const slug = get(related, 'slug', '')
    const title = get(related, 'title', '')
    let description = get(related, 'ogDescription', '')
    description = shortenString(description, CHARACTERS_LIMIT.BOTTOM_RELATED_DESC)
    return (
      <li className={classNames(styles['related-item'])} key={'related-' + (index++)}>
        <Link className={styles['related-anchor']} to={'/a/' + slug} >
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
      <div className={classNames(commonStyles['inner-block'], styles['bottom-relateds-wrapper'])}>
        <div className={classNames(styles['topic-wrapper'], 'text-center')}>
          <h3 className={classNames(styles['topic-box'])}> {titleText} </h3>
          <ul>
            {relatedRows}
          </ul>
        </div>
        {!loadmoreBtnDisplay ? null : <div className={classNames(styles['load-more'], 'text-center')} onClick={handleLoadmore}>{LOAD_MORE_ARTICLES}</div>}
        {!sensorDisplay ? null :
          <VisibilitySensor onChange={handleSeen} partialVisibility={true}>
            <div className={styles['sensor']}></div>
          </VisibilitySensor>
        }
        {!loaderDisply ? null : <div className={styles['loader-container']}><div className={styles['loader']}>{LOADING_MORE_ARTICLES}</div></div>}
      </div>
    </div>
  )
}

AuthorCollection.propTypes = {
  currentId: PropTypes.string,
  currentPage: PropTypes.number,
  handleLoadmore: PropTypes.func,
  isFetching: PropTypes.bool,
  hasMore: PropTypes.bool,
  related: PropTypes.array,
  totalResults: PropTypes.number
}

export default AuthorCollection
