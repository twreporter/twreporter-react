/* eslint no-unused-vars:0 */
'use strict'
import MobileDetect from 'mobile-detect'
import React, { Component } from 'react' // eslint-disable-line
import ReactDOM from 'react-dom'
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
    this._player = ReactDOM.findDOMNode(this.refs.player)
  }

  componentWillUnMount() {
    this._isMounted = false
  }

  _handleMuteChange() {
    this._player.muted = !this._player.muted
    this.setState({
      isMuted: !this.state.isMuted
    })
  }

  render() {
    const { classNames, filetype, loop, poster, src, title } = this.props
    const { isIOS10Below, isMobile, isMuted } = this.state
    const imgSrcSet = getImageSrcSet(poster)
    const imgSrc = replaceStorageUrlPrefix(get(poster, 'tablet.url', ''))
    let placeHolderJsx
    let videoJsx
    if (!this._isMounted) {
      // avoid the layout from flashing, render the empty div with 100vh height
      placeHolderJsx = (
        <div style={{ height: '120vh' }} />
      )
    }

    // there is no easy way to autoplay inline video on the devices whose iOS is below 10,
    // so just render the leading image
    if (isIOS10Below) {
      videoJsx = (
        <img
          className={_.get(classNames, 'poster', style['poster'])}
          src={imgSrc}
          srcSet={imgSrcSet}
          alt={title}
        />
      )
    } else {
      // On the mobile devices (iOS 10 above),
      // we can only autoplay the video without audio
      videoJsx = (
        <div>
          <video
            className={_.get(classNames, 'video', style['video'])}
            ref="player"
            poster={imgSrc}
            playsInline
            autoPlay
            muted={isMuted}
            loop={loop}
          >
            <source src={src} type={filetype} />
          </video>
          <img
            className={_.get(classNames, 'audioBt', style['audio-bt'])}
            src={isMuted ? soundMuteIcon : soundOnIcon}
            onClick={this.handleMuteChange}
          />
        </div>
      )
    }

    return (
      <div className={_.get(classNames, 'container', style.container)}itemScope itemType="http://schema.org/VideoObject">
        <link itemProp="url" href={src} />
        <meta itemProp="name" content={title}/>
        {placeHolderJsx}
        {videoJsx}
      </div>
    )
  }
}

LeadingVideo.propTypes = {
  classNames: React.PropTypes.shape({
    container: React.PropTypes.string,
    poster: React.PropTypes.string,
    video: React.PropTypes.string,
    audioBt: React.PropTypes.string
  }),
  filetype: React.PropTypes.string,
  loop: React.PropTypes.bool,
  mute: React.PropTypes.bool,
  poster: React.PropTypes.shape({
    desktop: {
      url: React.PropTypes.string
    },
    mobile: {
      url: React.PropTypes.string
    },
    tablet: {
      url: React.PropTypes.string
    }
  }),
  src: React.PropTypes.string.isRequired,
  title: React.PropTypes.string
}

LeadingVideo.defaultProps = {
  className: {},
  filetype: '',
  loop: true,
  mute: true,
  poster: {},
  title: ''
}

export default LeadingVideo
