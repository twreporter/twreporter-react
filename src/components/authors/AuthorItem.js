import React, { PropTypes } from 'react'
import styles from './AuthorList.scss'
import { Link } from 'react-router'

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
