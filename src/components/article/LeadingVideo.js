/* eslint no-unused-vars:0 */
'use strict'
import screenSize from '../../constants/screen-size'
import { replaceStorageUrlPrefix } from '../../utils/index'
import React, { Component } from 'react' // eslint-disable-line
import ReactDOM from 'react-dom'
import cx from 'classnames'
import styles from './LeadingVideo.scss'
import vjs from 'video.js'

// lodash
import defaults from 'lodash/defaults'
import get from 'lodash/get'

if (process.env.BROWSER) {
  require ('./LeadingVideo.css')
}

const DEFAULT_VIDEO_OPTIONS = {
  preload: 'auto',
  autoplay: true,
  controls: false
}

class LeadingVideo extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.mountVideoPlayer()
  }

  componentWillReceiveProps(nextProps) {
    let currentSrc = this.props.src
    let newSrc = nextProps.src

    if (currentSrc !== newSrc) {
      this.setVideoPlayerSrc(replaceStorageUrlPrefix(newSrc))
    }
  }

  componentWillUnmount() {
    this.unmountVideoPlayer()
  }

  getVideoPlayer() {
    return this._player
  }

  getVideoPlayerEl() {
    return ReactDOM.findDOMNode(this.refs.videoPlayer)
  }

  getVideoPlayerOptions() {
    const { poster } = this.props

    return defaults(
      {}, this.props.options, { poster: get(poster, 'desktop.url', '') }, DEFAULT_VIDEO_OPTIONS)
  }

  setVideoPlayerSrc(src) {
    this._player.src(src)
  }

  mountVideoPlayer() {
    let src = replaceStorageUrlPrefix(this.props.src)
    let options = this.getVideoPlayerOptions()
    this._player = vjs(this.getVideoPlayerEl(), options)
    let player = this._player
    player.ready()
    player.src(src)
  }

  unmountVideoPlayer() {
    this._player.dispose()
  }

  pauseVideo() {
    this._player.pause()
  }

  playVideo() {
    this._player.play()
  }

  restartVideo() {
    this._player.currentTime(0).play()
  }

  togglePauseVideo() {
    if (this._player.paused()) {
      this.playVideo()
    } else {
      this.pauseVideo()
    }
  }

  _composeSrcSet(imgObj) {
    let desktopSrc = replaceStorageUrlPrefix(get(imgObj, [ 'desktop', 'url' ]))
    let tabletSrc = replaceStorageUrlPrefix(get(imgObj, [ 'tablet', 'url' ]))
    let mobileSrc = replaceStorageUrlPrefix(get(imgObj, [ 'mobile', 'url' ]))
    return `${mobileSrc} ${screenSize.smallScreenMinWidth}w, ${tabletSrc} ${screenSize.mediumScreenMinWidth}w, ${desktopSrc} ${screenSize.largeScreenMinWidth}w`
  }

  render() {
    const { poster } = this.props
    let videoPlayerClasses = cx({
      'video-js': true,
      [styles['leading-video']]: true
    })

    let imageSrcSet = this._composeSrcSet(poster)
    let imageSrc = replaceStorageUrlPrefix(get(poster, 'mobile.url', ''))

    return (
      <div>
        <video ref="videoPlayer" className={videoPlayerClasses}>
        </video>
        <img
          className={styles['leading-poster']}
          src={imageSrc}
          srcSet={imageSrcSet}
        />
      </div>
    )
  }
}

LeadingVideo.propTypes = {
  options: React.PropTypes.object,
  poster: React.PropTypes.object,
  src: React.PropTypes.string.isRequired
}

LeadingVideo.defaultProps = {
  options: DEFAULT_VIDEO_OPTIONS,
  poster: {}
}

export { LeadingVideo }
