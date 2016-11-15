import React, { PropTypes } from 'react'
import styles from './AuthorList.scss'

const LoadMore = ({ isFinish, fetchAuthorsIfNeeded }) => {
  if (isFinish) {
    return (
      <div className={styles['is-finish']}></div>
    )
  } else {
    return (
      <button className={styles['load-more']} onClick={fetchAuthorsIfNeeded}>載入更多</button>
    )
  }
}

LoadMore.propTypes = {
  isFinish: PropTypes.bool.isRequired,
  fetchAuthorsIfNeeded: PropTypes.func.isRequired
}

export default LoadMore
