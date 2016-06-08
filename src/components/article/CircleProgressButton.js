/*eslint no-console:0*/
'use strict'
import classNames from 'classnames'
import defaultIcon from '../../../static/asset/audio-icon.svg'
import playIcon from '../../../static/asset/audio-play.svg'
import pauseIcon from '../../../static/asset/audio-pause.svg'
import styles from './CircleProgressButton.scss'
import React, { Component } from 'react'

class CircleProgressButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      duration: props.duration,
      oncePlayed: false,
      playing: props.playing,
      seek: props.seek
    }
    this.diameter = props.radius * 2
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      duration: nextProps.duration,
      oncePlayed: this.state.oncePlayed || nextProps.playing,
      playing: nextProps.playing,
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
    const { oncePlayed, playing } = this.state
    let style = {
      width: this.diameter,
      height: this.diameter
    }
    let iconSvg

    if (!oncePlayed) {
      iconSvg = this.props.icon || defaultIcon
    } else if (playing) {
      iconSvg = pauseIcon
    } else {
      iconSvg = playIcon
    }

    return (
      <img className={styles['icon-img']} src={iconSvg} style={style}/>
    )
  }

  render() {
    const { oncePlayed } = this.state
    let buttonStyle = {
      width: this.diameter,
      height: this.diameter
    }
    return (
      <div onClick={this.props.onToggle} className={classNames(styles['progress-button'], oncePlayed ? styles['loading'] : '')}>
        <button style={buttonStyle}></button>
        {this._renderProgressCircle()}
        {this._renderIcon()}
      </div>
    )
  }
}

CircleProgressButton.propTypes = {
  // react element
  icon: React.PropTypes.element,
  duration: React.PropTypes.number,
  onToggle: React.PropTypes.func.isRequired,
  playing: React.PropTypes.bool,
  radius: React.PropTypes.number,
  seek: React.PropTypes.number
}

CircleProgressButton.defaultProps = {
  icon: null,
  duration: 0,
  playing: false,
  radius: 32.5,
  seek: 0
}

export default CircleProgressButton
