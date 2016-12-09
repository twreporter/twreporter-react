'use strict'
import React, { Component, PropTypes } from 'react' // eslint-disable-next-line
import style from './Topic.scss'

function ImageCard({ alt, imgSrc }) {
  return (
    <div className={style['image-card']}>
      <img
        src={imgSrc}
        alt={alt}
      />
      <div className={style['image-border']} />
    </div>
  )
}

ImageCard.propTypes = {
  alt: PropTypes.string,
  imgSrc: PropTypes.string
}

ImageCard.defaultProps = {
  alt: '',
  imgSrc: ''
}

function TextCard({ description,  title }) {
  return (
    <div className={style['text-card']}>
      <div className={style['title-block']}>
        <h2>
          {title}
        </h2>
      </div>
      <div>
        <p>
          { description }
        </p>
      </div>
    </div>
  )
}

TextCard.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string
}

TextCard.defaultProps = {
  description: '',
  title: ''
}

export default class Card extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { description, imgSrc, title } = this.props
    return (
      <div className={style.card}>
        <ImageCard
          imgSrc={imgSrc}
          alt={title}
        />
        <TextCard
          title={title}
          description={description}
        />
      </div>
    )
  }
}

Card.propTypes = {
  description: PropTypes.string,
  imgSrc: PropTypes.string,
  title: React.PropTypes.string
}

Card.defaultProps = {
  description: '',
  imgSrc: '',
  title: ''
}
