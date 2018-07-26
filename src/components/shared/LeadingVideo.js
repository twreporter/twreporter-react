/* eslint no-unused-vars:0 */
'use strict'
import PropTypes from 'prop-types'
import React from 'react'
import Waypoint from 'react-waypoint'
import SoundOnIcon from '../../../static/asset/sound-on.svg'
import SoundMuteIcon from '../../../static/asset/sound-mute.svg'
import style from './LeadingVideo.scss'
import { getSrcSet } from '../../utils/img'
import { replaceStorageUrlPrefix } from '../../utils/url'

// lodash
import get from 'lodash/get'

const _ = {
  get
}

class LeadingVideo extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isMuted: props.mute
    }
    this.handleMuteChange = this._handleMuteChange.bind(this)
    this.onLeave = this._onLeave.bind(this)
    this.onEnter = this._onEnter.bind(this)
  }

  componentWillUnmount() {
    this._player = null
    this._isSoundOn = false
  }

  _handleMuteChange() {
    if (this._player) {
      this._player.muted = !this._player.muted

      if (this._player.muted) {
        this._isSoundOn = false
      } else {
        this._isSoundOn = true
      }

      this.setState({
        isMuted: !this.state.isMuted
      })
    }
  }

  _onEnter() {
    // if video is in the viewport,
    // and it can play sound,
    // turn on the audio again.
    if (this._isSoundOn && this._player) {
      this.setState({
        isMuted: false
      })
      this._player.muted = false
    }
  }

  _onLeave() {
    // if video is not in the viewport,
    // turn off the audio.
    if (this._player) {
      this.setState({
        isMuted: true
      })
      this._player.muted = true
    }
  }

  render() {
    const { classNames, filetype, loop, poster, src, title } = this.props
    const { isMuted } = this.state

    // On the mobile devices (iOS 10 above),
    // we can only autoplay the video without audio
    const videoJSX = (
      <React.Fragment>
        <video
          className={_.get(classNames, 'video', style['video'])}
          ref={(input) => { this._player = input }}
          playsInline
          poster={poster}
          autoPlay
          muted={isMuted}
          loop={loop}
        >
          <source src={replaceStorageUrlPrefix(src)} type={filetype} />
        </video>
        <div className={_.get(classNames, 'videoMask', style['video-overlay'])} />
        { isMuted ?
          <SoundMuteIcon
            className={_.get(classNames, 'audioBt', style['audio-bt'])}
            onClick={this.handleMuteChange}
          /> :
          <SoundOnIcon
            className={_.get(classNames, 'audioBt', style['audio-bt'])}
            onClick={this.handleMuteChange}
          />
        }
      </React.Fragment>
    )

    return (
      <Waypoint
        onLeave={this.onLeave}
        onEnter={this.onEnter}
        fireOnRapidScroll
        scrollableAncestor="window"
      >
        <div
          className={_.get(classNames, 'container', style.container)}
          itemScope
          itemType="http://schema.org/VideoObject"
        >
          <link itemProp="url" href={src} />
          <meta itemProp="name" content={title}/>
          <meta itemProp="thumbnail" content={poster} />
          {videoJSX}
        </div>
      </Waypoint>
    )
  }
}

LeadingVideo.propTypes = {
  classNames: PropTypes.shape({
    audioBt: PropTypes.string,
    container: PropTypes.string,
    poster: PropTypes.string,
    video: PropTypes.string,
    videoMask: PropTypes.string
  }),
  filetype: PropTypes.string,
  loop: PropTypes.bool,
  mute: PropTypes.bool,
  poster: PropTypes.string,
  src: PropTypes.string,
  title: PropTypes.string
}

LeadingVideo.defaultProps = {
  className: {},
  filetype: '',
  loop: true,
  mute: true,
  poster: '',
  src: '',
  title: ''
}

export default LeadingVideo
