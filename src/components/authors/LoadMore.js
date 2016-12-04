import React, { PropTypes } from 'react'
import { LOAD_MORE } from '../../constants/strings'
import styles from './AuthorList.scss'

const LoadMore = ({ isFinish, fetchAuthorsIfNeeded }) => {
  if (isFinish) {
    return (
      <div className={styles['is-finish']}></div>
    )
  } else {
    return (
      <button className={styles['load-more']} onClick={fetchAuthorsIfNeeded}>{LOAD_MORE}</button>
    )
  }
}

LoadMore.propTypes = {
  isFinish: PropTypes.bool.isRequired,
  fetchAuthorsIfNeeded: PropTypes.func.isRequired
}

export default LoadMore
