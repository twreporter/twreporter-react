'use strict'

import React, { PropTypes } from 'react'
import classNames from 'classnames'
import styles from './AuthorData.scss'

const boxClasses = classNames(
  styles['author-box'],
  'center-block'
)

const AuthorData = (props) => {
  const { authorImgUrl, authorName, authorMail, authorBio } = props.authorData
  return (
  <div className={boxClasses}>
    <div className={styles['author-img-container']}><img className={styles['author-img']} src={authorImgUrl}/></div>
    <div className={styles['author-data-container']}>
      <div className={styles['author-name']}>{authorName}</div>
      {!authorMail ? null : <div className={styles['author-mail']}>{authorMail}</div>}
      <div className={styles['author-bio']}>{authorBio}</div>
    </div>
  </div>
)}

AuthorData.propTypes = {
  authorData: PropTypes.shape({
    authorId: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired,
    authorImgUrl: PropTypes.string,
    authorMail: PropTypes.string,
    authorBio: PropTypes.string
  })
}

export default AuthorData
