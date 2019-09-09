import React, { Component, Children } from 'react'
import PropTypes from 'prop-types'

class Carousel extends Component {
  constructor(props) {
    super(props)
    this.state = { slide: props.initialSlide, dragging: null, sliding: false, offset: 0 }
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
    let { slide } = this.state
    const count = Children.count(this.props.children)
    if (slide == count + 1) slide = 1
    if (slide == 0) slide = count
    this.setState({ slide, sliding: false }, () => {
      this.setTimer()
      this.props.slideDidChange && this.props.slideDidChange(slide)
    })
  }
  setTimer() {
    const interval = this.props.autoPlayInterval
    if (Children.count(this.props.children) > 1 && interval > 0) {
      this.clearTimer()
      this.timer = window.setInterval(this.changeSlide.bind(this, this.state.slide + 1), interval)
    }
  }
  clearTimer() {
    window.clearInterval(this.timer)
  }
  changeSlide(slide) {
    if (document.hidden) return // run only when page is visible
    if (this.props.slideWillChange && !this.props.slideWillChange(slide, this.state.slide)) return
    if (slide >= 0 && slide <= React.Children.count(this.props.children) + 1)
      this.setState({ slide, sliding: true, dragging: null, offset: 0 }, this.setTimer)
  }

  onDraggingStart(event) {
    if (event.touches)
      this.setState({ dragging: {
        x: event.touches[0].pageX,
        y: event.touches[0].pageY
      }, offset: 0 })
  }
  onDraggingMove(event) {
    const { sliding, dragging } = this.state
    if (sliding || !dragging || !event.touches) return
    const x = event.touches[0].pageX
    const y = event.touches[0].pageY
    const offset = x - dragging.x
    if (Math.abs(y - dragging.y) < Math.abs(offset)) event.preventDefault()
    this.setState({ offset })
  }
  onDraggingEnd(event) {
    const sliderWidth = event.currentTarget.clientWidth
    const { slide, offset, dragging } = this.state
    if (!dragging) return
    const target = Math.abs(offset) > sliderWidth / 5 ? (offset > 0 ? slide - 1 : slide + 1) : slide
    this.setState({ dragging: null }, this.changeSlide.bind(this, target))
  }
  onClick(event) {
    if (Math.abs(this.state.offset) < 25) return // trigger click in a small distance
    event.preventDefault()
    event.stopPropagation()
    event.nativeEvent.stopPropagation()
  }
  render() {
    const { children, switcher, indicator, transitionDuration, transitionTimingFunction, slideWillChange, slideDidChange } = this.props
    const props = Object.assign({}, this.props) // rest parameters is not available before node 8
    delete props.children
    delete props.autoPlayInterval
    delete props.switcher
    delete props.indicator
    delete props.transitionDuration
    delete props.transitionTimingFunction
    delete props.slideWillChange
    delete props.slideDidChange
    delete props.initialSlide
    const { slide, sliding, dragging, offset } = this.state
    const slides = Children.map(children, (child) => React.cloneElement(child, { key: child.key + '_clone' }))
    const count = Children.count(children)
    const enabled = count > 1
    const goPrevSlide = this.changeSlide.bind(this, slide - 1)
    const goNextSlide = this.changeSlide.bind(this, slide + 1)
    const slideStyle = {
      flexBasis: '100%',
      flexShrink: 0
    }
    return (
      <div {...props} style={Object.assign({}, props.style, {
        position: 'relative',
        overflowX: 'hidden',
        touchAction: 'pan-y pinch-zoom'
      })}>
        <ul style={{
          listStyleType: 'none',
          padding: 0,
          margin: 0,
          display: 'flex',
          transitionProperty: sliding ? 'transform' : 'none',
          transform: enabled ? (offset !== 0 ? 'translateX(calc(' + (offset * 1) + 'px - ' + slide * 100 + '%))' : 'translateX(-' + slide * 100 + '%)') : null,
          transitionDuration,
          transitionTimingFunction,
          contain: 'layout',
          willChange: 'transform'
        }} {...this.events}>
          {enabled && Children.map(slides.slice(-1).concat(children, slides.slice(0, 1)),
            (item, index) => <li aria-current={slide === index} style={slideStyle}>{item}</li>) || <li>{children}</li>
          }
        </ul>
        {enabled && indicator && <ol>
          {Children.map(children, (item, index) =>
            <li aria-current={slide === index + 1} onClick={this.changeSlide.bind(this, index + 1)}>
              {index + 1}
            </li>
          )}
        </ol>}
        {enabled && switcher && <div>
          <button type="button" className="prev" onClick={goPrevSlide}></button>
          <button type="button" className="next" onClick={goNextSlide}></button>
        </div>}
      </div>
    )
  }
}

Carousel.propTypes = {
  className: PropTypes.string,
  autoPlayInterval: PropTypes.number,
  transitionDuration: PropTypes.string,
  transitionTimingFunction: PropTypes.string,
  switcher: PropTypes.bool,
  indicator: PropTypes.bool,
  slideWillChange: PropTypes.func,
  slideDidChange: PropTypes.func,
  initialSlide: PropTypes.number,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

Carousel.defaultProps = {
  className: 'slider',
  transitionDuration: '.8s',
  transitionTimingFunction: 'ease-in-out',
  initialSlide: 1 // slide index start from 1
}

export default Carousel
