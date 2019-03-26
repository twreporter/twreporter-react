import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled, { css, keyframes } from 'styled-components'

const returnToStartDuration = 1000

const restart = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
`

const restartRule = css`
  ${restart} ${returnToStartDuration}ms linear;
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  animation: ${props => props.returnToStart ? restartRule : 'none'};
  cursor: move; /* fallback if grab cursor is unsupported */
  cursor: ${props => props.grabbing ? 'grabbing' : 'grab'};
  cursor: ${props => props.grabbing ? '-moz-grabbing' : '-moz-grab'};
  cursor: ${props => props.grabbing ? '-webkit-grabbing' : '-webkit-grab'};
  user-select: none;
`

const Scroller = styled.div`
  width: 100%;
`

export default class Timeline extends PureComponent {
  constructor(props) {
    super(props)
    this.frameId = null
    this.timelineShiftY = 0
    this.prevClientY = null
    this.state = {
      mouseDown: false,
      returnToStart: false
    }
  }

  _startLoop = () => {
    const newframeId = window.requestAnimationFrame(this._loop)
    this.freamId = newframeId
  }

  _loop = () => {
    this._setAutoScroll()
    const newframeId = window.requestAnimationFrame(this._loop)
    this.freamId = newframeId
  }

  _stopLoop = () => {
    window.cancelAnimationFrame(this.frameId)
  }

  _setAutoScroll = () => {
    if (!this.props.autoScrolling) return
    if (!this._reachTheEnd()) {
      this.timelineShiftY = this.timelineShiftY + 0.5
      this.scroller.style.transform = `translateY(-${this.timelineShiftY}px)`
      this._setYear()
    } else {
      this.setState({ returnToStart: true })
      setTimeout(() => {
        this.timelineShiftY = 0
        this.scroller.style.transform = `translateY(-${this.timelineShiftY}px)`
        this.setState({ returnToStart: false })
      }, returnToStartDuration / 2)
    }
  }

  _reachTheEnd = () => {
    return this.timelineShiftY >= this.props.childrenHeight
  }

  _onMouseDown = () => {
    this.setState({ mouseDown: true })
  }

  _onMouseMove = (event) => {
    if (!this.state.mouseDown) return
    const clientY = event.clientY
    this._timelineShifting(clientY)
  }

  _onMouseLeave = () => {
    this.setState({ mouseDown: false })
  }

  _onMouseUp = () => {
    this.setState({ mouseDown: false })
    this.prevClientY = 0
  }

  _onMouseOver = () => {
    this.props.stopAutoScroll()
  }

  _onMouseOut = () => {
    this.props.startAutoScroll()
  }

  /**
 * Set shifting value of time refering to the y-coordinate of pointer (mouse or touch) at this moment
 * @param {number} coordY
 */
  _timelineShifting = (coordY) => {
    if (!this.prevClientY) this.prevClientY = coordY
    if (this.prevClientY) {
      const leftBound = 0
      const shiftY = this.prevClientY - coordY
      this.prevClientY = coordY
      if (this.timelineShiftY + shiftY >= leftBound && this.timelineShiftY + shiftY < this.props.childrenHeight) {
        this.timelineShiftY = this.timelineShiftY + shiftY
        this.scroller.style.transform = `translateY(-${this.timelineShiftY}px)`
        this._setYear()
      }
    }
  }

  _setYear = () => {
    const { yearContentHeight, getYear } = this.props
    let currentYearIndex = 0
    yearContentHeight.reduce((prev, curr, curIndex) => {
      if (this.timelineShiftY > prev) {
        currentYearIndex = curIndex
        return prev + curr
      }
    })
    getYear(currentYearIndex)
  }

  componentDidMount() {
    this._startLoop()
  }

  componentWillUnmount() {
    this._stopLoop()
  }

  render() {
    return (
      <div>
        <Container
          returnToStart={this.state.returnToStart}
          grabbing={this.state.mouseDown}
        >
          <Scroller
            ref={(node) => { this.scroller = node }}
            onMouseDown={this._onMouseDown}
            onMouseUp={this._onMouseUp}
            onMouseMove={event => this._onMouseMove(event)}
            onMouseLeave={this._onMouseLeave}
            onMouseOver={this._onMouseOver}
            onMouseOut={this._onMouseOut}
          >
            {this.props.children}
          </Scroller>
        </Container>
      </div>
    )
  }
}

Timeline.defaultProps = {
  childrenHeight: 0,
  autoScrolling: false,
  yearContentHeight: []
}

Timeline.propTypes = {
  childrenHeight: PropTypes.number.isRequired,
  autoScrolling: PropTypes.bool.isRequired,
  startAutoScroll: PropTypes.func.isRequired,
  stopAutoScroll: PropTypes.func.isRequired,
  yearContentHeight: PropTypes.array.isRequired,
  getYear: PropTypes.func.isRequired
}
