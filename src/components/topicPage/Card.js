'use strict'
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'

const Card = (props) => {
  const {
    linkTo,
    linkTarget,
    imageUrl,
    title,
    description,
    publishedDate,
    styles,
    itemDisplayClass
  } = props
  return (
    <div className={classNames(styles['card'], itemDisplayClass)}>
      <Link to={linkTo} target={linkTarget}>
        <div className={styles['image-card']}>
          <div className={styles['card-img-border']} />
          <img src={imageUrl} />
        </div>
        <div className={styles['text-card']}>
          <div className={styles['card-title']}><h2>{title}</h2></div>
          <div className={styles['card-description']}>{description}</div>
          <p className={styles['card-date']}>{publishedDate}</p>
        </div>
      </Link>
    </div>
  )
}

Card.prototype = {
  linkTo: PropTypes.string.isRequired,
  linkTarget: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  publishedDate: PropTypes.string.isRequired,
  styles: PropTypes.object.isRequired,
  itemDisplayClass: PropTypes.object.isRequired
}

Card.defaultProps = {
  linkTo: '',
  linkTarget: '',
  imageUrl: '',
  title: '',
  description: '',
  publishedDate: '',
  styles: {},
  itemDisplayClass: {}
}

export default Card
