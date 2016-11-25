'use strict'
import React from 'react'
import styles from './AuthorData.scss'
import classNames from 'classnames'

const boxClasses = classNames(
  styles['author-box'],
  'center-block'
)

const AuthorData = (props) => {
  const authorData = props.authorData
  return (
  <div className={boxClasses}>
    <div className={styles['author-img-container']}><img className={styles['author-img']} src={authorData.authorImg}/></div>
    <div className={styles['author-name']}>{authorData.authorName}</div>
    <div className={styles['author-mail']}>{authorData.authorMail}</div>
    <div className={styles['author-bio']}>{authorData.authorBio}</div>
  </div>
)}

AuthorData.propTypes = {
  authorData: React.PropTypes.shape({
    authorId: React.PropTypes.string,
    authorName: React.PropTypes.string,
    authorImg: React.PropTypes.string,
    authorMail: React.PropTypes.string,
    authorBio: React.PropTypes.string
  })
}

export default AuthorData
