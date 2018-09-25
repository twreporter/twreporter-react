import { replaceStorageUrlPrefix } from '../../utils/url'
import PropTypes from 'prop-types'
import React from 'react'
import SoundMuteIcon from '../../../static/asset/sound-mute.svg'
import SoundOnIcon from '../../../static/asset/sound-on.svg'
import styled, { css } from 'styled-components'
import Waypoint from 'react-waypoint'

const Container = styled.div`
  position: relative;
  width: 100%;
  height: ${props => props.viewportHeight};
`

const topicVideoStyle = `
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  object-fit: cover;
  height: 100%;
`

const Video = styled.video`
  display: block;
  width: 100%;
  ${props => props.topicLeadingVideo ? topicVideoStyle : ''}
`

const VideoMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .1);
`

const audioBtnStyle = css`
  width: 30px;
  height: auto;
  position: absolute;
  bottom: 5%;
  right: 5%;
  cursor: pointer;
  background-color: black;
  border-radius: 30px;
  z-index: 50;
`

const StyledSoundMuteIcon = styled(SoundMuteIcon)`${audioBtnStyle}`
const StyledSoundOnIcon = styled(SoundOnIcon)`${audioBtnStyle}`

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
    const { filetype, loop, poster, src, title, viewportHeight, topicLeadingVideo } = this.props
    const { isMuted } = this.state

    // On the mobile devices (iOS 10 above),
    // we can only autoplay the video without audio
    return (
      <Waypoint
        onLeave={this.onLeave}
        onEnter={this.onEnter}
        fireOnRapidScroll
        scrollableAncestor="window"
      >
        <Container
          itemScope
          itemType="http://schema.org/VideoObject"
          viewportHeight={viewportHeight}
        >
          <link itemProp="url" href={src} />
          <meta itemProp="name" content={title} />
          <meta itemProp="thumbnail" content={poster} />
          <Video
            ref={(input) => { this._player = input }}
            playsInline
            poster={poster}
            autoPlay
            muted={isMuted}
            loop={loop}
            topicLeadingVideo={topicLeadingVideo}
          >
            <source src={replaceStorageUrlPrefix(src)} type={filetype} />
          </Video>
          <VideoMask />
          {isMuted ?
            <StyledSoundMuteIcon
              onClick={this.handleMuteChange}
            /> :
            <StyledSoundOnIcon
              onClick={this.handleMuteChange}
            />
          }
        </Container>
      </Waypoint>
    )
  }
}

LeadingVideo.propTypes = {
  filetype: PropTypes.string,
  loop: PropTypes.bool,
  mute: PropTypes.bool,
  poster: PropTypes.string,
  src: PropTypes.string,
  title: PropTypes.string,
  viewportHeight: PropTypes.string,
  topicLeadingVideo: PropTypes.boolean
}

LeadingVideo.defaultProps = {
  filetype: '',
  loop: true,
  mute: true,
  poster: '',
  src: '',
  title: '',
  viewportHeight: '100vh',
  topicLeadingVideo: false
}

export default LeadingVideo
