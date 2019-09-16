import mq from '../../utils/media-query'
import PropTypes from 'prop-types'
import React, { Component, Children } from 'react'
import styled from 'styled-components'
// lodash
import get from 'lodash/get'
import map from 'lodash/map'

const _ = {
  get,
  map
}

const SlidesContainer = styled.div`
  position: relative;
  overflow: visible;
  touch-action: pan-y;
  ${mq.mobileOnly`
    height: 300px;
    height: calc(100vh - 258px);
  `}
  ${mq.tabletOnly`
    height: calc(100vh - 258px);
  `}
  ${mq.desktopAndAbove`
    height: calc(100vh - 200px);
  `}
`

const Slides = styled.ul`
  position: absolute;
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: nowrap;
  transition-property: ${props => props.isSliding ? 'transform' : 'none'};
  transform: ${props => props.offset !== 0 ? `translateX(calc(${props.offset * 1}px - ${props.currentSlide * 100}vw))` : `translateX(-${props.currentSlide * 100}vw)`};
  transition-duration: ${props => props.transitionDuration};
  transition-timing-function: ${props => props.transitionTimingFunction};
  will-change: transform;
  height: 100%;
`

const Slide = styled.li`
  flex: 0 0 100vw;
  height: 100%;
`

const Indicators = styled.ol`
  padding: 0;
  list-style-type: none;
	text-align: center;
  width: 100%;
  margin: 80px auto 100px auto;
  ${mq.tabletAndAbove`
    margin: 30px auto 60px auto;
  `}
`

const Indicator = styled.li`
	display: inline-block;
	min-width: 10px;
	min-height: 10px;
	width: .6em;
	height: .6em;
  background-color: ${props => props.focus ? 'white' : '#BEC0BC' };
	margin: 0 .8em;
	border-radius: 50%;
	overflow: hidden;
	cursor: pointer;
  text-indent: 100%;
`

const Button = styled.div`
	background-color: transparent;
	border: 0;
	cursor: pointer;
	height: 43px;
	opacity: .75;
	outline: none;
	padding: 0;
	position: absolute;
  background-repeat: no-repeat;
  background-size: contain;
  margin: 0 1em;
  top: 50%;
  transform: translateY(-50%);
  width: 43px;
  ${mq.mobileOnly`
    display: none;
  `}
`

const PrevBtn = styled(Button)`
  left: 0;
  background-image: url('/asset/photography/topnews-prev.svg');
`

const NextBtn = styled(Button)`
  right: 0;
  background-image: url('/asset/photography/topnews-next.svg');
`

class Carousel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentSlide: this.props.initialSlide,
      dragPosition: null,
      isSliding: false,
      offset: 0
    }
    this.setTimer = this.setTimer.bind(this)
    this.clearTimer = this.clearTimer.bind(this)
    this.events = {
      onTouchStart: this.onDraggingStart.bind(this),
      onTouchMove: this.onDraggingMove.bind(this),
      onTouchEnd: this.onDraggingEnd.bind(this),
      onTouchCancel: this.onDraggingEnd.bind(this),
      onClick: this.onClick.bind(this),
      onTransitionEnd: this.onTransitionEnd.bind(this)
    }
  }

  componentDidMount() {
    this.setTimer()
  }

  componentWillUnmount() {
    this.clearTimer()
  }

  onTransitionEnd() { // this will not be triggered when document.hidden
    const { currentSlide } = this.state
    let fixedSlide = currentSlide
    const count = Children.count(this.props.children)
    if (currentSlide == count + 1) fixedSlide = 1
    if (currentSlide == 0) fixedSlide = count
    this.setState({ currentSlide: fixedSlide, isSliding: false }, () => {
      this.setTimer()
      this.props.slideDidChange && this.props.slideDidChange(fixedSlide)
    })
  }

  setTimer() {
    const interval = this.props.autoPlayInterval
    if (Children.count(this.props.children) > 1 && interval > 0) {
      this.clearTimer()
      this.timer = window.setInterval(this.changeSlide.bind(this, this.state.currentSlide + 1), interval)
    }
  }

  clearTimer() {
    window.clearInterval(this.timer)
  }

  changeSlide(targetSlide) {
    if (document.hidden) return // run only when page is visible
    if (this.props.slideWillChange && !this.props.slideWillChange(targetSlide, this.state.currentSlide)) return
    if (targetSlide >= 0 && targetSlide <= React.Children.count(this.props.children) + 1)
      this.setState({ currentSlide: targetSlide, isSliding: true, dragPosition: null, offset: 0 }, this.setTimer)
  }

  onDraggingStart(event) {
    if (event.touches)
      this.setState({ dragPosition: {
        x: event.touches[0].pageX,
        y: event.touches[0].pageY
      }, offset: 0 })
  }

  onDraggingMove(event) {
    const { isSliding, dragPosition } = this.state
    if (isSliding || !dragPosition || !event.touches) return
    const x = event.touches[0].pageX
    const y = event.touches[0].pageY
    const offset = x - dragPosition.x
    if (Math.abs(y - dragPosition.y) < Math.abs(offset)) event.preventDefault()
    this.setState({ offset })
  }

  onDraggingEnd(event) {
    const sliderWidth = event.currentTarget.clientWidth
    const { currentSlide, offset, dragPosition } = this.state
    if (!dragPosition) return
    const target = Math.abs(offset) > sliderWidth / 5 ? (offset > 0 ? currentSlide - 1 : currentSlide + 1) : currentSlide
    this.setState({ dragPosition: null }, this.changeSlide.bind(this, target))
  }

  onClick(event) {
    if (Math.abs(this.state.offset) < 25) return // trigger click in a small distance
    event.preventDefault()
    event.stopPropagation()
    event.nativeEvent.stopPropagation()
  }

  _renderSlides() {
    const children = React.Children.toArray(this.props.children)
    const { currentSlide } = this.state
    return _.map([
      React.cloneElement(children[children.length - 1], { key: `${children[children.length - 1].key}-clone` }),
      ...children,
      React.cloneElement(children[0], { key: `${children[0].key}-clone` })
    ], (item, index) => {
      return <Slide key={`slide-${item.key}`} focus={currentSlide === index} >{item}</Slide>
    })
  }

  _renderIndicators() {
    return Children.map(this.props.children, (item, index) =>
      <Indicator
        key={`i-${index + 1}`}
        focus={this.state.currentSlide === index + 1}
        onClick={this.changeSlide.bind(this, index + 1)}
      >
        {index + 1}
      </Indicator>
    )
  }

  render() {
    const {
      className,
      transitionDuration,
      transitionTimingFunction
    } = this.props
    const { currentSlide, isSliding, offset } = this.state
    const goPrevSlide = this.changeSlide.bind(this, currentSlide - 1)
    const goNextSlide = this.changeSlide.bind(this, currentSlide + 1)

    return (
      <div className={className}>
        <SlidesContainer>
          <Slides
            currentSlide={currentSlide}
            isSliding={isSliding}
            offset={offset}
            transitionDuration={transitionDuration}
            transitionTimingFunction={transitionTimingFunction}
            {...this.events}
          >
            {this._renderSlides()}
          </Slides>
          <PrevBtn type="button" className="prev" onClick={goPrevSlide}></PrevBtn>
          <NextBtn type="button" className="next" onClick={goNextSlide}></NextBtn>
        </SlidesContainer>
        <Indicators>
          {this._renderIndicators()}
        </Indicators>
      </div>
    )
  }
}

Carousel.propTypes = {
  autoPlayInterval: PropTypes.number,
  children: PropTypes.node,
  className: PropTypes.string,
  initialSlide: PropTypes.number,
  slideDidChange: PropTypes.func,
  slideWillChange: PropTypes.func,
  transitionDuration: PropTypes.string,
  transitionTimingFunction: PropTypes.string
}

Carousel.defaultProps = {
  autoPlayInterval: 0,
  initialSlide: 1, // slide index start from 1
  transitionDuration: '.8s',
  transitionTimingFunction: 'ease-in-out'
}

export default Carousel
