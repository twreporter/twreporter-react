'use strict'

import _ from 'lodash'
import styles from './slides.scss'
import React, { Component } from 'react'
import Swipeable from 'react-swipeable'

class Slides extends Component {
  constructor(props) {
    super(props)
    this.state = {
      offsetPercentage: 0
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

  _handleSwiping(index, _, delta) {
    const offsetPercentage = index * (delta / this.props.width * 100)
    this.setState({ offsetPercentage: offsetPercentage })
  }

  render() {
    const { isSwipeable, onImageError, onImageLoad, slides, slideStart } = this.props
    const { offsetPercentage } = this.state

    let slideComponents = _.map(slides, (slide) => {
      return (
        <li
          key={slide.id}
          className={styles['slide']}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            srcSet={slide.srcSet}
            sizes={slide.sizes}
            onLoad={onImageLoad}
            onError={onImageError}
          />
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
      _.merge(slidesStyle, {
        transition: 'transform .4s ease-out'
      })
    }

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
          <ul className={styles['slides']} style={slidesStyle}>
            {slideComponents}
          </ul>
        </Swipeable>
      )
    }
    return (
      <ul className={styles['slides']} style={slidesStyle}>
        {slideComponents}
      </ul>
    )
  }
}

export default Slides
