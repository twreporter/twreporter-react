// polyfill webpack require.ensure for node environment
import mq from '../utils/media-query'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'
// component
import Lottie from './lottie'

if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

const animationLength = 3

const Container = styled.div`
  width: 100%;
  height: 38.39%;
  ${mq.tabletOnly`
    width: 528px;
    height: 245px;
    margin: 0 auto;
  `}
  ${mq.mobileOnly`
    width: 100%;
    height: 136px;
  `}
`

export default class LottieAnim extends PureComponent {
  static propTypes = {
    animDidUpdate: PropTypes.func,
    currentAnimIndex: PropTypes.number,
  }

  constructor(props) {
    super(props)
    this.currentData = 0
  }
  _animationUpdate = () => {
    this.currentData = this.props.currentAnimIndex
    let dataIndex = ++this.currentData % animationLength
    this.props.animDidUpdate(dataIndex)
  }

  render() {
    let options = {
      loop: true,
      autoplay: true,
    }

    return (
      <Container>
        <Lottie
          options={options}
          isStopped={false}
          isPaused={false}
          eventListeners={[
            {
              eventName: 'loopComplete',
              callback: () => this._animationUpdate(),
            },
          ]}
          dataIndex={this.props.currentAnimIndex}
        />
      </Container>
    )
  }
}
