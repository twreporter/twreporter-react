import Link from 'react-router-dom/Link'
import PropTypes from 'prop-types'
import React from 'react'

const linkPrefix = {
  article: '/a/',
  interactiveArticle: '/i/',
  categories: '/categories/',
  tag: '/tag/',
  topic: '/topic/',
  topics: '/topics/',
  author: '/author/',
  authors: '/authors'
}

const CustomizedLink = ({ children, isExternal, slug, host }) => {
  if (isExternal) {
    return (
      <a href={`${host}${linkPrefix.interactiveArticle}${slug}`}>
        {children}
      </a>
    )
  }
  return (
    <Link to={`${linkPrefix.article}${slug}`}>
      {children}
    </Link>
  )
}


CustomizedLink.defaultProps = {
  children: null
}

CustomizedLink.propTypes = {
  children: PropTypes.node,
  isExternal: PropTypes.bool.isRequired,
  slug: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired
}

export default CustomizedLink
