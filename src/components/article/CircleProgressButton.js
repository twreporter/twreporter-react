/*eslint no-console:0*/
'use strict'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classNames from 'classnames'
import defaultIcon from '../../../static/asset/play-icon.svg'
import pauseIcon from '../../../static/asset/audio-pause.svg'
import playIcon from '../../../static/asset/audio-play.svg'
import styles from './CircleProgressButton.scss'

class CircleProgressButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      duration: props.duration,
      isOncePlayed: props.isOncePlayed,
      isPlaying: props.isPlaying,
      seek: props.seek
    }
    this.diameter = props.radius * 2
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      duration: nextProps.duration,
      isOncePlayed: nextProps.isOncePlayed,
      isPlaying: nextProps.isPlaying,
      seek: nextProps.seek
    })
  }

  componentWillUnmount() {
    delete this.diameter
  }

  _renderProgressCircle() {
    const { radius } = this.props
    let { duration, seek } = this.state
    let circleLength = this.diameter * Math.PI
    let proportion

    try {
      proportion = 1 - (seek / duration)
    } catch(err) {
      console.warn(err)
      proportion = 0
    }
    let style = {
      strokeDasharray: circleLength,
      strokeDashoffset: circleLength * proportion
    }

    return (
        <svg className={styles['progress-circle']} width={this.diameter} height={this.diameter}>
          <circle cx={radius} cy={radius} r={radius-1} style={style} />
        </svg>
    )
  }

  _renderIcon() {
    const { isOncePlayed, isPlaying } = this.state
    let style = {
      width: this.diameter,
      height: this.diameter
    }
    let iconSvg

    if (!isOncePlayed) {
      iconSvg = this.props.icon || defaultIcon
    } else if (isPlaying) {
      iconSvg = pauseIcon
    } else {
      iconSvg = playIcon
    }

    return (
      <img className={styles['icon-img']} src={iconSvg} style={style}/>
    )
  }

  render() {
    const { isOncePlayed } = this.state
    let buttonStyle = {
      width: this.diameter,
      height: this.diameter
    }
    return (
      <div onClick={this.props.onToggle}
        className={classNames(styles['progress-button'], isOncePlayed ? styles['loading'] : '')}
        style={{ height: this.diameter, width: this.diameter }}>
        <button style={buttonStyle}></button>
        {this._renderProgressCircle()}
        {this._renderIcon()}
      </div>
    )
  }
}

CircleProgressButton.propTypes = {
  // react element
  icon: PropTypes.element,
  duration: PropTypes.number,
  onToggle: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool,
  radius: PropTypes.number,
  seek: PropTypes.number
}

CircleProgressButton.defaultProps = {
  icon: null,
  duration: 0,
  isPlaying: false,
  radius: 40,
  seek: 0
}

export default CircleProgressButton
