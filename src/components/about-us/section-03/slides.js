import { screen } from '../utils/screen'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'
import VelocityComponent from '@twreporter/velocity-react/velocity-component'

const ViewPort = styled.div`
  overflow: hidden;
  width: ${props => props.viewportWidth.mobile};
  ${screen.tablet`
    width: ${props => props.viewportWidth.tablet};
  `}
  ${screen.desktop`
    width: ${props => props.viewportWidth.desktop};
  `}
  ${screen.overDesktop`
    width: ${props => props.viewportWidth.hd};
  `}
`

const ChildrenWrapper = styled.div`
  will-change: transform;
  display: flex;
  align-items: flex-start;
  width: 100%;
  overflow-x: visible;
  &>* {
    flex-shrink: 0;
    flex-grow: 0;
  }
`

export default class Slides extends PureComponent {
  static propTypes = {
    className: PropTypes.string, // for styled-components to style this component
    children: PropTypes.arrayOf(PropTypes.element).isRequired,
    delay: PropTypes.number,
    duration: PropTypes.number,
    index: PropTypes.number.isRequired,
    viewportWidth: PropTypes.shape({
      mobile: '',
      tablet: '',
      desktop: '',
      hd: ''
    }).isRequired
  }

  static defaultProps = {
    delay: 0,
    duration: 500
  }

  render() {
    const { children, delay, duration, index, viewportWidth, className } = this.props
    return (
      <ViewPort viewportWidth={viewportWidth} className={className}>
        <VelocityComponent
          animation={{
            translateX: `${-100 * index}%`,
            translateZ: 0
          }}
          duration={duration}
          delay={delay}
        >
          <ChildrenWrapper>
            {children}
          </ChildrenWrapper>
        </VelocityComponent>
      </ViewPort>
    )
  }
}
