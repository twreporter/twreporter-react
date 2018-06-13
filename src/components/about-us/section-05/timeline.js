import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components'

const restart = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
    transform: translate3d(0, 0, 0);
  }
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  animation: ${props => props.returnToStart ? `${restart} 1s linear` : 'none'};
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
  user-select: none;
`

const Scroller = styled.div.attrs({
  style: ({ shiftY }) => ({
    transform: `translate3d(0, -${shiftY}px, 0)`
  })
}) `
  width: 100%;
`

export default class Timeline extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      frameId: null,
      timelineShiftY: 0,
      returnToStart: false,
      mouseDown: false,
      prevClientY: null
    }
  }

  _startLoop = () => {
    const frameId = window.requestAnimationFrame(this._loop)
    this.setState({ frameId: frameId })
  }

  _loop = () => {
    this._setAutoScroll()
    const frameId = window.requestAnimationFrame(this._loop)
    this.setState({ frameId: frameId })    
  }

  _stopLoop = () => {
    window.cancelAnimationFrame(this.state.frameId)
  }

  _setAutoScroll = () => {
    if (!this.props.autoScrolling) return
    if (!this._reachTheEnd()) {
      this.setState({ timelineShiftY: this.state.timelineShiftY + 0.5 })
      this._setYear()
    } else {
      this.setState({ returnToStart: true })
      setTimeout(() => {
        this.setState({ timelineShiftY: 0 })
        this.setState({ returnToStart: false })
      }, 500)
    }
  }

  _reachTheEnd = () => {
    return this.state.timelineShiftY >= this.props.childrenHeight
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
    this.setState({ prevClientY: null })
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
    if (!this.state.prevClientY) this.setState({ prevClientY: coordY })
    if (this.state.prevClientY) {
      const leftBound = 0
      const shiftY = this.state.prevClientY - coordY
      this.setState({ prevClientY: coordY })
      if (this.state.timelineShiftY + shiftY >= leftBound && this.state.timelineShiftY + shiftY < this.props.childrenHeight) {
        this.setState({ timelineShiftY: this.state.timelineShiftY + shiftY })
        this._setYear()
      }
    } 
  }

  _setYear = () => {
    const { yearContentHeight, getYear } = this.props
    let currentYearIndex = 0
    yearContentHeight.reduce((prev, curr, curIndex) => {
      if (this.state.timelineShiftY > prev) {
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
      <div ref={elem => this.elem = elem}>
        <Container returnToStart={this.state.returnToStart}>
          <Scroller
            shiftY={this.state.timelineShiftY}
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
