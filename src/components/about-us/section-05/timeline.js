import { content } from '../constants/data/section5-content'
import { screen } from '../utils/screen'
import MonthlyRecords from './monthly-records'
import React, { PureComponent } from 'react'
import { recordStyle } from './record'
import styled, { keyframes } from 'styled-components'
import filter from 'lodash/filter'
import orderBy from 'lodash/orderBy'

const _ = {
  filter, orderBy
}

const restart = keyframes`
  0%,100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
    transform: translate3d(0, 0, 0);
  }
`

const Container = styled.div`
  height: 633px;
  white-space: nowrap;
  overflow: hidden;
  margin: 272px auto 300px auto;
  animation: ${props => props.returnToStart ? `${restart} 1s linear` : 'none'};
  ${screen.overDesktop`
    height: 790px;
  `}
  ${screen.tabletBelow`
    margin-top: -20px;
    height: 600px;
  `}
`

const ScrollingWrapper = styled.div.attrs({
  style: ({ horizontalShift }) => ({
    transform: `translate3d(-${horizontalShift}px, 0, 0)`
  })
}) `
  height: 100%;
`

export class Timeline extends PureComponent {
  constructor(props) {
    super(props)
    const monthNumber = 17 //should be modified
    this.content = content.slice()
    this.totalLength = (this.content.length - monthNumber) * recordStyle.width + monthNumber * recordStyle.widthIncludesMonth
    this.state = {
      frameId: null,
      timelineHorizontalShift: 0,
      autoScrolling: true,
      mouseDown: false,
      prevClientX: null,
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
    if (!this.state.autoScrolling) return
    if (this._notReachTheEnd()) {
      this.setState({ timelineHorizontalShift: this.state.timelineHorizontalShift + 0.5 })
      this._setYear()
    } else {
      this.setState({ returnToStart: true })
      setTimeout(() => {
        this.setState({ timelineHorizontalShift: 0 })
        this.setState({ returnToStart: false })
      }, 500)}
  }

  _resumeAutoScroll = () => {
    this.setState({ autoScrolling: true })    
  }

  _stopAutoScroll = () => {
    this.setState({ autoScrolling: false })
  }

  _setYear = () => {
    if (this.state.timelineHorizontalShift < recordStyle.width * 2) {     // get number of MonthlyRecords in a year
      this.props.getYear(2018)
    } else if (this.state.timelineHorizontalShift > recordStyle.width * 2 && this.state.timelineHorizontalShift < recordStyle.width * 13) {
      this.props.getYear(2017)
    } else if (this.state.timelineHorizontalShift > recordStyle.width * 13 && this.state.timelineHorizontalShift < recordStyle.width * 18) {
      this.props.getYear(2016)
    } else if (this.state.timelineHorizontalShift > recordStyle.width * 18 && this.state.timelineHorizontalShift < recordStyle.width * 20) {
      this.props.getYear(2015)
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
      if (this.state.timelineHorizontalShift + shiftX >= leftBound && this.state.timelineHorizontalShift + shiftX < this.totalLength - window.innerWidth) {
        this.setState({ timelineHorizontalShift: this.state.timelineHorizontalShift + shiftX })
      }
    } 
  }

  _notReachTheEnd = () => {
    return this.state.timelineHorizontalShift < this.totalLength - window.innerWidth
  }

  /**
 * Grouping elements in array by multiple properties
 * @param {array} array - The array to process which has multiple properties
 * @param {function} f - A function indicates what properties should be group together
 * 
 * Example:
 *  If I would like to group the elements with same properties of name and age to form a new array,
 *  just put them in an array as below.
 * 
 * _groupBy(data, function(d){
 *  [d.name, d.age]
 * })
 */
  _groupBy = (array, f) => {
    let groups = {}
    array.forEach(function (o) {
      let group = JSON.stringify(f(o))
      groups[group] = groups[group] || []
      groups[group].push(o)
    })
    return Object.keys(groups).map(function (group) {
      return groups[group]
    })
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
    const sortedData = _.orderBy(this.content, [ 'year', 'month', 'date' ], [ 'desc', 'desc', 'desc' ])
    const processedData = this._groupBy(sortedData, function (data) {
      return [ data.year, data.month ]
    })

    const AllRecords = processedData.map((record, index) => {
      return (
        <MonthlyRecords
          key={index}
          stopAutoScroll={this._stopAutoScroll}
          resumeAutoScroll={this._resumeAutoScroll}
          data={record}
        />
      )
    })

    return (
      <div ref={elem => this.elem = elem}>
        <Container returnToStart={this.state.returnToStart}>
          <ScrollingWrapper
            horizontalShift={this.state.timelineHorizontalShift}
            onMouseDown={this._onMouseDown}
            onMouseUp={this._onMouseUp}
            onMouseMove={event => this._onMouseMove(event)}
            onMouseLeave={this._onMouseLeave}
            onTouchMove={event => this._onTouchMove(event)}
            onTouchEnd={this._onTouchEnd}
          >
            {AllRecords}
          </ScrollingWrapper>
        </Container>  
      </div>
    )
  }
}

export default Timeline
