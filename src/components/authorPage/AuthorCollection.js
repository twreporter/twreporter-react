'use strict'

import Link from 'react-router-dom/Link'
import LoadingSpinner from '../Spinner'
import PropTypes from 'prop-types'
import React from 'react'
import classNames from 'classnames'
import commonStyles from '../article/Common.scss'
import get from 'lodash/get'
import map from 'lodash/map'
import styles from './AuthorCollection.scss'
import { AUTHOR_COLLECTION, LOADING_MORE_ARTICLES, LOAD_MORE_ARTICLES, NUMBER_OF_FIRST_RESPONSE_PAGE } from '../../constants/author-page'
import { CHARACTERS_LIMIT } from '../../constants/index'
import { Waypoint } from 'react-waypoint'
import { formatPostLinkTarget, formatPostLinkTo, replaceGCSUrlOrigin } from '@twreporter/core/lib/utils/storage-url-processor'
import { shortenString } from '../../utils/string'

const AuthorCollection = (props) => {
  const { relateds, hasMore, isFetching, currentPage, handleLoadmore, totalResults } = props

  const titleText = AUTHOR_COLLECTION + (isFetching ? '' : `（${totalResults}）`)
  const listItems = relateds

  // Page bottom display options

  const isLoadmoreBtnDisplayed = (currentPage <= NUMBER_OF_FIRST_RESPONSE_PAGE && hasMore && !isFetching)
  const isSensorActive = (currentPage > NUMBER_OF_FIRST_RESPONSE_PAGE && hasMore)

  // Callback for sensor is triggered to seen
  const handleSeen = () => {
    if ((currentPage > NUMBER_OF_FIRST_RESPONSE_PAGE)) {
      return handleLoadmore()
    }
  }

  const sensorJSX = isSensorActive ? (
    <Waypoint
      onEnter={handleSeen}
      fireOnRapidScroll
      scrollableAncestor="window"
    >
      <div classname={styles['sensor']} />
    </Waypoint>
  ) : null

  const relatedRows = map(listItems, (related) => {
    const imageUrl = replaceGCSUrlOrigin(get(related, 'heroImage.image.resizedTargets.mobile.url', '/asset/review.png'))
    const slug = get(related, 'slug', '')
    const title = get(related, 'title', '')
    const style = get(related, 'style', '')
    const description = shortenString(get(related, 'ogDescription', ''), CHARACTERS_LIMIT.BOTTOM_RELATED_DESC)
    return (
      <li className={classNames(styles['related-item'])} key={slug}>
        <Link className={styles['related-anchor']} to={formatPostLinkTo(slug, style)} target={formatPostLinkTarget(style)}>
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
        {!isLoadmoreBtnDisplayed ? null : <div className={classNames(styles['load-more'], 'text-center')} onClick={handleLoadmore}>{LOAD_MORE_ARTICLES}</div>}
        {sensorJSX}
        {!isFetching ? null : <LoadingSpinner className={styles['loading-spinner']} alt={LOADING_MORE_ARTICLES} />}
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
