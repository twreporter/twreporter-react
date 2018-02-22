/* eslint-disable no-console */
'use strict'
import Navigation from  './navigation'
import PropTypes from 'prop-types'
import React, { Component } from 'react' // eslint-disable-line
import Slides from './slides'
import Thumbnails from './thumbnails'
import classNames from 'classnames'
import commonStyles from '../Common.scss'
import screenSize from '../../../constants/screen-size'
import styles from './slideshow.scss'
import { replaceStorageUrlPrefix } from '../../../utils/url'

// lodash
import forEach from 'lodash/forEach'
import get from 'lodash/get'

class Slideshow extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {
      currentIndex: 0,
      slideshowWidth: 0
    }
    this.isSliding =  false   // users are not able to switch slides if isSliding is true
    this.handleResize = this._handleResize.bind(this)
    this.onImageError = this._onImageError.bind(this)
    this.slideLeft = this._slideLeft.bind(this)
    this.slideRight = this._slideRight.bind(this)
    this.slideToIndex = this._slideToIndex.bind(this)
  }

  componentDidMount() {
    window.setTimeout(() => { this.handleResize(), 300 })
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    this._slideshow = null
    window.removeEventListener('resize', this.handleResize)
  }

  _handleResize() {
    if (this._slideshow) {
      this.setState({ slideshowWidth: this._slideshow.offsetWidth })
    }
  }

  _onImageError(event) {
    console.log(event.target.src)
  }

  _composeSrcSet(imgObj) {
    let desktopSrc = replaceStorageUrlPrefix(get(imgObj, [ 'desktop', 'url' ]))
    let tabletSrc = replaceStorageUrlPrefix(get(imgObj, [ 'tablet', 'url' ]))
    let mobileSrc = replaceStorageUrlPrefix(get(imgObj, [ 'mobile', 'url' ]))
    return `${mobileSrc} ${screenSize.smallScreenMinWidth}w, ${tabletSrc} ${screenSize.mediumScreenMinWidth}w, ${desktopSrc} ${screenSize.largeScreenMinWidth}w`
  }

  _parseContent(content) {
    let slides = []
    let thumbnails = []
    forEach(content, (imgObj) => {
      let slide = {}
      let thumbnail = {}
      let defaultImg = imgObj.url
      let id = get(imgObj, 'id')
      slide.src = replaceStorageUrlPrefix(defaultImg || get(imgObj, [ 'desktop', 'url' ]))
      slide.id = id
      slide.description = imgObj.description
      slide.srcSet = this._composeSrcSet(imgObj)
      thumbnail.src = replaceStorageUrlPrefix(get(imgObj, [ 'tiny', 'url' ], defaultImg))
      thumbnail.id = id
      slides.push(slide)
      thumbnails.push(thumbnail)
    })
    return {
      slides,
      thumbnails
    }
  }

  _slideLeft(event) {
    this._slideToIndex(this.state.currentIndex - 1, event)
  }

  _slideRight(event) {
    this._slideToIndex(this.state.currentIndex + 1, event)
  }

  _slideToIndex(index, event) {
    if (event) {
      event.preventDefault()
    }
    if (!this.isSliding) {
      this.isSliding = true
      let slideCount = this.props.content.length - 1
      let currentIndex = index

      if (index < 0) {
        currentIndex = 0
      } else if (index > slideCount) {
        currentIndex = slideCount
      }

      this.setState({
        currentIndex: currentIndex,
        previousIndex: this.state.currentIndex
      })
      this.isSliding = false
    }
  }


  render() {
    const { content, device } = this.props
    const { currentIndex } = this.state
    let { slides, thumbnails } = this._parseContent(content)

    let description = get(content, [ currentIndex, 'description' ], '')

    const thumbnailOffset = 8
    const thumbnailsPadding = 70
    let thumbnailsWidth = this.state.slideshowWidth - thumbnailsPadding * 2

    return (
      <div
        className={classNames(styles['ss-container'], { [styles['mobile']]: device === 'mobile' ? true : false })}
        ref={i => this._slideshow = i}
      >
        <div>
          <div
            className={styles['ss-slides']}
          >
            <Slides
              isSwipeable={true}
              onImageError={this.onImageError}
              slides={slides}
              images={content}
              slideStart={currentIndex}
              slideToIndex={this.slideToIndex}
              width={this.state.slideshowWidth}
            />
          </div>
          <div className={classNames(styles['ss-more-images'], commonStyles['inner-block'])}>
            <Navigation
              onSlideLeft={this.slideLeft}
              onSlideRight={this.slideRight}
              isLeftNavDisabled={currentIndex === 0 ? true : false}
              isRightNavDisabled={currentIndex === get(content, 'length', 0) - 1 ? true : false}
            />
            <div className={styles['ss-thumbnails']} style={{
              width: thumbnailsWidth
            }}>
            <Thumbnails
              currentIndex={currentIndex}
              slideToIndex={this.slideToIndex}
              thumbnails={thumbnails}
              thumbnailOffset={thumbnailOffset}
              width={thumbnailsWidth}
            />
          </div>
        </div>
        <div className={classNames('text-justify', commonStyles['desc-text-block'])}>
          <span>{description}</span>
        </div>
      </div>
    </div>
    )
  }
}

Slideshow.propTypes = {
  content: PropTypes.array.isRequired,
  device: PropTypes.string,
  styles: PropTypes.object
}

Slideshow.defaultProps = {
  content: [],
  device: '',
  styles: []
}

export { Slideshow }
