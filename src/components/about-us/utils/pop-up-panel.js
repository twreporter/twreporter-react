import debounce from 'lodash/debounce'
import mq from './media-query'
import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const defaultZIndex = 2

const _ = {
  debounce,
}

const Panel = styled.div`
  z-index: calc(${defaultZIndex} + 1);
  position: fixed;
  overflow: scroll;
  background: ${props => props.background};
  -webkit-overflow-scrolling: touch;
  ${mq.mobileOnly`
    width: ${props => props.mobWidth};
    height: ${props => props.mobHeight};
    top: ${props => props.mobPositionTop};
    bottom: ${props => props.mobPositionBottom};
    left: ${props => props.mobPositionLeft};
    right: ${props => props.mobPositionRight};
  `}
  ${mq.tabletOnly`
    width: ${props => props.tabletWidth};
    height: ${props => props.tabletHeight};
    top: ${props => props.tabletPositionTop};
    bottom: ${props => props.tabletPositionBottom};
    left: ${props => props.tabletPositionLeft};
    right: ${props => props.tabletPositionRight};
  `}
`

class PopUpBox extends React.PureComponent {
  constructor(props) {
    super(props)
    this.startY = 0
    this.panel = null
    this.handlePreventTouchstartWhenPanning = this._handlePreventTouchstartWhenPanning.bind(
      this
    )
    this.handlePreventTouchendWhenPanning = this._handlePreventTouchendWhenPanning.bind(
      this
    )
    this.handlePreventTouchmoveWhenPanning = this._handlePreventTouchmoveWhenPanning.bind(
      this
    )
    // handle window resize
    this._handleWindowHeight = this._handleWindowHeight.bind(this)
    this.getDebouncedHeight = _.debounce(
      () => {
        this._handleWindowHeight()
      },
      100,
      { maxWait: 300 }
    )
  }

  componentDidMount() {
    this._handleWindowHeight()
    window.addEventListener('resize', this.getDebouncedHeight)
    window.document.body.addEventListener(
      'touchstart',
      this.handlePreventTouchstartWhenPanning,
      {
        passive: false,
      }
    )
    window.document.body.addEventListener(
      'touchend',
      this.handlePreventTouchendWhenPanning,
      {
        passive: false,
      }
    )
    window.document.body.addEventListener(
      'touchmove',
      this.handlePreventTouchmoveWhenPanning,
      {
        passive: false,
      }
    )
  }

  componentWillUnmount() {
    this.panel = null
    window.document.body.removeEventListener(
      'touchstart',
      this.handlePreventTouchstartWhenPanning,
      {
        passive: false,
      }
    )
    window.document.body.removeEventListener(
      'touchend',
      this.handlePreventTouchendWhenPanning,
      {
        passive: false,
      }
    )
    window.document.body.removeEventListener(
      'touchmove',
      this.handlePreventTouchmoveWhenPanning,
      {
        passive: false,
      }
    )
    window.removeEventListener('resize', this.getDebouncedHeight)
  }

  _handlePreventTouchstartWhenPanning(event) {
    this.startY = event.touches[0].screenY
  }

  _handlePreventTouchendWhenPanning(event) {
    this.panel.scrollTop =
      this.panel.scrollTop + (this.startY - event.changedTouches[0].screenY)
  }

  _handlePreventTouchmoveWhenPanning = event => {
    event.preventDefault()
    this.panel.scrollTop =
      this.panel.scrollTop + (this.startY - event.changedTouches[0].screenY)
    this.startY = event.changedTouches[0].screenY
  }

  _handleWindowHeight() {
    this.panel.style.height = window.innerHeight
  }

  render() {
    const { background, fixedPanelStyle } = this.props
    return (
      <Panel
        ref={node => {
          this.panel = node
        }}
        background={background}
        mobWidth={fixedPanelStyle.mob.width || '100%'}
        mobHeight={fixedPanelStyle.mob.height || '100%'}
        tabletWidth={fixedPanelStyle.tablet.width || '100%'}
        tabletHeight={fixedPanelStyle.tablet.height || '100%'}
        mobPositionTop={fixedPanelStyle.mob.position.top || 0}
        tabletPositionTop={fixedPanelStyle.tablet.position.top || 0}
        mobPositionBottom={fixedPanelStyle.mob.position.bottom || 0}
        tabletPositionBottom={fixedPanelStyle.tablet.position.bottom || 0}
        mobPositionLeft={fixedPanelStyle.mob.position.left || 0}
        tabletPositionLeft={fixedPanelStyle.tablet.position.left || 0}
        mobPositionRight={fixedPanelStyle.mob.position.right || 0}
        tabletPositionRight={fixedPanelStyle.tablet.position.right || 0}
      >
        {this.props.children}
      </Panel>
    )
  }
}

PopUpBox.defaultProps = {
  background: '',
  fixedPanelStyle: {},
}

PopUpBox.propTypes = {
  background: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  fixedPanelStyle: PropTypes.object.isRequired,
}

export default PopUpBox
