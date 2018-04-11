import { content } from '../constants/data/section5-content'
import { recordStyle } from './record'
import { screen } from '../utils/screen'
import MonthlyRecords from './monthly-records'
import orderBy from 'lodash/orderBy'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled, { keyframes } from 'styled-components'

const _ = {
  orderBy
}

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
  height: 633px;
  white-space: nowrap;
  overflow: hidden;
  margin: 272px auto 300px auto;
  animation: ${props => props.returnToStart ? `${restart} 1s linear` : 'none'};
  cursor: col-resize; /* fallback if grab cursor is unsupported */
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
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
    const data = content.slice()
    this.sortedData = _.orderBy(data, [ 'year', 'month', 'date' ], [ 'desc', 'desc', 'desc' ])
    this.dataSeperatedByMonth = this._groupBy(this.sortedData, (d) => { return [ d.year, d.month ] })
    this.dataSeperatedByYear = this._groupBy(this.sortedData, (d) => { return [ d.year ] })
    this.totalLength = (data.length - this.dataSeperatedByMonth.length) * recordStyle.width + this.dataSeperatedByMonth.length * recordStyle.widthIncludesMonth
    const _recordHorizontalShift = this._getrecordHorizontalShift()
    this.state = {
      frameId: null,
      timelineHorizontalShift: 0,
      mouseDown: false,
      prevClientX: null,
      returnToStart: false,
      recordHorizontalShift: _recordHorizontalShift
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
      this.setState({ timelineHorizontalShift: this.state.timelineHorizontalShift + 0.5 })
      this._popSetter()
      this._setYear()
    } else {
      this.setState({ returnToStart: true })
      setTimeout(() => {
        this.setState({ timelineHorizontalShift: 0 })
        this.setState({ returnToStart: false })
      }, 500)}
  }

  _setYear = () => {
    const progress = this.state.timelineHorizontalShift / this.totalLength
    const segmentofYears = this.dataSeperatedByYear.map((d) => {
      return d.length / this.sortedData.length
    })
    let cumulativeSegments = 0
    let currentYear = 0
    segmentofYears.forEach((segment, index) => {
      if(progress > cumulativeSegments) {
        cumulativeSegments += segmentofYears[index]
        currentYear = this.dataSeperatedByYear[index][0].year
      }
    })
    this.props.getYear(currentYear)
  }

  _popSetter = () => {
    let stateChanged = false
    let tempArray = this.state.recordHorizontalShift.slice()
    tempArray.forEach((shiftArray) => {
      shiftArray.forEach((shift) => {
        if(this.state.timelineHorizontalShift > shift['shift'] - window.innerWidth && !shift.poped) {
          shift.poped = true
          stateChanged = true
        }
      })
    })
    if(stateChanged) {
      this.setState({ recordHorizontalShift: tempArray })
    }
  }

  _onMouseDown = () => {
    this.setState({ mouseDown: true })
  }

  _onMouseMove = (event) => {
    if (!this.state.mouseDown) return
    const clientX = event.clientX
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
    this.props.stopAutoScroll()
  }

  _onTouchMove = (event) => {
    const clientX = event.touches[0].clientX
    this._timelineShifting(clientX)
  }

  _onTouchEnd = () => {
    this.setState({ prevClientX: null })
    this.props.startAutoScroll()
  }

  /**
 * Set shifting value of time refering to the x-coordinate of pointer (mouse or touch) at this moment
 * @param {number} coordX
 */
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

  _reachTheEnd = () => {
    return this.state.timelineHorizontalShift >= this.totalLength - window.innerWidth
  }

  /**
 * Grouping elements in array by multiple properties
 * @param {array} array - The array to process which has multiple properties
 * @param {function} f - A function indicates what properties should be group together
 * 
 * Example:
 *  If I would like to group the elements with same properties of name and age to form a new array,
 *  just put them in a collection as below. ( e.g. An array consists of [name, age] )
 * 
 * _groupBy(data, function(d){
 *  [d.name, d.age]
 * })
 */
  _groupBy = (array, f) => {
    let groups = {}
    array.forEach((o) => {
      let group = JSON.stringify(f(o))
      groups[group] = groups[group] || []
      groups[group].push(o)
    })
    return Object.keys(groups).map((group) => {
      return groups[group]
    })
  }

  /**
 * Compute the pop-up timing of every timestamp by using the distance from the beginning of timeline
 * @param {array} seq - The data which has been sorted
 * @return {array} [{ month: month, shift : shift, poped : false }...] - An array of objects which are composed by month, the pop-up timing (shift), and a flag to show whether it has poped or not (poped)
 */
  _makeRecodsHorizontalShiftArray = (seq) => {     
    return seq.map((d, index) => {
      let month = 0
      let cumulativeRecords = 0
      this.dataSeperatedByMonth.forEach((el, j) => {
        if (index >= cumulativeRecords) {
          cumulativeRecords += el.length
          month = j
        }
      })
      const shift = (index - month - 1) * recordStyle.width + 0.6 * recordStyle.width + (month + 1) * recordStyle.widthIncludesMonth
      return { month: month, shift : shift, poped : false }
    })
  }

  _getrecordHorizontalShift = () => {
    const shiftArray = this._groupBy(this._makeRecodsHorizontalShiftArray(this.sortedData), (d) => { return [ d.month ] })
    return shiftArray
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
    const { stopAutoScroll, startAutoScroll } = this.props
    const AllRecords = this.dataSeperatedByMonth.map((record, index) => {
      return (
        <MonthlyRecords
          key={index}
          monthlyNum={index}
          stopAutoScroll={stopAutoScroll}
          startAutoScroll={startAutoScroll}
          data={record}
          isTriggered={this.state.recordHorizontalShift}
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

Timeline.defaultProps = {
  autoScrolling: false 
}

Timeline.propTypes = {
  getYear: PropTypes.func.isRequired,
  autoScrolling: PropTypes.bool.isRequired,
  startAutoScroll: PropTypes.func.isRequired,
  stopAutoScroll: PropTypes.func.isRequired 
}

export default Timeline
