/* eslint no-unused-vars:0 */
'use strict'
import MobileDetect from 'mobile-detect'
import PropTypes from 'prop-types'
import React, { Component } from 'react' // eslint-disable-line
import ReactDOM from 'react-dom'
import VisibilitySensor from 'react-visibility-sensor'
import cx from 'classnames'
import soundOnIcon from '../../../static/asset/sound-on.svg'
import soundMuteIcon from '../../../static/asset/sound-mute.svg'
import style from './LeadingVideo.scss'
import { getImageSrcSet, replaceStorageUrlPrefix } from '../../utils/index'

// lodash
import get from 'lodash/get'

const _ = {
  get
}

class LeadingVideo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // record if user agent is iOS 10 below or mobile device
      isIOS10Below: false,
      isMobile: false,
      isMuted: props.mute
    }
    this.handleMuteChange = this._handleMuteChange.bind(this)
    this.handleScrolledOver = this._handleScrolledOver.bind(this)
  }

  componentDidMount() {
    let md = new MobileDetect(window.navigator.userAgent)
    let isIOS10Below = false
    let isMobile = false
    let isMuted = false
    if (md.mobile() || md.tablet()) {
      isMobile = true
      isMuted = true
    }
    if (md.is('iOS') && md.version('iOS') < 10) {
      isIOS10Below = true
      isMuted = true
    }
    this.setState({
      isIOS10Below,
      isMobile,
      isMuted
    })

    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false
    this._player = null
  }

  _handleMuteChange() {
    if (this._player) {
      this._player.muted = !this._player.muted
      this.setState({
        isMuted: !this.state.isMuted
      })
    }
  }

  _handleScrolledOver(isVisible) {
    // if video is not in the viewport,
    // turn off the audio.
    if (!isVisible && this._isMounted && this._player) {
      this.setState({
        isMuted: true
      })
      this._player.muted = true
    }
  }

  render() {
    const { classNames, filetype, loop, poster, portraitPoster, src, title } = this.props
    const { isIOS10Below, isMobile, isMuted } = this.state
    const imgSrcSet = getImageSrcSet(poster)
    const imgSrc = replaceStorageUrlPrefix(get(poster, 'mobile.url', ''))
    let portraitImgSrcSet = imgSrcSet
    let portraitImgSrc = imgSrc
    if (portraitPoster) {
      portraitImgSrcSet = getImageSrcSet(portraitPoster)
      portraitImgSrc = replaceStorageUrlPrefix(get(portraitPoster, 'mobile.url', ''))
    }
    let placeHolderJSX = null
    let videoJSX = null
    let posterJSX = null
    let portraitPosterJSX = null

    if (!this._isMounted) {
      // avoid the layout from flashing, render the empty div with 100vh height
      placeHolderJSX = (
        <div style={{ height: '120vh' }} />
      )
    }

    // there is no easy way to autoplay inline video on the devices whose iOS is below 10,
    // so just render the leading image
    if (isIOS10Below || !src) {
      posterJSX = (
        <img
          className={cx(_.get(classNames, 'poster', style['poster']), style['poster'])}
          src={imgSrc}
          srcSet={imgSrcSet}
          alt={title}
        />
      )
      portraitPosterJSX = (
        <img
          className={cx(_.get(classNames, 'poster', style['poster']), style['portrait-poster'])}
          src={portraitImgSrc}
          srcSet={portraitImgSrcSet}
          alt={title}
        />
      )
    } else {
      // On the mobile devices (iOS 10 above),
      // we can only autoplay the video without audio
      videoJSX = (
        <div>
          <video
            className={_.get(classNames, 'video', style['video'])}
            ref={(input) => { this._player = input }}
            playsInline
            poster={imgSrc}
            autoPlay
            muted={isMuted}
            loop={loop}
          >
            <source src={replaceStorageUrlPrefix(src)} type={filetype} />
          </video>
          <div className={_.get(classNames, 'videoMask', style['video-overlay'])} />
          <img
            className={_.get(classNames, 'audioBt', style['audio-bt'])}
            src={isMuted ? soundMuteIcon : soundOnIcon}
            onClick={this.handleMuteChange}
          />
        </div>
      )
    }

    return (
      <VisibilitySensor
        onChange={this.handleScrolledOver}
        partialVisibility={true}
      >
        <div className={_.get(classNames, 'container', style.container)}itemScope itemType="http://schema.org/VideoObject">
          <link itemProp="url" href={src} />
          <meta itemProp="name" content={title}/>
          {placeHolderJSX}
          {videoJSX}
          {posterJSX}
          {portraitPosterJSX}
        </div>
      </VisibilitySensor>
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
  poster: PropTypes.shape({
    desktop: PropTypes.shape({
      url: PropTypes.string
    }),
    mobile: PropTypes.shape({
      url: PropTypes.string
    }),
    tablet: PropTypes.shape({
      url: PropTypes.string
    })
  }),
  src: PropTypes.string,
  title: PropTypes.string
}

LeadingVideo.defaultProps = {
  className: {},
  filetype: '',
  loop: true,
  mute: true,
  poster: {},
  src: '',
  title: ''
}

export default LeadingVideo
