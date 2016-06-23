/* eslint no-unused-vars:0 */
'use strict'
import { Image } from './Image'
import _ from 'lodash'
import classNames from 'classnames'
import raf from 'raf' // requestAnimationFrame polyfill
import styles from './Audio.scss'
import CircleProgressButton from './CircleProgressButton'
import Player from 'react-howler'
import React from 'react' // eslint-disable-line
import Slider from 'rc-slider'

if (process.env.BROWSER) {
  require('rc-slider/assets/index.css')
  require('./rcslider-overwrite.css')
}

class Audio extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      duration: 100,
      loaded: false,
      isPlaying: false,
      seek: 0
    }
    this.handleToggle = this._handleToggle.bind(this)
    this.handleOnLoad = this._handleOnLoad.bind(this)
    this.handleOnEnd = this._handleOnEnd.bind(this)
    this.handleOnPlay = this._handleOnPlay.bind(this)
    this.renderSeekPos = this._renderSeekPos.bind(this)
    this.onSeekChange = this._onSeekChange.bind(this)
  }

  componentWillUnmount() {
    this.clearRAF()
  }

  _getMinSecStr(time) {
    time = Math.round(time)
    let minutes = Math.floor(time / 60)
    let seconds = time - minutes * 60
    seconds = seconds < 10 ? 0 + seconds.toString() : seconds.toString()
    return minutes + ':' + seconds
  }

  _handleToggle(e) {
    e.stopPropagation()
    this.setState({
      isPlaying: !this.state.isPlaying
    })
  }

  _handleOnLoad() {
    this.setState({
      loaded: true,
      duration: this.player.duration()
    })
  }

  _handleOnPlay() {
    this.setState({
      isPlaying: true
    })
    this.renderSeekPos()
  }

  _handleOnEnd() {
    this.setState({
      isPlaying: false
    })
    this.clearRAF()
  }

  _handleSelect(e) {
    e.stopPropagation()
    this.props.onSelect(e)
  }

  _renderSeekPos() {
    this.setState({
      seek: this.player.seek()
    })
    if (this.state.isPlaying) {
      this._raf = raf(this.renderSeekPos)
    }
  }

  _onSeekChange(seek) {
    this.setState({
      seek: seek
    }, () => {
      this.player.seek(seek)
    })
  }

  clearRAF() {
    raf.cancel(this._raf)
  }

  render() {
    const { content } = this.props
    const {  duration, isPlaying, seek } = this.state
    const { url, coverPhoto, title, description } = _.get(content, 0, {})
    let image = _.get(coverPhoto, [ 'resizedTargets' ], null)
    let coverPhotoStyle = image ? '' : styles['without-coverphoto']

    return (
      <div className={styles['audio-flex-container']}>
        { image ? (
        <div className={classNames(styles['audio-flex-coverphoto'], 'col-md-12', 'hidden-xs')}>
          <Image
            content = { [ image ] }
          />
        </div>
        ) : null }
        <div className={classNames(styles['audio-flex-info'], coverPhotoStyle)}>
          <div className={classNames(styles['flex-item'], coverPhotoStyle)}>
            <CircleProgressButton
              duration={duration}
              isPlaying={isPlaying}
              seek={seek}
              onToggle={this.handleToggle}
            />
            <div className={styles['audio-slider']}>
              <span>{this._getMinSecStr(seek)} / {this._getMinSecStr(duration)}</span>
              <Slider
                tipFormatter={null}
                onChange={this.onSeekChange}
                value={seek}
                max={duration}
              />
            </div>
          </div>
          { image ? (
          <div className={classNames(styles['flex-item'], 'col-xs-12', 'visible-xs')}>
            <Image
              content = { [ image ] }
            />
          </div>
          ) : null }
          <div className={classNames(styles['flex-item'], coverPhotoStyle)}>
            <h4>{title}</h4>
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        </div>
        <Player
          src={url}
          playing={isPlaying}
          onLoad={this.handleOnLoad}
          onPlay={this.handleOnPlay}
          onEnd={this.handleOnEnd}
          ref={(ref) => this.player = ref}
        />
      </div>
    )
  }
}

Audio.propTypes = {
  content: React.PropTypes.array,
  customeStyles: React.PropTypes.array
}

Audio.defaultProps = {
  content: [],
  customeStyles: []
}

export { Audio }
