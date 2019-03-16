import PropTypes from 'prop-types'
import React from 'react'
import Link from 'react-router-dom/Link'
import styles from './AuthorList.scss'

const AuthorItem = ({ authorName, authorImgUrl, authorUrl }) => (
  <div className={styles['author-item']}>
    <Link to={authorUrl}>
      <img src={authorImgUrl} className={styles['author-img']} />
      <div className={styles['author-name']} >{authorName}</div>
    </Link>
  </div>
)

AuthorItem.propTypes = {
  authorName: PropTypes.string.isRequired,
  authorImgUrl: PropTypes.string.isRequired,
  authorUrl: PropTypes.string.isRequired
}

export default AuthorItem
