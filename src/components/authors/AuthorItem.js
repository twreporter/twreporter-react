import React, { PropTypes } from 'react'

const AuthorItem = ({ authorName, authorImg, authorUrl }) => (
  <div>
    <img src={authorImg} />
    <div><a href={authorUrl}>{authorName}</a></div>
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
