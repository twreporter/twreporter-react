import React, { PropTypes } from 'react'
import styles from './AuthorList.scss'

const LoadMore = ({ isFinish, onIncrement }) => {
  if (isFinish) {
    return (
      <div className={styles['is-finish']}></div>
    )
  } else {
    return (
      <button className={styles['load-more']} onClick={onIncrement}>載入更多</button>
    )
  }
}

LoadMore.propTypes = {
  isFinish: PropTypes.bool.isRequired,
  onIncrement: PropTypes.func.isRequired
}

export default LoadMore
