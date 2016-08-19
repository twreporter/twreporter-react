/* eslint no-unused-vars:0 */
'use strict'
import { Image } from './Image'
import _ from 'lodash'
import CircleProgressButton from './CircleProgressButton'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import Player from 'react-howler'
import React from 'react' // eslint-disable-line
import Slider from 'rc-slider'
import classNames from 'classnames'
import commonStyles from './Common.scss'
import playIcon from '../../../static/asset/audio-play.svg'
import pauseIcon from '../../../static/asset/audio-pause.svg'
import raf from 'raf' // requestAnimationFrame polyfill
import styles from './Audio.scss'

if (process.env.BROWSER) {
  require('rc-slider/assets/index.css')
  require('./rcslider-overwrite.css')
}

function getMinSecStr(time) {
  time = Math.round(time)
  let minutes = Math.floor(time / 60)
  let seconds = time - minutes * 60
  seconds = seconds < 10 ? 0 + seconds.toString() : seconds.toString()
  return minutes + ':' + seconds
}

const AudioSlider = ({ duration, onSeekChange, seek }) => {
  return (
    <div key="audio-slider" className={styles['audio-slider']}>
      <div className={styles['audio-time-display']}>{getMinSecStr(seek)}</div>
      <Slider
        tipFormatter={null}
        onChange={onSeekChange}
        value={seek}
        max={duration}
      />
      <div className={styles['audio-time-display']}>{getMinSecStr(duration)}</div>
    </div>
  )
}

const AudioController = (props) => {

  const { duration, isOncePlayed, isPlaying, isFocused, onSeekChange, onToggle, seek } = props

  return (
    <CSSTransitionGroup
      transitionName={styles}
      transitionAppear={true}
      transitionAppearTimeout={1000}
      transitionEnterTimeout={1000}
      transitionLeaveTimeout={1000}
      >
      {
        !isOncePlayed ?
          <div key="notPlayedYet">
            <CircleProgressButton
              duration={duration}
              isOncePlayed={isOncePlayed}
              isPlaying={isPlaying}
              onToggle={onToggle}
              seek={seek}
            />
            <div className={styles['audio-duration-block']}>{getMinSecStr(duration)}</div>
          </div>
        : null
      }
      { isOncePlayed && !isPlaying || (isPlaying && isFocused) ?
        <div key="oncePlayed">
          <CircleProgressButton
            duration={duration}
            isOncePlayed={isOncePlayed}
            isPlaying={isPlaying}
            onToggle={onToggle}
            seek={seek}
          />
          <AudioSlider
            duration={duration}
            onSeekChange={onSeekChange}
            seek={seek}
          />
        </div>
      : null }
    </CSSTransitionGroup>
  )
}

class Audio extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      duration: 100,
      loaded: false,
      isOncePlayed: false,
      isPlaying: false,
      isFocused: false,
      seek: 0
    }
    this.handleMouseClick = this._handleMouseClick.bind(this)
    this.handleOnLoad = this._handleOnLoad.bind(this)
    this.handleOnEnd = this._handleOnEnd.bind(this)
    this.handleOnMouseOut = this._handleOnMouseOut.bind(this)
    this.handleOnMouseOver = this._handleOnMouseOver.bind(this)
    this.handleOnPlay = this._handleOnPlay.bind(this)
    this.handleToggle = this._handleToggle.bind(this)
    this.renderSeekPos = this._renderSeekPos.bind(this)
    this.handleSeekChange = this._handleSeekChange.bind(this)
  }

  componentWillUnmount() {
    this.clearRAF()
  }

  _handleMouseClick(e) {
    e.stopPropagation()
    this.setState({
      isFocused: !this.state.isFocused
    })
  }

  _handleToggle(e) {
    e.stopPropagation()

    this.setState({
      isOncePlayed: true,
      isPlaying: !this.state.isPlaying,
      isFocused: false
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

  _handleOnMouseOver(e) {
    e.stopPropagation()
    this.setState({
      isFocused: true
    })
  }

  _handleOnMouseOut(e) {
    e.stopPropagation()
    this.setState({
      isFocused: false
    })
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

  _handleSeekChange(seek) {
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
    const { content, device } = this.props
    const { duration, isFocused, isOncePlayed, isPlaying, seek } = this.state
    const { url, coverPhoto, title, description } = _.get(content, 0, {})

    const player = (
      <Player
        src={url}
        playing={isPlaying}
        onLoad={this.handleOnLoad}
        onPlay={this.handleOnPlay}
        onEnd={this.handleOnEnd}
        ref={(ref) => this.player = ref}
      />
    )

    // render Audio without cover photo
    if (_.isEmpty(coverPhoto)) {
      let btRadius = 24
      return (
        <div className={classNames(styles['audio-container'], { [styles['mobile']]: device === 'mobile' ? true : false })}>
          <Slider
            tipFormatter={null}
            onChange={this.handleSeekChange}
            value={seek}
            max={duration}
          />
          <div className={classNames(styles['audio-info-container'], styles['without-cp'])}>
            <div className={styles['progress-bt']} style={{ width: btRadius * 2, height: btRadius * 2 }}>
              { isPlaying ? <img onClick={this.handleToggle} src={pauseIcon} /> : <img onClick={this.handleToggle} src={playIcon} /> }
            </div>
            <div style={{ display: 'inline-block' }}>
              <h4>{title}</h4>
              <span className={commonStyles['desc-text-block']}>{getMinSecStr(seek)} / </span>
              <span className={commonStyles['desc-text-block']}>{getMinSecStr(duration)}</span>
            </div>
            <div className={styles['html']} dangerouslySetInnerHTML={{ __html: description }} style={{ marginTop: '16px' }}/>
          </div>
          { player }
        </div>
      )
    }

    // render Audio with cover photo
    return (
      <div className={classNames(styles['audio-container'], { [styles['mobile']]: device === 'mobile' ? true : false })}>
        <div className={styles['audio-coverphoto']} onClick={this.handleMouseClick} onMouseEnter={this.handleOnMouseOver} onMouseLeave={this.handleOnMouseOut}>
          <div className={styles['audio-img-filter']} style={ isOncePlayed ? {
            opacity: 1
          }: {}}>
          <Image
            content = { [ coverPhoto ] }
            isToShowDescription={false}
          />
        </div>
        <AudioController
          duration={duration}
          isFocused={isFocused}
          isOncePlayed={isOncePlayed}
          isPlaying={isPlaying}
          onToggle={this.handleToggle}
          onSeekChange={this.handleSeekChange}
          seek={seek}
        />
      </div>
      <div className={styles['audio-info-container']}>
        <h4 className={'text-center'}>{title}</h4>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
      { player }
      </div>
    )
  }
}

Audio.propTypes = {
  content: React.PropTypes.array.isRequired,
  device: React.PropTypes.string,
  styles: React.PropTypes.object
}

Audio.defaultProps = {
  content: [],
  device: '',
  styles: {}
}

export { Audio }
