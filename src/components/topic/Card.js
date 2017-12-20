'use strict'

import PropTypes from 'prop-types'
import React from 'react'

import Link from 'react-router/lib/Link'
import classNames from 'classnames'

const ImageCard = ({ imageUrl, imageAlt, styles }) => (
    <div className={styles['image-card']}>
      <div className={styles['card-img-border']} />
      <img src={imageUrl} alt={imageAlt} />
    </div>
  )

ImageCard.propTypes = {
  imageUrl: PropTypes.string,
  imageAlt: PropTypes.string,
  styles: PropTypes.object
}

ImageCard.defaultProps = {
  imgSrc: '',
  imageAlt: '',
  styles: {}
}

const TextCard =({ title, description, publishedDate, styles }) => (
    <div className={styles['text-card']}>
      <div className={styles['card-title']}><h2>{title}</h2></div>
      <div className={styles['card-description']}>{description}</div>
      <p className={styles['card-date']}>{publishedDate}</p>
    </div>
  )

TextCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  publishedDate: PropTypes.string,
  styles: PropTypes.object
}

TextCard.defaultProps = {
  title: '',
  description: '',
  publishedDate: '',
  styles: {}
}

const Card = ({ linkTo, linkTarget, title, description, publishedDate, imageUrl, styles, itemDisplayClass }) => (
    <div className={classNames(styles['card'], itemDisplayClass)}>
      <Link
        to={linkTo}
        target={linkTarget}>
        <ImageCard
          imageUrl={imageUrl}
          imageAlt={title}
          styles={styles}
        />
        <TextCard
          title={title}
          description={description}
          publishedDate={publishedDate}
          styles={styles}
        />
      </Link>
    </div>
  )

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
