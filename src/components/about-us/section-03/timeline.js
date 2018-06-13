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
      returnToStart: false
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
  autoScrolling: false
}

Timeline.propTypes = {
  childrenHeight: PropTypes.number.isRequired,
  autoScrolling: PropTypes.bool.isRequired
}
