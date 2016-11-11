import React, { PropTypes } from 'react'
import styles from './AuthorList.scss'

const AuthorItem = ({ authorName, authorImg, authorUrl }) => (
  <div className={styles['author-item']}>
    <img src={authorImg} className={styles['author-img']} />
    <div className={styles['author-name']} ><a href={authorUrl}>{authorName}</a></div>
  </div>
)

AuthorItem.propTypes = {
  authorName: PropTypes.string.isRequired,
  authorImg: PropTypes.string,
  authorUrl: PropTypes.string.isRequired
}

AuthorItem.defaultProps = {
  authorImg: ''  // Default img
}

export default AuthorItem
