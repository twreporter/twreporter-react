/* eslint no-unused-vars:0 */
'use strict'
import { Image } from './Image'
import _ from 'lodash'
import classNames from 'classnames'
import raf from 'raf' // requestAnimationFrame polyfill
import styles from './Audio.scss'
import Player from 'react-howler'
import CircleProgressButton from './CircleProgressButton'
import React from 'react' // eslint-disable-line

class Audio extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      duration: 0,
      loaded: false,
      playing: false,
      seek: 0
    }
    this.handleToggle = this._handleToggle.bind(this)
    this.handleOnLoad = this._handleOnLoad.bind(this)
    this.handleOnEnd = this._handleOnEnd.bind(this)
    this.handleOnPlay = this._handleOnPlay.bind(this)
    this.renderSeekPos = this._renderSeekPos.bind(this)
  }

  componentWillUnmount() {
    this.clearRAF()
  }

  _handleToggle(e) {
    e.stopPropagation()
    this.setState({
      playing: !this.state.playing
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
      playing: true
    })
    this.renderSeekPos()
  }

  _handleOnEnd() {
    this.setState({
      playing: false
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
    if (this.state.playing) {
      this._raf = raf(this.renderSeekPos)
    }
  }

  clearRAF() {
    raf.cancel(this._raf)
  }

  render() {
    const { content } = this.props
    const { url, coverPhoto, title, description } = content[0]
    let image = _.get(coverPhoto, [ 'resizedTargets' ], {})

    return (
      <div className={styles['audio-flex-container']}>
        <div className={styles['audio-flex-coverphoto']}>
          <Image
            content = { [ image ] }
          />
        </div>
        <div className={styles['audio-flex-info']}>
          <div className={styles['info-flex-item']}>
            <CircleProgressButton
              duration={this.state.duration}
              playing={this.state.playing}
              seek={this.state.seek}
              onToggle={this.handleToggle}
            />
          </div>
          <div className={styles['info-flex-item']}>
            <h4>{title}</h4>
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        </div>
        <Player
          src={url}
          playing={this.state.playing}
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
  audio: React.PropTypes.string,
  coverPhoto: React.PropTypes.object,
  description: React.PropTypes.string,
  title: React.PropTypes.string
}

Audio.defaultProps = {
  audio: '',
  coverPhoto: {},
  description: '',
  title: ''
}

export { Audio }
