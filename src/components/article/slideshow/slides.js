'use strict'

import styles from './slides.scss'
import React, { Component } from 'react'
import Swipeable from 'react-swipeable'

// lodash
import forEach from 'lodash/forEach'
import merge from 'lodash/merge'
import get from 'lodash/get'

class Slides extends Component {
  constructor(props) {
    super(props)
    this.state = {
      offsetPercentage: 0,
      maxHeight: -1
    }
    this.slideContainers = []
    this._setSlideHeight = this._setSlideHeight.bind(this)
  }

  componentDidMount() {
    this._setSlideHeight(0)
  }

  componentWillReceiveProps(nextProps) {
    const { slideStart } = nextProps
    if (slideStart !== this.props.slideStart) {
      this._setSlideHeight(slideStart)
    }
  }

  _setSlideHeight(sIndex) {
    const { images } = this.props
    const container = this.outerContainer
    const winHeight = document.documentElement.clientHeight || window.innerHeight
    const hLimit = winHeight * 0.72   // the height of the slideshow cannot exceed 72% of screen height
    if (container && images) {
      const { clientWidth } = container
      const width = get(images, `${sIndex}.tablet.width`, 500)
      const height = get(images, `${sIndex}.tablet.height`, 500)
      let maxHeight = Math.ceil(clientWidth * height / width)
      if (maxHeight > hLimit) {
        maxHeight = hLimit
      }
      this.setState({ maxHeight })
    }
  }

  _handleSwiped(ev, x, y, isFlick) {
    this.setState({ isFlick: isFlick })
  }

  _handleSwipedTo(index) {
    let slideTo = this.props.slideStart
    if (Math.abs(this.state.offsetPercentage) > 30 || this.state.isFlick) {
      slideTo += index
    }
    this.setState({
      offsetPercentage: 0
    })
    this.props.slideToIndex(slideTo)
  }

  _handleSwiping(index, ev, delta) {
    const offsetPercentage = index * (delta / this.props.width * 100)
    this.setState({ offsetPercentage: offsetPercentage })
  }

  render() {
    const { isSwipeable, onImageError, slides, slideStart } = this.props
    const { offsetPercentage, maxHeight } = this.state
    let slideComponents = []

    forEach(slides, (slide, i) => {
      slideComponents.push(
        <li
          key={slide.id}
          ref={(slide) => {this.slideContainers[i] = slide }}
          className={styles['slide']}
        >
          <div style={{ height: maxHeight }} className={styles['img-container']}>
            <img
              src={slide.src}
              alt={slide.alt}
              srcSet={slide.srcSet}
              sizes={slide.sizes}
              onError={onImageError}
            />
          </div>
        </li>
      )
    })

    let translate3d = `translate3d(${-slideStart * 100 + offsetPercentage }%, 0, 0)`

    let slidesStyle = {
      WebkitTransform: translate3d,
      MozTransform: translate3d,
      msTransform: translate3d,
      OTransform: translate3d,
      transform: translate3d
    }

    // workaround here
    // Put transition in style rather than in CSS class makes animation smoother
    if (offsetPercentage === 0) {
      merge(slidesStyle, {
        transition: 'transform .4s ease-out'
      })
    }

    if (maxHeight > 0) {
      merge(slidesStyle, { height: maxHeight })
    }

    const InnerSlides = (
      <ul className={styles['slides']}
        style={slidesStyle}
        ref={(ul) => { this.outerContainer = ul }}
      >
        {slideComponents}
      </ul>
    )

    if (isSwipeable) {
      return (
        <Swipeable
          className={styles['ss-swipeable']}
          key="swipeable"
          delta={1}
          onSwipingLeft={this._handleSwiping.bind(this, -1) }
          onSwipingRight={this._handleSwiping.bind(this, 1)}
          onSwiped={this._handleSwiped.bind(this)}
          onSwipedLeft={this._handleSwipedTo.bind(this, 1)}
          onSwipedRight={this._handleSwipedTo.bind(this, -1)}
        >
          { InnerSlides }
        </Swipeable>
      )
    }
    return (
      { InnerSlides }
    )
  }
}

export default Slides
