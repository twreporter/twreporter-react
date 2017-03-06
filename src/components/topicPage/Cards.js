/* eslint no-unused-vars:0 */

import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import get from 'lodash/get'
import map from 'lodash/map'
import { replaceStorageUrlPrefix, shortenString, date2yyyymmdd } from '../../utils/index'
import { CHARACTERS_LIMIT } from '../../constants/index'
import styles from './Cards.scss'

const _ = {
  get,
  map
}

const Cards = (props) => {
  const { items, cardsTheme } = props
  const relatedRows = _.map(items, (related, index) => {
    const imageUrl = replaceStorageUrlPrefix(get(related, 'heroImage.image.resizedTargets.mobile.url', '/asset/review.png'))
    const slug = get(related, 'slug', '')
    const title = get(related, 'title', '')
    const publishedDate = date2yyyymmdd(get(related, 'publishedDate', ''), '.')
    const description = shortenString(get(related, 'ogDescription', ''), CHARACTERS_LIMIT.BOTTOM_RELATED_DESC)
    return (
      <li key={'related-' + (index++)}>
        <Link to={'/a/' + slug} >
          <div>
            <div>
              <img src={imageUrl} />
            </div>
          </div>
          <div>
            <p>{title}</p>
            <p>{description}</p>
            <p>{publishedDate}</p>
          </div>
        </Link>
      </li>
    )
  })
  return (
    <div>
      <ul>
        {relatedRows}
      </ul>
    </div>
  )
}

Cards.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    publishedDate: PropTypes.string.isRequired,
    ogDescription: PropTypes.string.isRequired,
    heroImage: PropTypes.object.isRequired
  })),
  cardsTheme: PropTypes.string.isRequired
}

export default Cards
