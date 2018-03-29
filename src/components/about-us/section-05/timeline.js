// import { screen } from '../utils/screen'
import React, { PureComponent } from 'react'
import Record, { recordStyle } from './record'
import styled from 'styled-components'

const Container = styled.div`
  height: 60vh;
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

const Month = styled.div`
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
      autoScrolling: true,
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
    // console.log('onMouseDown')
    this.setState({ mouseDown: true })
  }

  _onMouseMove = (event) => {
    if (!this.state.mouseDown) return
    if (!this.state.prevClientX) this.setState({ prevClientX: event.clientX })
    const leftBound = 0
    if(this.state.prevClientX) {
      const shiftX = event.clientX - this.state.prevClientX 
      this.setState({ prevClientX: event.clientX })
      if (this.state.timelineHorizontalShift + shiftX >=leftBound) {
        this.setState({ timelineHorizontalShift: this.state.timelineHorizontalShift + shiftX })
      }
    } 
  }

  _onMouseLeave = () => {
    // console.log('leave')
    this.setState({ mouseDown: false })    
  }

  _onMouseUp = () => {
    // console.log('onMouseUp')
    this.setState({ mouseDown: false })
    this.setState({ prevClientX: null })
  } 

  _timelineShifting = () => {
    
  }

  componentDidMount() {
    this._startLoop()
  }

  componentWillUnmount() {
    this._stopLoop()
  }

  render() {
    return (
      <React.Fragment>
        <Container>
          <ScrollingWrapper 
            horizontalShift={this.state.timelineHorizontalShift}
            onMouseDown={this._onMouseDown}
            onMouseUp={this._onMouseUp}
            onMouseMove={event => this._onMouseMove(event)}
            onMouseLeave={this._onMouseLeave}
          >
            <Month>
              <Record onHover={this._stopAutoScroll} onLeave={this._resumeAutoScroll} />
              <Record onHover={this._stopAutoScroll} onLeave={this._resumeAutoScroll} />
              <Record onHover={this._stopAutoScroll} onLeave={this._resumeAutoScroll} />
              <Record onHover={this._stopAutoScroll} onLeave={this._resumeAutoScroll} />
            </Month>
            <Month>
              <Record onHover={this._stopAutoScroll} onLeave={this._resumeAutoScroll} />
              <Record onHover={this._stopAutoScroll} onLeave={this._resumeAutoScroll} />
              <Record onHover={this._stopAutoScroll} onLeave={this._resumeAutoScroll} />
              <Record onHover={this._stopAutoScroll} onLeave={this._resumeAutoScroll} />
              <Record onHover={this._stopAutoScroll} onLeave={this._resumeAutoScroll} />
              <Record onHover={this._stopAutoScroll} onLeave={this._resumeAutoScroll} />
              <Record onHover={this._stopAutoScroll} onLeave={this._resumeAutoScroll} />
              <Record onHover={this._stopAutoScroll} onLeave={this._resumeAutoScroll} />
              <Record onHover={this._stopAutoScroll} onLeave={this._resumeAutoScroll} />
            </Month>
          </ScrollingWrapper>
        </Container>  
      </React.Fragment>
    )
  }
}

export default Timeline
