// polyfill webpack require.ensure for node environment
import mq from '../utils/media-query'
import Loadable from '@loadable/component'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import styled from 'styled-components'

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
  _getLottieComponent = () => {
    const modulePlaceHolder = null
    const LoadableComponent = (...props) => {
      const Lottie = Loadable.lib(
        () =>
          import(
            /* webpackChunkName: "lottie" */
            '../utils/lottie'
          ),
        { fallback: modulePlaceHolder }
      )
      const anim1 = Loadable.lib(
        () =>
          import(
            /* webpackChunkName: "aboutus-section1-anim1" */
            '../../../../static/asset/about-us/animation/section1-1.json'
          ),
        { fallback: modulePlaceHolder }
      )
      const anim2 = Loadable.lib(
        () =>
          import(
            /* webpackChunkName: "aboutus-section1-anim2" */
            '../../../../static/asset/about-us/animation/section1-2.json'
          ),
        { fallback: modulePlaceHolder }
      )
      const anim3 = Loadable.lib(
        () =>
          import(
            /* webpackChunkName: "aboutus-section1-anim3" */
            '../../../../static/asset/about-us/animation/section1-3.json'
          ),
        { fallback: modulePlaceHolder }
      )

      const animations = [anim1, anim2, anim3]
      if (props.options) {
        props.options.animationData = animations[props.dataIndex]
      }
      return <Lottie {...props} />
    }
    return LoadableComponent
  }
  render() {
    let options = {
      loop: true,
      autoplay: true,
    }
    const Lottie = this._getLottieComponent()
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
