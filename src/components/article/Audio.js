/* eslint no-unused-vars:0 */
'use strict'
import CircleProgressButton from './CircleProgressButton'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import Player from 'react-howler'
import PropTypes from 'prop-types'
import React from 'react' // eslint-disable-line
import Slider from 'rc-slider'
import classNames from 'classnames'
import commonStyles from './Common.scss'
import pauseIcon from '../../../static/asset/audio-pause.svg'
import playIcon from '../../../static/asset/audio-play.svg'
import raf from 'raf' // requestAnimationFrame polyfill
import styles from './Audio.scss'
import { Image } from './Image'
import { replaceStorageUrlPrefix } from '../../utils/index'
import 'rc-slider/assets/index.css'
import './rcslider-overwrite.css'

// lodash
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'

function getMinSecStr(time) {
  time = Math.round(time)
  let minutes = Math.floor(time / 60)
  let seconds = time - minutes * 60
  seconds = seconds < 10 ? 0 + seconds.toString() : seconds.toString()
  return minutes + ':' + seconds
}

function getDurationISO8601Format(time) {
  time = Math.round(time)
  let minutes = Math.floor(time / 60)
  let seconds = time - minutes * 60
  seconds = seconds < 10 ? 0 + seconds.toString() : seconds.toString()
  return 'T' + minutes + 'M' + seconds + 'S'
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
    const { url, coverPhoto, title, description } = get(content, 0, {})

    let vUrl = replaceStorageUrlPrefix(url)

    const player = (
      <Player
        src={vUrl}
        playing={isPlaying}
        onLoad={this.handleOnLoad}
        onPlay={this.handleOnPlay}
        onEnd={this.handleOnEnd}
        ref={(ref) => this.player = ref}
      />
    )

    const microData = (
      <div itemProp="audio" itemScope itemType="http://schema.org/AudioObject">
        <meta itemProp="contentUrl" content={vUrl} />
        <meta itemProp="duration" content={getDurationISO8601Format(duration)}/>
        <meta itemProp="description" content={description} />
        <meta itemProp="name" content={title} />
      </div>
    )

    // render Audio without cover photo
    if (isEmpty(coverPhoto)) {
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
              <span className={styles['audio-time-block']}>{getMinSecStr(seek)} / {getMinSecStr(duration)}</span>
            </div>
            <div className={styles['html']} dangerouslySetInnerHTML={{ __html: description }} style={{ marginTop: '16px' }}/>
          </div>
          { player }
          { microData }
        </div>
      )
    }

    // render Audio with cover photo
    return (
      <div itemScope itemType="http://schema.org/AudioObject" className={classNames(styles['audio-container'], { [styles['mobile']]: device === 'mobile' ? true : false }, 'hidden-print')}>
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
        { microData }
      </div>
    )
  }
}

Audio.propTypes = {
  content: PropTypes.array.isRequired,
  device: PropTypes.string,
  styles: PropTypes.object
}

Audio.defaultProps = {
  content: [],
  device: '',
  styles: {}
}

export { Audio }
