'use strict'

import React, { PropTypes } from 'react'
import classNames from 'classnames'
import styles from './AuthorData.scss'

const boxClasses = classNames(
  styles['author-box'],
  'center-block'
)

const AuthorData = (props) => {
  const authorData = props.authorData
  let gotAuthorMail = !(authorData.authorMail === undefined) ? true : false
  return (
  <div className={boxClasses}>
    <div className={styles['author-img-container']}><img className={styles['author-img']} src={authorData.authorImg}/></div>
    <div className={styles['author-data-container']}>
      <div className={styles['author-name']}>{authorData.authorName}</div>
      {!gotAuthorMail ? null : <div className={styles['author-mail']}>{authorData.authorMail}</div>}
      <div className={styles['author-bio']}>{authorData.authorBio}</div>
    </div>
  </div>
)}

AuthorData.propTypes = {
  authorData: PropTypes.shape({
    authorId: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired,
    authorImg: PropTypes.string,
    authorMail: PropTypes.string,
    authorBio: PropTypes.string
  })
}

export default AuthorData
