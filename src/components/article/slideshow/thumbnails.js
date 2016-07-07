/*eslint-disable no-console*/
'use strict'
import _ from 'lodash'
import classNames from 'classnames'
import styles from './thumbnails.scss'
import React from 'react'

const defaultThumbnailWidth = 56

const Thumbnail = (props) => {
  const { alt, customClassName, greyOut, onThumbError, onThumbLoad, src, slideToIndex, thumbnailWidth } = props

  const _onEvent = (event) => {
    console.log(event.target.src)
  }

  let onError = typeof onThumbError === 'function' ? onThumbError : _onEvent
  let onLoad = typeof onThumbLoad === 'function' ? onThumbLoad : _onEvent

  return (
    <li
      className={classNames(customClassName, styles['thumbnail'], greyOut ? styles['grey-out'] : '')}
      onClick={slideToIndex}
      onTouchStart={slideToIndex}
    >
      <img
        alt={alt}
        src={src}
        onError={onError}
        onLoad={onLoad}
        style={{
          width: thumbnailWidth,
          height: thumbnailWidth
        }}
      />
    </li>
  )
}

const Thumbnails = (props) => {
  let { customClassName, currentIndex, thumbnails, thumbnailOffset, thumbnailWidth, onThumbError, onThumbLoad, slideToIndex, width } = props
  thumbnailWidth = thumbnailWidth || defaultThumbnailWidth

  const _slideToIndex = (index, event) => {
    slideToIndex(index, event)
  }

  let thumbnailComponents = _.map(thumbnails, (thumbnail, index) => {
    return (
      <Thumbnail
        alt={thumbnail.alt}
        customClassName={thumbnail.customClassName}
        greyOut={currentIndex === index ? false : true}
        key={thumbnail.id}
        onThumbLoad={onThumbLoad}
        onThumbError={onThumbError}
        slideToIndex={_slideToIndex.bind(null, index)}
        src={thumbnail.src}
        thumbnailWidth={thumbnailWidth}
      />
    )
  })

  let length = _.get(thumbnails, 'length', 0)

  // calculate how many thumbnails can show in the thumbnails conatiner
  let maximum =  Math.floor((width - thumbnailOffset * (length - 1))/ thumbnailWidth)

  let translateX
  if (maximum > currentIndex) {
    translateX = 'translateX(0px)'
  } else {
    // current thumbnail is not shown in the thumbnails container
    translateX = `translateX(${-(currentIndex + 1 - maximum) * thumbnailWidth - thumbnailOffset * 2 }px)`
  }
  let style = {
    WebkitTransform: translateX,
    MozTransform: translateX,
    msTransform: translateX,
    OTransform: translateX,
    transform: translateX
  }
  return (
    <ul className={classNames(styles['thumbnails'], maximum > length ? styles['flex-center'] : '',customClassName)} style={style}>
      {thumbnailComponents}
    </ul>
  )
}

export default Thumbnails
