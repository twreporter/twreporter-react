// import { screen } from '../utils/screen'
import React, { PureComponent } from 'react'
import Record, { recordStyle } from './record'
import styled from 'styled-components'

const Container = styled.div`
  height: 80vh;
  white-space: nowrap;
  overflow: hidden;
  margin: 272px auto 300px auto;
`

const ScrollingWrapper = styled.div.attrs({
  style: ({ horizontalShift }) => ({
    transform: `translate3d(-${horizontalShift}px, 0, 0)`
  })
}) `
  height: 100%;
`

const Records = styled.div`
  display: inline-block;
  height: 100%;
  overflow: hidden;
  white-space: nowrap;
  border: solid 2px black;
`

export class Timeline extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      frameId: null,
      timelineHorizontalShift: 0,
      autoScrolling: false,
      mouseDown: false,
      prevClientX: null
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
    if (this.state.autoScrolling) {
      this.setState({ timelineHorizontalShift: this.state.timelineHorizontalShift + 0.5 })
      // use lodash get all of the data in each year
      this._setYear()
    }
  }

  _resumeAutoScroll = () => {
    this.setState({ autoScrolling: true })    
  }

  _stopAutoScroll = () => {
    this.setState({ autoScrolling: false })
  }

  _setYear = () => {
    if (this.state.timelineHorizontalShift > recordStyle.width * 4) {     // get number of records in a year
      this.props.getYear(2016)
    }
  }

  _onMouseDown = () => {
    this.setState({ mouseDown: true })
  }

  _onMouseMove = (event) => {
    const clientX = event.clientX
    if (!this.state.mouseDown) return
    this._timelineShifting(clientX)
  }

  _onMouseLeave = () => {
    this.setState({ mouseDown: false })    
  }

  _onMouseUp = () => {
    this.setState({ mouseDown: false })
    this.setState({ prevClientX: null })
  } 

  _onTouchStart = () => {
    this._stopAutoScroll()
  }

  _onTouchMove = (event) => {
    const clientX = event.touches[0].clientX
    this._timelineShifting(clientX)
  }

  _onTouchEnd = () => {
    this.setState({ prevClientX: null })
    this._resumeAutoScroll()
  }

  _timelineShifting = (coordX) => {
    if (!this.state.prevClientX) this.setState({ prevClientX: coordX })
    if (this.state.prevClientX) {
      const leftBound = 0
      const shiftX = (coordX - this.state.prevClientX) * (-1)
      this.setState({ prevClientX: coordX })
      if (this.state.timelineHorizontalShift + shiftX >= leftBound) {
        this.setState({ timelineHorizontalShift: this.state.timelineHorizontalShift + shiftX })
      }
    } 
  }

  componentDidMount() {
    this._startLoop()
    this.elem.addEventListener('touchstart', e => {
      e.preventDefault()
      this._onTouchStart()
    })
  }

  componentWillUnmount() {
    this._stopLoop()
  }

  render() {
    return (
      <div ref={elem => this.elem = elem}>
        <Container>
          <ScrollingWrapper
            horizontalShift={this.state.timelineHorizontalShift}
            onMouseDown={this._onMouseDown}
            onMouseUp={this._onMouseUp}
            onMouseMove={event => this._onMouseMove(event)}
            onMouseLeave={this._onMouseLeave}
            onTouchMove={event => this._onTouchMove(event)}
            onTouchEnd={this._onTouchEnd}
          >
            <Records>
              <Record onHover={this._stopAutoScroll} onLeave={this._resumeAutoScroll} />
              <Record onHover={this._stopAutoScroll} onLeave={this._resumeAutoScroll} />
              <Record onHover={this._stopAutoScroll} onLeave={this._resumeAutoScroll} />
              <Record onHover={this._stopAutoScroll} onLeave={this._resumeAutoScroll} />
            </Records>
            <Records>
              <Record onHover={this._stopAutoScroll} onLeave={this._resumeAutoScroll} />
              <Record onHover={this._stopAutoScroll} onLeave={this._resumeAutoScroll} />
              <Record onHover={this._stopAutoScroll} onLeave={this._resumeAutoScroll} />
              <Record onHover={this._stopAutoScroll} onLeave={this._resumeAutoScroll} />
              <Record onHover={this._stopAutoScroll} onLeave={this._resumeAutoScroll} />
              <Record onHover={this._stopAutoScroll} onLeave={this._resumeAutoScroll} />
              <Record onHover={this._stopAutoScroll} onLeave={this._resumeAutoScroll} />
              <Record onHover={this._stopAutoScroll} onLeave={this._resumeAutoScroll} />
              <Record onHover={this._stopAutoScroll} onLeave={this._resumeAutoScroll} />
            </Records>
          </ScrollingWrapper>
        </Container>  
      </div>
    )
  }
}

export default Timeline
