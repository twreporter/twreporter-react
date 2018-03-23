import nextAward from '../../../../static/asset/about-us/next-award.png'
import prevAward from '../../../../static/asset/about-us/prev-award.png'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { screen } from '../utils/screen'

const Container = styled.div`
  ${screen.tabletBelow`
    display: none;
  `}
  position: absolute;
  top: 761px;
  right: 2.7%;
  width: 87px;
  ${screen.overDesktop`
    top: 812px;
    right: 6.2%;
    width: 108px;
  `}
`

const Button = styled.div`
  width: 100%;
  padding-top: 100%;
  background-image: url(${props => props.imageUrl});
  background-position: center center;
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  margin-top: 20px;
  ${screen.overDesktop`
    margin-top: 28px;
  `}
  &:first-of-type {
    margin-top: 0;
  }
  opacity: ${props => props.off ? '0.3' : '1'};
  &:hover {
    opacity: ${props => props.off ? '0.3' : '0.8'};
  }
  transition: opacity 300ms ease;
`

export default class NextPrevButtons extends PureComponent {
  static propTypes = {
    decreaseIndex: PropTypes.func.isRequired,
    increaseIndex: PropTypes.func.isRequired,
    isFirst: PropTypes.bool.isRequired,
    isLast: PropTypes.bool.isRequired
  }
  render() {
    const { decreaseIndex, increaseIndex, isFirst, isLast } = this.props
    return (
      <Container>
        <Button
          imageUrl={nextAward}
          onClick={increaseIndex}
          off={isLast}
        />
        <Button
          imageUrl={prevAward}
          onClick={decreaseIndex}
          off={isFirst}
        />
      </Container>
    )
  }
}
